import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing } from '../theme';
import { useAppSelector } from '../redux/store';

const NotificationsScreen = ({ navigation }: any) => {
  const notifications = [
    { id: '1', title: 'New Release', message: 'Aurora Wave dropped a new album "Electric Nights"', type: 'new_release', time: '2h ago', read: false },
    { id: '2', title: 'Weekly Mix Ready', message: 'Your personalized VIBRIX Weekly mix is updated', type: 'recommendation', time: '5h ago', read: false },
    { id: '3', title: 'Playlist Updated', message: 'Your friend added songs to "Late Night Drive"', type: 'playlist_update', time: '1d ago', read: true },
    { id: '4', title: 'New Follower', message: 'DJ Synthwave started following you', type: 'follow', time: '2d ago', read: true },
    { id: '5', title: 'Top 0.1% Listener', message: "You're in the top 0.1% of Aurora Wave listeners!", type: 'system', time: '3d ago', read: true },
    { id: '6', title: 'New Release', message: 'Check out the latest from Luna Eclipse', type: 'new_release', time: '5d ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={{ width: 44 }} />
        </View>

        <View style={styles.subHeader}>
          <Text style={styles.subtitle}>
            {unreadCount > 0 ? `${unreadCount} unread` : 'No new notifications'}
          </Text>
          {unreadCount > 0 && (
            <TouchableOpacity>
              <Text style={styles.markAllText}>Mark all as read</Text>
            </TouchableOpacity>
          )}
        </View>

        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[styles.notificationCard, !notification.read && styles.unreadCard]}
            activeOpacity={0.7}
          >
            <View style={[styles.typeIcon, { backgroundColor: getTypeColor(notification.type) }]}>
              <Text style={styles.typeEmoji}>{getTypeEmoji(notification.type)}</Text>
            </View>
            <View style={styles.notificationInfo}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              <Text style={styles.notificationMessage} numberOfLines={2}>{notification.message}</Text>
            </View>
            {!notification.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'new_release': return 'rgba(139, 92, 246, 0.2)';
    case 'recommendation': return 'rgba(16, 185, 129, 0.2)';
    case 'follow': return 'rgba(59, 130, 246, 0.2)';
    case 'playlist_update': return 'rgba(245, 158, 11, 0.2)';
    default: return 'rgba(255, 255, 255, 0.1)';
  }
};

const getTypeEmoji = (type: string) => {
  switch (type) {
    case 'new_release': return '💿';
    case 'recommendation': return '🎯';
    case 'follow': return '👤';
    case 'playlist_update': return '📋';
    default: return 'ℹ️';
  }
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing.sm },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  backIcon: { fontSize: 28, color: Colors.text.primary, marginTop: -2 },
  headerTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  subHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl },
  subtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary },
  markAllText: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.medium },
  notificationCard: { flexDirection: 'row', padding: Spacing.base, backgroundColor: Colors.surface.glass, borderRadius: BorderRadius.lg, marginBottom: Spacing.sm, gap: Spacing.sm, alignItems: 'flex-start' },
  unreadCard: { backgroundColor: 'rgba(139, 92, 246, 0.05)', borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.1)' },
  typeIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  typeEmoji: { fontSize: 18 },
  notificationInfo: { flex: 1 },
  notificationHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  notificationTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  notificationTime: { fontSize: Typography.fontSize.xs, color: Colors.text.tertiary },
  notificationMessage: { fontSize: Typography.fontSize.sm, color: Colors.text.secondary, lineHeight: 18 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.secondary, marginTop: 4 },
});

export default NotificationsScreen;
