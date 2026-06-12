// VIBRIX - Premium Mini Player
// Slide-up mini player with real progress, play/pause, and glassmorphism design

import React, { useRef, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedStyle, withSpring, withTiming, Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors, BorderRadius, Spacing, Shadows } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { playPause, setCurrentTime } from '../../redux/slices/musicSlice';
import { audioService } from '../../utils/audioService';

const { width } = Dimensions.get('window');

const MiniPlayer = ({ onPress }: { onPress?: () => void }) => {
  const { colors } = useThemeColors();
  const dispatch = useAppDispatch();
  const { currentSong, isPlaying, isMiniPlayerVisible, currentTime, duration } =
    useAppSelector(state => state.music);

  const translateY = useSharedValue(150);
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  // Progress tracking
  const progress = duration > 0 ? currentTime / duration : 0;

  // Animated slide-up
  useEffect(() => {
    if (isMiniPlayerVisible && currentSong) {
      translateY.value = withSpring(0, { damping: 15, stiffness: 120 });
      scale.value = withSpring(1, { damping: 15, stiffness: 120 });
      opacity.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
    } else {
      translateY.value = withSpring(150, { damping: 15, stiffness: 120 });
      scale.value = withSpring(0.9, { damping: 15, stiffness: 120 });
      opacity.value = withTiming(0, { duration: 200 });
    }
  }, [isMiniPlayerVisible, currentSong]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const handlePlayPause = () => {
    audioService.togglePlayPause();
    dispatch(playPause());
  };

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        animatedStyle,
        {
          backgroundColor: colors.surface.elevated,
          borderColor: colors.surface.glassLight,
        },
      ]}
    >
      <LinearGradient
        colors={[`${colors.secondary}08`, 'transparent']}
        style={StyleSheet.absoluteFill}
      />
      <TouchableOpacity style={styles.inner} onPress={onPress} activeOpacity={0.9}>
        {/* Progress bar */}
        <View style={[styles.progressBar, { backgroundColor: colors.text.muted }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.secondary, width: `${progress * 100}%` },
            ]}
          />
        </View>

        <View style={styles.content}>
          <Image source={{ uri: currentSong.albumArt }} style={styles.artwork} />
          <View style={styles.info}>
            <Text style={[styles.title, { color: colors.text.primary }]} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={[styles.artist, { color: colors.text.tertiary }]} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>

          <View style={styles.controls}>
            <TouchableOpacity
              style={[styles.playButton, { backgroundColor: `${colors.secondary}20` }]}
              onPress={handlePlayPause}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={[styles.playIcon, { color: colors.secondary }]}>
                {isPlaying ? '⏸' : '▶'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Time display */}
        <View style={styles.timeRow}>
          <Text style={[styles.timeText, { color: colors.text.muted }]}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 16,
    right: 16,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    overflow: 'hidden',
    ...Shadows.lg,
    zIndex: 100,
  },
  inner: {
    overflow: 'hidden',
  },
  progressBar: {
    height: 2,
    width: '100%',
  },
  progressFill: {
    height: '100%',
    borderRadius: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.sm,
    paddingBottom: 4,
    gap: 10,
  },
  artwork: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  artist: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 1,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    fontSize: 16,
  },
  timeRow: {
    paddingHorizontal: Spacing.sm,
    paddingBottom: 6,
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default MiniPlayer;
