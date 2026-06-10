import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';

const { width } = Dimensions.get('window');

const PRESETS = [
  { id: 'normal', name: 'Normal', bands: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { id: 'pop', name: 'Pop', bands: [-2, 2, 4, 6, 3, 0, 1, 3, 4, 2] },
  { id: 'rock', name: 'Rock', bands: [5, 3, 1, -2, -4, -2, 2, 4, 5, 6] },
  { id: 'jazz', name: 'Jazz', bands: [4, 3, 1, 0, 2, 3, 5, 4, 3, 2] },
  { id: 'classical', name: 'Classical', bands: [6, 4, 2, 0, -2, -4, -2, 0, 3, 5] },
  { id: 'electronic', name: 'Electronic', bands: [5, 3, 0, -3, -5, -3, 0, 3, 5, 7] },
  { id: 'hiphop', name: 'Hip Hop', bands: [6, 5, 3, 0, -3, -4, -3, 0, 2, 4] },
  { id: 'custom', name: 'Custom', bands: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

const BAND_LABELS = ['32Hz', '64Hz', '125Hz', '250Hz', '500Hz', '1kHz', '2kHz', '4kHz', '8kHz', '16kHz'];

const EqualizerScreen = ({ navigation }: any) => {
  const [selectedPreset, setSelectedPreset] = useState('normal');
  const [bands, setBands] = useState(PRESETS[0].bands);
  const [isActive, setIsActive] = useState(true);

  const selectPreset = (preset: typeof PRESETS[0]) => {
    setSelectedPreset(preset.id);
    setBands(preset.bands);
  };

  const BAR_WIDTH = (width - 80) / bands.length - 6;

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Equalizer</Text>
          <TouchableOpacity style={styles.toggleButton} onPress={() => setIsActive(!isActive)}>
            <View style={[styles.toggleIndicator, isActive && styles.toggleActive]} />
          </TouchableOpacity>
        </View>

        {/* EQ Visualizer */}
        <View style={styles.eqContainer}>
          <View style={styles.eqGrid}>
            {bands.map((value, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: Math.abs(value * 6) + 4,
                      backgroundColor: value >= 0 ? Colors.secondary : Colors.accent,
                      width: BAR_WIDTH,
                      opacity: isActive ? 1 : 0.3,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.labelsRow}>
            {BAND_LABELS.map((label, index) => (
              <Text key={index} style={[styles.bandLabel, { width: BAR_WIDTH + 6 }]}>{label}</Text>
            ))}
          </View>
        </View>

        {/* Presets */}
        <Text style={styles.presetsTitle}>Presets</Text>
        <View style={styles.presetsGrid}>
          {PRESETS.map((preset) => (
            <TouchableOpacity
              key={preset.id}
              style={[styles.presetChip, selectedPreset === preset.id && styles.presetChipActive]}
              onPress={() => selectPreset(preset)}
            >
              <Text style={[styles.presetName, selectedPreset === preset.id && styles.presetNameActive]}>
                {preset.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Customize Your Sound</Text>
          <Text style={styles.infoText}>
            Adjust frequencies to match your music genre and personal preference. Save custom presets for different moods.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingBottom: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 60, marginBottom: Spacing['2xl'] },
  backBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.surface.glass, alignItems: 'center', justifyContent: 'center' },
  backIcon: { fontSize: 20, color: Colors.text.primary },
  headerTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  toggleButton: { width: 44, height: 24, borderRadius: 12, backgroundColor: Colors.text.muted, justifyContent: 'center', paddingHorizontal: 2 },
  toggleIndicator: { width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.text.tertiary },
  toggleActive: { backgroundColor: Colors.secondary, alignSelf: 'flex-end' },
  eqContainer: { marginBottom: Spacing['2xl'] },
  eqGrid: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 200, marginBottom: Spacing.sm },
  barContainer: { alignItems: 'center', justifyContent: 'flex-end', height: '100%' },
  bar: { borderRadius: 3, minHeight: 4 },
  labelsRow: { flexDirection: 'row', justifyContent: 'space-between' },
  bandLabel: { fontSize: 8, color: Colors.text.muted, textAlign: 'center' },
  presetsTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.base },
  presetsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: Spacing['2xl'] },
  presetChip: { paddingHorizontal: Spacing.base, paddingVertical: 10, borderRadius: BorderRadius.full, backgroundColor: Colors.surface.glass, borderWidth: 1, borderColor: Colors.surface.glassLight },
  presetChipActive: { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: Colors.secondary },
  presetName: { fontSize: Typography.fontSize.sm, color: Colors.text.secondary, fontWeight: Typography.fontWeight.medium },
  presetNameActive: { color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
  infoCard: { backgroundColor: Colors.surface.card, borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: Colors.surface.glass },
  infoTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: Spacing.xs },
  infoText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, lineHeight: 20 },
});

export default EqualizerScreen;
