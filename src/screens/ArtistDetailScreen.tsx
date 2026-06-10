import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { MOCK_ARTISTS, MOCK_SONGS } from '../constants';
import { useAppDispatch } from '../redux/store';
import { setQueue, setCurrentSong } from '../redux/slices/musicSlice';

const ArtistDetailScreen = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();
  const { artistId } = route.params;
  const artist = MOCK_ARTISTS.find(a => a.id === artistId);

  if (!artist) {
    return (
      <LinearGradient colors={['#0B1020', '#1A1040']} style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>🎤</Text>
          <Text style={styles.emptyText}>Artist not found</Text>
        </View>
      </LinearGradient>
    );
  }

  const artistSongs = MOCK_SONGS.filter(s => s.artistId === artist.id);
  const playSong = (index: number) => {
    dispatch(setQueue({ songs: artistSongs, index }));
    dispatch(setCurrentSong(artistSongs[index]));
  };

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Artist Info */}
        <View style={styles.artistHeader}>
          <Image source={{ uri: artist.image }} style={styles.artistImage} />
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.artistGenre}>{artist.genre}</Text>
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatNumber(artist.monthlyListeners)}</Text>
              <Text style={styles.statLabel}>Monthly Listeners</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{formatNumber(artist.followers)}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.playButton}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.playGradient}>
                <Text style={styles.playText}>▶ Play</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Songs */}
        <Text style={styles.sectionTitle}>Popular</Text>
        {artistSongs.map((song, index) => (
          <TouchableOpacity
            key={song.id}
            style={styles.songItem}
            onPress={() => playSong(index)}
            activeOpacity={0.7}
          >
            <Text style={styles.songIndex}>{index + 1}</Text>
            <Image source={{ uri: song.albumArt }} style={styles.songImage} />
            <View style={styles.songInfo}>
              <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
              <Text style={styles.songPlays}>{formatNumber(song.plays)} plays</Text>
            </View>
            <Text style={styles.songDuration}>{formatDuration(song.duration)}</Text>
          </TouchableOpacity>
        ))}

        {/* Albums */}
        <Text style={styles.sectionTitle}>Albums</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.albumScroll}>
          {artist.albums.map((album) => (
            <TouchableOpacity
              key={album.id}
              style={styles.albumCard}
              onPress={() => navigation.navigate('AlbumDetail', { albumId: album.id })}
            >
              <Image source={{ uri: album.coverArt }} style={styles.albumImage} />
              <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
              <Text style={styles.albumYear}>{album.releaseYear}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const formatNumber = (num: number) => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
  return num.toString();
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyIcon: { fontSize: 64, marginBottom: Spacing.base },
  emptyText: { fontSize: Typography.fontSize.lg, color: Colors.text.tertiary },
  header: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.sm },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  backIcon: { fontSize: 28, color: Colors.text.primary, marginTop: -2 },
  artistHeader: { alignItems: 'center', paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  artistImage: { width: 180, height: 180, borderRadius: 90, marginBottom: Spacing.lg, ...Shadows.glow },
  artistName: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: 4 },
  artistGenre: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginBottom: Spacing.lg },
  statsRow: { flexDirection: 'row', gap: 40, marginBottom: Spacing.lg },
  stat: { alignItems: 'center' },
  statValue: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  statLabel: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
  actionRow: { flexDirection: 'row', gap: Spacing.base },
  playButton: { borderRadius: BorderRadius.full, overflow: 'hidden', ...Shadows.glow },
  playGradient: { paddingVertical: 12, paddingHorizontal: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  playText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  followButton: { paddingVertical: 12, paddingHorizontal: Spacing.xl, borderRadius: BorderRadius.full, backgroundColor: Colors.surface.glass, borderWidth: 1, borderColor: Colors.surface.glassLight },
  followText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.secondary },
  sectionTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, paddingHorizontal: Spacing.xl, marginBottom: Spacing.base, marginTop: Spacing.xl },
  songItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingVertical: Spacing.sm, gap: Spacing.sm },
  songIndex: { width: 24, fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, textAlign: 'center' },
  songImage: { width: 44, height: 44, borderRadius: BorderRadius.sm },
  songInfo: { flex: 1 },
  songTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  songPlays: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
  songDuration: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  albumScroll: { paddingLeft: Spacing.xl, marginTop: Spacing.sm },
  albumCard: { width: 150, marginRight: 12 },
  albumImage: { width: 150, height: 150, borderRadius: BorderRadius.base, marginBottom: 8 },
  albumTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  albumYear: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
});

export default ArtistDetailScreen;
