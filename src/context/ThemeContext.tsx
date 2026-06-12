import React, { createContext, useContext, useMemo, useEffect } from 'react';
import storage from '../utils/storage';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setTheme } from '../redux/slices/uiSlice';
import { ThemeName, ThemeColors, themes } from '../theme/themes';

interface ThemeContextValue {
  theme: ThemeName;
  colors: ThemeColors;
  setTheme: (theme: ThemeName) => void;
  availableThemes: ThemeName[];
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'midnight-gold',
  colors: themes['midnight-gold'],
  setTheme: () => {},
  availableThemes: ['midnight-gold', 'emerald-luxe', 'sunset-orange', 'cherry-red', 'titanium-silver'],
});

const THEME_STORAGE_KEY = '@vibrix_theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const themeName = useAppSelector(state => state.ui.themeName as ThemeName);

  // On mount, load saved theme
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await storage.getItem(THEME_STORAGE_KEY);
        const validThemes: ThemeName[] = ['midnight-gold', 'emerald-luxe', 'sunset-orange', 'cherry-red', 'titanium-silver'];
        if (saved && validThemes.includes(saved as ThemeName)) {
          dispatch(setTheme(saved as ThemeName));
        }
      } catch {}
    };
    loadTheme();
  }, []);

  // Persist theme changes
  useEffect(() => {
    storage.setItem(THEME_STORAGE_KEY, themeName).catch(() => {});
  }, [themeName]);

  const handleSetTheme = (newTheme: ThemeName) => {
    dispatch(setTheme(newTheme));
  };

  const value = useMemo(() => ({
    theme: themeName,
    colors: themes[themeName],
    setTheme: handleSetTheme,
    availableThemes: ['midnight-gold', 'emerald-luxe', 'sunset-orange', 'cherry-red', 'titanium-silver'] as ThemeName[],
  }), [themeName]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeColors = () => useContext(ThemeContext);
