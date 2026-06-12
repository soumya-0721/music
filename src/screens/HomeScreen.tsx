// VIBRIX - Premium Home Screen
// All sections, Reanimated animations, shimmer loading, parallax

import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, Image, RefreshControl,
} from 'react-native';
import Animated, {
  useSharedValue, useAnimatedScrollHandler, useAnimatedStyle,
  interpolate, withSpring, withTiming, Easing, FadeInDown, FadeInRight,
  SlideInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import {
  MOCK_SONGS, MOCK_ALBUMS, MOCK_ARTISTS, MOCK_PLAYLISTS,
  getTrendingSongs, getLatestSongs, getNewHits, get90sSongs,
  getClassicSongs, getRomanticSongs, getNightVibes, getPartyMix,
  getRoadTripSongs, getRainyMood, getChillSongs, getWorkoutMusic,
  getTeluguTopHits, getHindiTopHits, getEnglishTopHits,
} from '../constants';
import { Song, Album, Artist, Playlist } from '../types';
import { audioService } from '../utils/audioService';
import { useAppDispatch } from '../redux/store';
import { setQueue } from '../redux/slices/musicSlice';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = 170;
const CARD_HEIGHT = 200;
const HERO_HEIGHT = 300;

// ==================== SECTION CONFIGURATION ====================
interface SectionDef {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
}

const SECTIONS: SectionDef[] = [
  { id: 'latest', title: '✨ Latest Releases', subtitle: 'New music added this week', icon: '✨' },
  { id: 'trending', title: '🔥 Trending Now', subtitle: 'Most played this week', icon: '🔥' },
  { id: 'recommended', title: '🎯 Recommended For You', subtitle: 'Based on your listening', icon: '🎯' },
  { id: 'viral', title: '📈 Viral Songs', subtitle: 'Taking over the charts', icon: '📈' },
  { id: 'telugu', title: '🎤 Top Telugu Hits', subtitle: 'Best of Telugu music', icon: '🎤' },
  { id: 'hindi', title: '🎵 Top Hindi Hits', subtitle: 'Hindi chartbusters', icon: '🎵' },
  { id: 'english', title: '🎸 Top English Hits', subtitle: 'Global English favorites', icon: '🎸' },
  { id: 'new_hits', title: '🎧 New Hits 2026', subtitle: 'The freshest tracks', icon: '🎧' },
  { id: '90s', title: '🎶 90\'s Hits', subtitle: 'Nostalgic classics', icon: '🎶' },
  { id: 'classics', title: '📻 Old Classics', subtitle: 'Timeless masterpieces', icon: '📻' },
  { id: 'romantic', title: '💖 Romantic Songs', subtitle: 'Love is in the air', icon: '💖' },
  { id: 'night', title: '🌙 Night Vibes', subtitle: 'Perfect for late nights', icon: '🌙' },
  { id: 'party', title: '🎉 Party Mix', subtitle: 'Turn up the volume', icon: '🎉' },
  { id: 'road', title: '🚗 Road Trip Songs', subtitle: 'Hit the road', icon: '🚗' },
  { id: 'chill', title: '😌 Chill Songs', subtitle: 'Relax and unwind', icon: '😌' },
  { id: 'workout', title: '💪 Workout Music', subtitle: 'Power through', icon: '💪' },
  { id: 'rainy', title: '🌧 Rainy Mood', subtitle: 'Cozy rainy day vibes', icon: '🌧' },
];

// ==================== SHIMMER LOADING COMPONENT ====================
const ShimmerLoading = () => {
  const { colors } = useThemeColors();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) });
    const interval = setInterval(() => {
      opacity.value = withTiming(opacity.value === 0.3 ? 1 : 0.3, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      });
    }, 1600);
    return () => clearInterval(interval);
  }, []);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.shimmerContainer, animStyle]}>
      <View style={[styles.shimmerHero, { backgroundColor: colors.surface.card }]} />
      <View style={styles.shimmerRow}>
        {[1, 2, 3].map(i => (
          <View key={i} style={[styles.shimmerCard, { backgroundColor: colors.surface.card }]} />
        ))}
      </View>
      <View style={[styles.shimmerHeader, { backgroundColor: colors.surface.card }]} />
      <View style={styles.shimmerRow}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={[styles.shimmerCard, { backgroundColor: colors.surface.card }]} />
        ))}
      </View>
    </Animated.View>
  );
};

// ==================== HOME SCREEN COMPONENT ====================
const HomeScreen = ({ navigation }: any) => {
  const { colors } = useThemeColors();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const scrollY = useSharedValue(0);
  const headerOpacity = useSharedValue(1);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 150], [1, 0.92], 'clamp'),
  }));

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // ==================== PLAY SONG ====================
  const playSong = useCallback(async (song: Song, songsList: Song[]) => {
    const index = songsList.findIndex(s => s.id === song.id);
    if (index >= 0) {
      await audioService.setQueue(songsList, index);
      await audioService.play();
      dispatch(setQueue({ songs: songsList, index }));
    }
    navigation.navigate('MusicPlayer');
  }, [navigation, dispatch]);

  // ==================== RENDERERS ====================
  const renderSongCard = useCallback((item: Song, sectionIndex: number, songsList: Song[]) => (
    <Animated.View
      key={`${sectionIndex}-${item.id}`}
      entering={FadeInRight.delay((sectionIndex % 5) * 80).springify()}
    >
      <TouchableOpacity
        style={[styles.songCard, {
          backgroundColor: colors.surface.card,
          borderColor: colors.surface.glass,
        }]}
        activeOpacity={0.8}
        onPress={() => playSong(item, songsList)}
      >
        <Image source={{ uri: item.albumArt }} style={styles.songCardImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.songCardOverlay}
        />
        <View style={[styles.songCardBadge, { backgroundColor: 'rgba(0,0,0,0.6)' }]}>
          <Text style={styles.songCardLang}>
            {item.language === 'telugu' ? 'తెలుగు' : item.language === 'hindi' ? 'हिंदी' : 'EN'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.playBtnSmall, { backgroundColor: `${colors.secondary}E6` }]}
          onPress={() => playSong(item, songsList)}
        >
          <Text style={[styles.playIconSmall, { color: '#fff' }]}>▶</Text>
        </TouchableOpacity>
        <View style={styles.songCardInfo}>
          <Text style={[styles.songCardTitle, { color: colors.text.primary }]} numberOfLines={1}>{item.title}</Text>
          <Text style={[styles.songCardArtist, { color: colors.text.tertiary }]} numberOfLines={1}>{item.artist}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  ), [colors, playSong]);

  const renderAlbumCard = useCallback((item: Album) => (
    <Animated.View
      key={`album-${item.id}`}
      entering={FadeInDown.delay(100).springify()}
    >
      <TouchableOpacity
        style={styles.albumCard}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AlbumDetail', { albumId: item.id })}
      >
        <Image source={{ uri: item.coverArt }} style={styles.albumCardImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.5)']}
          style={styles.albumCardOverlay}
        />
        <Text style={[styles.albumCardTitle, { color: colors.text.primary }]} numberOfLines={1}>{item.title}</Text>
        <Text style={[styles.albumCardArtist, { color: colors.text.tertiary }]} numberOfLines={1}>{item.artist}</Text>
      </TouchableOpacity>
    </Animated.View>
  ), [colors, navigation]);

  const renderArtistCard = useCallback((item: Artist) => (
    <Animated.View
      key={`artist-${item.id}`}
      entering={FadeInDown.delay(50).springify()}
    >
      <TouchableOpacity
        style={styles.artistCard}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('ArtistDetail', { artistId: item.id })}
      >
        <Image source={{ uri: item.image }} style={styles.artistImage} />
        <View style={[styles.artistGlow, { backgroundColor: `${colors.secondary}20` }]} />
        <Text style={[styles.artistName, { color: colors.text.primary }]} numberOfLines={1}>{item.name}</Text>
        <Text style={[styles.artistGenre, { color: colors.text.tertiary }]}>{item.genre}</Text>
      </TouchableOpacity>
    </Animated.View>
  ), [colors, navigation]);

  const renderPlaylistCard = useCallback((item: Playlist) => (
    <TouchableOpacity
      key={`playlist-${item.id}`}
      style={[styles.albumCard, { height: CARD_WIDTH - 20 }]}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('PlaylistDetail', { playlistId: item.id })}
    >
      <Image source={{ uri: item.coverArt }} style={styles.albumCardImage} />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.5)']}
        style={styles.albumCardOverlay}
      />
      <Text style={[styles.albumCardTitle, { color: colors.text.primary, fontSize: 13 }]} numberOfLines={1}>{item.name}</Text>
      <Text style={[styles.albumCardArtist, { color: colors.text.tertiary, fontSize: 11 }]} numberOfLines={1}>{item.songCount} songs</Text>
    </TouchableOpacity>
  ), [colors, navigation]);

  const SectionHeader = ({ title, subtitle, icon }: { title: string; subtitle?: string; icon?: string }) => (
    <Animated.View
      style={styles.sectionHeader}
      entering={FadeInDown.delay(50).springify()}
    >
      <View style={styles.sectionHeaderLeft}>
        {icon && <Text style={styles.sectionIcon}>{icon}</Text>}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>{title}</Text>
          {subtitle && <Text style={[styles.sectionSubtitle, { color: colors.text.tertiary }]}>{subtitle}</Text>}
        </View>
      </View>
      <TouchableOpacity style={[styles.seeAllBtn, { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight }]}>
        <Text style={[styles.seeAllText, { color: colors.secondary }]}>See All</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  // ==================== GET SONGS FOR SECTION ====================
  const getSectionSongs = (sectionId: string): Song[] => {
    switch (sectionId) {
      case 'latest': return getLatestSongs();
      case 'trending': return getTrendingSongs();
      case 'recommended': return MOCK_SONGS.sort(() => Math.random() - 0.5).slice(0, 10);
      case 'viral': return MOCK_SONGS.filter(s => s.categories.includes('viral') || s.plays > 5000000).slice(0, 10);
      case 'telugu': return getTeluguTopHits();
      case 'hindi': return getHindiTopHits();
      case 'english': return getEnglishTopHits();
      case 'new_hits': return getNewHits();
      case '90s': return get90sSongs();
      case 'classics': return getClassicSongs();
      case 'romantic': return getRomanticSongs();
      case 'night': return getNightVibes();
      case 'party': return getPartyMix();
      case 'road': return getRoadTripSongs();
      case 'chill': return getChillSongs();
      case 'workout': return getWorkoutMusic();
      case 'rainy': return getRainyMood();
      default: return MOCK_SONGS.slice(0, 6);
    }
  };

  // ==================== GREETING ====================
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 17) return 'Good Afternoon 🌤';
    if (hour < 21) return 'Good Evening 🌅';
    return 'Good Night 🌙';
  };

  // ==================== CONTINUE LISTENING ====================
  const continueListening = MOCK_SONGS.filter(s => s.isLiked).slice(0, 6);
  const hasContinueListening = continueListening.length > 0;

  // ==================== MADE FOR YOU ====================
  const madeForYou = MOCK_SONGS.sort(() => Math.random() - 0.5).slice(0, 8);

  // ==================== WEEKLY DISCOVERY ====================
  const weeklyDiscovery = MOCK_SONGS.sort(() => Math.random() - 0.5).slice(0, 8);

  // ==================== RECENTLY PLAYED ====================
  const recentlyPlayed = MOCK_SONGS.slice(0, 6);

  // ==================== HERO SECTION ====================
  const heroAlbums = MOCK_ALBUMS.slice(0, 5).map(a => a.coverArt);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.primary }]}>
        <LinearGradient
          colors={[colors.primary, colors.gradients.primary[1], colors.surface.primary]}
          style={StyleSheet.absoluteFill}
        />
        <ShimmerLoading />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <LinearGradient
        colors={[colors.primary, colors.gradients.primary[1], colors.surface.primary]}
        style={StyleSheet.absoluteFill}
      />

      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, headerAnimatedStyle]}>
        <View style={styles.greetingRow}>
          <Text style={[styles.greetingText, { color: colors.text.primary }]}>{getGreeting()}</Text>
          <TouchableOpacity style={[styles.profileBtn, { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight }]}>
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Main Scrollable Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.secondary}
            colors={[colors.secondary]}
          />
        }
      >
        {/* ===== HERO SECTION ===== */}
        <Animated.View
          style={styles.heroSection}
          entering={FadeInDown.duration(600).springify()}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600' }}
            style={styles.heroBg}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.2)', colors.primary]}
            style={styles.heroOverlay}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroBadge}>🎵 Premium 2026</Text>
            <Text style={styles.heroTitle}>VIBRIX</Text>
            <Text style={styles.heroSubtitle}>Feel Every Beat • Telugu • Hindi • English</Text>
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.heroPlayBtn}
                onPress={() => {
                  const songs = getTrendingSongs();
                  if (songs.length > 0) {
                    audioService.setQueue(songs, 0);
                    audioService.play();
                    dispatch(setQueue({ songs, index: 0 }));
                    navigation.navigate('MusicPlayer');
                  }
                }}
              >
                <LinearGradient
                  colors={[colors.secondary, `${colors.secondary}CC`]}
                  style={styles.heroPlayGradient}
                >
                  <Text style={styles.heroPlayText}>▶  Listen Now</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.heroShuffleBtn, { backgroundColor: colors.surface.glassStrong }]}>
                <Text style={[styles.heroShuffleText, { color: colors.text.primary }]}>🔀 Shuffle</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Floating album artworks */}
          <View style={styles.floatingAlbums}>
            {heroAlbums.slice(0, 3).map((art, i) => (
              <Image
                key={i}
                source={{ uri: art }}
                style={[
                  styles.floatingAlbum,
                  {
                    right: 10 + i * 40,
                    transform: [{ rotate: `${-8 + i * 8}deg` }],
                  },
                ]}
              />
            ))}
          </View>
        </Animated.View>

        {/* ===== QUICK ACCESS CHIPS ===== */}
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsContainer}>
            {['🎤 Telugu', '🎵 Hindi', '🎸 English', '💖 Romantic', '🎉 Party', '😌 Chill', '💪 Workout', '🌙 Night'].map((chip, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.chip, { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight }]}
                activeOpacity={0.7}
              >
                <Text style={[styles.chipText, { color: colors.text.secondary }]}>{chip}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* ===== CONTINUE LISTENING ===== */}
        {hasContinueListening && (
          <View>
            <SectionHeader title="🔄 Continue Listening" subtitle="Pick up where you left off" icon="🔄" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
              {continueListening.map((song, i) => renderSongCard(song, 0, continueListening))}
            </ScrollView>
          </View>
        )}

        {/* ===== RECENTLY PLAYED ===== */}
        <View>
          <SectionHeader title="⏱️ Recently Played" subtitle="Your recent listens" icon="⏱️" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {recentlyPlayed.map((song, i) => renderSongCard(song, -1, recentlyPlayed))}
          </ScrollView>
        </View>

        {/* ===== MADE FOR YOU ===== */}
        <View>
          <SectionHeader title="🎯 Made For You" subtitle="Personalized just for you" icon="🎯" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {madeForYou.map((song, i) => renderSongCard(song, -2, madeForYou))}
          </ScrollView>
        </View>

        {/* ===== WEEKLY DISCOVERY ===== */}
        <View>
          <SectionHeader title="🔍 Weekly Discovery" subtitle="New finds this week" icon="🔍" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {weeklyDiscovery.map((song, i) => renderSongCard(song, -3, weeklyDiscovery))}
          </ScrollView>
        </View>

        {/* ===== POPULAR PLAYLISTS ===== */}
        <View>
          <SectionHeader title="📋 Popular Playlists" subtitle="Curated for every mood" icon="📋" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
            {MOCK_PLAYLISTS.map(renderPlaylistCard)}
          </ScrollView>
        </View>

        {/* ===== TOP ALBUMS ===== */}
        <SectionHeader title="🏆 Top Albums" subtitle="Most streamed this week" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {MOCK_ALBUMS.slice(0, 8).map(renderAlbumCard)}
        </ScrollView>

        {/* ===== POPULAR ARTISTS ===== */}
        <SectionHeader title="⭐ Popular Artists" subtitle="Follow your favorites" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {MOCK_ARTISTS.map(renderArtistCard)}
        </ScrollView>

        {/* ===== DYNAMIC MUSIC SECTIONS ===== */}
        {SECTIONS.map((section, sIndex) => {
          const songs = getSectionSongs(section.id);
          if (songs.length === 0) return null;
          return (
            <View key={section.id}>
              <SectionHeader title={section.title} subtitle={section.subtitle} icon={section.icon} />
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                {songs.slice(0, 8).map((song) => renderSongCard(song, sIndex + SECTIONS.length, songs))}
              </ScrollView>
            </View>
          );
        })}

        {/* ===== BOTTOM SPACER ===== */}
        <View style={{ height: 140 }} />
      </Animated.ScrollView>
    </View>
  );
};

// ==================== STYLES ====================
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  animatedHeader: {
    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100,
    paddingTop: 50,
  },
  greetingRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm,
  },
  greetingText: { fontSize: 22, fontWeight: '800' },
  profileBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },

  // Shimmer
  shimmerContainer: { padding: Spacing.xl, paddingTop: 60, gap: 16 },
  shimmerHero: { height: HERO_HEIGHT, borderRadius: BorderRadius['2xl'], marginBottom: 8 },
  shimmerRow: { flexDirection: 'row', gap: 10 },
  shimmerCard: { width: CARD_WIDTH, height: CARD_HEIGHT, borderRadius: BorderRadius['2xl'] },
  shimmerHeader: { height: 24, width: 200, borderRadius: BorderRadius.sm, marginTop: 16 },

  // Hero
  heroSection: {
    height: HERO_HEIGHT,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    marginHorizontal: Spacing.xl,
    marginTop: 50,
    ...Shadows['2xl'],
  },
  heroBg: { position: 'absolute', width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%' },
  heroContent: { flex: 1, justifyContent: 'flex-end', padding: Spacing.xl, zIndex: 2 },
  heroBadge: { fontSize: 11, color: '#fff', fontWeight: '700', letterSpacing: 2, marginBottom: 6, opacity: 0.9 },
  heroTitle: { fontSize: 42, fontWeight: '900', color: '#fff', letterSpacing: -1, marginBottom: 4 },
  heroSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: Spacing.base },
  heroActions: { flexDirection: 'row', gap: 10 },
  heroPlayBtn: { borderRadius: BorderRadius.full, overflow: 'hidden', ...Shadows.glow },
  heroPlayGradient: { paddingVertical: 12, paddingHorizontal: 28, alignItems: 'center', justifyContent: 'center' },
  heroPlayText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  heroShuffleBtn: { paddingVertical: 12, paddingHorizontal: 20, borderRadius: BorderRadius.full },
  heroShuffleText: { fontSize: 14, fontWeight: '600' },
  floatingAlbums: { position: 'absolute', top: 20, right: 0 },
  floatingAlbum: {
    width: 56, height: 56, borderRadius: BorderRadius.base,
    position: 'absolute', borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)',
    ...Shadows.glow,
  },

  // Quick chips
  chipsContainer: { paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm, gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 18, borderRadius: BorderRadius.full, borderWidth: 1, marginRight: 8 },
  chipText: { fontSize: 13, fontWeight: '600' },

  // Section header
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.xl, marginTop: Spacing.lg, marginBottom: Spacing.sm,
  },
  sectionHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  sectionIcon: { fontSize: 18 },
  sectionTitle: { fontSize: 18, fontWeight: '800' },
  sectionSubtitle: { fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 1 },
  seeAllBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: BorderRadius.full, borderWidth: 1 },
  seeAllText: { fontSize: 11, fontWeight: '700' },

  // Horizontal list
  horizontalList: { paddingHorizontal: Spacing.xl, gap: 10, paddingBottom: 4 },

  // Song card
  songCard: {
    width: CARD_WIDTH, height: CARD_HEIGHT,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    borderWidth: 1,
    ...Shadows.md,
  },
  songCardImage: { width: CARD_WIDTH, height: CARD_HEIGHT, position: 'absolute' },
  songCardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%' },
  songCardBadge: {
    position: 'absolute', top: 8, left: 8,
    paddingHorizontal: 8, paddingVertical: 3,
    borderRadius: BorderRadius.sm,
  },
  songCardLang: { fontSize: 9, color: '#fff', fontWeight: '800', letterSpacing: 0.5 },
  playBtnSmall: {
    position: 'absolute', top: 80, right: 8,
    width: 34, height: 34, borderRadius: 17,
    alignItems: 'center', justifyContent: 'center',
    ...Shadows.glow,
  },
  playIconSmall: { fontSize: 12, marginLeft: 2 },
  songCardInfo: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: Spacing.sm },
  songCardTitle: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  songCardArtist: { fontSize: 11 },

  // Album card
  albumCard: {
    width: CARD_WIDTH - 10, height: CARD_WIDTH - 10,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadows.md,
  },
  albumCardImage: { width: '100%', height: '100%', position: 'absolute' },
  albumCardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%' },
  albumCardTitle: { position: 'absolute', bottom: 28, left: 10, fontSize: 14, fontWeight: '700' },
  albumCardArtist: { position: 'absolute', bottom: 10, left: 10, fontSize: 11 },

  // Artist card
  artistCard: { width: 110, alignItems: 'center', paddingVertical: 4 },
  artistImage: { width: 90, height: 90, borderRadius: 45, marginBottom: 8 },
  artistGlow: { position: 'absolute', width: 90, height: 90, borderRadius: 45, top: 4 },
  artistName: { fontSize: 14, fontWeight: '700', textAlign: 'center' },
  artistGenre: { fontSize: 11, textAlign: 'center', marginTop: 2 },
});

export default HomeScreen;
