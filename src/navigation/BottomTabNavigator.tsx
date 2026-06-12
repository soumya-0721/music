import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { useThemeColors, BorderRadius, Spacing, Shadows } from '../theme';
import { BottomTabParamList } from '../types';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LibraryScreen from '../screens/LibraryScreen';
import PlaylistTabScreen from '../screens/PlaylistTabScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_WIDTH = SCREEN_WIDTH / 6;

const TAB_ICONS: Record<string, string> = {
  Home: '🏠',
  Search: '🔍',
  Explore: '🌐',
  Library: '📚',
  Playlist: '🎵',
  Profile: '👤',
};

const TAB_LABELS: Record<string, string> = {
  Home: 'Home',
  Search: 'Search',
  Explore: 'Explore',
  Library: 'Library',
  Playlist: 'Playlist',
  Profile: 'Profile',
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  const { colors } = useThemeColors();

  return (
    <View style={[styles.tabBarContainer, { borderColor: colors.tabBarBorder }]}>
      <BlurView
        style={styles.blurView}
        tint="dark"
        intensity={20}
      />
      <View style={[styles.tabBarInner, { backgroundColor: `${colors.primary}CC` }]}>
        {state.routes.map((route: any, index: number) => {
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

          return (
            <TouchableOpacity
              key={route.name}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={[
                styles.tabIconContainer,
                isFocused && { backgroundColor: `${colors.secondary}20` },
              ]}>
                <Text style={[
                  styles.tabIcon,
                  { color: isFocused ? colors.secondary : colors.text.tertiary },
                ]}>
                  {TAB_ICONS[route.name] || '●'}
                </Text>
              </View>
              <Text style={[
                styles.tabLabel,
                { color: isFocused ? colors.secondary : colors.text.tertiary },
                isFocused && styles.tabLabelActive,
              ]}>
                {isFocused ? TAB_LABELS[route.name] : ''}
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
      <Tab.Screen name="Search" component={SearchScreen} />
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
    ...StyleSheet.absoluteFill,
  },
  tabBarInner: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: TAB_WIDTH - 12,
    height: 56,
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 22,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
  },
  tabLabelActive: {
    fontWeight: '700',
  },
});

export default BottomTabNavigator;
