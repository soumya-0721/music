import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';

const PLANS = [
  {
    id: 'monthly',
    name: 'VIBRIX Premium',
    price: '$9.99',
    period: '/month',
    popular: true,
    features: [
      'Ad-free music streaming',
      'Offline downloads',
      'High-quality audio (320kbps)',
      'Sleep timer',
      '10-band equalizer',
      'Crossfade support',
      'Mini player',
      'Recently played history',
      'Dynamic recommendations',
    ],
  },
  {
    id: 'yearly',
    name: 'VIBRIX Pro',
    price: '$79.99',
    period: '/year',
    popular: false,
    features: [
      'Everything in Premium',
      'Lossless audio (Hi-Fi)',
      'AI mood-based playlists',
      'Smart shuffle',
      'Collaborative playlists',
      'Early access to new features',
      'Priority support',
      'Exclusive artist content',
      'Custom app themes',
    ],
  },
];

const PremiumScreen = ({ navigation }: any) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0B1020']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.headerContent}>
          <Text style={styles.crownIcon}>👑</Text>
          <Text style={styles.headerTitle}>Go Premium</Text>
          <Text style={styles.headerSubtitle}>Unlock the full VIBRIX experience</Text>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[styles.planCard, selectedPlan === plan.id && styles.planCardActive, plan.popular && styles.planCardPopular]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.7}
            >
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Most Popular</Text>
                </View>
              )}
              <Text style={styles.planName}>{plan.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{plan.price}</Text>
                <Text style={styles.period}>{plan.period}</Text>
              </View>
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text style={styles.featureCheck}>✓</Text>
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Subscribe Button */}
        <TouchableOpacity style={styles.subscribeButton}>
          <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.subscribeGradient}>
            <Text style={styles.subscribeText}>
              Subscribe to {selectedPlan === 'monthly' ? 'Premium' : 'Pro'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>
          Subscription auto-renews. Cancel anytime.{'\n'}
          Free trial available for new subscribers.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { paddingTop: 60, marginBottom: Spacing.sm },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 20, color: Colors.text.primary },
  headerContent: { alignItems: 'center', marginBottom: Spacing['2xl'] },
  crownIcon: { fontSize: 48, marginBottom: Spacing.base },
  headerTitle: { fontSize: Typography.fontSize['4xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.sm },
  headerSubtitle: { fontSize: Typography.fontSize.md, color: Colors.text.tertiary, textAlign: 'center' },
  plansContainer: { gap: Spacing.base, marginBottom: Spacing.xl },
  planCard: { backgroundColor: Colors.surface.card, borderRadius: BorderRadius['2xl'], padding: Spacing.xl, borderWidth: 1, borderColor: Colors.surface.glass, position: 'relative' },
  planCardActive: { borderColor: Colors.secondary, backgroundColor: 'rgba(139, 92, 246, 0.05)' },
  planCardPopular: { ...Shadows.glow },
  popularBadge: { position: 'absolute', top: -12, alignSelf: 'center', backgroundColor: Colors.secondary, paddingHorizontal: Spacing.base, paddingVertical: 4, borderRadius: BorderRadius.full },
  popularText: { fontSize: Typography.fontSize.xs, color: Colors.text.primary, fontWeight: Typography.fontWeight.semibold, letterSpacing: Typography.letterSpacing.wide },
  planName: { fontSize: Typography.fontSize.xl, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, textAlign: 'center', marginBottom: Spacing.sm },
  priceRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', marginBottom: Spacing.lg },
  price: { fontSize: Typography.fontSize['5xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary },
  period: { fontSize: Typography.fontSize.md, color: Colors.text.tertiary, marginLeft: 4 },
  featuresContainer: { gap: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  featureCheck: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.bold },
  featureText: { fontSize: Typography.fontSize.base, color: Colors.text.secondary, flex: 1 },
  subscribeButton: { borderRadius: BorderRadius.base, overflow: 'hidden', marginBottom: Spacing.base, ...Shadows.glow },
  subscribeGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  subscribeText: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
  termsText: { fontSize: Typography.fontSize.sm, color: Colors.text.muted, textAlign: 'center', lineHeight: 20 },
});

export default PremiumScreen;
