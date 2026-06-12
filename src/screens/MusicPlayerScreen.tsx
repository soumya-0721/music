// VIBRIX - Premium Music Player Screen
// Full-screen player with real audio playback, animated album art, dynamic backgrounds

import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Animated,
  Dimensions, ScrollView, Modal, PanResponder,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppSelector, useAppDispatch } from '../redux/store';
import {
  playPause, nextTrack, previousTrack, seekTo, setCurrentTime, setDuration,
  setVolume, setPlaybackSpeed, setAudioQuality, toggleRepeatMode, toggleShuffleMode,
  setPlaying, setBuffering, setPlayerState,
} from '../redux/slices/musicSlice';
import { toggleLikeSong } from '../redux/slices/playlistSlice';
import { audioService } from '../utils/audioService';

const { width, height } = Dimensions.get('window');
const ARTWORK_SIZE = width - 80;
const CONTROLS_BOTTOM = 40;

const MusicPlayerScreen = ({ navigation }: any) => {
  const { colors } = useThemeColors();
  const dispatch = useAppDispatch();
  const {
    currentSong, isPlaying, currentTime, duration, volume,
    repeatMode, shuffleMode, queue, queueIndex, playbackSpeed, isBuffering,
  } = useAppSelector(state => state.music);
  const likedSongs = useAppSelector(state => state.playlist.likedSongs);

  const rotation = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue'>('player');
  const [showVolume, setShowVolume] = useState(false);
  const [showSpeedModal, setShowSpeedModal] = useState(false);
  const [showQualityModal, setShowQualityModal] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seekTime, setSeekTime] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const isLiked = currentSong ? likedSongs.some(s => s.id === currentSong.id) : false;
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
  const qualities = ['Low', 'Normal', 'High', 'Hi-Res'];

  // ==================== ROTATION ANIMATION ====================
  useEffect(() => {
    if (isPlaying) {
      const spin = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 12000,
          useNativeDriver: true,
        })
      );
      spin.start();

      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.05, duration: 2000, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
        ])
      );
      pulse.start();

      return () => {
        spin.stop();
        pulse.stop();
      };
    } else {
      rotation.stopAnimation();
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  // ==================== PROGRESS TRACKING ====================
  useEffect(() => {
    if (isPlaying && !isSeeking) {
      progressInterval.current = setInterval(async () => {
        const time = await audioService.getCurrentTime();
        dispatch(setCurrentTime(time));
      }, 250);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
        progressInterval.current = null;
      }
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying, isSeeking]);

  // ==================== SUBSCRIBE TO AUDIO SERVICE ====================
  useEffect(() => {
    const unsub = audioService.subscribe((status) => {
      dispatch(setPlaying(status.isPlaying));
      dispatch(setBuffering(status.isBuffering));
    });
    return unsub;
  }, []);

  const spinInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? currentTime / duration : 0;

  // ==================== SEEK HANDLERS ====================
  const handleSeekStart = () => {
    setIsSeeking(true);
    setSeekTime(currentTime);
  };

  const handleSeekMove = (evt: any) => {
    const { locationX } = evt.nativeEvent;
    const barWidth = width - 80;
    const ratio = Math.max(0, Math.min(1, locationX / barWidth));
    setSeekTime(ratio * duration);
  };

  const handleSeekEnd = () => {
    setIsSeeking(false);
    audioService.seekTo(seekTime);
    dispatch(seekTo(seekTime));
  };

  const seekPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: handleSeekStart,
    onPanResponderMove: handleSeekMove,
    onPanResponderRelease: handleSeekEnd,
  });

  // ==================== PLAYBACK CONTROLS ====================
  const handlePlayPause = useCallback(async () => {
    await audioService.togglePlayPause();
    dispatch(playPause());
  }, []);

  const handleNext = useCallback(async () => {
    await audioService.next();
    dispatch(nextTrack());
  }, []);

  const handlePrevious = useCallback(async () => {
    await audioService.previous();
    dispatch(previousTrack());
  }, []);

  const handleVolumeChange = useCallback(async (newVol: number) => {
    const vol = Math.max(0, Math.min(1, newVol));
    await audioService.setVolume(vol);
    dispatch(setVolume(vol));
  }, []);

  const handleSpeedChange = useCallback(async (speed: number) => {
    await audioService.setPlaybackSpeed(speed);
    dispatch(setPlaybackSpeed(speed));
    setShowSpeedModal(false);
  }, []);

  const handleRepeat = useCallback(async () => {
    await audioService.toggleRepeatMode();
    dispatch(toggleRepeatMode());
  }, []);

  const handleShuffle = useCallback(async () => {
    await audioService.toggleShuffleMode();
    dispatch(toggleShuffleMode());
  }, []);

  const handleLike = useCallback(() => {
    if (currentSong) dispatch(toggleLikeSong(currentSong));
  }, [currentSong]);

  // ==================== EMPTY STATE ====================
  if (!currentSong) {
    return (
      <LinearGradient colors={['#0F0F0F', '#1A1510']} style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎵</Text>
          <Text style={[styles.emptyText, { color: '#rgba(255,255,255,0.5)' }]}>No song playing</Text>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: 'rgba(212,175,55,0.15)' }]} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#D4AF37', fontSize: 14, fontWeight: '600' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <View style={styles.container}>
      {/* Dynamic Gradient Background */}
      <LinearGradient
        colors={colors.playerBg}
        style={StyleSheet.absoluteFill}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={[styles.headerIcon, { color: colors.text.primary }]}>▼</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text.secondary }]}>Now Playing</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={[styles.headerIcon, { color: colors.text.primary }]}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {['player', 'lyrics', 'queue'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { backgroundColor: `${colors.secondary}20` }]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? colors.secondary : colors.text.tertiary },
              activeTab === tab && { fontWeight: '700' },
            ]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'player' && (
        <ScrollView
          contentContainerStyle={styles.playerContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Animated Album Art */}
          <View style={styles.artworkContainer}>
            <Animated.View style={{ transform: [{ rotate: spinInterpolation }, { scale: pulseAnim }] }}>
              <Image
                source={{ uri: currentSong.albumArt }}
                style={styles.artwork}
              />
              {/* Glowing ring */}
              <View style={[styles.artworkRing, { borderColor: `${colors.secondary}40` }]} />
            </Animated.View>
            {/* Glow effect */}
            <LinearGradient
              colors={['transparent', `${colors.secondary}15`]}
              style={styles.artworkGlow}
            />
          </View>

          {/* Buffering indicator */}
          {isBuffering && (
            <View style={styles.bufferingContainer}>
              <Text style={[styles.bufferingText, { color: colors.text.tertiary }]}>Buffering...</Text>
            </View>
          )}

          {/* Song Info */}
          <View style={styles.songInfo}>
            <Text style={[styles.songTitle, { color: colors.text.primary }]} numberOfLines={1}>{currentSong.title}</Text>
            <Text style={[styles.songArtist, { color: colors.text.secondary }]}>{currentSong.artist}</Text>
            <View style={styles.songMeta}>
              <Text style={[styles.songLang, { color: colors.text.tertiary }]}>
                {currentSong.language === 'telugu' ? 'తెలుగు' : currentSong.language === 'hindi' ? 'हिंदी' : 'English'}
              </Text>
              <Text style={[styles.songGenre, { color: colors.text.tertiary }]}>{currentSong.genre}</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer} {...seekPanResponder.panHandlers}>
            <View style={[styles.progressBar, { backgroundColor: colors.text.muted }]}>
              <View style={[styles.progressFill, { backgroundColor: colors.secondary, width: `${(isSeeking ? seekTime / duration : progress) * 100}%` }]} />
              <View style={[styles.progressThumb, { backgroundColor: colors.secondary, left: `${(isSeeking ? seekTime / duration : progress) * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, { color: colors.text.tertiary }]}>{formatTime(isSeeking ? seekTime : currentTime)}</Text>
              <Text style={[styles.timeText, { color: colors.text.tertiary }]}>-{formatTime(Math.max(0, duration - (isSeeking ? seekTime : currentTime)))}</Text>
            </View>
          </View>

          {/* Playback Controls */}
          <View style={styles.controls}>
            <TouchableOpacity onPress={handleShuffle} style={styles.controlBtn}>
              <Text style={[styles.controlIcon, shuffleMode === 'on' && { color: colors.secondary }]}>
                {shuffleMode === 'on' ? '🔀' : '🔀'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePrevious} style={styles.controlBtn}>
              <Text style={[styles.controlIconLarge, { color: colors.text.primary }]}>⏪</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handlePlayPause} style={styles.playButtonContainer}>
              <LinearGradient
                colors={[colors.secondary, `${colors.secondary}CC`]}
                style={styles.playButtonGradient}
              >
                <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
              </LinearGradient>
              {/* Glow ring */}
              <View style={[styles.playButtonGlow, { borderColor: `${colors.secondary}30` }]} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleNext} style={styles.controlBtn}>
              <Text style={[styles.controlIconLarge, { color: colors.text.primary }]}>⏩</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleRepeat} style={styles.controlBtn}>
              <Text style={[styles.controlIcon, repeatMode !== 'off' && { color: colors.secondary }]}>
                {repeatMode === 'one' ? '🔂' : '🔁'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Volume Control */}
          <TouchableOpacity
            style={styles.volumeButton}
            onPress={() => setShowVolume(!showVolume)}
            activeOpacity={0.7}
          >
            <Text style={styles.volumeIcon}>{volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔇'}</Text>
            <View style={[styles.volumeBar, { backgroundColor: colors.text.muted }]}>
              <View style={[styles.volumeFill, { backgroundColor: colors.secondary, width: `${volume * 100}%` }]} />
              <View style={[styles.volumeThumb, { backgroundColor: colors.secondary, left: `${volume * 100}%` }]} />
            </View>
          </TouchableOpacity>
          {showVolume && (
            <View style={styles.volumeSliderContainer}>
              <TouchableOpacity
                style={[styles.volumeSlider, { backgroundColor: colors.surface.glass }]}
                onPress={(e) => {
                  const { locationX } = e.nativeEvent;
                  handleVolumeChange(locationX / (width - 120));
                }}
              >
                <View style={[styles.volumeSliderFill, { backgroundColor: colors.secondary, width: `${volume * 100}%` }]} />
              </TouchableOpacity>
              <Text style={[styles.volumePct, { color: colors.text.tertiary }]}>{Math.round(volume * 100)}%</Text>
            </View>
          )}

          {/* Action Buttons Row */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={handleLike} style={styles.actionBtn}>
              <Text style={[styles.actionIcon, isLiked && { color: colors.heart }]}>
                {isLiked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>⬇️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setShowSpeedModal(true)}
            >
              <Text style={styles.actionIcon}>⏱️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setShowQualityModal(true)}
            >
              <Text style={styles.actionIcon}>🎧</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Text style={styles.actionIcon}>↗️</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => navigation.navigate('Equalizer')}
            >
              <Text style={styles.actionIcon}>🎚️</Text>
            </TouchableOpacity>
          </View>

          {/* Now Playing Info */}
          <View style={styles.nowPlayingInfo}>
            <Text style={[styles.queueInfoText, { color: colors.text.tertiary }]}>
              {queueIndex + 1} of {queue.length} • {playbackSpeed}x
            </Text>
          </View>
        </ScrollView>
      )}

      {activeTab === 'lyrics' && (
        <ScrollView contentContainerStyle={styles.lyricsContainer} showsVerticalScrollIndicator={false}>
          <Text style={[styles.lyricsTitle, { color: colors.text.primary }]}>Lyrics</Text>
          <Text style={[styles.lyricsText, { color: colors.text.secondary }]}>
            {currentSong.lyrics || [`🎵 "${currentSong.title}"`, '', `by ${currentSong.artist}`, '', 'Lyrics coming soon...'].join('\n')}
          </Text>
        </ScrollView>
      )}

      {activeTab === 'queue' && (
        <ScrollView contentContainerStyle={styles.queueContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.queueHeader}>
            <Text style={[styles.queueTitle, { color: colors.text.primary }]}>Up Next</Text>
            <Text style={[styles.queueCount, { color: colors.text.tertiary }]}>{queue.length} songs</Text>
          </View>
          {queue.map((song, index) => (
            <TouchableOpacity
              key={song.id + index}
              style={[
                styles.queueItem,
                index === queueIndex && { backgroundColor: `${colors.secondary}10`, borderRadius: BorderRadius.md },
              ]}
              activeOpacity={0.7}
            >
              <Image source={{ uri: song.albumArt }} style={styles.queueImage} />
              <View style={styles.queueInfo}>
                <Text style={[styles.queueSongTitle, { color: colors.text.primary }]} numberOfLines={1}>
                  {index === queueIndex ? '▶ ' : ''}{song.title}
                </Text>
                <Text style={[styles.queueArtist, { color: colors.text.tertiary }]} numberOfLines={1}>{song.artist}</Text>
              </View>
              <Text style={[styles.queueDuration, { color: colors.text.tertiary }]}>{formatTime(song.duration)}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Speed Modal */}
      <Modal visible={showSpeedModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowSpeedModal(false)}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface.primary, borderColor: colors.surface.glassLight }]}>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>Playback Speed</Text>
            <View style={styles.speedGrid}>
              {speeds.map((speed) => (
                <TouchableOpacity
                  key={speed}
                  style={[
                    styles.speedBtn,
                    { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight },
                    playbackSpeed === speed && { backgroundColor: `${colors.secondary}20`, borderColor: colors.secondary },
                  ]}
                  onPress={() => handleSpeedChange(speed)}
                >
                  <Text style={[
                    styles.speedText,
                    { color: colors.text.primary },
                    playbackSpeed === speed && { color: colors.secondary, fontWeight: '800' },
                  ]}>{speed}x</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Quality Modal */}
      <Modal visible={showQualityModal} transparent animationType="fade">
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowQualityModal(false)}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface.primary, borderColor: colors.surface.glassLight }]}>
            <Text style={[styles.modalTitle, { color: colors.text.primary }]}>Audio Quality</Text>
            <View style={styles.speedGrid}>
              {qualities.map((q) => (
                <TouchableOpacity
                  key={q}
                  style={[
                    styles.speedBtn,
                    { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight },
                    audioService.getStatus().playbackSpeed === 1 && q === 'High' && { backgroundColor: `${colors.secondary}20`, borderColor: colors.secondary },
                  ]}
                  onPress={() => {
                    dispatch(setAudioQuality(q as any));
                    setShowQualityModal(false);
                  }}
                >
                  <Text style={[styles.speedText, { color: colors.text.primary }]}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 16, marginBottom: 20 },
  backButton: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 9999 },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.sm,
  },
  headerButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { fontSize: 22 },
  headerTitle: { fontSize: 14, fontWeight: '600', letterSpacing: 0.5 },
  tabBar: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.xl, marginBottom: Spacing.md },
  tab: { paddingVertical: 8, paddingHorizontal: Spacing.base, borderRadius: BorderRadius.full },
  tabText: { fontSize: 14, fontWeight: '500' },
  playerContent: { alignItems: 'center', paddingHorizontal: Spacing.xl, paddingBottom: CONTROLS_BOTTOM },
  artworkContainer: {
    width: ARTWORK_SIZE, height: ARTWORK_SIZE,
    borderRadius: ARTWORK_SIZE / 2,
    marginBottom: Spacing.xl,
    alignItems: 'center', justifyContent: 'center',
  },
  artwork: { width: ARTWORK_SIZE, height: ARTWORK_SIZE, borderRadius: ARTWORK_SIZE / 2 },
  artworkRing: {
    position: 'absolute', top: -6, left: -6, right: -6, bottom: -6,
    borderRadius: (ARTWORK_SIZE + 12) / 2,
    borderWidth: 2,
  },
  artworkGlow: {
    position: 'absolute', width: '100%', height: '100%',
    borderRadius: ARTWORK_SIZE / 2,
  },
  bufferingContainer: { marginBottom: Spacing.sm },
  bufferingText: { fontSize: 12, fontStyle: 'italic' },
  songInfo: { alignItems: 'center', marginBottom: Spacing.xl, paddingHorizontal: Spacing.xl },
  songTitle: { fontSize: 24, fontWeight: '800', marginBottom: 4, textAlign: 'center' },
  songArtist: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  songMeta: { flexDirection: 'row', gap: 12 },
  songLang: { fontSize: 12, fontWeight: '600', opacity: 0.7 },
  songGenre: { fontSize: 12, fontWeight: '500', opacity: 0.5 },
  progressContainer: { width: '100%', marginBottom: Spacing.lg, paddingHorizontal: 8 },
  progressBar: { height: 4, borderRadius: 2, position: 'relative', marginBottom: Spacing.sm },
  progressFill: { height: '100%', borderRadius: 2 },
  progressThumb: {
    position: 'absolute', top: -5, width: 14, height: 14,
    borderRadius: 7, marginLeft: -7,
  },
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { fontSize: 11, fontWeight: '500' },
  controls: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 28, marginBottom: Spacing.lg, width: '100%',
  },
  controlBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  controlIcon: { fontSize: 20 },
  controlIconLarge: { fontSize: 26 },
  playButtonContainer: {
    width: 72, height: 72,
    alignItems: 'center', justifyContent: 'center',
  },
  playButtonGradient: {
    width: 68, height: 68, borderRadius: 34,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.glow,
  },
  playButtonGlow: {
    position: 'absolute', width: 80, height: 80,
    borderRadius: 40, borderWidth: 1.5,
  },
  playIcon: { fontSize: 26, color: '#FFFFFF', marginLeft: 3 },
  volumeButton: {
    flexDirection: 'row', alignItems: 'center',
    width: '80%', gap: Spacing.sm, marginBottom: Spacing.sm,
  },
  volumeIcon: { fontSize: 16, width: 28 },
  volumeBar: { flex: 1, height: 3, borderRadius: 1.5, position: 'relative' },
  volumeFill: { height: '100%', borderRadius: 1.5 },
  volumeThumb: {
    position: 'absolute', top: -4, width: 10, height: 10,
    borderRadius: 5, marginLeft: -5,
  },
  volumeSliderContainer: {
    flexDirection: 'row', alignItems: 'center',
    width: '80%', gap: Spacing.sm, marginBottom: Spacing.xl,
  },
  volumeSlider: { flex: 1, height: 6, borderRadius: 3, overflow: 'hidden' },
  volumeSliderFill: { height: '100%', borderRadius: 3 },
  volumePct: { fontSize: 12, fontWeight: '600', width: 40, textAlign: 'right' },
  actions: {
    flexDirection: 'row', gap: 24,
    marginBottom: Spacing.lg, justifyContent: 'center',
  },
  actionBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  actionIcon: { fontSize: 20 },
  nowPlayingInfo: { alignItems: 'center' },
  queueInfoText: { fontSize: 12, fontWeight: '500' },
  lyricsContainer: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  lyricsTitle: { fontSize: 20, fontWeight: '800', marginBottom: Spacing.lg },
  lyricsText: { fontSize: 16, lineHeight: 30, fontWeight: '400' },
  queueContainer: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  queueHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  queueTitle: { fontSize: 20, fontWeight: '800' },
  queueCount: { fontSize: 13, fontWeight: '500' },
  queueItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 },
  queueImage: { width: 48, height: 48, borderRadius: BorderRadius.sm },
  queueInfo: { flex: 1 },
  queueSongTitle: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
  queueArtist: { fontSize: 13, fontWeight: '400' },
  queueDuration: { fontSize: 12, fontWeight: '500' },
  modalOverlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    width: '80%', maxWidth: 320,
    borderRadius: BorderRadius['2xl'], padding: Spacing.xl,
    borderWidth: 1,
  },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: Spacing.lg, textAlign: 'center' },
  speedGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  speedBtn: {
    paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: BorderRadius.full, borderWidth: 1,
    minWidth: 70, alignItems: 'center',
  },
  speedText: { fontSize: 15, fontWeight: '600' },
});

export default MusicPlayerScreen;
