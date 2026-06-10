import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isOnboardingComplete: boolean;
  isAuthModalVisible: boolean;
  searchQuery: string;
  isSearching: boolean;
  activeTab: number;
  selectedMoods: string[];
  isEqualizerOpen: boolean;
  sleepTimer: {
    isActive: boolean;
    remainingMinutes: number;
  };
  theme: 'dark' | 'light';
}

const initialState: UIState = {
  isOnboardingComplete: false,
  isAuthModalVisible: false,
  searchQuery: '',
  isSearching: false,
  activeTab: 0,
  selectedMoods: [],
  isEqualizerOpen: false,
  sleepTimer: {
    isActive: false,
    remainingMinutes: 0,
  },
  theme: 'dark',
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
    setTheme: (state, action: PayloadAction<'dark' | 'light'>) => {
      state.theme = action.payload;
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
  setActiveTab, toggleMood, setEqualizerOpen, setSleepTimer, setTheme, resetUI,
} = uiSlice.actions;
export default uiSlice.reducer;
