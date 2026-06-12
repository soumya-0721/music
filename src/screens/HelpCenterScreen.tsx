import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing } from '../theme';

const HelpCenterScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'about' | 'faq' | 'contact'>('about');

  const faqItems = [
    { q: 'How do I create a playlist?', a: 'Go to the Playlists tab and tap the + button to create a new playlist. Give it a name and start adding your favorite songs.' },
    { q: 'Can I download songs offline?', a: 'Yes! Premium subscribers can download songs for offline listening. Just tap the download icon on any song or album.' },
    { q: 'How does the sleep timer work?', a: 'The sleep timer automatically stops playback after a set duration. Find it in the Music Player menu or Settings.' },
    { q: 'What audio quality is available?', a: 'Standard quality is 128kbps. Premium subscribers get 320kbps, and Pro subscribers get lossless Hi-Fi audio.' },
    { q: 'How do I cancel my subscription?', a: 'Go to Settings > Subscription to manage or cancel your subscription at any time.' },
  ];

  const tabs = [
    { key: 'about' as const, label: 'About' },
    { key: 'faq' as const, label: 'FAQ' },
    { key: 'contact' as const, label: 'Contact' },
  ];

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Help Center</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabBar}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, activeTab === tab.key && styles.activeTab]}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'about' && (
          <View style={styles.aboutContainer}>
            <Text style={styles.appName}>VIBRIX</Text>
            <Text style={styles.tagline}>"Feel Every Beat."</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
            <View style={styles.infoCard}>
              <Text style={styles.infoText}>
                VIBRIX is a premium music streaming platform designed for music lovers 
                who want a unique, immersive experience. With a futuristic design, 
                intelligent recommendations, and high-quality audio, VIBRIX brings 
                you closer to the music you love.
              </Text>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>10M+</Text>
                <Text style={styles.statLabel}>Songs</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>50M+</Text>
                <Text style={styles.statLabel}>Users</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>100+</Text>
                <Text style={styles.statLabel}>Countries</Text>
              </View>
            </View>
            <Text style={styles.termsLink}>Terms & Conditions</Text>
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </View>
        )}

        {activeTab === 'faq' && (
          <View style={styles.faqContainer}>
            {faqItems.map((item, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{item.q}</Text>
                <Text style={styles.faqAnswer}>{item.a}</Text>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'contact' && (
          <View style={styles.contactContainer}>
            <View style={styles.contactCard}>
              <Text style={styles.contactIcon}>📧</Text>
              <Text style={styles.contactLabel}>Email</Text>
              <Text style={styles.contactValue}>support@vibrix.com</Text>
            </View>
            <View style={styles.contactCard}>
              <Text style={styles.contactIcon}>🐦</Text>
              <Text style={styles.contactLabel}>Twitter</Text>
              <Text style={styles.contactValue}>@vibrixmusic</Text>
            </View>
            <View style={styles.contactCard}>
              <Text style={styles.contactIcon}>💬</Text>
              <Text style={styles.contactLabel}>Live Chat</Text>
              <Text style={styles.contactValue}>Available 24/7</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.responseText}>
                We typically respond within 24 hours. For urgent issues, 
                use the live chat feature.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing.lg },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Colors.surface.glassLight },
  backIcon: { fontSize: 28, color: Colors.text.primary, marginTop: -2 },
  headerTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  tabBar: { flexDirection: 'row', backgroundColor: Colors.surface.glass, borderRadius: BorderRadius.full, padding: 4, marginBottom: Spacing.xl },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: BorderRadius.full },
  activeTab: { backgroundColor: Colors.secondary },
  tabText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, fontWeight: Typography.fontWeight.medium },
  activeTabText: { color: Colors.text.primary, fontWeight: Typography.fontWeight.semibold },
  aboutContainer: { alignItems: 'center' },
  appName: { fontSize: Typography.fontSize['4xl'], fontWeight: Typography.fontWeight.black, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wider, marginBottom: 4, textShadowColor: 'rgba(139, 92, 246, 0.3)', textShadowRadius: 10 },
  tagline: { fontSize: Typography.fontSize.md, color: Colors.text.tertiary, marginBottom: Spacing.xs, letterSpacing: Typography.letterSpacing.wide },
  version: { fontSize: Typography.fontSize.sm, color: Colors.text.muted, marginBottom: Spacing.lg },
  infoCard: { backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: Colors.surface.glass, marginBottom: Spacing.lg },
  infoText: { fontSize: Typography.fontSize.base, color: Colors.text.secondary, lineHeight: 24, textAlign: 'center' },
  statsRow: { flexDirection: 'row', gap: 12, marginBottom: Spacing.lg },
  statCard: { flex: 1, backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, alignItems: 'center', borderWidth: 1, borderColor: Colors.surface.glass },
  statValue: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.secondary },
  statLabel: { fontSize: Typography.fontSize.xs, color: Colors.text.tertiary, marginTop: 2 },
  termsLink: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.medium, marginBottom: Spacing.sm, textDecorationLine: 'underline' },
  faqContainer: { gap: Spacing.sm },
  faqItem: { backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: Colors.surface.glass },
  faqQuestion: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: Spacing.xs },
  faqAnswer: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, lineHeight: 20 },
  contactContainer: { gap: Spacing.sm },
  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, gap: Spacing.sm, borderWidth: 1, borderColor: Colors.surface.glass },
  contactIcon: { fontSize: 24, width: 36 },
  contactLabel: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, flex: 1 },
  contactValue: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary },
  responseText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, textAlign: 'center', lineHeight: 20 },
});

export default HelpCenterScreen;
