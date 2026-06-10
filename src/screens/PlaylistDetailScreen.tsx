import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { MOCK_PLAYLISTS, MOCK_SONGS } from '../constants';
import { setQueue, setCurrentSong } from '../redux/slices/musicSlice';
import { toggleLikeSong } from '../redux/slices/playlistSlice';

const PlaylistDetailScreen = ({ route, navigation }: any) => {
  const dispatch = useAppDispatch();
  const { playlistId } = route.params;
  const playlists = useAppSelector(state => state.playlist.playlists);
  const likedSongs = useAppSelector(state => state.playlist.likedSongs);

  const playlist = playlists.find(p => p.id === playlistId) || MOCK_PLAYLISTS.find(p => p.id === playlistId);
  const songs = playlist?.songs || MOCK_SONGS;

  if (!playlist) {
    return (
      <LinearGradient colors={['#0B1020', '#1A1040']} style={styles.container}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📁</Text>
          <Text style={styles.emptyText}>Playlist not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const playSong = (index: number) => {
    dispatch(setQueue({ songs, index }));
    dispatch(setCurrentSong(songs[index]));
  };

  const playAll = () => playSong(0);

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        </View>

        {/* Playlist Header */}
        <View style={styles.playlistHeader}>
          <Image
            source={{ uri: playlist.coverArt || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' }}
            style={styles.playlistArt}
          />
          <Text style={styles.playlistName}>{playlist.name}</Text>
          {playlist.description && (
            <Text style={styles.playlistDesc}>{playlist.description}</Text>
          )}
          <View style={styles.playlistMeta}>
            <Text style={styles.metaText}>{playlist.createdBy}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.metaText}>{playlist.songCount} songs</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.shuffleButton}>
              <Text style={styles.shuffleIcon}>🔀</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playAllButton} onPress={playAll}>
              <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.playAllGradient}>
                <Text style={styles.playAllText}>▶ Play All</Text>
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
          {songs.map((song, index) => {
            const isLiked = likedSongs.some(s => s.id === song.id);
            return (
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
                  <Text style={styles.songArtist} numberOfLines={1}>{song.artist}</Text>
                </View>
                <TouchableOpacity
                  style={styles.likeButton}
                  onPress={() => dispatch(toggleLikeSong(song))}
                >
                  <Text style={[styles.likeIcon, isLiked && { color: Colors.heart }]}>
                    {isLiked ? '❤️' : '🤍'}
                  </Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
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
  header: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: Spacing.sm },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  backIcon: { fontSize: 28, color: Colors.text.primary, marginTop: -2 },
  playlistHeader: { alignItems: 'center', paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  playlistArt: { width: 200, height: 200, borderRadius: BorderRadius.xl, marginBottom: Spacing.lg, ...Shadows.xl },
  playlistName: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, textAlign: 'center', marginBottom: 4 },
  playlistDesc: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, textAlign: 'center', marginBottom: Spacing.sm },
  playlistMeta: { flexDirection: 'row', gap: 6, marginBottom: Spacing.lg },
  metaText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  metaDot: { fontSize: Typography.fontSize.sm, color: Colors.text.muted },
  actions: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  shuffleButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  shuffleIcon: { fontSize: 18 },
  playAllButton: { borderRadius: BorderRadius.full, overflow: 'hidden', ...Shadows.glow },
  playAllGradient: { paddingVertical: 12, paddingHorizontal: Spacing.xl, alignItems: 'center', justifyContent: 'center' },
  playAllText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  actionIcon: { fontSize: 22, color: Colors.text.secondary, padding: 8 },
  songsContainer: { paddingHorizontal: Spacing.xl },
  songItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.sm },
  songIndex: { width: 24, fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, textAlign: 'center' },
  songImage: { width: 44, height: 44, borderRadius: BorderRadius.sm },
  songInfo: { flex: 1 },
  songTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  songArtist: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
  likeButton: { padding: 8 },
  likeIcon: { fontSize: 16 },
});

export default PlaylistDetailScreen;
