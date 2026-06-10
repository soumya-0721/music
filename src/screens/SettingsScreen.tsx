import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing } from '../theme';

const SettingsScreen = ({ navigation }: any) => {
  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Edit Profile', type: 'navigation' as const, screen: 'Profile' },
        { icon: '🔒', label: 'Change Password', type: 'navigation' as const, screen: 'Profile' },
        { icon: '📧', label: 'Email Preferences', type: 'navigation' as const, screen: 'Notifications' },
      ],
    },
    {
      title: 'Playback',
      items: [
        { icon: '🎚️', label: 'Equalizer', type: 'navigation' as const, screen: 'Equalizer' },
        { icon: '🔄', label: 'Crossfade', type: 'toggle' as const, value: false },
        { icon: '📦', label: 'Gapless Playback', type: 'toggle' as const, value: true },
        { icon: '🔊', label: 'Volume Normalization', type: 'toggle' as const, value: true },
      ],
    },
    {
      title: 'Audio Quality',
      items: [
        { icon: '📶', label: 'Stream via Wi-Fi only', type: 'toggle' as const, value: false },
        { icon: '🎧', label: 'High Quality Streaming', type: 'toggle' as const, value: true },
        { icon: '⬇️', label: 'Download via Wi-Fi only', type: 'toggle' as const, value: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { icon: '🎨', label: 'Theme', type: 'navigation' as const, screen: 'Profile' },
        { icon: '🔔', label: 'Notifications', type: 'navigation' as const, screen: 'Notifications' },
        { icon: '🛡️', label: 'Privacy', type: 'navigation' as const, screen: 'Profile' },
        { icon: '🌐', label: 'Language', type: 'navigation' as const, screen: 'Profile' },
      ],
    },
    {
      title: 'About',
      items: [
        { icon: 'ℹ️', label: 'About App', type: 'navigation' as const, screen: 'HelpCenter' },
        { icon: '📜', label: 'Terms & Conditions', type: 'navigation' as const, screen: 'HelpCenter' },
        { icon: '📞', label: 'Contact Us', type: 'navigation' as const, screen: 'HelpCenter' },
        { icon: '❓', label: 'Help Center', type: 'navigation' as const, screen: 'HelpCenter' },
      ],
    },
  ];

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 44 }} />
        </View>

        {settingsSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionCard}>
              {section.items.map((item, iIndex) => (
                <TouchableOpacity
                  key={iIndex}
                  style={[styles.settingItem, iIndex < section.items.length - 1 && styles.settingItemBorder]}
                  onPress={item.type === 'navigation' ? () => navigation.navigate(item.screen) : undefined}
                  activeOpacity={item.type === 'navigation' ? 0.7 : 1}
                >
                  <Text style={styles.settingIcon}>{item.icon}</Text>
                  <Text style={styles.settingLabel}>{item.label}</Text>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      trackColor={{ false: Colors.text.muted, true: 'rgba(139, 92, 246, 0.4)' }}
                      thumbColor={item.value ? Colors.secondary : Colors.text.tertiary}
                    />
                  ) : (
                    <Text style={styles.arrow}>›</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing.xl },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  backIcon: { fontSize: 28, color: Colors.text.primary, marginTop: -2 },
  headerTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semibold, color: Colors.text.tertiary, letterSpacing: Typography.letterSpacing.wide, marginBottom: Spacing.sm, textTransform: 'uppercase' },
  sectionCard: { backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Colors.surface.glass },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: Spacing.base, gap: 12 },
  settingItemBorder: { borderBottomWidth: 1, borderBottomColor: Colors.surface.glass },
  settingIcon: { fontSize: 18, width: 28 },
  settingLabel: { flex: 1, fontSize: Typography.fontSize.base, color: Colors.text.primary, fontWeight: Typography.fontWeight.medium },
  arrow: { fontSize: 22, color: Colors.text.tertiary },
});

export default SettingsScreen;
