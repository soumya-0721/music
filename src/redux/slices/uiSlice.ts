import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeName = 'midnight-gold' | 'emerald-luxe' | 'sunset-orange' | 'cherry-red' | 'titanium-silver';

interface UIState {
  isOnboardingComplete: boolean;
  isAuthModalVisible: boolean;
  searchQuery: string;
  isSearching: boolean;
  activeTab: number;
  selectedMoods: string[];
  recentSearches: string[];
  isEqualizerOpen: boolean;
  sleepTimer: {
    isActive: boolean;
    remainingMinutes: number;
  };
  themeName: ThemeName;
}

const initialState: UIState = {
  isOnboardingComplete: false,
  isAuthModalVisible: false,
  searchQuery: '',
  isSearching: false,
  activeTab: 0,
  selectedMoods: [],
  recentSearches: [],
  isEqualizerOpen: false,
  sleepTimer: {
    isActive: false,
    remainingMinutes: 0,
  },
  themeName: 'midnight-gold',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    completeOnboarding: (state) => {
      state.isOnboardingComplete = true;
    },
    setAuthModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isAuthModalVisible = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<number>) => {
      state.activeTab = action.payload;
    },
    toggleMood: (state, action: PayloadAction<string>) => {
      const index = state.selectedMoods.indexOf(action.payload);
      if (index !== -1) {
        state.selectedMoods.splice(index, 1);
      } else {
        state.selectedMoods.push(action.payload);
      }
    },
    setEqualizerOpen: (state, action: PayloadAction<boolean>) => {
      state.isEqualizerOpen = action.payload;
    },
    setSleepTimer: (state, action: PayloadAction<{ isActive: boolean; remainingMinutes: number }>) => {
      state.sleepTimer = action.payload;
    },
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      state.themeName = action.payload;
    },
    addRecentSearch: (state, action: PayloadAction<string>) => {
      state.recentSearches = state.recentSearches.filter(s => s !== action.payload);
      state.recentSearches.unshift(action.payload);
      if (state.recentSearches.length > 10) {
        state.recentSearches.pop();
      }
    },
    clearRecentSearches: (state) => {
      state.recentSearches = [];
    },
    resetUI: (state) => {
      state.isAuthModalVisible = false;
      state.searchQuery = '';
      state.isSearching = false;
      state.selectedMoods = [];
    },
  },
});

export const {
  completeOnboarding, setAuthModalVisible, setSearchQuery, setSearching,
  setActiveTab, toggleMood, setEqualizerOpen, setSleepTimer, setTheme, addRecentSearch, clearRecentSearches, resetUI,
} = uiSlice.actions;
export default uiSlice.reducer;
