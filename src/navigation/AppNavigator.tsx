import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from '../redux/store';
import { useThemeColors } from '../theme';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import MiniPlayer from '../components/music/MiniPlayer';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import MusicPlayerScreen from '../screens/MusicPlayerScreen';
import PlaylistDetailScreen from '../screens/PlaylistDetailScreen';
import CreatePlaylistScreen from '../screens/CreatePlaylistScreen';
import ArtistDetailScreen from '../screens/ArtistDetailScreen';
import AlbumDetailScreen from '../screens/AlbumDetailScreen';
import EqualizerScreen from '../screens/EqualizerScreen';
import SleepTimerScreen from '../screens/SleepTimerScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import PremiumScreen from '../screens/PremiumScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { colors } = useThemeColors();
  const navigationRef = React.useRef<any>(null);

  const handleMiniPlayerPress = () => {
    navigationRef.current?.navigate('MusicPlayer');
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer
        ref={navigationRef}
        theme={{
          dark: true,
          colors: {
            primary: colors.secondary,
            background: colors.primary,
            card: colors.surface.primary,
            text: colors.text.primary,
            border: colors.surface.glass,
            notification: colors.accent,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            bold: { fontFamily: 'System', fontWeight: '700' },
            heavy: { fontFamily: 'System', fontWeight: '900' },
          },
        }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: colors.primary },
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="MusicPlayer" component={MusicPlayerScreen} />
          <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
          <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
          <Stack.Screen name="ArtistDetail" component={ArtistDetailScreen} />
          <Stack.Screen name="AlbumDetail" component={AlbumDetailScreen} />
          <Stack.Screen name="Equalizer" component={EqualizerScreen} />
          <Stack.Screen name="SleepTimer" component={SleepTimerScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Premium" component={PremiumScreen} />
          <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Mini Player Overlay */}
      <MiniPlayer onPress={handleMiniPlayerPress} />
    </View>
  );
};

export default AppNavigator;
