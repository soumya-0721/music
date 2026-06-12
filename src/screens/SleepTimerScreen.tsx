import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';

const TIMER_OPTIONS = [
  { label: '5 minutes', value: 5 },
  { label: '15 minutes', value: 15 },
  { label: '30 minutes', value: 30 },
  { label: '45 minutes', value: 45 },
  { label: '1 hour', value: 60 },
  { label: 'End of song', value: -1 },
];

const SleepTimerScreen = ({ navigation }: any) => {
  const [selectedMinutes, setSelectedMinutes] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const startTimer = (minutes: number) => {
    setSelectedMinutes(minutes);
    setIsActive(true);
    setRemainingSeconds(minutes * 60);
  };

  const stopTimer = () => {
    setIsActive(false);
    setSelectedMinutes(null);
    setRemainingSeconds(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0D1225']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backIcon}>✕</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sleep Timer</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Timer Display */}
        <View style={styles.timerDisplay}>
          {isActive ? (
            <>
              <Text style={styles.timerValue}>{formatTime(remainingSeconds)}</Text>
              <Text style={styles.timerLabel}>remaining</Text>
              <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
                <Text style={styles.stopText}>Stop Timer</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.moonIcon}>🌙</Text>
              <Text style={styles.timerTitle}>Set Sleep Timer</Text>
              <Text style={styles.timerDesc}>
                Music will stop playing after the selected time
              </Text>
            </>
          )}
        </View>

        {/* Timer Options */}
        {!isActive && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsTitle}>Select Duration</Text>
            {TIMER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.optionCard,
                  selectedMinutes === option.value && styles.optionCardActive,
                ]}
                onPress={() => startTimer(option.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.optionText, selectedMinutes === option.value && styles.optionTextActive]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Tips */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips</Text>
          <Text style={styles.tipsText}>
            Sleep timer helps you fall asleep to music without draining your battery.
            Choose "End of song" to stop after the current track finishes.
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
  timerDisplay: { alignItems: 'center', paddingVertical: Spacing['3xl'], marginBottom: Spacing.xl },
  moonIcon: { fontSize: 64, marginBottom: Spacing.base },
  timerValue: { fontSize: Typography.fontSize['6xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wider },
  timerLabel: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginBottom: Spacing.lg },
  timerTitle: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.sm },
  timerDesc: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, textAlign: 'center', lineHeight: 22 },
  stopButton: { paddingVertical: 12, paddingHorizontal: Spacing.xl, borderRadius: BorderRadius.full, backgroundColor: Colors.error, ...Shadows.neonCoral },
  stopText: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary },
  optionsContainer: { marginBottom: Spacing.xl },
  optionsTitle: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.base },
  optionCard: { paddingVertical: 14, paddingHorizontal: Spacing.base, backgroundColor: Colors.surface.card, borderRadius: BorderRadius.md, marginBottom: 8, borderWidth: 1, borderColor: Colors.surface.glass },
  optionCardActive: { borderColor: Colors.secondary, backgroundColor: 'rgba(139, 92, 246, 0.1)' },
  optionText: { fontSize: Typography.fontSize.base, color: Colors.text.secondary, fontWeight: Typography.fontWeight.medium },
  optionTextActive: { color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
  tipsCard: { backgroundColor: 'rgba(139, 92, 246, 0.08)', borderRadius: BorderRadius.lg, padding: Spacing.base, borderWidth: 1, borderColor: 'rgba(139, 92, 246, 0.15)' },
  tipsTitle: { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, marginBottom: Spacing.xs },
  tipsText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, lineHeight: 20 },
});

export default SleepTimerScreen;
