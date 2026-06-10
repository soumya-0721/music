import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { MOCK_PLAYLISTS } from '../constants';

const PlaylistTabScreen = ({ navigation }: any) => {
  const playlists = useAppSelector(state => state.playlist.playlists);
  const dispatch = useAppDispatch();

  const allPlaylists = playlists.length > 0 ? playlists : MOCK_PLAYLISTS;

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Playlists</Text>
            <Text style={styles.headerSubtitle}>{allPlaylists.length} playlists</Text>
          </View>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('CreatePlaylist')}
          >
            <Text style={styles.createIcon}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Playlist */}
        {allPlaylists.length > 0 && (
          <TouchableOpacity
            style={styles.featuredCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('PlaylistDetail', { playlistId: allPlaylists[0].id })}
          >
            <Image
              source={{ uri: allPlaylists[0].coverArt || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' }}
              style={styles.featuredImage}
            />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.featuredOverlay} />
            <View style={styles.featuredContent}>
              <Text style={styles.featuredBadge}>Featured</Text>
              <Text style={styles.featuredTitle} numberOfLines={1}>{allPlaylists[0].name}</Text>
              <Text style={styles.featuredDesc} numberOfLines={1}>{allPlaylists[0].description}</Text>
              <Text style={styles.featuredCount}>{allPlaylists[0].songCount} songs</Text>
            </View>
          </TouchableOpacity>
        )}

        {/* All Playlists */}
        <Text style={styles.sectionTitle}>All Playlists</Text>
        {allPlaylists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.playlistCard}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('PlaylistDetail', { playlistId: playlist.id })}
          >
            <Image
              source={{ uri: playlist.coverArt || 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400' }}
              style={styles.playlistImage}
            />
            <View style={styles.playlistInfo}>
              <Text style={styles.playlistName} numberOfLines={1}>{playlist.name}</Text>
              <Text style={styles.playlistDesc} numberOfLines={1}>{playlist.description || 'No description'}</Text>
              <View style={styles.playlistMeta}>
                <Text style={styles.playlistCount}>{playlist.songCount} songs</Text>
                <View style={styles.playlistTag}>
                  <Text style={styles.playlistTagText}>{playlist.isPublic ? 'Public' : 'Private'}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.moreButton}>
              <Text style={styles.moreIcon}>⋯</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing.xl },
  headerTitle: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  headerSubtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginTop: 2 },
  createButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(139, 92, 246, 0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.secondary },
  createIcon: { fontSize: 24, color: Colors.secondary, fontWeight: Typography.fontWeight.bold },
  featuredCard: { height: 200, borderRadius: BorderRadius['2xl'], overflow: 'hidden', marginBottom: Spacing.xl, ...Shadows.xl },
  featuredImage: { width: '100%', height: '100%', position: 'absolute' },
  featuredOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%' },
  featuredContent: { padding: Spacing.xl, justifyContent: 'flex-end', flex: 1 },
  featuredBadge: { fontSize: Typography.fontSize.xs, color: Colors.secondary, fontWeight: Typography.fontWeight.semibold, letterSpacing: Typography.letterSpacing.wider, marginBottom: 4, textTransform: 'uppercase' },
  featuredTitle: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: 2 },
  featuredDesc: { fontSize: Typography.fontSize.base, color: Colors.text.secondary, marginBottom: 4 },
  featuredCount: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  sectionTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.base },
  playlistCard: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, padding: Spacing.sm, backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.surface.glass },
  playlistImage: { width: 64, height: 64, borderRadius: BorderRadius.md },
  playlistInfo: { flex: 1, marginLeft: Spacing.sm },
  playlistName: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: 2 },
  playlistDesc: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginBottom: 4 },
  playlistMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  playlistCount: { fontSize: Typography.fontSize.xs, color: Colors.text.tertiary },
  playlistTag: { backgroundColor: 'rgba(139, 92, 246, 0.15)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  playlistTagText: { fontSize: Typography.fontSize.xs, color: Colors.secondary },
  moreButton: { padding: 8 },
  moreIcon: { fontSize: 20, color: Colors.text.tertiary },
});

export default PlaylistTabScreen;
