import React, { useState, useCallback } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, Image, FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { MOCK_GENRES, MOCK_ARTISTS, MOCK_ALBUMS, TRENDING_SEARCHES } from '../constants';

const { width } = Dimensions.get('window');

const ExploreScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const genreColors = ['#8B5CF6', '#FF6B6B', '#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#EF4444', '#8B5CF6'];

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Text style={styles.headerTitle}>Explore</Text>
        <Text style={styles.headerSubtitle}>Discover new music</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs, artists, albums..."
            placeholderTextColor={Colors.text.muted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)}
            onBlur={() => setIsSearching(false)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Trending Searches */}
        {!isSearching && (
          <>
            <Text style={styles.sectionTitle}>Trending Searches</Text>
            <View style={styles.trendingContainer}>
              {TRENDING_SEARCHES.map((search, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.trendingChip}
                  onPress={() => setSearchQuery(search)}
                >
                  <Text style={styles.trendingIcon}>🔥</Text>
                  <Text style={styles.trendingText}>{search}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {/* Genres */}
        <Text style={styles.sectionTitle}>Browse Genres</Text>
        <View style={styles.genresGrid}>
          {MOCK_GENRES.map((genre, index) => (
            <TouchableOpacity key={genre.id} style={styles.genreCard} activeOpacity={0.8}>
              <LinearGradient
                colors={[genreColors[index % genreColors.length], 'rgba(0,0,0,0.4)']}
                style={styles.genreGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.genreName}>{genre.name}</Text>
                <Text style={styles.genreCount}>{genre.songCount} songs</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Artists */}
        <Text style={styles.sectionTitle}>Popular Artists</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.artistScroll}>
          {MOCK_ARTISTS.slice(0, 6).map((artist) => (
            <TouchableOpacity
              key={artist.id}
              style={styles.artistCard}
              onPress={() => navigation.navigate('ArtistDetail', { artistId: artist.id })}
            >
              <Image source={{ uri: artist.image }} style={styles.artistImage} />
              <Text style={styles.artistName} numberOfLines={1}>{artist.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Top Albums */}
        <Text style={styles.sectionTitle}>Top Albums</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.albumScroll}>
          {MOCK_ALBUMS.map((album) => (
            <TouchableOpacity
              key={album.id}
              style={styles.albumCard}
              onPress={() => navigation.navigate('AlbumDetail', { albumId: album.id })}
            >
              <Image source={{ uri: album.coverArt }} style={styles.albumImage} />
              <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
              <Text style={styles.albumArtist} numberOfLines={1}>{album.artist}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  headerTitle: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, paddingHorizontal: Spacing.xl, paddingTop: 60 },
  headerSubtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.xl, backgroundColor: Colors.inputBg, borderRadius: BorderRadius.base, paddingHorizontal: Spacing.base, borderWidth: 1, borderColor: Colors.inputBorder, marginBottom: Spacing.xl },
  searchIcon: { fontSize: 18, marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: Typography.fontSize.md, color: Colors.text.primary },
  clearIcon: { fontSize: 16, color: Colors.text.tertiary, padding: 4 },
  sectionTitle: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, paddingHorizontal: Spacing.xl, marginBottom: Spacing.base, marginTop: Spacing.lg },
  trendingContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.xl, gap: 8, marginBottom: Spacing.sm },
  trendingChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.glass, paddingVertical: 10, paddingHorizontal: Spacing.base, borderRadius: BorderRadius.full, gap: 6, borderWidth: 1, borderColor: Colors.surface.glassLight },
  trendingIcon: { fontSize: 12 },
  trendingText: { fontSize: Typography.fontSize.sm, color: Colors.text.secondary },
  genresGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.xl, gap: 10 },
  genreCard: { width: (width - 52) / 2, height: 80, borderRadius: BorderRadius.base, overflow: 'hidden' },
  genreGradient: { flex: 1, padding: Spacing.base, justifyContent: 'flex-end' },
  genreName: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  genreCount: { fontSize: Typography.fontSize.sm, color: Colors.text.secondary, marginTop: 2 },
  artistScroll: { paddingLeft: Spacing.xl, marginBottom: Spacing.sm },
  artistCard: { alignItems: 'center', marginRight: 20, width: 90 },
  artistImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  artistName: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, textAlign: 'center' },
  albumScroll: { paddingLeft: Spacing.xl, marginBottom: Spacing.sm },
  albumCard: { width: 150, marginRight: 12 },
  albumImage: { width: 150, height: 150, borderRadius: BorderRadius.base, marginBottom: 8 },
  albumTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  albumArtist: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, marginTop: 2 },
  bottomSpacer: { height: 40 },
});

export default ExploreScreen;
