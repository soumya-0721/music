// VIBRIX - Type Definitions

// ==================== USER ====================
export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  avatar?: string;
  followers: number;
  following: number;
  listeningTime: number; // minutes
  isPremium: boolean;
  favoriteArtists: string[];
  favoriteGenres: string[];
  language: string;
  moodPreferences: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ==================== MUSIC ====================
export type MusicLanguage = 'telugu' | 'hindi' | 'english';

export type MusicCategory =
  | 'trending' | 'latest' | 'new_hits' | '90s' | 'classics'
  | 'romantic' | 'night_vibes' | 'party' | 'road_trip' | 'rainy'
  | 'chill' | 'workout' | 'movie' | 'melody'
  | 'telugu_hits' | 'hindi_hits' | 'english_hits'
  | 'top_charts_india' | 'global_hits' | 'evergreen'
  | 'most_loved' | 'viral' | 'indie' | 'instrumental';

export interface Song {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  album: string;
  albumId: string;
  albumArt: string;
  duration: number; // seconds
  genre: string;
  language: MusicLanguage;
  categories: MusicCategory[];
  url: string;
  isLiked: boolean;
  plays: number;
  releaseDate: string;
  lyrics?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  coverArt: string;
  releaseYear: number;
  songCount: number;
  totalDuration: number;
  genre: string;
  songs: Song[];
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  monthlyListeners: number;
  followers: number;
  albums: Album[];
  topSongs: Song[];
  bio?: string;
}

export interface Genre {
  id: string;
  name: string;
  color: string;
  image: string;
  songCount: number;
}

// ==================== PLAYLIST ====================
export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverArt?: string;
  createdBy: string;
  userId: string;
  songs: Song[];
  songCount: number;
  totalDuration: number;
  isPublic: boolean;
  isCollaborative: boolean;
  collaborators?: string[];
  createdAt: string;
  updatedAt: string;
}

// ==================== MUSIC PLAYER ====================
export type RepeatMode = 'off' | 'one' | 'all';
export type ShuffleMode = 'off' | 'on';

export interface PlayerState {
  currentSong: Song | null;
  queue: Song[];
  originalQueue: Song[];
  queueIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  repeatMode: RepeatMode;
  shuffleMode: ShuffleMode;
  isMiniPlayerVisible: boolean;
  playbackSpeed: number;
  crossfadeEnabled: boolean;
  audioQuality: 'Low' | 'Normal' | 'High' | 'Hi-Res';
  isBuffering: boolean;
}

// ==================== EQUALIZER ====================
export interface EqualizerPreset {
  id: string;
  name: string;
  bands: number[]; // 10 bands
  isCustom: boolean;
}

// ==================== SLEEP TIMER ====================
export interface SleepTimerState {
  isActive: boolean;
  remainingMinutes: number;
  endAction: 'pause' | 'stop' | 'fadeOut';
}

// ==================== NAVIGATION ====================
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Auth: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  OTPVerification: undefined;
  ProfileSetup: undefined;
  MainTabs: undefined;
  MusicPlayer: { songId?: string };
  PlaylistDetail: { playlistId: string };
  CreatePlaylist: undefined;
  ArtistDetail: { artistId: string };
  AlbumDetail: { albumId: string };
  Equalizer: undefined;
  SleepTimer: undefined;
  Settings: undefined;
  Notifications: undefined;
  Premium: undefined;
  HelpCenter: undefined;
  TermsAndConditions: undefined;
  AboutApp: undefined;
  ContactUs: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Explore: undefined;
  Library: undefined;
  Playlist: undefined;
  Profile: undefined;
};

// ==================== API ====================
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// ==================== NOTIFICATION ====================
export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'new_release' | 'recommendation' | 'follow' | 'playlist_update' | 'system';
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}
