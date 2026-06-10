// VIBRIX - Constants & Mock Data

import { Song, Album, Artist, Genre, Playlist } from '../types';

export const APP_NAME = 'VIBRIX';
export const APP_TAGLINE = 'Feel Every Beat.';
export const APP_VERSION = '1.0.0';

// Mock Data - Will be replaced by API calls
export const MOCK_SONGS: Song[] = [
  { id: '1', title: 'Neon Dreams', artist: 'Aurora Wave', artistId: 'a1', album: 'Electric Nights', albumId: 'al1', albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400', duration: 234, genre: 'Electronic', url: '', isLiked: false, plays: 1234567, releaseDate: '2025-12-01' },
  { id: '2', title: 'Midnight Serenade', artist: 'Luna Eclipse', artistId: 'a2', album: 'Moonlit Melodies', albumId: 'al2', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 198, genre: 'Pop', url: '', isLiked: true, plays: 2345678, releaseDate: '2026-01-15' },
  { id: '3', title: 'Purple Horizon', artist: 'Stellar Drift', artistId: 'a3', album: 'Cosmic Journey', albumId: 'al3', albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', duration: 267, genre: 'Ambient', url: '', isLiked: false, plays: 3456789, releaseDate: '2026-02-20' },
  { id: '4', title: 'Coral Sunset', artist: 'Beach Frequency', artistId: 'a4', album: 'Tropical Waves', albumId: 'al4', albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', duration: 212, genre: 'Chill', url: '', isLiked: true, plays: 4567890, releaseDate: '2026-03-10' },
  { id: '5', title: 'Electric Pulse', artist: 'Synthwave Kid', artistId: 'a5', album: 'Digital Heartbeat', albumId: 'al5', albumArt: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400', duration: 189, genre: 'Electronic', url: '', isLiked: false, plays: 5678901, releaseDate: '2026-01-05' },
  { id: '6', title: 'Velvet Night', artist: 'Aurora Wave', artistId: 'a1', album: 'Electric Nights', albumId: 'al1', albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400', duration: 245, genre: 'Electronic', url: '', isLiked: false, plays: 6789012, releaseDate: '2025-12-01' },
  { id: '7', title: 'Quantum Leap', artist: 'Neon Pulse', artistId: 'a6', album: 'Future Retro', albumId: 'al6', albumArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', duration: 223, genre: 'Synthwave', url: '', isLiked: false, plays: 7890123, releaseDate: '2026-04-01' },
  { id: '8', title: 'Ocean Eyes', artist: 'Crystal Waters', artistId: 'a7', album: 'Deep Blue', albumId: 'al7', albumArt: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', duration: 256, genre: 'Pop', url: '', isLiked: true, plays: 8901234, releaseDate: '2026-02-14' },
  { id: '9', title: 'Shadow Dance', artist: 'Dark Matter', artistId: 'a8', album: 'Eclipse', albumId: 'al8', albumArt: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', duration: 234, genre: 'Alternative', url: '', isLiked: false, plays: 9012345, releaseDate: '2026-03-20' },
  { id: '10', title: 'Golden Hour', artist: 'Solar Flare', artistId: 'a9', album: 'Radiant', albumId: 'al9', albumArt: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', duration: 198, genre: 'Indie', url: '', isLiked: true, plays: 1123456, releaseDate: '2026-04-10' },
  { id: '11', title: 'Binary Stars', artist: 'Pixel Dreams', artistId: 'a10', album: 'Code & Melody', albumId: 'al10', albumArt: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400', duration: 278, genre: 'Electronic', url: '', isLiked: false, plays: 2234567, releaseDate: '2026-01-25' },
  { id: '12', title: 'Mystic Falls', artist: 'Echo Valley', artistId: 'a11', album: 'Nature\'s Symphony', albumId: 'al11', albumArt: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400', duration: 312, genre: 'Ambient', url: '', isLiked: false, plays: 3345678, releaseDate: '2026-05-01' },
];

export const MOCK_ALBUMS: Album[] = [
  { id: 'al1', title: 'Electric Nights', artist: 'Aurora Wave', artistId: 'a1', coverArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400', releaseYear: 2026, songCount: 12, totalDuration: 3600, genre: 'Electronic', songs: MOCK_SONGS.filter(s => s.albumId === 'al1') },
  { id: 'al2', title: 'Moonlit Melodies', artist: 'Luna Eclipse', artistId: 'a2', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', releaseYear: 2026, songCount: 10, totalDuration: 3000, genre: 'Pop', songs: MOCK_SONGS.filter(s => s.albumId === 'al2') },
  { id: 'al3', title: 'Cosmic Journey', artist: 'Stellar Drift', artistId: 'a3', coverArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', releaseYear: 2026, songCount: 8, totalDuration: 2400, genre: 'Ambient', songs: MOCK_SONGS.filter(s => s.albumId === 'al3') },
  { id: 'al4', title: 'Tropical Waves', artist: 'Beach Frequency', artistId: 'a4', coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', releaseYear: 2026, songCount: 14, totalDuration: 4200, genre: 'Chill', songs: MOCK_SONGS.filter(s => s.albumId === 'al4') },
  { id: 'al5', title: 'Digital Heartbeat', artist: 'Synthwave Kid', artistId: 'a5', coverArt: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400', releaseYear: 2025, songCount: 11, totalDuration: 3300, genre: 'Electronic', songs: MOCK_SONGS.filter(s => s.albumId === 'al5') },
];

export const MOCK_ARTISTS: Artist[] = [
  { id: 'a1', name: 'Aurora Wave', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', genre: 'Electronic', monthlyListeners: 2500000, followers: 1800000, albums: [MOCK_ALBUMS[0]], topSongs: [MOCK_SONGS[0], MOCK_SONGS[5]] },
  { id: 'a2', name: 'Luna Eclipse', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', genre: 'Pop', monthlyListeners: 3800000, followers: 2900000, albums: [MOCK_ALBUMS[1]], topSongs: [MOCK_SONGS[1]] },
  { id: 'a3', name: 'Stellar Drift', image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', genre: 'Ambient', monthlyListeners: 1200000, followers: 890000, albums: [MOCK_ALBUMS[2]], topSongs: [MOCK_SONGS[2]] },
  { id: 'a4', name: 'Beach Frequency', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', genre: 'Chill', monthlyListeners: 1900000, followers: 1400000, albums: [MOCK_ALBUMS[3]], topSongs: [MOCK_SONGS[3]] },
  { id: 'a5', name: 'Synthwave Kid', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400', genre: 'Electronic', monthlyListeners: 3100000, followers: 2400000, albums: [MOCK_ALBUMS[4]], topSongs: [MOCK_SONGS[4]] },
  { id: 'a6', name: 'Neon Pulse', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', genre: 'Synthwave', monthlyListeners: 870000, followers: 650000, albums: [], topSongs: [MOCK_SONGS[6]] },
  { id: 'a7', name: 'Crystal Waters', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', genre: 'Pop', monthlyListeners: 4200000, followers: 3500000, albums: [MOCK_ALBUMS[4]], topSongs: [MOCK_SONGS[7]] },
];

export const MOCK_GENRES: Genre[] = [
  { id: 'g1', name: 'Electronic', color: '#8B5CF6', image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=400', songCount: 245 },
  { id: 'g2', name: 'Pop', color: '#FF6B6B', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', songCount: 312 },
  { id: 'g3', name: 'Ambient', color: '#10B981', image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', songCount: 178 },
  { id: 'g4', name: 'Chill', color: '#3B82F6', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', songCount: 156 },
  { id: 'g5', name: 'Synthwave', color: '#F59E0B', image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400', songCount: 89 },
  { id: 'g6', name: 'Alternative', color: '#EF4444', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', songCount: 203 },
  { id: 'g7', name: 'Indie', color: '#EC4899', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', songCount: 167 },
  { id: 'g8', name: 'Jazz', color: '#8B5CF6', image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400', songCount: 94 },
];

export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'pl1', name: 'Chill Vibes', description: 'Relax and unwind', coverArt: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400', createdBy: 'You', userId: 'u1', songs: [MOCK_SONGS[2], MOCK_SONGS[3], MOCK_SONGS[11]], songCount: 3, totalDuration: 780, isPublic: true, isCollaborative: false, createdAt: '2026-01-01', updatedAt: '2026-05-15' },
  { id: 'pl2', name: 'Workout Energy', description: 'High intensity beats', coverArt: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400', createdBy: 'You', userId: 'u1', songs: [MOCK_SONGS[0], MOCK_SONGS[4], MOCK_SONGS[6]], songCount: 3, totalDuration: 646, isPublic: false, isCollaborative: false, createdAt: '2026-02-10', updatedAt: '2026-04-20' },
  { id: 'pl3', name: 'Late Night Drive', description: 'Perfect for night cruising', coverArt: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', createdBy: 'You', userId: 'u1', songs: [MOCK_SONGS[1], MOCK_SONGS[5], MOCK_SONGS[7], MOCK_SONGS[10]], songCount: 4, totalDuration: 977, isPublic: true, isCollaborative: true, collaborators: ['u2'], createdAt: '2026-03-05', updatedAt: '2026-05-20' },
];

export const TRENDING_SEARCHES = [
  'Aurora Wave', 'Electronic Music', 'Chill Playlist', 'New Releases 2026',
  'Workout Mix', 'Lofi Beats', 'Podcasts', 'Top 50 Global',
];

export const ONBOARDING_DATA = [
  {
    title: 'Discover Millions of Songs',
    subtitle: 'Explore a vast library of tracks from around the world. Find your next favorite song.',
    image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600',
    gradient: ['#8B5CF6', '#6D28D9'] as [string, string],
  },
  {
    title: 'Listen Anytime, Anywhere',
    subtitle: 'Take your music everywhere. Offline downloads for premium subscribers.',
    image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=600',
    gradient: ['#FF6B6B', '#EE4444'] as [string, string],
  },
  {
    title: 'Create Your Vibe',
    subtitle: 'Build playlists that match your mood. Let AI curate the perfect soundtrack.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
    gradient: ['#0B1020', '#1A1040'] as [string, string],
  },
];
