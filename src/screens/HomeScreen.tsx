import React, { useRef, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, Image, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { MOCK_SONGS, MOCK_ALBUMS, MOCK_ARTISTS } from '../constants';
import { Song, Album, Artist } from '../types';
import { useAppDispatch } from '../redux/store';
import { setCurrentSong, setQueue } from '../redux/slices/musicSlice';
import { addToRecentlyPlayed } from '../redux/slices/playlistSlice';

const { width } = Dimensions.get('window');
const CARD_WIDTH = 160;
const HERO_CARD_WIDTH = width - 64;

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  const playSong = useCallback((song: Song, index: number, songs: Song[]) => {
    dispatch(setQueue({ songs, index }));
    dispatch(setCurrentSong(song));
    dispatch(addToRecentlyPlayed(song));
  }, [dispatch]);

  const playFromSection = useCallback((songs: Song[]) => {
    if (songs.length > 0) {
      playSong(songs[0], 0, songs);
    }
  }, [playSong]);

  const renderSongCard = ({ item, index }: { item: Song; index: number }) => (
    <TouchableOpacity
      style={styles.songCard}
      activeOpacity={0.8}
      onPress={() => playSong(item, index, MOCK_SONGS)}
    >
      <Image source={{ uri: item.albumArt }} style={styles.songCardImage} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.songCardOverlay} />
      <TouchableOpacity style={styles.playButtonSmall} onPress={() => playSong(item, index, MOCK_SONGS)}>
        <Text style={styles.playIcon}>▶</Text>
      </TouchableOpacity>
      <View style={styles.songCardInfo}>
        <Text style={styles.songCardTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.songCardArtist} numberOfLines={1}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderAlbumCard = ({ item }: { item: Album }) => (
    <TouchableOpacity
      style={styles.albumCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('AlbumDetail', { albumId: item.id })}
    >
      <Image source={{ uri: item.coverArt }} style={styles.albumCardImage} />
      <Text style={styles.albumCardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.albumCardArtist} numberOfLines={1}>{item.artist}</Text>
    </TouchableOpacity>
  );

  const renderArtistCard = ({ item }: { item: Artist }) => (
    <TouchableOpacity
      style={styles.artistCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ArtistDetail', { artistId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.artistImage} />
      <Text style={styles.artistName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.artistGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  const SectionHeader = ({ title, onSeeAll }: { title: string; onSeeAll?: () => void }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {onSeeAll && <TouchableOpacity onPress={onSeeAll}><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>}
    </View>
  );

  const trendingSongs = [...MOCK_SONGS].sort((a, b) => b.plays - a.plays).slice(0, 8);
  const recommendedSongs = [...MOCK_SONGS].filter(s => s.isLiked);
  const newReleases = [...MOCK_SONGS].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 6);

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Evening</Text>
            <Text style={styles.headerSubtitle}>Feel Every Beat</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.profileIcon}>👤</Text>
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <TouchableOpacity style={styles.heroCard} onPress={() => playFromSection(MOCK_SONGS.slice(0, 5))}>
          <Image source={{ uri: MOCK_SONGS[0].albumArt }} style={styles.heroImage} />
          <LinearGradient colors={['transparent', 'rgba(139, 92, 246, 0.6)', 'rgba(11, 16, 32, 0.9)']} style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text style={styles.heroBadge}>🔥 Trending Now</Text>
            <Text style={styles.heroTitle}>VIBRIX Weekly</Text>
            <Text style={styles.heroSubtitle}>Your personalized weekly mix</Text>
            <TouchableOpacity style={styles.heroPlayButton} onPress={() => playFromSection(MOCK_SONGS.slice(0, 5))}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.heroPlayGradient}>
                <Text style={styles.heroPlayText}>▶  Listen Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* Recently Played */}
        <SectionHeader title="Recently Played" onSeeAll={() => {}} />
        <FlatList
          data={MOCK_SONGS.slice(0, 6)}
          renderItem={renderSongCard}
          keyExtractor={item => `recent-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Trending Songs */}
        <SectionHeader title="Trending Songs" />
        <FlatList
          data={trendingSongs}
          renderItem={renderSongCard}
          keyExtractor={item => `trending-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Recommended For You */}
        {recommendedSongs.length > 0 && (
          <>
            <SectionHeader title="Recommended For You" />
            <FlatList
              data={recommendedSongs}
              renderItem={renderSongCard}
              keyExtractor={item => `rec-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalList}
            />
          </>
        )}

        {/* Top Albums */}
        <SectionHeader title="Top Albums" />
        <FlatList
          data={MOCK_ALBUMS}
          renderItem={renderAlbumCard}
          keyExtractor={item => `album-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* Popular Artists */}
        <SectionHeader title="Popular Artists" />
        <FlatList
          data={MOCK_ARTISTS}
          renderItem={renderArtistCard}
          keyExtractor={item => `artist-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        {/* New Releases */}
        <SectionHeader title="New Releases" />
        <FlatList
          data={newReleases}
          renderItem={renderSongCard}
          keyExtractor={item => `new-${item.id}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.xl },
  greeting: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  headerSubtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginTop: 2 },
  profileButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  profileIcon: { fontSize: 22 },
  heroCard: { marginHorizontal: Spacing.xl, borderRadius: BorderRadius['2xl'], overflow: 'hidden', height: 220, marginBottom: Spacing.xl, ...Shadows.xl },
  heroImage: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%' },
  heroContent: { padding: Spacing.xl, justifyContent: 'flex-end', flex: 1 },
  heroBadge: { fontSize: Typography.fontSize.sm, color: Colors.secondary, fontWeight: Typography.fontWeight.semibold, marginBottom: Spacing.xs, letterSpacing: Typography.letterSpacing.wider },
  heroTitle: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: 4 },
  heroSubtitle: { fontSize: Typography.fontSize.base, color: Colors.text.secondary, marginBottom: Spacing.base },
  heroPlayButton: { alignSelf: 'flex-start', borderRadius: BorderRadius.full, overflow: 'hidden', ...Shadows.glow },
  heroPlayGradient: { paddingVertical: 10, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  heroPlayText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, marginBottom: Spacing.base, marginTop: Spacing.xl },
  sectionTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  seeAllText: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.medium },
  horizontalList: { paddingHorizontal: Spacing.xl, gap: 12 },
  songCard: { width: CARD_WIDTH, borderRadius: BorderRadius.lg, overflow: 'hidden', backgroundColor: Colors.surface.card, ...Shadows.sm },
  songCardImage: { width: CARD_WIDTH, height: CARD_WIDTH },
  songCardOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: '100%' },
  playButtonSmall: { position: 'absolute', top: 60, right: 8, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(139, 92, 246, 0.9)', alignItems: 'center', justifyContent: 'center' },
  playIcon: { fontSize: 12, color: Colors.text.primary },
  songCardInfo: { padding: Spacing.sm },
  songCardTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: 2 },
  songCardArtist: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  albumCard: { width: CARD_WIDTH, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  albumCardImage: { width: CARD_WIDTH, height: CARD_WIDTH, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm },
  albumCardTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: 2 },
  albumCardArtist: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  artistCard: { width: 120, alignItems: 'center' },
  artistImage: { width: 100, height: 100, borderRadius: 50, marginBottom: Spacing.sm },
  artistName: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, textAlign: 'center' },
  artistGenre: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, textAlign: 'center' },
  bottomSpacer: { height: 40 },
});

export default HomeScreen;
