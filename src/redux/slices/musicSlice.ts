import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Song, PlayerState, RepeatMode, ShuffleMode } from '../../types';

const initialState: PlayerState = {
  currentSong: null,
  queue: [],
  originalQueue: [],
  queueIndex: -1,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.7,
  repeatMode: 'off',
  shuffleMode: 'off',
  isMiniPlayerVisible: false,
};

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isMiniPlayerVisible = true;
    },
    setQueue: (state, action: PayloadAction<{ songs: Song[]; index: number }>) => {
      state.queue = action.payload.songs;
      state.originalQueue = [...action.payload.songs];
      state.queueIndex = action.payload.index;
      state.currentSong = action.payload.songs[action.payload.index];
      state.isMiniPlayerVisible = true;
    },
    playPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    nextTrack: (state) => {
      if (state.queue.length === 0) return;
      if (state.repeatMode === 'one') {
        state.currentTime = 0;
        return;
      }
      const nextIndex = state.queueIndex + 1;
      if (nextIndex >= state.queue.length) {
        if (state.repeatMode === 'all') {
          state.queueIndex = 0;
          state.currentSong = state.queue[0];
        }
      } else {
        state.queueIndex = nextIndex;
        state.currentSong = state.queue[nextIndex];
      }
      state.currentTime = 0;
    },
    previousTrack: (state) => {
      if (state.queue.length === 0) return;
      if (state.currentTime > 3) {
        state.currentTime = 0;
        return;
      }
      const prevIndex = state.queueIndex - 1;
      if (prevIndex >= 0) {
        state.queueIndex = prevIndex;
        state.currentSong = state.queue[prevIndex];
      }
      state.currentTime = 0;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
    },
    toggleRepeatMode: (state) => {
      const modes: RepeatMode[] = ['off', 'all', 'one'];
      const currentIndex = modes.indexOf(state.repeatMode);
      state.repeatMode = modes[(currentIndex + 1) % modes.length];
    },
    toggleShuffleMode: (state) => {
      if (state.shuffleMode === 'off') {
        // Shuffle the queue
        const shuffled = [...state.queue];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        state.queue = shuffled;
        state.shuffleMode = 'on';
      } else {
        // Restore original order
        state.queue = [...state.originalQueue];
        state.shuffleMode = 'off';
      }
    },
    toggleMiniPlayer: (state) => {
      state.isMiniPlayerVisible = !state.isMiniPlayerVisible;
    },
    hideMiniPlayer: (state) => {
      state.isMiniPlayerVisible = false;
    },
    addToQueue: (state, action: PayloadAction<Song>) => {
      state.queue.push(action.payload);
      state.originalQueue.push(action.payload);
    },
    removeFromQueue: (state, action: PayloadAction<number>) => {
      state.queue.splice(action.payload, 1);
      state.originalQueue.splice(action.payload, 1);
    },
    clearQueue: (state) => {
      state.queue = [];
      state.originalQueue = [];
      state.queueIndex = -1;
      state.currentSong = null;
      state.isPlaying = false;
      state.isMiniPlayerVisible = false;
    },
  },
});

export const {
  setCurrentSong, setQueue, playPause, setPlaying,
  nextTrack, previousTrack, setCurrentTime, setDuration,
  setVolume, toggleRepeatMode, toggleShuffleMode,
  toggleMiniPlayer, hideMiniPlayer, addToQueue, removeFromQueue, clearQueue,
} = musicSlice.actions;
export default musicSlice.reducer;
