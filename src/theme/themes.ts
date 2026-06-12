// VIBRIX - Premium Theme System
// 5 Luxury Dark Themes - No Blue/Purple Colors

export type ThemeName = 'midnight-gold' | 'emerald-luxe' | 'sunset-orange' | 'cherry-red' | 'titanium-silver';

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  gradients: {
    primary: readonly [string, string];
    secondary: readonly [string, string];
    accent: readonly [string, string];
    midnight: readonly [string, string];
    purpleCoral: readonly [string, string];
    darkGlass: readonly [string, string];
    card: readonly [string, string];
    glow: readonly [string, string];
  };
  surface: {
    primary: string;
    secondary: string;
    card: string;
    elevated: string;
    glass: string;
    glassLight: string;
    glassStrong: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    muted: string;
    accent: string;
    coral: string;
  };
  success: string;
  warning: string;
  error: string;
  info: string;
  tabBar: string;
  tabBarBorder: string;
  inputBg: string;
  inputBorder: string;
  shimmer: readonly [string, string, string];
  overlay: string;
  heart: string;
  playButton: string;
  playerBg: readonly [string, string, string];
}

export const themes: Record<ThemeName, ThemeColors> = {
  // THEME 1: Midnight Gold - Black & Gold luxury
  'midnight-gold': {
    primary: '#0F0F0F',
    secondary: '#D4AF37',
    accent: '#E8C874',
    gradients: {
      primary: ['#0F0F0F', '#1A1510'],
      secondary: ['#D4AF37', '#B8960E'],
      accent: ['#E8C874', '#D4AF37'],
      midnight: ['#0F0F0F', '#1A1510'],
      purpleCoral: ['#D4AF37', '#E8C874'],
      darkGlass: ['rgba(212, 175, 55, 0.1)', 'rgba(15, 15, 15, 0.8)'],
      card: ['rgba(212, 175, 55, 0.06)', 'rgba(15, 15, 15, 0.4)'],
      glow: ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0)'],
    },
    surface: {
      primary: '#1B1B1B',
      secondary: '#252525',
      card: 'rgba(27, 27, 27, 0.6)',
      elevated: 'rgba(37, 37, 37, 0.8)',
      glass: 'rgba(212, 175, 55, 0.05)',
      glassLight: 'rgba(212, 175, 55, 0.08)',
      glassStrong: 'rgba(212, 175, 55, 0.12)',
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.8)',
      tertiary: 'rgba(255, 255, 255, 0.5)',
      muted: 'rgba(255, 255, 255, 0.3)',
      accent: '#D4AF37',
      coral: '#E8C874',
    },
    success: '#34D399',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#60A5FA',
    tabBar: 'rgba(27, 27, 27, 0.95)',
    tabBarBorder: 'rgba(212, 175, 55, 0.2)',
    inputBg: 'rgba(212, 175, 55, 0.06)',
    inputBorder: 'rgba(212, 175, 55, 0.2)',
    shimmer: ['rgba(212,175,55,0.05)', 'rgba(212,175,55,0.12)', 'rgba(212,175,55,0.05)'],
    overlay: 'rgba(0, 0, 0, 0.6)',
    heart: '#E8C874',
    playButton: '#D4AF37',
    playerBg: ['#0F0F0F', '#1A1510', '#252015'] as [string, string, string],
  },

  // THEME 2: Emerald Luxe - Black & Emerald Green
  'emerald-luxe': {
    primary: '#090909',
    secondary: '#50C878',
    accent: '#98FF98',
    gradients: {
      primary: ['#090909', '#0F1A12'],
      secondary: ['#50C878', '#3DA55E'],
      accent: ['#98FF98', '#6BE06B'],
      midnight: ['#090909', '#0F1A12'],
      purpleCoral: ['#50C878', '#98FF98'],
      darkGlass: ['rgba(80, 200, 120, 0.1)', 'rgba(9, 9, 9, 0.8)'],
      card: ['rgba(80, 200, 120, 0.06)', 'rgba(9, 9, 9, 0.4)'],
      glow: ['rgba(80, 200, 120, 0.35)', 'rgba(80, 200, 120, 0)'],
    },
    surface: {
      primary: '#161616',
      secondary: '#1E221E',
      card: 'rgba(22, 22, 22, 0.6)',
      elevated: 'rgba(30, 34, 30, 0.8)',
      glass: 'rgba(80, 200, 120, 0.04)',
      glassLight: 'rgba(80, 200, 120, 0.07)',
      glassStrong: 'rgba(80, 200, 120, 0.1)',
    },
    text: {
      primary: '#F0FFF0',
      secondary: 'rgba(240, 255, 240, 0.8)',
      tertiary: 'rgba(240, 255, 240, 0.5)',
      muted: 'rgba(240, 255, 240, 0.3)',
      accent: '#50C878',
      coral: '#98FF98',
    },
    success: '#50C878',
    warning: '#FBBF24',
    error: '#EF4444',
    info: '#60A5FA',
    tabBar: 'rgba(22, 22, 22, 0.95)',
    tabBarBorder: 'rgba(80, 200, 120, 0.2)',
    inputBg: 'rgba(80, 200, 120, 0.06)',
    inputBorder: 'rgba(80, 200, 120, 0.2)',
    shimmer: ['rgba(80,200,120,0.05)', 'rgba(80,200,120,0.12)', 'rgba(80,200,120,0.05)'],
    overlay: 'rgba(0, 0, 0, 0.6)',
    heart: '#98FF98',
    playButton: '#50C878',
    playerBg: ['#090909', '#0F1A12', '#162218'] as [string, string, string],
  },

  // THEME 3: Sunset Orange - Warm orange & peach
  'sunset-orange': {
    primary: '#111111',
    secondary: '#FF6B35',
    accent: '#FFB088',
    gradients: {
      primary: ['#111111', '#1E1810'],
      secondary: ['#FF6B35', '#E85A26'],
      accent: ['#FFB088', '#FF8C5A'],
      midnight: ['#111111', '#1E1810'],
      purpleCoral: ['#FF6B35', '#FFB088'],
      darkGlass: ['rgba(255, 107, 53, 0.1)', 'rgba(17, 17, 17, 0.8)'],
      card: ['rgba(255, 107, 53, 0.06)', 'rgba(17, 17, 17, 0.4)'],
      glow: ['rgba(255, 107, 53, 0.35)', 'rgba(255, 107, 53, 0)'],
    },
    surface: {
      primary: '#1D1D1D',
      secondary: '#28221E',
      card: 'rgba(29, 29, 29, 0.6)',
      elevated: 'rgba(40, 34, 30, 0.8)',
      glass: 'rgba(255, 107, 53, 0.05)',
      glassLight: 'rgba(255, 107, 53, 0.08)',
      glassStrong: 'rgba(255, 107, 53, 0.12)',
    },
    text: {
      primary: '#FFF8F5',
      secondary: 'rgba(255, 248, 245, 0.8)',
      tertiary: 'rgba(255, 248, 245, 0.5)',
      muted: 'rgba(255, 248, 245, 0.3)',
      accent: '#FF6B35',
      coral: '#FFB088',
    },
    success: '#34D399',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#60A5FA',
    tabBar: 'rgba(29, 29, 29, 0.95)',
    tabBarBorder: 'rgba(255, 107, 53, 0.2)',
    inputBg: 'rgba(255, 107, 53, 0.06)',
    inputBorder: 'rgba(255, 107, 53, 0.2)',
    shimmer: ['rgba(255,107,53,0.05)', 'rgba(255,107,53,0.12)', 'rgba(255,107,53,0.05)'],
    overlay: 'rgba(0, 0, 0, 0.6)',
    heart: '#FFB088',
    playButton: '#FF6B35',
    playerBg: ['#111111', '#1E1810', '#281E14'] as [string, string, string],
  },

  // THEME 4: Cherry Red - Deep red & rose pink
  'cherry-red': {
    primary: '#0B0B0B',
    secondary: '#DC143C',
    accent: '#FF6B8A',
    gradients: {
      primary: ['#0B0B0B', '#1A0E10'],
      secondary: ['#DC143C', '#B01030'],
      accent: ['#FF6B8A', '#F0486E'],
      midnight: ['#0B0B0B', '#1A0E10'],
      purpleCoral: ['#DC143C', '#FF6B8A'],
      darkGlass: ['rgba(220, 20, 60, 0.1)', 'rgba(11, 11, 11, 0.8)'],
      card: ['rgba(220, 20, 60, 0.06)', 'rgba(11, 11, 11, 0.4)'],
      glow: ['rgba(220, 20, 60, 0.35)', 'rgba(220, 20, 60, 0)'],
    },
    surface: {
      primary: '#191919',
      secondary: '#241518',
      card: 'rgba(25, 25, 25, 0.6)',
      elevated: 'rgba(36, 21, 24, 0.8)',
      glass: 'rgba(220, 20, 60, 0.05)',
      glassLight: 'rgba(220, 20, 60, 0.08)',
      glassStrong: 'rgba(220, 20, 60, 0.12)',
    },
    text: {
      primary: '#FFF5F5',
      secondary: 'rgba(255, 245, 245, 0.8)',
      tertiary: 'rgba(255, 245, 245, 0.5)',
      muted: 'rgba(255, 245, 245, 0.3)',
      accent: '#DC143C',
      coral: '#FF6B8A',
    },
    success: '#34D399',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#60A5FA',
    tabBar: 'rgba(25, 25, 25, 0.95)',
    tabBarBorder: 'rgba(220, 20, 60, 0.2)',
    inputBg: 'rgba(220, 20, 60, 0.06)',
    inputBorder: 'rgba(220, 20, 60, 0.2)',
    shimmer: ['rgba(220,20,60,0.05)', 'rgba(220,20,60,0.12)', 'rgba(220,20,60,0.05)'],
    overlay: 'rgba(0, 0, 0, 0.6)',
    heart: '#FF6B8A',
    playButton: '#DC143C',
    playerBg: ['#0B0B0B', '#1A0E10', '#221215'] as [string, string, string],
  },

  // THEME 5: Titanium Silver - Minimal silver & champagne
  'titanium-silver': {
    primary: '#0A0A0A',
    secondary: '#C0C0C0',
    accent: '#E8D5A3',
    gradients: {
      primary: ['#0A0A0A', '#141414'],
      secondary: ['#C0C0C0', '#A0A0A0'],
      accent: ['#E8D5A3', '#D4BF8A'],
      midnight: ['#0A0A0A', '#141414'],
      purpleCoral: ['#C0C0C0', '#E8D5A3'],
      darkGlass: ['rgba(192, 192, 192, 0.08)', 'rgba(10, 10, 10, 0.8)'],
      card: ['rgba(192, 192, 192, 0.05)', 'rgba(10, 10, 10, 0.4)'],
      glow: ['rgba(192, 192, 192, 0.25)', 'rgba(192, 192, 192, 0)'],
    },
    surface: {
      primary: '#171717',
      secondary: '#222222',
      card: 'rgba(23, 23, 23, 0.6)',
      elevated: 'rgba(34, 34, 34, 0.8)',
      glass: 'rgba(192, 192, 192, 0.04)',
      glassLight: 'rgba(192, 192, 192, 0.07)',
      glassStrong: 'rgba(192, 192, 192, 0.1)',
    },
    text: {
      primary: '#F5F5F5',
      secondary: 'rgba(245, 245, 245, 0.8)',
      tertiary: 'rgba(245, 245, 245, 0.5)',
      muted: 'rgba(245, 245, 245, 0.3)',
      accent: '#C0C0C0',
      coral: '#E8D5A3',
    },
    success: '#34D399',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#60A5FA',
    tabBar: 'rgba(23, 23, 23, 0.95)',
    tabBarBorder: 'rgba(192, 192, 192, 0.15)',
    inputBg: 'rgba(192, 192, 192, 0.05)',
    inputBorder: 'rgba(192, 192, 192, 0.15)',
    shimmer: ['rgba(192,192,192,0.04)', 'rgba(192,192,192,0.1)', 'rgba(192,192,192,0.04)'],
    overlay: 'rgba(0, 0, 0, 0.6)',
    heart: '#E8D5A3',
    playButton: '#C0C0C0',
    playerBg: ['#0A0A0A', '#141414', '#1A1A1A'] as [string, string, string],
  },
};

export const themeNames: Record<ThemeName, string> = {
  'midnight-gold': 'Midnight Gold',
  'emerald-luxe': 'Emerald Luxe',
  'sunset-orange': 'Sunset Orange',
  'cherry-red': 'Cherry Red',
  'titanium-silver': 'Titanium Silver',
};

export const themeGradients: Record<ThemeName, readonly [string, string]> = {
  'midnight-gold': ['#0F0F0F', '#1A1510'],
  'emerald-luxe': ['#090909', '#0F1A12'],
  'sunset-orange': ['#111111', '#1E1810'],
  'cherry-red': ['#0B0B0B', '#1A0E10'],
  'titanium-silver': ['#0A0A0A', '#141414'],
};
