// VIBRIX - Constants & Multilingual Music Data

import { Song, Album, Artist, Genre, Playlist, MusicCategory, MusicLanguage } from '../types';

export const APP_NAME = 'VIBRIX';
export const APP_TAGLINE = 'Feel Every Beat.';
export const APP_VERSION = '1.0.0';

// ==================== TELUGU SONGS ====================
const TELUGU_SONGS: Song[] = [
  { id: 'te1', title: 'O Rendu Prema Meghaalila', artist: 'Vishal Dadlani', artistId: 'ta1', album: 'Baby Movie', albumId: 'tal1', albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400', duration: 245, genre: 'Melody', language: 'telugu', categories: ['telugu_hits', 'melody', 'romantic', 'top_charts_india'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', isLiked: true, plays: 4567890, releaseDate: '2026-01-10' },
  { id: 'te2', title: 'Samajavaragamana', artist: 'Sid Sriram', artistId: 'ta2', album: 'Geetha Govindam', albumId: 'tal2', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 298, genre: 'Melody', language: 'telugu', categories: ['telugu_hits', 'melody', 'romantic', 'evergreen', 'top_charts_india'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', isLiked: true, plays: 8901234, releaseDate: '2025-11-20' },
  { id: 'te3', title: 'Butta Bomma', artist: 'Armaan Malik', artistId: 'ta3', album: 'Ala Vaikunthapurramuloo', albumId: 'tal3', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 234, genre: 'Party', language: 'telugu', categories: ['telugu_hits', 'party', 'trending', 'viral', 'top_charts_india'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', isLiked: true, plays: 5678901, releaseDate: '2026-02-14' },
  { id: 'te4', title: 'Inkem Inkem Inkem Kaavaale', artist: 'Sid Sriram', artistId: 'ta2', album: 'Geetha Govindam', albumId: 'tal2', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 312, genre: 'Romantic', language: 'telugu', categories: ['telugu_hits', 'romantic', 'melody', 'evergreen', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', isLiked: true, plays: 9876543, releaseDate: '2025-08-15' },
  { id: 'te5', title: 'Kalaavathi', artist: 'Sid Sriram', artistId: 'ta2', album: 'Sarkaru Vaari Paata', albumId: 'tal4', albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', duration: 287, genre: 'Melody', language: 'telugu', categories: ['telugu_hits', 'melody', 'latest', 'new_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', isLiked: false, plays: 3456789, releaseDate: '2026-03-01' },
  { id: 'te6', title: 'Seeti Maar', artist: 'Rahul Nambiar', artistId: 'ta4', album: 'Dj', albumId: 'tal5', albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400', duration: 267, genre: 'Party', language: 'telugu', categories: ['telugu_hits', 'party', 'trending', 'workout'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', isLiked: false, plays: 4567890, releaseDate: '2025-07-10' },
  { id: 'te7', title: 'Anuvanuvuna', artist: 'Sid Sriram', artistId: 'ta2', album: 'Chalo', albumId: 'tal6', albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', duration: 278, genre: 'Romantic', language: 'telugu', categories: ['telugu_hits', 'romantic', '90s', 'evergreen'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', isLiked: true, plays: 6789012, releaseDate: '2024-06-20' },
  { id: 'te8', title: 'Top Leadge', artist: 'Lucky Ali', artistId: 'ta5', album: 'Top Leadge', albumId: 'tal7', albumArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', duration: 256, genre: 'Party', language: 'telugu', categories: ['telugu_hits', 'party', 'trending', 'viral', 'workout'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', isLiked: false, plays: 5678901, releaseDate: '2026-04-05' },
  { id: 'te9', title: 'Pilla Raavali Baagaane Undi', artist: 'Jassie Gift', artistId: 'ta6', album: 'Pilla Raavali Baagaane Undi', albumId: 'tal8', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 234, genre: 'Party', language: 'telugu', categories: ['telugu_hits', 'party', 'road_trip'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3', isLiked: false, plays: 3456789, releaseDate: '2026-05-01' },
  { id: 'te10', title: 'Oosupodu', artist: 'Sid Sriram', artistId: 'ta2', album: 'Jersey', albumId: 'tal9', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 345, genre: 'Melody', language: 'telugu', categories: ['telugu_hits', 'melody', 'latest', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3', isLiked: true, plays: 7890123, releaseDate: '2026-02-28' },
  { id: 'te11', title: 'Nee Kannu Neeli Samudram', artist: 'Javed Ali', artistId: 'ta7', album: 'Love Movie', albumId: 'tal10', albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', duration: 298, genre: 'Romantic', language: 'telugu', categories: ['telugu_hits', 'romantic', 'melody', 'night_vibes'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3', isLiked: false, plays: 2345678, releaseDate: '2026-01-20' },
  { id: 'te12', title: 'Srivalli', artist: 'Sid Sriram', artistId: 'ta2', album: 'Pushpa The Rise', albumId: 'tal11', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 321, genre: 'Melody', language: 'telugu', categories: ['telugu_hits', 'melody', 'trending', 'viral', 'top_charts_india'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3', isLiked: true, plays: 10987654, releaseDate: '2026-03-15' },
  { id: 'te13', title: 'Naa Roja Nuvve', artist: 'Arijit Singh', artistId: 'ta8', album: 'Maruthi Movie', albumId: 'tal12', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 267, genre: 'Romantic', language: 'telugu', categories: ['telugu_hits', 'romantic', 'melody', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3', isLiked: true, plays: 6543210, releaseDate: '2026-04-10' },
  { id: 'te14', title: 'Dinchak Dinga', artist: 'Nakash Aziz', artistId: 'ta9', album: 'Sarileru Neekevvaru', albumId: 'tal13', albumArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', duration: 289, genre: 'Party', language: 'telugu', categories: ['telugu_hits', 'party', 'workout', 'trending'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3', isLiked: false, plays: 4567890, releaseDate: '2026-05-10' },
  { id: 'te15', title: 'Gundello Golumala', artist: 'Vishal Dadlani', artistId: 'ta1', album: 'Baby Movie', albumId: 'tal1', albumArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400', duration: 312, genre: 'Party', language: 'telugu', categories: ['telugu_hits', 'party', 'trending'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3', isLiked: false, plays: 3456789, releaseDate: '2026-05-20' },
];

// ==================== HINDI SONGS ====================
const HINDI_SONGS: Song[] = [
  { id: 'hi1', title: 'Kesariya', artist: 'Arijit Singh', artistId: 'ha1', album: 'Brahmastra', albumId: 'hal1', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 284, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', 'trending', 'top_charts_india'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3', isLiked: true, plays: 12345678, releaseDate: '2026-01-01' },
  { id: 'hi2', title: 'Pasoori', artist: 'Shae Gill & Ali Sethi', artistId: 'ha2', album: 'Coke Studio', albumId: 'hal2', albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', duration: 324, genre: 'Folk', language: 'hindi', categories: ['hindi_hits', 'viral', 'trending', 'global_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', isLiked: true, plays: 9876543, releaseDate: '2026-02-10' },
  { id: 'hi3', title: 'Apna Bana Le', artist: 'Arijit Singh', artistId: 'ha1', album: 'Bhediya', albumId: 'hal3', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 278, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', 'top_charts_india', 'new_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3', isLiked: true, plays: 8765432, releaseDate: '2026-03-05' },
  { id: 'hi4', title: 'Jhoome Jo Pathaan', artist: 'Arijit Singh', artistId: 'ha1', album: 'Pathaan', albumId: 'hal4', albumArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', duration: 289, genre: 'Party', language: 'hindi', categories: ['hindi_hits', 'party', 'workout', 'trending'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3', isLiked: false, plays: 7654321, releaseDate: '2026-01-25' },
  { id: 'hi5', title: 'Maan Meri Jaan', artist: 'King', artistId: 'ha3', album: 'Maan Meri Jaan', albumId: 'hal5', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 312, genre: 'Pop', language: 'hindi', categories: ['hindi_hits', 'trending', 'viral', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3', isLiked: true, plays: 6543210, releaseDate: '2026-04-01' },
  { id: 'hi6', title: 'Tere Hawaale', artist: 'Arijit Singh & Shilpa Rao', artistId: 'ha1', album: 'Laal Singh Chaddha', albumId: 'hal6', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 345, genre: 'Melody', language: 'hindi', categories: ['hindi_hits', 'melody', 'romantic', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-21.mp3', isLiked: true, plays: 5432109, releaseDate: '2025-12-15' },
  { id: 'hi7', title: 'Pyaar Hota Kayi Baar Hai', artist: 'Arijit Singh', artistId: 'ha1', album: 'Tu Jhoothi Main Makkaar', albumId: 'hal7', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 289, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', 'latest', 'new_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-22.mp3', isLiked: false, plays: 4321098, releaseDate: '2026-05-01' },
  { id: 'hi8', title: 'Besharam Rang', artist: 'Vishal Dadlani & Shreya Ghoshal', artistId: 'ha4', album: 'Pathaan', albumId: 'hal4', albumArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', duration: 298, genre: 'Party', language: 'hindi', categories: ['hindi_hits', 'party', 'trending', 'workout'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-23.mp3', isLiked: false, plays: 3210987, releaseDate: '2026-02-20' },
  { id: 'hi9', title: 'Tum Kya Mile', artist: 'Arijit Singh & Shreya Ghoshal', artistId: 'ha1', album: 'Rocky Aur Rani Kii Prem Kahaani', albumId: 'hal8', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 312, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', 'melody', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-24.mp3', isLiked: true, plays: 2109876, releaseDate: '2026-04-15' },
  { id: 'hi10', title: 'Daku', artist: 'Diljit Dosanjh', artistId: 'ha5', album: 'Ghost', albumId: 'hal9', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 245, genre: 'Punjabi', language: 'hindi', categories: ['hindi_hits', 'party', 'trending', 'viral', 'workout'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-25.mp3', isLiked: true, plays: 1098765, releaseDate: '2026-05-10' },
  { id: 'hi11', title: 'Guli Mata', artist: 'Saad Lamjarred & Shreya Ghoshal', artistId: 'ha6', album: 'Guli Mata', albumId: 'hal10', albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', duration: 267, genre: 'Pop', language: 'hindi', categories: ['hindi_hits', 'global_hits', 'trending'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-26.mp3', isLiked: false, plays: 987654, releaseDate: '2026-05-15' },
  { id: 'hi12', title: 'Chaleya', artist: 'Arijit Singh & Shilpa Rao', artistId: 'ha1', album: 'Jawan', albumId: 'hal11', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 298, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', 'trending', 'new_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-27.mp3', isLiked: true, plays: 8765432, releaseDate: '2026-03-20' },
  { id: 'hi13', title: 'O Mahi O Mahi', artist: 'Arijit Singh & Shreya Ghoshal', artistId: 'ha1', album: 'Dunki', albumId: 'hal12', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 312, genre: 'Melody', language: 'hindi', categories: ['hindi_hits', 'melody', 'latest', 'new_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-28.mp3', isLiked: false, plays: 6543210, releaseDate: '2026-05-20' },
  { id: 'hi14', title: 'Zara Zara', artist: 'Arijit Singh', artistId: 'ha1', album: 'Zara Zara', albumId: 'hal13', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 234, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', '90s', 'evergreen', 'classics'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-29.mp3', isLiked: true, plays: 5432109, releaseDate: '2024-01-10' },
  { id: 'hi15', title: 'Kabhi Jo Baadal Barse', artist: 'Arijit Singh', artistId: 'ha1', album: 'Jackpot', albumId: 'hal14', albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', duration: 298, genre: 'Melody', language: 'hindi', categories: ['hindi_hits', 'melody', 'rainy', 'night_vibes', 'chill'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-30.mp3', isLiked: true, plays: 4321098, releaseDate: '2024-05-15' },
  { id: 'hi16', title: 'Channa Mereya', artist: 'Arijit Singh', artistId: 'ha1', album: 'Ae Dil Hai Mushkil', albumId: 'hal15', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 356, genre: 'Melody', language: 'hindi', categories: ['hindi_hits', 'melody', 'evergreen', 'most_loved', 'classics'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-31.mp3', isLiked: true, plays: 3210987, releaseDate: '2024-08-20' },
  { id: 'hi17', title: 'Tujh Mein Rab Dikhta Hai', artist: 'Rahat Fateh Ali Khan', artistId: 'ha7', album: 'Rab Ne Bana Di Jodi', albumId: 'hal16', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 312, genre: 'Melody', language: 'hindi', categories: ['hindi_hits', 'melody', '90s', 'evergreen', 'classics', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-32.mp3', isLiked: true, plays: 1098765, releaseDate: '2024-03-10' },
  { id: 'hi18', title: 'Gerua', artist: 'Arijit Singh & Antara Mitra', artistId: 'ha1', album: 'Dilwale', albumId: 'hal17', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 312, genre: 'Romantic', language: 'hindi', categories: ['hindi_hits', 'romantic', '90s', 'evergreen'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-33.mp3', isLiked: false, plays: 2109876, releaseDate: '2024-06-15' },
];

// ==================== ENGLISH SONGS ====================
const ENGLISH_SONGS: Song[] = [
  { id: 'en1', title: 'Blinding Lights', artist: 'The Weeknd', artistId: 'ea1', album: 'After Hours', albumId: 'eal1', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 200, genre: 'Pop', language: 'english', categories: ['english_hits', 'global_hits', 'trending', 'top_charts_india'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-34.mp3', isLiked: true, plays: 23456789, releaseDate: '2026-01-05' },
  { id: 'en2', title: 'Shape of You', artist: 'Ed Sheeran', artistId: 'ea2', album: 'Divide', albumId: 'eal2', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 234, genre: 'Pop', language: 'english', categories: ['english_hits', 'global_hits', 'evergreen', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-35.mp3', isLiked: true, plays: 34567890, releaseDate: '2025-11-10' },
  { id: 'en3', title: 'Lovely', artist: 'Billie Eilish & Khalid', artistId: 'ea3', album: 'Lovely', albumId: 'eal3', albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', duration: 200, genre: 'Indie', language: 'english', categories: ['english_hits', 'chill', 'night_vibes', 'global_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-36.mp3', isLiked: true, plays: 12345678, releaseDate: '2026-02-14' },
  { id: 'en4', title: 'Starboy', artist: 'The Weeknd', artistId: 'ea1', album: 'Starboy', albumId: 'eal4', albumArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', duration: 230, genre: 'Pop', language: 'english', categories: ['english_hits', 'global_hits', 'workout', 'party'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-37.mp3', isLiked: false, plays: 9876543, releaseDate: '2026-03-01' },
  { id: 'en5', title: 'Heat Waves', artist: 'Glass Animals', artistId: 'ea4', album: 'Dreamland', albumId: 'eal5', albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', duration: 238, genre: 'Indie', language: 'english', categories: ['english_hits', 'chill', 'trending', 'viral'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-38.mp3', isLiked: true, plays: 8765432, releaseDate: '2026-04-10' },
  { id: 'en6', title: 'Creepin', artist: 'Metro Boomin, The Weeknd', artistId: 'ea5', album: 'Heroes & Villains', albumId: 'eal6', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 221, genre: 'R&B', language: 'english', categories: ['english_hits', 'trending', 'night_vibes', 'global_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-39.mp3', isLiked: false, plays: 7654321, releaseDate: '2026-04-20' },
  { id: 'en7', title: 'Perfect', artist: 'Ed Sheeran', artistId: 'ea2', album: 'Divide', albumId: 'eal2', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 263, genre: 'Romantic', language: 'english', categories: ['english_hits', 'romantic', 'evergreen', 'most_loved', 'classics'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-40.mp3', isLiked: true, plays: 6543210, releaseDate: '2025-09-15' },
  { id: 'en8', title: 'Flowers', artist: 'Miley Cyrus', artistId: 'ea6', album: 'Endless Summer Vacation', albumId: 'eal7', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 200, genre: 'Pop', language: 'english', categories: ['english_hits', 'trending', 'new_hits', 'party'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-41.mp3', isLiked: true, plays: 5432109, releaseDate: '2026-05-01' },
  { id: 'en9', title: 'Viva La Vida', artist: 'Coldplay', artistId: 'ea7', album: 'Viva La Vida', albumId: 'eal8', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 242, genre: 'Alternative', language: 'english', categories: ['english_hits', 'classics', 'evergreen', 'global_hits', 'road_trip'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-42.mp3', isLiked: true, plays: 4321098, releaseDate: '2024-01-01' },
  { id: 'en10', title: 'Yellow', artist: 'Coldplay', artistId: 'ea7', album: 'Parachutes', albumId: 'eal9', albumArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', duration: 269, genre: 'Alternative', language: 'english', categories: ['english_hits', 'classics', 'evergreen', 'romantic', 'most_loved'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-43.mp3', isLiked: true, plays: 3210987, releaseDate: '2024-03-20' },
  { id: 'en11', title: 'Counting Stars', artist: 'OneRepublic', artistId: 'ea8', album: 'Native', albumId: 'eal10', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 257, genre: 'Pop', language: 'english', categories: ['english_hits', 'workout', 'road_trip', 'party'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-44.mp3', isLiked: true, plays: 2109876, releaseDate: '2025-07-10' },
  { id: 'en12', title: 'Demons', artist: 'Imagine Dragons', artistId: 'ea9', album: 'Night Visions', albumId: 'eal11', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 215, genre: 'Alternative', language: 'english', categories: ['english_hits', 'workout', 'classics', 'global_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-45.mp3', isLiked: false, plays: 1098765, releaseDate: '2025-05-15' },
  { id: 'en13', title: 'Bohemian Rhapsody', artist: 'Queen', artistId: 'ea10', album: 'A Night at the Opera', albumId: 'eal12', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 355, genre: 'Rock', language: 'english', categories: ['english_hits', 'classics', 'evergreen', 'road_trip', 'global_hits'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-46.mp3', isLiked: true, plays: 987654, releaseDate: '2023-01-01' },
  { id: 'en14', title: 'Hotel California', artist: 'Eagles', artistId: 'ea11', album: 'Hotel California', albumId: 'eal13', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 391, genre: 'Rock', language: 'english', categories: ['english_hits', 'classics', 'evergreen', 'road_trip', 'night_vibes'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-47.mp3', isLiked: true, plays: 876543, releaseDate: '2023-06-01' },
  { id: 'en15', title: 'Stairway to Heaven', artist: 'Led Zeppelin', artistId: 'ea12', album: 'Led Zeppelin IV', albumId: 'eal14', albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', duration: 482, genre: 'Rock', language: 'english', categories: ['english_hits', 'classics', 'evergreen', 'instrumental'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-48.mp3', isLiked: false, plays: 765432, releaseDate: '2023-01-15' },
  { id: 'en16', title: 'Somewhere Only We Know', artist: 'Keane', artistId: 'ea13', album: 'Hopes and Fears', albumId: 'eal15', albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', duration: 238, genre: 'Alternative', language: 'english', categories: ['english_hits', 'chill', 'rainy', 'night_vibes'], url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-49.mp3', isLiked: true, plays: 654321, releaseDate: '2025-08-20' },
];

// ==================== ALL SONGS ====================
export const MOCK_SONGS: Song[] = [...TELUGU_SONGS, ...HINDI_SONGS, ...ENGLISH_SONGS];

// Helper function to get songs by category
export const getSongsByCategory = (category: MusicCategory): Song[] =>
  MOCK_SONGS.filter(s => s.categories.includes(category)).slice(0, 15);

export const getSongsByLanguage = (language: MusicLanguage): Song[] =>
  MOCK_SONGS.filter(s => s.language === language);

export const getTrendingSongs = () => getSongsByCategory('trending');
export const getLatestSongs = () => getSongsByCategory('latest');
export const getNewHits = () => getSongsByCategory('new_hits');
export const get90sSongs = () => getSongsByCategory('90s');
export const getClassicSongs = () => getSongsByCategory('classics');
export const getRomanticSongs = () => getSongsByCategory('romantic');
export const getNightVibes = () => getSongsByCategory('night_vibes');
export const getPartyMix = () => getSongsByCategory('party');
export const getRoadTripSongs = () => getSongsByCategory('road_trip');
export const getRainyMood = () => getSongsByCategory('rainy');
export const getChillSongs = () => getSongsByCategory('chill');
export const getWorkoutMusic = () => getSongsByCategory('workout');
export const getTeluguTopHits = () => getSongsByLanguage('telugu');
export const getHindiTopHits = () => getSongsByLanguage('hindi');
export const getEnglishTopHits = () => getSongsByLanguage('english');

// ==================== ALBUMS ====================
const TELUGU_ALBUMS: Album[] = [
  { id: 'tal1', title: 'Baby Movie', artist: 'Vishal Dadlani', artistId: 'ta1', coverArt: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400', releaseYear: 2026, songCount: 5, totalDuration: 1500, genre: 'Party', songs: MOCK_SONGS.filter(s => s.albumId === 'tal1') },
  { id: 'tal2', title: 'Geetha Govindam', artist: 'Sid Sriram', artistId: 'ta2', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2025, songCount: 8, totalDuration: 2400, genre: 'Melody', songs: MOCK_SONGS.filter(s => s.albumId === 'tal2') },
  { id: 'tal3', title: 'Ala Vaikunthapurramuloo', artist: 'Armaan Malik', artistId: 'ta3', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', releaseYear: 2026, songCount: 6, totalDuration: 1800, genre: 'Party', songs: MOCK_SONGS.filter(s => s.albumId === 'tal3') },
  { id: 'tal4', title: 'Sarkaru Vaari Paata', artist: 'Sid Sriram', artistId: 'ta2', coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', releaseYear: 2026, songCount: 4, totalDuration: 1200, genre: 'Melody', songs: MOCK_SONGS.filter(s => s.albumId === 'tal4') },
  { id: 'tal9', title: 'Jersey', artist: 'Sid Sriram', artistId: 'ta2', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2026, songCount: 3, totalDuration: 900, genre: 'Melody', songs: MOCK_SONGS.filter(s => s.albumId === 'tal9') },
  { id: 'tal11', title: 'Pushpa The Rise', artist: 'Sid Sriram', artistId: 'ta2', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2026, songCount: 2, totalDuration: 600, genre: 'Melody', songs: MOCK_SONGS.filter(s => s.albumId === 'tal11') },
];

const HINDI_ALBUMS: Album[] = [
  { id: 'hal1', title: 'Brahmastra', artist: 'Arijit Singh', artistId: 'ha1', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2026, songCount: 8, totalDuration: 2400, genre: 'Romantic', songs: MOCK_SONGS.filter(s => s.albumId === 'hal1') },
  { id: 'hal4', title: 'Pathaan', artist: 'Arijit Singh', artistId: 'ha1', coverArt: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', releaseYear: 2026, songCount: 6, totalDuration: 1800, genre: 'Party', songs: MOCK_SONGS.filter(s => s.albumId === 'hal4') },
  { id: 'hal11', title: 'Jawan', artist: 'Arijit Singh & Shilpa Rao', artistId: 'ha1', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2026, songCount: 4, totalDuration: 1200, genre: 'Romantic', songs: MOCK_SONGS.filter(s => s.albumId === 'hal11') },
  { id: 'hal15', title: 'Ae Dil Hai Mushkil', artist: 'Arijit Singh', artistId: 'ha1', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2024, songCount: 2, totalDuration: 700, genre: 'Melody', songs: MOCK_SONGS.filter(s => s.albumId === 'hal15') },
];

const ENGLISH_ALBUMS: Album[] = [
  { id: 'eal1', title: 'After Hours', artist: 'The Weeknd', artistId: 'ea1', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', releaseYear: 2026, songCount: 14, totalDuration: 4200, genre: 'Pop', songs: MOCK_SONGS.filter(s => s.albumId === 'eal1') },
  { id: 'eal2', title: 'Divide', artist: 'Ed Sheeran', artistId: 'ea2', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', releaseYear: 2025, songCount: 12, totalDuration: 3600, genre: 'Pop', songs: MOCK_SONGS.filter(s => s.albumId === 'eal2') },
  { id: 'eal8', title: 'Viva La Vida', artist: 'Coldplay', artistId: 'ea7', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2024, songCount: 10, totalDuration: 3000, genre: 'Alternative', songs: MOCK_SONGS.filter(s => s.albumId === 'eal8') },
  { id: 'eal12', title: 'A Night at the Opera', artist: 'Queen', artistId: 'ea10', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', releaseYear: 2023, songCount: 12, totalDuration: 4000, genre: 'Rock', songs: MOCK_SONGS.filter(s => s.albumId === 'eal12') },
];

export const MOCK_ALBUMS: Album[] = [...TELUGU_ALBUMS, ...HINDI_ALBUMS, ...ENGLISH_ALBUMS];

// ==================== ARTISTS ====================
const TELUGU_ARTISTS: Artist[] = [
  { id: 'ta2', name: 'Sid Sriram', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', genre: 'Telugu Melody', monthlyListeners: 5200000, followers: 4100000, albums: [TELUGU_ALBUMS[1], TELUGU_ALBUMS[3], TELUGU_ALBUMS[4], TELUGU_ALBUMS[5]], topSongs: [TELUGU_SONGS[1], TELUGU_SONGS[3], TELUGU_SONGS[4], TELUGU_SONGS[9], TELUGU_SONGS[11]] },
  { id: 'ta1', name: 'Vishal Dadlani', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', genre: 'Telugu Party', monthlyListeners: 2800000, followers: 2100000, albums: [TELUGU_ALBUMS[0]], topSongs: [TELUGU_SONGS[0], TELUGU_SONGS[14]] },
  { id: 'ta3', name: 'Armaan Malik', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', genre: 'Telugu Pop', monthlyListeners: 3500000, followers: 2800000, albums: [TELUGU_ALBUMS[2]], topSongs: [TELUGU_SONGS[2]] },
];

const HINDI_ARTISTS: Artist[] = [
  { id: 'ha1', name: 'Arijit Singh', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', genre: 'Hindi Melody', monthlyListeners: 8500000, followers: 7200000, albums: [HINDI_ALBUMS[0], HINDI_ALBUMS[1], HINDI_ALBUMS[2], HINDI_ALBUMS[3]], topSongs: [HINDI_SONGS[0], HINDI_SONGS[2], HINDI_SONGS[5], HINDI_SONGS[11], HINDI_SONGS[15]] },
  { id: 'ha5', name: 'Diljit Dosanjh', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', genre: 'Punjabi Pop', monthlyListeners: 4800000, followers: 3900000, albums: [], topSongs: [HINDI_SONGS[9]] },
  { id: 'ha3', name: 'King', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', genre: 'Hindi Pop', monthlyListeners: 3200000, followers: 2500000, albums: [], topSongs: [HINDI_SONGS[4]] },
];

const ENGLISH_ARTISTS: Artist[] = [
  { id: 'ea1', name: 'The Weeknd', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', genre: 'Pop', monthlyListeners: 7800000, followers: 6500000, albums: [ENGLISH_ALBUMS[0]], topSongs: [ENGLISH_SONGS[0], ENGLISH_SONGS[3]] },
  { id: 'ea2', name: 'Ed Sheeran', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', genre: 'Pop', monthlyListeners: 9200000, followers: 8100000, albums: [ENGLISH_ALBUMS[1]], topSongs: [ENGLISH_SONGS[1], ENGLISH_SONGS[6]] },
  { id: 'ea7', name: 'Coldplay', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', genre: 'Alternative', monthlyListeners: 6400000, followers: 5300000, albums: [ENGLISH_ALBUMS[2]], topSongs: [ENGLISH_SONGS[8], ENGLISH_SONGS[9]] },
  { id: 'ea10', name: 'Queen', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400', genre: 'Rock', monthlyListeners: 3600000, followers: 2900000, albums: [ENGLISH_ALBUMS[3]], topSongs: [ENGLISH_SONGS[12]] },
  { id: 'ea3', name: 'Billie Eilish', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', genre: 'Indie', monthlyListeners: 5100000, followers: 4300000, albums: [], topSongs: [ENGLISH_SONGS[2]] },
];

export const MOCK_ARTISTS: Artist[] = [...TELUGU_ARTISTS, ...HINDI_ARTISTS, ...ENGLISH_ARTISTS];

// ==================== GENRES ====================
export const MOCK_GENRES: Genre[] = [
  { id: 'g1', name: 'Telugu Hits', color: '#7C3AED', image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400', songCount: TELUGU_SONGS.length },
  { id: 'g2', name: 'Hindi Hits', color: '#D4AF37', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', songCount: HINDI_SONGS.length },
  { id: 'g3', name: 'English Hits', color: '#00F5FF', image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', songCount: ENGLISH_SONGS.length },
  { id: 'g4', name: 'Melody', color: '#FF8C42', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', songCount: 22 },
  { id: 'g5', name: 'Party', color: '#FF6B8A', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', songCount: 18 },
  { id: 'g6', name: 'Romantic', color: '#E8A0BF', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', songCount: 25 },
  { id: 'g7', name: '90s Hits', color: '#D4AF37', image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', songCount: 30 },
  { id: 'g8', name: 'Workout', color: '#50C878', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400', songCount: 15 },
];

// ==================== PLAYLISTS ====================
export const MOCK_PLAYLISTS: Playlist[] = [
  { id: 'pl1', name: 'Telugu Melodies', description: 'Best of Telugu romantic hits', coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400', createdBy: 'VIBRIX', userId: 'u1', songs: getTeluguTopHits().slice(0, 8), songCount: 8, totalDuration: 2400, isPublic: true, isCollaborative: false, createdAt: '2026-01-01', updatedAt: '2026-05-15' },
  { id: 'pl2', name: 'Hindi Blockbusters', description: 'Top Hindi chartbusters', coverArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400', createdBy: 'VIBRIX', userId: 'u1', songs: getHindiTopHits().slice(0, 8), songCount: 8, totalDuration: 2400, isPublic: true, isCollaborative: false, createdAt: '2026-02-10', updatedAt: '2026-04-20' },
  { id: 'pl3', name: 'English Favorites', description: 'Top English hits', coverArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400', createdBy: 'VIBRIX', userId: 'u1', songs: getEnglishTopHits().slice(0, 10), songCount: 10, totalDuration: 2500, isPublic: true, isCollaborative: true, collaborators: ['u2'], createdAt: '2026-03-05', updatedAt: '2026-05-20' },
  { id: 'pl4', name: 'Road Trip Mix', description: 'Perfect for long drives', coverArt: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400', createdBy: 'VIBRIX', userId: 'u1', songs: getRoadTripSongs(), songCount: 6, totalDuration: 1800, isPublic: true, isCollaborative: false, createdAt: '2026-04-01', updatedAt: '2026-05-10' },
  { id: 'pl5', name: 'Workout Energy', description: 'High intensity beats', coverArt: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=400', createdBy: 'VIBRIX', userId: 'u1', songs: getWorkoutMusic(), songCount: 6, totalDuration: 1500, isPublic: true, isCollaborative: false, createdAt: '2026-02-15', updatedAt: '2026-05-01' },
  { id: 'pl6', name: '90s Classics', description: 'Nostalgic old school hits', coverArt: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=400', createdBy: 'VIBRIX', userId: 'u1', songs: get90sSongs(), songCount: 8, totalDuration: 2200, isPublic: true, isCollaborative: false, createdAt: '2026-01-20', updatedAt: '2026-05-25' },
];

export const TRENDING_SEARCHES = [
  'Sid Sriram', 'Arijit Singh', 'Telugu Hits', 'Hindi Songs', 'English Hits',
  'Workout Mix', 'Party Songs', 'Romantic Melodies', '90s Hits', 'New Releases 2026',
];

// ==================== ONBOARDING ====================
export const ONBOARDING_DATA = [
  {
    title: 'Discover Multilingual Music',
    subtitle: 'Explore Telugu, Hindi, and English songs all in one place. Find your next favorite track.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600',
    gradient: ['#7C3AED', '#5B21B6'] as [string, string],
  },
  {
    title: 'Listen Anytime, Anywhere',
    subtitle: 'Take your music everywhere. Offline downloads for premium subscribers.',
    image: 'https://images.unsplash.com/photo-1504898770365-14faca6a7320?w=600',
    gradient: ['#D4AF37', '#B8960E'] as [string, string],
  },
  {
    title: 'Create Your Vibe',
    subtitle: 'Build playlists that match your mood. Let AI curate the perfect soundtrack.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600',
    gradient: ['#0D0B1F', '#1A0E3E'] as [string, string],
  },
];
