// VIBRIX - Audio Playback Service
// Wraps expo-av Audio API for real playback with queue management

import { Audio, AVPlaybackStatus } from 'expo-av';
import { Song, RepeatMode, ShuffleMode } from '../types';

type Listener = (status: PlayerStatus) => void;

export interface PlayerStatus {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isBuffering: boolean;
  currentSong: Song | null;
  queue: Song[];
  queueIndex: number;
  volume: number;
  repeatMode: RepeatMode;
  shuffleMode: ShuffleMode;
  playbackSpeed: number;
}

class AudioService {
  private sound: Audio.Sound | null = null;
  private currentSong: Song | null = null;
  private queue: Song[] = [];
  private originalQueue: Song[] = [];
  private queueIndex: number = -1;
  private volume: number = 0.7;
  private repeatMode: RepeatMode = 'off';
  private shuffleMode: ShuffleMode = 'off';
  private playbackSpeed: number = 1;
  private listeners: Set<Listener> = new Set();
  private isLoaded: boolean = false;
  private _isPlaying: boolean = false;
  private _currentTime: number = 0;
  private _duration: number = 0;
  private _isBuffering: boolean = false;

  constructor() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  }

  // ==================== SUBSCRIPTION ====================

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    const status = this.getStatus();
    this.listeners.forEach(l => l(status));
  }

  getStatus(): PlayerStatus {
    return {
      isPlaying: this._isPlaying,
      currentTime: this._currentTime,
      duration: this._duration || this.currentSong?.duration || 0,
      isBuffering: this._isBuffering,
      currentSong: this.currentSong,
      queue: this.queue,
      queueIndex: this.queueIndex,
      volume: this.volume,
      repeatMode: this.repeatMode,
      shuffleMode: this.shuffleMode,
      playbackSpeed: this.playbackSpeed,
    };
  }

  // ==================== QUEUE MANAGEMENT ====================

  async setQueue(songs: Song[], index: number = 0) {
    this.queue = [...songs];
    this.originalQueue = [...songs];
    this.queueIndex = index;
    this.currentSong = songs[index] || null;
    this.isLoaded = false;
    await this.loadCurrentSong();
    this.notify();
  }

  async addToQueue(song: Song) {
    this.queue.push(song);
    this.originalQueue.push(song);
    this.notify();
  }

  removeFromQueue(index: number) {
    this.queue.splice(index, 1);
    this.originalQueue.splice(index, 1);
    this.notify();
  }

  clearQueue() {
    this.queue = [];
    this.originalQueue = [];
    this.queueIndex = -1;
    this.currentSong = null;
    this.unloadSound();
    this.notify();
  }

  getQueue(): Song[] {
    return this.queue;
  }

  // ==================== SONG LOADING ====================

  private async loadCurrentSong() {
    if (!this.currentSong) return;
    
    try {
      await this.unloadSound();
      
      if (!this.currentSong.url) {
        console.log(`[AudioService] No URL for song: ${this.currentSong.title}`);
        this.isLoaded = true;
        this.notify();
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: this.currentSong.url },
        {
          shouldPlay: false,
          volume: this.volume,
          rate: this.playbackSpeed,
          shouldCorrectPitch: true,
        },
        this.onPlaybackStatusUpdate
      );
      
      this.sound = sound;
      this.isLoaded = true;
      this.notify();
    } catch (error) {
      console.error('[AudioService] Error loading song:', error);
      this.isLoaded = false;
      this.notify();
    }
  }

  private onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (!status.isLoaded) {
      this._isPlaying = false;
      this._isBuffering = true;
      this.notify();
      return;
    }

    this._isPlaying = status.isPlaying;
    this._currentTime = status.positionMillis / 1000;
    this._duration = status.durationMillis ? status.durationMillis / 1000 : 0;
    this._isBuffering = status.isBuffering;
    this.notify();

    if (status.didJustFinish) {
      this.handleSongEnd();
    }
  };

  private handleSongEnd() {
    if (this.repeatMode === 'one') {
      this.seekTo(0);
      this.play();
      return;
    }

    const nextIndex = this.queueIndex + 1;
    if (nextIndex < this.queue.length) {
      this.playFromIndex(nextIndex);
    } else if (this.repeatMode === 'all') {
      this.playFromIndex(0);
    } else {
      // End of queue
      this.currentSong = this.queue[this.queueIndex] || null;
      this.isLoaded = false;
      this.notify();
    }
  }

  // ==================== PLAYBACK CONTROLS ====================

  async play() {
    try {
      if (!this.currentSong) return;
      
      if (!this.isLoaded) {
        await this.loadCurrentSong();
      }
      
      if (this.sound) {
        await this.sound.playAsync();
      }
      this.notify();
    } catch (error) {
      console.error('[AudioService] Error playing:', error);
    }
  }

  async pause() {
    try {
      if (this.sound) {
        await this.sound.pauseAsync();
      }
      this.notify();
    } catch (error) {
      console.error('[AudioService] Error pausing:', error);
    }
  }

  async togglePlayPause() {
    if (this.sound) {
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded && status.isPlaying) {
        await this.pause();
      } else {
        await this.play();
      }
    } else {
      await this.play();
    }
  }

  async next() {
    if (this.queue.length === 0) return;
    
    if (this.repeatMode === 'one') {
      await this.seekTo(0);
      await this.play();
      return;
    }

    const nextIndex = this.queueIndex + 1;
    if (nextIndex < this.queue.length) {
      await this.playFromIndex(nextIndex);
    } else if (this.repeatMode === 'all') {
      await this.playFromIndex(0);
    }
  }

  async previous() {
    if (this.queue.length === 0) return;

    // If more than 3 seconds in, restart current song
    if (this.sound) {
      const status = await this.sound.getStatusAsync();
      if (status.isLoaded && status.positionMillis > 3000) {
        await this.seekTo(0);
        return;
      }
    }

    const prevIndex = this.queueIndex - 1;
    if (prevIndex >= 0) {
      await this.playFromIndex(prevIndex);
    }
  }

  private async playFromIndex(index: number) {
    if (index < 0 || index >= this.queue.length) return;
    
    this.queueIndex = index;
    this.currentSong = this.queue[index];
    this.isLoaded = false;
    await this.loadCurrentSong();
    await this.play();
    this.notify();
  }

  // ==================== SEEK & TIME ====================

  async seekTo(seconds: number) {
    try {
      if (this.sound) {
        await this.sound.setStatusAsync({ positionMillis: seconds * 1000 });
      }
    } catch (error) {
      console.error('[AudioService] Error seeking:', error);
    }
  }

  getCurrentTime(): Promise<number> {
    return new Promise(async (resolve) => {
      if (this.sound) {
        const status = await this.sound.getStatusAsync();
        if (status.isLoaded) {
          resolve(status.positionMillis / 1000);
          return;
        }
      }
      resolve(0);
    });
  }

  // ==================== VOLUME ====================

  async setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    try {
      if (this.sound) {
        await this.sound.setVolumeAsync(this.volume);
      }
      this.notify();
    } catch (error) {
      console.error('[AudioService] Error setting volume:', error);
    }
  }

  // ==================== PLAYBACK SPEED ====================

  async setPlaybackSpeed(speed: number) {
    this.playbackSpeed = speed;
    try {
      if (this.sound) {
        await this.sound.setRateAsync(speed, true);
      }
      this.notify();
    } catch (error) {
      console.error('[AudioService] Error setting speed:', error);
    }
  }

  // ==================== REPEAT & SHUFFLE ====================

  async toggleRepeatMode() {
    const modes: RepeatMode[] = ['off', 'all', 'one'];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
    this.notify();
  }

  async toggleShuffleMode() {
    if (this.shuffleMode === 'off') {
      const shuffled = [...this.queue];
      const currentSong = this.queue[this.queueIndex];
      
      // Fisher-Yates shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Move current song to front
      const currentIdx = shuffled.findIndex(s => s.id === currentSong?.id);
      if (currentIdx > 0) {
        [shuffled[0], shuffled[currentIdx]] = [shuffled[currentIdx], shuffled[0]];
      }
      
      this.queue = shuffled;
      this.queueIndex = 0;
      this.shuffleMode = 'on';
    } else {
      this.queue = [...this.originalQueue];
      const currentSongId = this.currentSong?.id;
      this.queueIndex = this.queue.findIndex(s => s.id === currentSongId);
      this.shuffleMode = 'off';
    }
    this.notify();
  }

  // ==================== CLEANUP ====================

  private async unloadSound() {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('[AudioService] Error unloading sound:', error);
    }
  }

  async destroy() {
    await this.unloadSound();
    this.listeners.clear();
    this.queue = [];
    this.originalQueue = [];
    this.currentSong = null;
    this.queueIndex = -1;
  }
}

// Singleton instance
export const audioService = new AudioService();
