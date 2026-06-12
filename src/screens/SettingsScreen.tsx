import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors, themeNames, BorderRadius, Spacing, Typography, Shadows } from '../theme';
import type { ThemeName } from '../theme';

const SettingsScreen = ({ navigation }: any) => {
  const { colors, theme, setTheme } = useThemeColors();
  const [crossfade, setCrossfade] = useState(false);
  const [gapless, setGapless] = useState(true);
  const [volumeNorm, setVolumeNorm] = useState(true);
  const [wifiStream, setWifiStream] = useState(false);
  const [highQuality, setHighQuality] = useState(true);
  const [wifiDownload, setWifiDownload] = useState(true);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const availableThemes: { key: ThemeName; label: string; gradient: readonly [string, string] }[] = [
    { key: 'midnight-gold', label: 'Midnight Gold', gradient: ['#0F0F0F', '#1A1510'] },
    { key: 'emerald-luxe', label: 'Emerald Luxe', gradient: ['#090909', '#0F1A12'] },
    { key: 'sunset-orange', label: 'Sunset Orange', gradient: ['#111111', '#1E1810'] },
    { key: 'cherry-red', label: 'Cherry Red', gradient: ['#0B0B0B', '#1A0E10'] },
    { key: 'titanium-silver', label: 'Titanium Silver', gradient: ['#0A0A0A', '#141414'] },
  ];

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: '👤', label: 'Edit Profile', screen: 'Profile' },
        { icon: '🔒', label: 'Change Password', screen: 'Profile' },
        { icon: '📧', label: 'Email Preferences', screen: 'Notifications' },
      ],
    },
    {
      title: 'Playback',
      items: [
        { icon: '🎚️', label: 'Equalizer', screen: 'Equalizer' },
        { icon: '🔄', label: 'Crossfade' },
        { icon: '📦', label: 'Gapless Playback' },
        { icon: '🔊', label: 'Volume Normalization' },
      ],
    },
    {
      title: 'Audio Quality',
      items: [
        { icon: '📶', label: 'Stream via Wi-Fi only' },
        { icon: '🎧', label: 'High Quality Streaming' },
        { icon: '⬇️', label: 'Download via Wi-Fi only' },
      ],
    },
    {
      title: 'Appearance',
      items: [
        { icon: '🎨', label: 'Theme' },
        { icon: '🔔', label: 'Notifications', screen: 'Notifications' },
        { icon: '🌐', label: 'Language' },
      ],
    },
    {
      title: 'About',
      items: [
        { icon: 'ℹ️', label: 'About App', screen: 'HelpCenter' },
        { icon: '📜', label: 'Terms & Conditions', screen: 'HelpCenter' },
        { icon: '📞', label: 'Contact Us', screen: 'HelpCenter' },
        { icon: '❓', label: 'Help Center', screen: 'HelpCenter' },
      ],
    },
  ];

  const getToggle = (label: string) => {
    switch (label) {
      case 'Crossfade': return crossfade;
      case 'Gapless Playback': return gapless;
      case 'Volume Normalization': return volumeNorm;
      case 'Stream via Wi-Fi only': return wifiStream;
      case 'High Quality Streaming': return highQuality;
      case 'Download via Wi-Fi only': return wifiDownload;
      default: return false;
    }
  };

  const handleToggle = (label: string) => {
    switch (label) {
      case 'Crossfade': setCrossfade(!crossfade); break;
      case 'Gapless Playback': setGapless(!gapless); break;
      case 'Volume Normalization': setVolumeNorm(!volumeNorm); break;
      case 'Stream via Wi-Fi only': setWifiStream(!wifiStream); break;
      case 'High Quality Streaming': setHighQuality(!highQuality); break;
      case 'Download via Wi-Fi only': setWifiDownload(!wifiDownload); break;
    }
  };

  return (
    <LinearGradient colors={[colors.primary, colors.gradients.primary[1], colors.surface.primary]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.backBtn, { backgroundColor: colors.surface.glass, borderColor: colors.surface.glassLight }]}>
            <Text style={[styles.backIcon, { color: colors.text.primary }]}>‹</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text.primary }]}>Settings</Text>
          <View style={{ width: 44 }} />
        </View>

        {settingsSections.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text.tertiary }]}>{section.title}</Text>
            <View style={[styles.sectionCard, { backgroundColor: colors.surface.card, borderColor: colors.surface.glass }]}>
              {section.items.map((item, iIndex) => {
                const isToggle = !item.screen;
                const isThemeItem = item.label === 'Theme';
                const value = getToggle(item.label);

                return (
                  <TouchableOpacity
                    key={iIndex}
                    style={[styles.settingItem, { borderBottomColor: colors.surface.glass }, iIndex < section.items.length - 1 && styles.settingItemBorder]}
                    onPress={() => {
                      if (isThemeItem) setShowThemeModal(true);
                      else if (item.screen) navigation.navigate(item.screen);
                    }}
                    activeOpacity={isToggle ? 1 : 0.7}
                  >
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <Text style={[styles.settingLabel, { color: colors.text.primary }]}>{item.label}</Text>
                    {isToggle ? (
                      <Switch
                        value={value}
                        onValueChange={() => handleToggle(item.label)}
                        trackColor={{ false: colors.text.muted, true: `${colors.secondary}40` }}
                        thumbColor={value ? colors.secondary : colors.text.tertiary}
                      />
                    ) : isThemeItem ? (
                      <View style={styles.themeIndicator}>
                        <View style={[styles.themeDot, { backgroundColor: colors.secondary }]} />
                        <Text style={[styles.themeLabel, { color: colors.text.tertiary }]}>{themeNames[theme]}</Text>
                        <Text style={[styles.arrow, { color: colors.text.tertiary }]}>›</Text>
                      </View>
                    ) : (
                      <Text style={[styles.arrow, { color: colors.text.tertiary }]}>›</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Theme Selection Modal */}
      <Modal visible={showThemeModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface.primary, borderColor: colors.surface.glassLight }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text.primary }]}>Choose Theme</Text>
              <TouchableOpacity onPress={() => setShowThemeModal(false)}>
                <Text style={[styles.modalClose, { color: colors.text.tertiary }]}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.themeGrid}>
              {availableThemes.map((t) => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.themeCard, theme === t.key && { borderColor: colors.secondary, borderWidth: 2 }]}
                  onPress={() => {
                    setTheme(t.key);
                    setShowThemeModal(false);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={t.gradient} style={styles.themePreview}>
                    {theme === t.key && <Text style={styles.themeCheck}>✓</Text>}
                  </LinearGradient>
                  <Text style={[styles.themeName, { color: colors.text.secondary }]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing.xl },
  backBtn: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  backIcon: { fontSize: 28, marginTop: -2 },
  headerTitle: { fontSize: 18, fontWeight: '700' },
  section: { marginBottom: Spacing.lg },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 1.5, marginBottom: Spacing.sm, textTransform: 'uppercase' },
  sectionCard: { borderRadius: BorderRadius.lg, overflow: 'hidden', borderWidth: 1 },
  settingItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: Spacing.base, gap: 12 },
  settingItemBorder: { borderBottomWidth: 1 },
  settingIcon: { fontSize: 18, width: 28 },
  settingLabel: { flex: 1, fontSize: 14, fontWeight: '500' },
  arrow: { fontSize: 22 },
  themeIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  themeDot: { width: 12, height: 12, borderRadius: 6 },
  themeLabel: { fontSize: 13, fontWeight: '500' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.6)' },
  modalContent: { borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: Spacing.xl, paddingBottom: 40, borderWidth: 1, borderBottomWidth: 0 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xl },
  modalTitle: { fontSize: 20, fontWeight: '800' },
  modalClose: { fontSize: 20, fontWeight: '700', padding: 4 },
  themeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  themeCard: { width: '30%', alignItems: 'center', borderRadius: BorderRadius.base, overflow: 'hidden', borderColor: 'transparent', borderWidth: 2 },
  themePreview: { width: '100%', height: 68, borderRadius: BorderRadius.base, alignItems: 'center', justifyContent: 'center' },
  themeCheck: { fontSize: 24, color: '#FFFFFF', fontWeight: '900', textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 4 },
  themeName: { fontSize: 12, fontWeight: '600', marginTop: 6, textAlign: 'center' },
});

export default SettingsScreen;
