import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity,
  Dimensions, Image, FlatList, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors } from '../theme';
import { BorderRadius, Spacing, Typography, Shadows } from '../theme';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addRecentSearch, clearRecentSearches, setSearchQuery } from '../redux/slices/uiSlice';
import { MOCK_GENRES, MOCK_ARTISTS, MOCK_ALBUMS, TRENDING_SEARCHES } from '../constants';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'all', label: 'All', icon: '🔍' },
  { id: 'songs', label: 'Songs', icon: '🎵' },
  { id: 'artists', label: 'Artists', icon: '🎤' },
  { id: 'albums', label: 'Albums', icon: '💿' },
  { id: 'playlists', label: 'Playlists', icon: '📋' },
  { id: 'podcasts', label: 'Podcasts', icon: '🎙️' },
  { id: 'audiobooks', label: 'Audiobooks', icon: '📖' },
];

const genreColors = ['#8B5CF6', '#FF6B6B', '#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#EF4444', '#8B5CF6'];

const SearchScreen = ({ navigation }: any) => {
  const { colors } = useThemeColors();
  const dispatch = useAppDispatch();
  const recentSearches = useAppSelector(state => state.ui.recentSearches);
  const globalSearchQuery = useAppSelector(state => state.ui.searchQuery);

  const [query, setQuery] = useState(globalSearchQuery);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [showVoiceSearch, setShowVoiceSearch] = useState(false);

  const searchAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    Animated.spring(searchAnim, {
      toValue: isSearching ? 1 : 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [isSearching]);

  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    dispatch(setSearchQuery(text));
    if (text.trim().length > 0) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [dispatch]);

  const handleSubmitSearch = useCallback(() => {
    if (query.trim()) {
      dispatch(addRecentSearch(query.trim()));
    }
  }, [query, dispatch]);

  const handleCategoryPress = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    if (!isSearching) {
      inputRef.current?.focus();
    }
  }, [isSearching]);

  const clearSearch = useCallback(() => {
    setQuery('');
    dispatch(setSearchQuery(''));
    setIsSearching(false);
    inputRef.current?.blur();
  }, [dispatch]);

  const searchHeaderOpacity = searchAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const searchContentOpacity = searchAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  return (
    <LinearGradient colors={[colors.primary, colors.gradients.primary[1], colors.surface.primary]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Animated.View style={{ opacity: searchHeaderOpacity }}>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Search</Text>
          <Text style={[styles.headerSubtitle, { color: colors.text.tertiary }]}>Find your next favorite</Text>
        </Animated.View>

        {/* Search Bar */}
        <View style={[styles.searchContainer, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            ref={inputRef}
            style={[styles.searchInput, { color: colors.text.primary }]}
            placeholder="Songs, artists, albums, podcasts..."
            placeholderTextColor={colors.text.muted}
            value={query}
            onChangeText={handleSearch}
            onSubmitEditing={handleSubmitSearch}
            onFocus={() => setIsSearching(true)}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Text style={[styles.clearIcon, { color: colors.text.tertiary }]}>✕</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.voiceButton, { backgroundColor: colors.surface.glass }]}
            onPress={() => setShowVoiceSearch(!showVoiceSearch)}
          >
            <Text style={{ fontSize: 18 }}>🎤</Text>
          </TouchableOpacity>
        </View>

        {/* Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryPill,
                { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight },
                activeCategory === cat.id && { backgroundColor: `${colors.secondary}25`, borderColor: colors.secondary },
              ]}
              onPress={() => handleCategoryPress(cat.id)}
              activeOpacity={0.7}
            >
              <Text style={{ fontSize: 14, marginRight: 4 }}>{cat.icon}</Text>
              <Text style={[
                styles.categoryLabel,
                { color: colors.text.secondary },
                activeCategory === cat.id && { color: colors.secondary, fontWeight: '700' },
              ]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Voice Search Indicator */}
        {showVoiceSearch && (
          <View style={[styles.voiceContainer, { backgroundColor: colors.surface.card, borderColor: colors.surface.glassLight }]}>
            <Text style={[styles.voiceTitle, { color: colors.text.primary }]}>🎤 Voice Search</Text>
            <Text style={[styles.voiceSubtitle, { color: colors.text.tertiary }]}>Say something like "Play trending songs"</Text>
            <View style={styles.voiceWaveContainer}>
              {[...Array(5)].map((_, i) => (
                <View key={i} style={[styles.voiceWave, { backgroundColor: colors.secondary }]} />
              ))}
            </View>
            <TouchableOpacity
              style={[styles.voiceCloseButton, { backgroundColor: colors.surface.glass }]}
              onPress={() => setShowVoiceSearch(false)}
            >
              <Text style={[styles.voiceCloseText, { color: colors.text.secondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Search Results / Content */}
        {isSearching && query.trim().length > 0 ? (
          <Animated.View style={{ opacity: searchContentOpacity }}>
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
              Results for "{query}"
            </Text>
            {/* Mock search results */}
            {MOCK_ARTISTS.filter(a => a.name.toLowerCase().includes(query.toLowerCase())).map(artist => (
              <TouchableOpacity key={artist.id} style={[styles.resultItem, { backgroundColor: colors.surface.glass }]} activeOpacity={0.7} onPress={() => navigation.navigate('ArtistDetail', { artistId: artist.id })}>
                <Image source={{ uri: artist.image }} style={styles.resultImage} />
                <View style={styles.resultInfo}>
                  <Text style={[styles.resultTitle, { color: colors.text.primary }]}>{artist.name}</Text>
                  <Text style={[styles.resultSubtitle, { color: colors.text.tertiary }]}>Artist</Text>
                </View>
              </TouchableOpacity>
            ))}
            {MOCK_ALBUMS.filter(a => a.title.toLowerCase().includes(query.toLowerCase())).map(album => (
              <TouchableOpacity key={album.id} style={[styles.resultItem, { backgroundColor: colors.surface.glass }]} activeOpacity={0.7} onPress={() => navigation.navigate('AlbumDetail', { albumId: album.id })}>
                <Image source={{ uri: album.coverArt }} style={styles.resultImage} />
                <View style={styles.resultInfo}>
                  <Text style={[styles.resultTitle, { color: colors.text.primary }]}>{album.title}</Text>
                  <Text style={[styles.resultSubtitle, { color: colors.text.tertiary }]}>Album • {album.artist}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.View>
        ) : (
          <Animated.View style={{ opacity: searchHeaderOpacity }}>
            {/* Trending Searches */}
            {!isSearching && (
              <>
                <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Trending Now</Text>
                <View style={styles.trendingContainer}>
                  {TRENDING_SEARCHES.map((search, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.trendingChip, { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight }]}
                      onPress={() => {
                        setQuery(search);
                        dispatch(setSearchQuery(search));
                        dispatch(addRecentSearch(search));
                        setIsSearching(true);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.trendingIcon}>🔥</Text>
                      <Text style={[styles.trendingText, { color: colors.text.secondary }]}>{search}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* Recent Searches */}
            {recentSearches.length > 0 && !isSearching && (
              <>
                <View style={styles.recentHeader}>
                  <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Recent Searches</Text>
                  <TouchableOpacity onPress={() => dispatch(clearRecentSearches())}>
                    <Text style={[styles.clearAllText, { color: colors.secondary }]}>Clear All</Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.slice(0, 5).map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.recentItem, { backgroundColor: colors.surface.glass }]}
                    onPress={() => {
                      setQuery(search);
                      dispatch(setSearchQuery(search));
                      setIsSearching(true);
                    }}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.recentIcon, { color: colors.text.tertiary }]}>🕐</Text>
                    <Text style={[styles.recentText, { color: colors.text.secondary }]}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {/* Browse Categories */}
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Browse All</Text>
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

            {/* Top Artists */}
            <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>Top Artists</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.artistScroll}>
              {MOCK_ARTISTS.slice(0, 6).map((artist) => (
                <TouchableOpacity
                  key={artist.id}
                  style={styles.artistCard}
                  onPress={() => navigation.navigate('ArtistDetail', { artistId: artist.id })}
                  activeOpacity={0.7}
                >
                  <Image source={{ uri: artist.image }} style={styles.artistImage} />
                  <Text style={[styles.artistName, { color: colors.text.primary }]} numberOfLines={1}>{artist.name}</Text>
                  <Text style={[styles.artistGenreLabel, { color: colors.text.tertiary }]}>{artist.genre}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 100 },
  headerTitle: { fontSize: 34, fontWeight: '900', paddingHorizontal: Spacing.xl, paddingTop: 60, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 14, paddingHorizontal: Spacing.xl, marginBottom: Spacing.xl, marginTop: 2 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.xl, borderRadius: BorderRadius.base, paddingHorizontal: 12, borderWidth: 1, marginBottom: Spacing.sm, height: 52 },
  searchIcon: { fontSize: 18, marginRight: 10 },
  searchInput: { flex: 1, paddingVertical: 14, fontSize: 15, fontWeight: '400' },
  clearButton: { padding: 6 },
  clearIcon: { fontSize: 16, fontWeight: '700' },
  voiceButton: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', marginLeft: 8 },
  categoryScroll: { marginBottom: Spacing.lg },
  categoryContent: { paddingHorizontal: Spacing.xl, gap: 8 },
  categoryPill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  categoryLabel: { fontSize: 13, fontWeight: '600' },
  sectionTitle: { fontSize: 20, fontWeight: '800', paddingHorizontal: Spacing.xl, marginBottom: 12, marginTop: Spacing.lg, letterSpacing: -0.3 },
  trendingContainer: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.xl, gap: 8, marginBottom: Spacing.sm },
  trendingChip: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20, gap: 6, borderWidth: 1 },
  trendingIcon: { fontSize: 12 },
  trendingText: { fontSize: 13, fontWeight: '500' },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: Spacing.xl },
  clearAllText: { fontSize: 13, fontWeight: '600' },
  recentItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.xl, padding: 14, borderRadius: BorderRadius.md, marginBottom: 6 },
  recentIcon: { fontSize: 16, marginRight: 12 },
  recentText: { fontSize: 14, fontWeight: '500' },
  genresGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.xl, gap: 10 },
  genreCard: { width: (width - 52) / 2, height: 88, borderRadius: BorderRadius.base, overflow: 'hidden' },
  genreGradient: { flex: 1, padding: Spacing.base, justifyContent: 'flex-end' },
  genreName: { fontSize: 16, fontWeight: '800', color: '#FFFFFF', letterSpacing: -0.3 },
  genreCount: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 2, fontWeight: '500' },
  artistScroll: { paddingHorizontal: Spacing.xl, gap: 16, marginBottom: Spacing.sm },
  artistCard: { alignItems: 'center', width: 90 },
  artistImage: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  artistName: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
  artistGenreLabel: { fontSize: 11, fontWeight: '500', textAlign: 'center', marginTop: 2 },
  resultItem: { flexDirection: 'row', alignItems: 'center', marginHorizontal: Spacing.xl, padding: 10, borderRadius: BorderRadius.md, marginBottom: 6 },
  resultImage: { width: 48, height: 48, borderRadius: BorderRadius.sm },
  resultInfo: { flex: 1, marginLeft: 12 },
  resultTitle: { fontSize: 15, fontWeight: '600' },
  resultSubtitle: { fontSize: 12, fontWeight: '500', marginTop: 2 },
  voiceContainer: { marginHorizontal: Spacing.xl, padding: Spacing.xl, borderRadius: BorderRadius.lg, borderWidth: 1, alignItems: 'center', marginBottom: Spacing.lg },
  voiceTitle: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
  voiceSubtitle: { fontSize: 13, fontWeight: '500', marginBottom: Spacing.lg },
  voiceWaveContainer: { flexDirection: 'row', gap: 4, marginBottom: Spacing.lg, height: 40, alignItems: 'center' },
  voiceWave: { width: 4, height: 30, borderRadius: 2, opacity: 0.6 },
  voiceCloseButton: { paddingVertical: 10, paddingHorizontal: 24, borderRadius: 20 },
  voiceCloseText: { fontSize: 14, fontWeight: '600' },
});

export default SearchScreen;
