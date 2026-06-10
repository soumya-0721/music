import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { useAppSelector } from '../redux/store';

const ProfileScreen = ({ navigation }: any) => {
  const likedSongs = useAppSelector(state => state.playlist.likedSongs);

  const menuItems = [
    { icon: '👤', label: 'Edit Profile', screen: 'Settings' },
    { icon: '🔒', label: 'Change Password', screen: 'Settings' },
    { icon: '🔔', label: 'Notifications', screen: 'Notifications' },
    { icon: '🎨', label: 'Theme', screen: 'Settings' },
    { icon: '🛡️', label: 'Privacy', screen: 'Settings' },
    { icon: '⭐', label: 'Go Premium', screen: 'Premium', highlight: true },
    { icon: '🎚️', label: 'Equalizer', screen: 'Equalizer' },
    { icon: '⏱️', label: 'Sleep Timer', screen: 'SleepTimer' },
    { icon: 'ℹ️', label: 'About App', screen: 'HelpCenter' },
    { icon: '📞', label: 'Contact Us', screen: 'HelpCenter' },
    { icon: '❓', label: 'Help Center', screen: 'HelpCenter' },
  ];

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
            <View style={styles.premiumBadge}>
              <Text style={styles.premiumIcon}>⭐</Text>
            </View>
          </View>
          <Text style={styles.username}>Vibrix User</Text>
          <Text style={styles.email}>user@vibrix.com</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>128</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1.2K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>847</Text>
              <Text style={styles.statLabel}>Listening Hours</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickAction} onPress={() => handleNavigation('Settings')}>
            <LinearGradient colors={['rgba(139,92,246,0.2)', 'rgba(139,92,246,0.05)']} style={styles.quickActionGradient}>
              <Text style={styles.quickActionIcon}>❤️</Text>
              <Text style={styles.quickActionLabel}>{likedSongs.length} Liked</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => handleNavigation('Premium')}>
            <LinearGradient colors={['rgba(255,107,107,0.2)', 'rgba(255,107,107,0.05)']} style={styles.quickActionGradient}>
              <Text style={styles.quickActionIcon}>⬇️</Text>
              <Text style={styles.quickActionLabel}>Downloads</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickAction} onPress={() => handleNavigation('Premium')}>
            <LinearGradient colors={['rgba(16,185,129,0.2)', 'rgba(16,185,129,0.05)']} style={styles.quickActionGradient}>
              <Text style={styles.quickActionIcon}>⭐</Text>
              <Text style={styles.quickActionLabel}>Premium</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, item.highlight && styles.menuItemHighlight]}
              onPress={() => handleNavigation(item.screen)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, item.highlight && styles.menuLabelHighlight]}>
                  {item.label}
                </Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.xl, paddingBottom: 100 },
  profileHeader: { alignItems: 'center', paddingTop: 60, marginBottom: Spacing.xl },
  avatarContainer: { position: 'relative', marginBottom: Spacing.base },
  avatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.secondary },
  avatarText: { fontSize: 40 },
  premiumBadge: { position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: 14, backgroundColor: '#FFD700', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: Colors.primary },
  premiumIcon: { fontSize: 14 },
  username: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: 2 },
  email: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginBottom: Spacing.lg },
  statsContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: Colors.surface.glass },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  statLabel: { fontSize: Typography.fontSize.xs, color: Colors.text.tertiary, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: Colors.surface.glassLight },
  quickActions: { flexDirection: 'row', gap: 8, marginBottom: Spacing.xl },
  quickAction: { flex: 1, borderRadius: BorderRadius.lg, overflow: 'hidden' },
  quickActionGradient: { alignItems: 'center', paddingVertical: Spacing.base, gap: 4 },
  quickActionIcon: { fontSize: 24 },
  quickActionLabel: { fontSize: Typography.fontSize.xs, color: Colors.text.secondary, fontWeight: Typography.fontWeight.medium },
  menuContainer: { backgroundColor: Colors.surface.card, borderRadius: BorderRadius['2xl'], overflow: 'hidden', borderWidth: 1, borderColor: Colors.surface.glass, marginBottom: Spacing.xl },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.surface.glass },
  menuItemHighlight: { backgroundColor: 'rgba(139, 92, 246, 0.08)' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: { fontSize: 18 },
  menuLabel: { fontSize: Typography.fontSize.base, color: Colors.text.primary, fontWeight: Typography.fontWeight.medium },
  menuLabelHighlight: { color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
  menuArrow: { fontSize: 22, color: Colors.text.tertiary },
  logoutButton: { alignItems: 'center', paddingVertical: 14, backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: BorderRadius.base, borderWidth: 1, borderColor: 'rgba(239, 68, 68, 0.2)' },
  logoutText: { fontSize: Typography.fontSize.md, color: Colors.error, fontWeight: Typography.fontWeight.semibold },
});

export default ProfileScreen;
