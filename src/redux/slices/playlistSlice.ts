import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Playlist, Song } from '../../types';

interface PlaylistState {
  playlists: Playlist[];
  likedSongs: Song[];
  downloadedSongs: Song[];
  recentlyPlayed: Song[];
  listeningHistory: Song[];
}

const initialState: PlaylistState = {
  playlists: [],
  likedSongs: [],
  downloadedSongs: [],
  recentlyPlayed: [],
  listeningHistory: [],
};

export const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylists: (state, action: PayloadAction<Playlist[]>) => {
      state.playlists = action.payload;
    },
    addPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.unshift(action.payload);
    },
    updatePlaylist: (state, action: PayloadAction<Playlist>) => {
      const index = state.playlists.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.playlists[index] = action.payload;
      }
    },
    deletePlaylist: (state, action: PayloadAction<string>) => {
      state.playlists = state.playlists.filter(p => p.id !== action.payload);
    },
    addSongToPlaylist: (state, action: PayloadAction<{ playlistId: string; song: Song }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist && !playlist.songs.find(s => s.id === action.payload.song.id)) {
        playlist.songs.push(action.payload.song);
        playlist.songCount = playlist.songs.length;
      }
    },
    removeSongFromPlaylist: (state, action: PayloadAction<{ playlistId: string; songId: string }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== action.payload.songId);
        playlist.songCount = playlist.songs.length;
      }
    },
    toggleLikeSong: (state, action: PayloadAction<Song>) => {
      const index = state.likedSongs.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.likedSongs.splice(index, 1);
      } else {
        state.likedSongs.unshift(action.payload);
      }
    },
    setDownloadedSongs: (state, action: PayloadAction<Song[]>) => {
      state.downloadedSongs = action.payload;
    },
    addDownloadedSong: (state, action: PayloadAction<Song>) => {
      if (!state.downloadedSongs.find(s => s.id === action.payload.id)) {
        state.downloadedSongs.push(action.payload);
      }
    },
    removeDownloadedSong: (state, action: PayloadAction<string>) => {
      state.downloadedSongs = state.downloadedSongs.filter(s => s.id !== action.payload);
    },
    addToRecentlyPlayed: (state, action: PayloadAction<Song>) => {
      state.recentlyPlayed = state.recentlyPlayed.filter(s => s.id !== action.payload.id);
      state.recentlyPlayed.unshift(action.payload);
      if (state.recentlyPlayed.length > 20) {
        state.recentlyPlayed.pop();
      }
    },
    addToHistory: (state, action: PayloadAction<Song>) => {
      state.listeningHistory.unshift(action.payload);
      if (state.listeningHistory.length > 100) {
        state.listeningHistory.pop();
      }
    },
  },
});

export const {
  setPlaylists, addPlaylist, updatePlaylist, deletePlaylist,
  addSongToPlaylist, removeSongFromPlaylist,
  toggleLikeSong, setDownloadedSongs, addDownloadedSong, removeDownloadedSong,
  addToRecentlyPlayed, addToHistory,
} = playlistSlice.actions;
export default playlistSlice.reducer;
