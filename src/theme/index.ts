// VIBRIX - Premium Theme System
// Design Language: Futuristic Luxury × Dark Aesthetic

export { themes, themeNames, themeGradients } from './themes';
export type { ThemeName, ThemeColors } from './themes';
export { useThemeColors } from '../context/ThemeContext';

// Default Colors export for backward compatibility
import { themes } from './themes';
export const Colors = themes['midnight-gold'];

export const Typography = {
  fontSize: {
    xs: 10, sm: 12, base: 14, md: 16, lg: 18, xl: 20,
    '2xl': 24, '3xl': 28, '4xl': 32, '5xl': 40, '6xl': 48, hero: 56,
  },
  fontWeight: {
    light: '300' as const, regular: '400' as const, medium: '500' as const,
    semibold: '600' as const, bold: '700' as const, extrabold: '800' as const, black: '900' as const,
  },
  lineHeight: { tight: 1.1, normal: 1.3, relaxed: 1.5, loose: 1.7 },
  letterSpacing: { tight: -0.5, normal: 0, wide: 0.5, wider: 1, widest: 2 },
} as const;

export const Spacing = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 32, '3xl': 40, '4xl': 48, '5xl': 56, '6xl': 64,
} as const;

export const BorderRadius = {
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 30, '3xl': 36, full: 9999,
} as const;

export const Shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  lg: { shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 },
  xl: { shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 12 },
  glow: { shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  neonCoral: { shadowColor: '#FF6B6B', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  '2xl': { shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 30, elevation: 15 },
  neonCyan: { shadowColor: '#00F5FF', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 24, elevation: 12 },
  gold: { shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  emerald: { shadowColor: '#50C878', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 10 },
  orange: { shadowColor: '#FF6B35', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 10 },
  red: { shadowColor: '#DC143C', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, shadowRadius: 20, elevation: 10 },
  silver: { shadowColor: '#C0C0C0', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.2, shadowRadius: 16, elevation: 8 },
} as const;

export const Glassmorphism = {
  light: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1 },
  medium: { backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.12)', borderWidth: 1 },
  strong: { backgroundColor: 'rgba(27, 27, 27, 0.6)', borderColor: 'rgba(212, 175, 55, 0.12)', borderWidth: 1 },
  gold: { backgroundColor: 'rgba(212, 175, 55, 0.08)', borderColor: 'rgba(212, 175, 55, 0.2)', borderWidth: 1 },
  dark: { backgroundColor: 'rgba(15, 15, 15, 0.8)', borderColor: 'rgba(255, 255, 255, 0.06)', borderWidth: 1 },
  emerald: { backgroundColor: 'rgba(80, 200, 120, 0.08)', borderColor: 'rgba(80, 200, 120, 0.2)', borderWidth: 1 },
  orange: { backgroundColor: 'rgba(255, 107, 53, 0.08)', borderColor: 'rgba(255, 107, 53, 0.2)', borderWidth: 1 },
  red: { backgroundColor: 'rgba(220, 20, 60, 0.08)', borderColor: 'rgba(220, 20, 60, 0.2)', borderWidth: 1 },
  silver: { backgroundColor: 'rgba(192, 192, 192, 0.06)', borderColor: 'rgba(192, 192, 192, 0.15)', borderWidth: 1 },
} as const;

export const Layout = {
  screenPadding: Spacing.base,
  cardBorderRadius: BorderRadius['2xl'],
  buttonBorderRadius: BorderRadius.base,
  inputBorderRadius: BorderRadius.md,
  tabBarHeight: 80,
  headerHeight: 60,
  miniPlayerHeight: 64,
  cardWidth: 160,
  heroCardHeight: 260,
} as const;
