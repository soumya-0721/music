import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { MOCK_ALBUMS, MOCK_SONGS } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setQueue, setCurrentSong } from '../redux/slices/musicSlice';
import { toggleLikeSong } from '../redux/slices/playlistSlice';

const AlbumDetailScreen = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();
  const { albumId } = route.params;
  const likedSongs = useAppSelector(state => state.playlist.likedSongs);
  const album = MOCK_ALBUMS.find(a => a.id === albumId);

  if (!album) {
    return (
      <LinearGradient colors={['#0B1020', '#1A1040']} style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💿</Text>
          <Text style={styles.emptyText}>Album not found</Text>
        </View>
      </LinearGradient>
    );
  }

  const albumSongs = MOCK_SONGS.filter(s => s.albumId === album.id);
  const playSong = (index: number) => {
    dispatch(setQueue({ songs: albumSongs, index }));
    dispatch(setCurrentSong(albumSongs[index]));
  };

  const playAll = () => playSong(0);

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Album Header */}
        <View style={styles.albumHeader}>
          <Image source={{ uri: album.coverArt }} style={styles.albumArt} />
          <Text style={styles.albumTitle}>{album.title}</Text>
          <Text style={styles.albumArtist}>{album.artist}</Text>
          <View style={styles.albumMeta}>
            <Text style={styles.metaText}>{album.releaseYear}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{album.songCount} songs</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{album.genre}</Text>
          </View>
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.playAllButton} onPress={playAll}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.playGradient}>
                <Text style={styles.playText}>▶ Play All</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionIcon}>⬇️</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.actionIcon}>⋯</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Songs */}
        <View style={styles.songsContainer}>
          {albumSongs.map((song, index) => {
            const isLiked = likedSongs.some(s => s.id === song.id);
            return (
              <TouchableOpacity
                key={song.id}
                style={styles.songItem}
                onPress={() => playSong(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.songIndex}>{index + 1}</Text>
                <View style={styles.songInfo}>
                  <Text style={styles.songTitle} numberOfLines={1}>{song.title}</Text>
                </View>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => dispatch(toggleLikeSong(song))}
                >
                  <Text style={{ fontSize: 16 }}>{isLiked ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
                <Text style={styles.songDuration}>{formatDuration(song.duration)}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
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
  albumHeader: { alignItems: 'center', paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  albumArt: { width: 220, height: 220, borderRadius: BorderRadius.xl, marginBottom: Spacing.lg, ...Shadows.xl },
  albumTitle: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, textAlign: 'center', marginBottom: 4 },
  albumArtist: { fontSize: Typography.fontSize.md, color: Colors.secondary, marginBottom: Spacing.sm },
  albumMeta: { flexDirection: 'row', gap: 6, marginBottom: Spacing.lg },
  metaText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  metaDot: { fontSize: Typography.fontSize.sm, color: Colors.text.muted },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  playAllButton: { borderRadius: BorderRadius.full, overflow: 'hidden', ...Shadows.glow },
  playGradient: { paddingVertical: 12, paddingHorizontal: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  playText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  actionIcon: { fontSize: 22, color: Colors.text.secondary, padding: 8 },
  songsContainer: { paddingHorizontal: Spacing.xl },
  songItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.sm },
  songIndex: { width: 24, fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, textAlign: 'center' },
  songInfo: { flex: 1 },
  songTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  likeButton: { padding: 8 },
  songDuration: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
});

export default AlbumDetailScreen;
