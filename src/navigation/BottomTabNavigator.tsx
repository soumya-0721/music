import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import { Colors, BorderRadius, Spacing, Shadows, Glassmorphism } from '../theme';
import { BottomTabParamList } from '../types';

import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlaylistTabScreen from '../screens/PlaylistTabScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 5;

// Simple icons using text symbols
const TabIcon = ({ name, focused }: { name: string; focused: boolean }) => {
  const icons: Record<string, string> = {
    Home: '🏠',
    Explore: '🔍',
    Library: '📚',
    Playlist: '🎵',
    Profile: '👤',
  };
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{icons[name] || '●'}</Text>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      <BlurView
        style={styles.blurView}
        blurType="dark"
        blurAmount={20}
        reducedTransparencyFallbackColor={Colors.tabBar}
      />
      <View style={styles.tabBarInner}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icons: Record<string, string> = {
            Home: '🏠',
            Explore: '🔍',
            Library: '📚',
            Playlist: '🎵',
            Profile: '👤',
          };

          const labels: Record<string, string> = {
            Home: 'Home',
            Explore: 'Search',
            Library: 'Library',
            Playlist: 'Playlist',
            Profile: 'Profile',
          };

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={[
                styles.tabIconContainer,
                isFocused && styles.tabIconFocused,
              ]}>
                <Text style={[
                  styles.tabIcon,
                  isFocused && styles.tabIconActive,
                ]}>
                  {icons[route.name] || '●'}
                </Text>
              </View>
              <Text style={[
                styles.tabLabel,
                isFocused && styles.tabLabelActive,
              ]}>
                {isFocused ? labels[route.name] : ''}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Playlist" component={PlaylistTabScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    height: 72,
    borderRadius: BorderRadius['2xl'],
    overflow: 'hidden',
    ...Shadows.xl,
  },
  blurView: {
    ...StyleSheet.absoluteFillObject,
  },
  tabBarInner: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(13, 18, 37, 0.75)',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TAB_WIDTH - 16,
    height: 56,
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconFocused: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
  },
  tabIcon: {
    fontSize: 22,
    opacity: 0.5,
  },
  tabIconActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: Colors.text.tertiary,
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: Colors.secondary,
    fontWeight: '600',
  },
});

export default BottomTabNavigator;
