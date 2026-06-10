import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppSelector } from '../redux/store';

const LibraryScreen = ({ navigation }: any) => {
  const likedSongs = useAppSelector(state => state.playlist.likedSongs);
  const playlists = useAppSelector(state => state.playlist.playlists);
  const recentlyPlayed = useAppSelector(state => state.playlist.recentlyPlayed);

  const librarySections = [
    { id: 'liked', title: 'Liked Songs', icon: '❤️', count: likedSongs.length, color: '#FF6B6B', screen: 'PlaylistDetail' as const },
    { id: 'downloaded', title: 'Downloaded', icon: '⬇️', count: 0, color: '#10B981', screen: 'PlaylistDetail' as const },
    { id: 'albums', title: 'Albums', icon: '💿', count: 5, color: '#8B5CF6', screen: 'PlaylistDetail' as const },
    { id: 'artists', title: 'Artists', icon: '🎤', count: 7, color: '#3B82F6', screen: 'PlaylistDetail' as const },
    { id: 'history', title: 'History', icon: '🕐', count: recentlyPlayed.length, color: '#F59E0B', screen: 'PlaylistDetail' as const },
  ];

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <Text style={styles.headerSubtitle}>{playlists.length} playlists</Text>

        {/* Library Sections */}
        <View style={styles.sectionsGrid}>
          {librarySections.map((section) => (
            <TouchableOpacity key={section.id} style={styles.sectionCard} activeOpacity={0.7}>
              <View style={[styles.sectionIconContainer, { backgroundColor: `${section.color}20` }]}>
                <Text style={styles.sectionIcon}>{section.icon}</Text>
              </View>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionCount}>{section.count} items</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recently Played */}
        {recentlyPlayed.length > 0 && (
          <>
            <Text style={styles.recentTitle}>Recently Played</Text>
            {recentlyPlayed.slice(0, 5).map((song) => (
              <TouchableOpacity key={song.id} style={styles.recentItem} activeOpacity={0.7}>
                <Image source={{ uri: song.albumArt }} style={styles.recentImage} />
                <View style={styles.recentInfo}>
                  <Text style={styles.recentSongTitle} numberOfLines={1}>{song.title}</Text>
                  <Text style={styles.recentArtist} numberOfLines={1}>{song.artist}</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <Text style={styles.moreIcon}>⋯</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Your Playlists */}
        <Text style={styles.recentTitle}>Your Playlists</Text>
        {playlists.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🎵</Text>
            <Text style={styles.emptyText}>Create your first playlist</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('CreatePlaylist')}
            >
              <Text style={styles.createButtonText}>+ Create Playlist</Text>
            </TouchableOpacity>
          </View>
        ) : (
          playlists.map((playlist) => (
            <TouchableOpacity
              key={playlist.id}
              style={styles.playlistItem}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('PlaylistDetail', { playlistId: playlist.id })}
            >
              <Image
                source={{ uri: playlist.coverArt || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' }}
                style={styles.playlistImage}
              />
              <View style={styles.playlistInfo}>
                <Text style={styles.playlistName} numberOfLines={1}>{playlist.name}</Text>
                <Text style={styles.playlistDetails}>{playlist.songCount} songs • {playlist.isPublic ? 'Public' : 'Private'}</Text>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreIcon}>⋯</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100, paddingHorizontal: Spacing.xl },
  headerTitle: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, paddingTop: 60 },
  headerSubtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginTop: 2, marginBottom: Spacing.xl },
  sectionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Spacing.xl },
  sectionCard: { width: '47%', backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: Colors.surface.glass },
  sectionIconContainer: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginBottom: Spacing.sm },
  sectionIcon: { fontSize: 22 },
  sectionTitle: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: 2 },
  sectionCount: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  recentTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.base, marginTop: Spacing.sm },
  recentItem: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, padding: Spacing.sm, backgroundColor: Colors.surface.glass, borderRadius: BorderRadius.md },
  recentImage: { width: 52, height: 52, borderRadius: BorderRadius.sm },
  recentInfo: { flex: 1, marginLeft: Spacing.sm },
  recentSongTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  recentArtist: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
  moreButton: { padding: 8 },
  moreIcon: { fontSize: 20, color: Colors.text.tertiary },
  emptyState: { alignItems: 'center', paddingVertical: Spacing['2xl'], backgroundColor: Colors.surface.glass, borderRadius: BorderRadius.lg, marginTop: Spacing.sm },
  emptyIcon: { fontSize: 48, marginBottom: Spacing.base },
  emptyText: { fontSize: Typography.fontSize.md, color: Colors.text.tertiary, marginBottom: Spacing.base },
  createButton: { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderRadius: BorderRadius.full, paddingVertical: 10, paddingHorizontal: Spacing.xl, borderWidth: 1, borderColor: Colors.secondary },
  createButtonText: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
  playlistItem: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, padding: Spacing.sm, backgroundColor: Colors.surface.glass, borderRadius: BorderRadius.md },
  playlistImage: { width: 52, height: 52, borderRadius: BorderRadius.sm },
  playlistInfo: { flex: 1, marginLeft: Spacing.sm },
  playlistName: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  playlistDetails: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
});

export default LibraryScreen;
