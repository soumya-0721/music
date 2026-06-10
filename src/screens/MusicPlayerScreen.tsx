import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Animated, Dimensions, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppSelector, useAppDispatch } from '../redux/store';
import {
  playPause, nextTrack, previousTrack, setCurrentTime, setDuration,
  toggleRepeatMode, toggleShuffleMode, setVolume,
} from '../redux/slices/musicSlice';
import { toggleLikeSong } from '../redux/slices/playlistSlice';

const { width, height } = Dimensions.get('window');
const ARTWORK_SIZE = width - 80;

const MusicPlayerScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying, currentTime, duration, repeatMode, shuffleMode, volume, queue } =
    useAppSelector(state => state.music);
  const likedSongs = useAppSelector(state => state.playlist.likedSongs);

  const rotation = useRef(new Animated.Value(0)).current;
  const [activeTab, setActiveTab] = React.useState<'player' | 'lyrics' | 'queue'>('player');
  const [showVolume, setShowVolume] = React.useState(false);

  const isLiked = currentSong ? likedSongs.some(s => s.id === currentSong.id) : false;

  // Rotation animation
  useEffect(() => {
    if (isPlaying) {
      const spin = Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        })
      );
      spin.start();
      return () => spin.stop();
    } else {
      rotation.stopAnimation();
    }
  }, [isPlaying]);

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

  if (!currentSong) {
    return (
      <LinearGradient colors={['#0B1020', '#1A1040']} style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎵</Text>
          <Text style={styles.emptyText}>No song playing</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#1A1040', '#0B1020', '#0D1225']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Text style={styles.headerIcon}>▼</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerIcon}>⋯</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        {['player', 'lyrics', 'queue'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'player' && (
        <ScrollView contentContainerStyle={styles.playerContent}>
          {/* Album Art */}
          <View style={styles.artworkContainer}>
            <Animated.Image
              source={{ uri: currentSong.albumArt }}
              style={[styles.artwork, { transform: [{ rotate: spinInterpolation }] }]}
            />
            <LinearGradient
              colors={['transparent', 'rgba(139, 92, 246, 0.2)']}
              style={styles.artworkGlow}
            />
          </View>

          {/* Song Info */}
          <View style={styles.songInfo}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.songArtist}>{currentSong.artist}</Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
              <View style={[styles.progressThumb, { left: `${progress * 100}%` }]} />
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Controls */}
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => dispatch(toggleShuffleMode())}>
              <Text style={[styles.controlIcon, shuffleMode === 'on' && styles.activeControl]}>🔀</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(previousTrack())}>
              <Text style={styles.controlIconLarge}>⏪</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(playPause())}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.playButton}>
                <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(nextTrack())}>
              <Text style={styles.controlIconLarge}>⏩</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(toggleRepeatMode())}>
              <Text style={[styles.controlIcon, repeatMode !== 'off' && styles.activeControl]}>🔁</Text>
            </TouchableOpacity>
          </View>

          {/* Volume */}
          <TouchableOpacity style={styles.volumeButton} onPress={() => setShowVolume(!showVolume)}>
            <Text style={styles.volumeIcon}>{volume > 0.5 ? '🔊' : volume > 0 ? '🔉' : '🔇'}</Text>
            <View style={styles.volumeBar}>
              <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
            </View>
          </TouchableOpacity>

          {/* Action buttons */}
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => currentSong && dispatch(toggleLikeSong(currentSong))}>
              <Text style={[styles.actionIcon, isLiked && { color: Colors.heart }]}>
                {isLiked ? '❤️' : '🤍'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionIcon}>⬇️</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionIcon}>📋</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionIcon}>↗️</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {activeTab === 'lyrics' && (
        <ScrollView contentContainerStyle={styles.lyricsContainer}>
          <Text style={styles.lyricsTitle}>Lyrics</Text>
          <Text style={styles.lyricsText}>
            {currentSong.lyrics || `Lyrics for "${currentSong.title}" by ${currentSong.artist} coming soon...`}
          </Text>
        </ScrollView>
      )}

      {activeTab === 'queue' && (
        <ScrollView contentContainerStyle={styles.queueContainer}>
          <Text style={styles.queueTitle}>Up Next</Text>
          {queue.map((song, index) => (
            <View key={song.id} style={[styles.queueItem, index === 0 && styles.queueItemCurrent]}>
              <Image source={{ uri: song.albumArt }} style={styles.queueImage} />
              <View style={styles.queueInfo}>
                <Text style={styles.queueSongTitle} numberOfLines={1}>{song.title}</Text>
                <Text style={styles.queueArtist} numberOfLines={1}>{song.artist}</Text>
              </View>
              <Text style={styles.queueDuration}>{formatTime(song.duration)}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: Spacing.base },
  emptyText: { fontSize: Typography.fontSize.lg, color: Colors.text.tertiary, marginBottom: Spacing.lg },
  backButton: { backgroundColor: Colors.surface.glass, paddingVertical: 10, paddingHorizontal: Spacing.xl, borderRadius: BorderRadius.full },
  backText: { color: Colors.text.secondary, fontSize: Typography.fontSize.base },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.sm },
  headerButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  headerIcon: { fontSize: 22, color: Colors.text.primary },
  headerTitle: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.secondary },
  playerContent: { alignItems: 'center', paddingHorizontal: Spacing.xl },
  tabBar: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.xl, marginBottom: Spacing.lg },
  tab: { paddingVertical: 8, paddingHorizontal: Spacing.base, borderRadius: BorderRadius.full },
  activeTab: { backgroundColor: 'rgba(139, 92, 246, 0.15)' },
  tabText: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, fontWeight: Typography.fontWeight.medium },
  activeTabText: { color: Colors.secondary },
  artworkContainer: { width: ARTWORK_SIZE, height: ARTWORK_SIZE, borderRadius: ARTWORK_SIZE / 2, marginBottom: Spacing['2xl'], ...Shadows.glow },
  artwork: { width: ARTWORK_SIZE, height: ARTWORK_SIZE, borderRadius: ARTWORK_SIZE / 2 },
  artworkGlow: { position: 'absolute', width: '100%', height: '100%', borderRadius: ARTWORK_SIZE / 2 },
  songInfo: { alignItems: 'center', marginBottom: Spacing.xl },
  songTitle: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: 4, textAlign: 'center' },
  songArtist: { fontSize: Typography.fontSize.md, color: Colors.text.secondary },
  progressContainer: { width: '100%', marginBottom: Spacing.lg },
  progressBar: { height: 4, backgroundColor: Colors.text.muted, borderRadius: 2, position: 'relative' },
  progressFill: { height: '100%', backgroundColor: Colors.secondary, borderRadius: 2 },
  progressThumb: { position: 'absolute', top: -4, width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.secondary },
  timeContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: Spacing.sm },
  timeText: { fontSize: Typography.fontSize.xs, color: Colors.text.tertiary },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 24, marginBottom: Spacing.xl },
  controlIcon: { fontSize: 22, color: Colors.text.secondary },
  controlIconLarge: { fontSize: 28, color: Colors.text.primary },
  activeControl: { color: Colors.secondary },
  playButton: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', ...Shadows.glow },
  playIcon: { fontSize: 24, color: Colors.text.primary },
  volumeButton: { flexDirection: 'row', alignItems: 'center', width: '80%', gap: Spacing.sm, marginBottom: Spacing.xl },
  volumeIcon: { fontSize: 18 },
  volumeBar: { flex: 1, height: 3, backgroundColor: Colors.text.muted, borderRadius: 1.5 },
  volumeFill: { height: '100%', backgroundColor: Colors.secondary, borderRadius: 1.5 },
  actions: { flexDirection: 'row', gap: 32, marginBottom: Spacing['2xl'] },
  actionIcon: { fontSize: 24, color: Colors.text.secondary },
  lyricsContainer: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  lyricsTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.lg },
  lyricsText: { fontSize: Typography.fontSize.md, color: Colors.text.secondary, lineHeight: 28 },
  queueContainer: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  queueTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.lg },
  queueItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.sm },
  queueItemCurrent: { backgroundColor: 'rgba(139, 92, 246, 0.1)', borderRadius: BorderRadius.md, padding: Spacing.sm },
  queueImage: { width: 44, height: 44, borderRadius: BorderRadius.sm },
  queueInfo: { flex: 1 },
  queueSongTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  queueArtist: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  queueDuration: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
});

export default MusicPlayerScreen;
