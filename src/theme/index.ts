// VIBRIX - Premium Theme System
// Design Language: Futuristic Luxury × Dark Aesthetic

export const Colors = {
  primary: '#0B1020',
  secondary: '#8B5CF6',
  accent: '#FF6B6B',
  gradients: {
    primary: ['#0B1020', '#1A1040'] as const,
    secondary: ['#8B5CF6', '#6D28D9'] as const,
    accent: ['#FF6B6B', '#EE4444'] as const,
    midnight: ['#0B1020', '#1A1A3E'] as const,
    purpleCoral: ['#8B5CF6', '#FF6B6B'] as const,
    darkGlass: ['rgba(139, 92, 246, 0.1)', 'rgba(11, 16, 32, 0.8)'] as const,
    card: ['rgba(139, 92, 246, 0.08)', 'rgba(11, 16, 32, 0.4)'] as const,
    glow: ['rgba(139, 92, 246, 0.4)', 'rgba(139, 92, 246, 0)'] as const,
  },
  surface: {
    primary: '#0D1225',
    secondary: '#141A32',
    card: 'rgba(20, 26, 50, 0.6)',
    elevated: 'rgba(30, 36, 60, 0.8)',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassLight: 'rgba(255, 255, 255, 0.08)',
    glassStrong: 'rgba(255, 255, 255, 0.12)',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.5)',
    muted: 'rgba(255, 255, 255, 0.3)',
    accent: '#8B5CF6',
    coral: '#FF6B6B',
  },
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  tabBar: 'rgba(13, 18, 37, 0.95)',
  tabBarBorder: 'rgba(139, 92, 246, 0.2)',
  inputBg: 'rgba(255, 255, 255, 0.06)',
  inputBorder: 'rgba(139, 92, 246, 0.2)',
  shimmer: ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.05)'] as const,
  overlay: 'rgba(0, 0, 0, 0.6)',
  heart: '#FF6B6B',
  playButton: '#8B5CF6',
} as const;

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
  xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, '2xl': 28, '3xl': 32, full: 9999,
} as const;

export const Shadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 4, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  lg: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 8 },
  xl: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 12 },
  glow: { shadowColor: '#8B5CF6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  neonCoral: { shadowColor: '#FF6B6B', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
} as const;

export const Glassmorphism = {
  light: { backgroundColor: 'rgba(255, 255, 255, 0.05)', borderColor: 'rgba(255, 255, 255, 0.08)', borderWidth: 1 },
  medium: { backgroundColor: 'rgba(255, 255, 255, 0.08)', borderColor: 'rgba(255, 255, 255, 0.12)', borderWidth: 1 },
  strong: { backgroundColor: 'rgba(20, 26, 50, 0.6)', borderColor: 'rgba(139, 92, 246, 0.15)', borderWidth: 1 },
  purple: { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)', borderWidth: 1 },
  dark: { backgroundColor: 'rgba(11, 16, 32, 0.8)', borderColor: 'rgba(255, 255, 255, 0.06)', borderWidth: 1 },
} as const;

export const Layout = {
  screenPadding: Spacing.base,
  cardBorderRadius: BorderRadius['2xl'],
  buttonBorderRadius: BorderRadius.base,
  inputBorderRadius: BorderRadius.md,
  tabBarHeight: 80,
  headerHeight: 60,
  miniPlayerHeight: 64,
} as const;
