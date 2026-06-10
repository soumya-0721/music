import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { MOCK_ARTISTS, MOCK_GENRES } from '../constants';

const { width } = Dimensions.get('window');

const MOODS = ['Happy', 'Chill', 'Energetic', 'Sad', 'Romantic', 'Focused', 'Party', 'Relaxed'];
const LANGUAGES = ['English', 'Hindi', 'Spanish', 'French', 'Arabic', 'Japanese', 'Korean', 'Portuguese'];

const ProfileSetupScreen = ({ navigation }: any) => {
  const [step, setStep] = useState(0);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleArtist = (id: string) => {
    setSelectedArtists(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const toggleGenres = (id: string) => {
    setSelectedGenres(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const toggleMood = (mood: string) => {
    setSelectedMoods(prev =>
      prev.includes(mood) ? prev.filter(m => m !== mood) : [...prev, mood]
    );
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigation.replace('MainTabs');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <View>
            <Text style={styles.stepTitle}>Favorite Artists</Text>
            <Text style={styles.stepSubtitle}>Select at least 3 artists you love</Text>
            <View style={styles.chipContainer}>
              {MOCK_ARTISTS.map(artist => (
                <TouchableOpacity
                  key={artist.id}
                  style={[styles.chip, selectedArtists.includes(artist.id) && styles.chipSelected]}
                  onPress={() => toggleArtist(artist.id)}
                >
                  <Text style={[styles.chipText, selectedArtists.includes(artist.id) && styles.chipTextSelected]}>
                    {artist.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 1:
        return (
          <View>
            <Text style={styles.stepTitle}>Favorite Genres</Text>
            <Text style={styles.stepSubtitle}>Pick the genres that define your vibe</Text>
            <View style={styles.chipContainer}>
              {MOCK_GENRES.map(genre => (
                <TouchableOpacity
                  key={genre.id}
                  style={[styles.chip, selectedGenres.includes(genre.id) && styles.chipSelected]}
                  onPress={() => toggleGenres(genre.id)}
                >
                  <Text style={[styles.chipText, selectedGenres.includes(genre.id) && styles.chipTextSelected]}>
                    {genre.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <Text style={styles.stepTitle}>Language</Text>
            <Text style={styles.stepSubtitle}>Choose your preferred language</Text>
            <View style={styles.chipContainer}>
              {LANGUAGES.map(lang => (
                <TouchableOpacity
                  key={lang}
                  style={[styles.chip, selectedLanguage === lang && styles.chipSelected]}
                  onPress={() => setSelectedLanguage(lang)}
                >
                  <Text style={[styles.chipText, selectedLanguage === lang && styles.chipTextSelected]}>
                    {lang}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <Text style={styles.stepTitle}>Mood Preferences</Text>
            <Text style={styles.stepSubtitle}>How do you want to feel?</Text>
            <View style={styles.chipContainer}>
              {MOODS.map(mood => (
                <TouchableOpacity
                  key={mood}
                  style={[styles.chip, selectedMoods.includes(mood) && styles.chipSelected]}
                  onPress={() => toggleMood(mood)}
                >
                  <Text style={[styles.chipText, selectedMoods.includes(mood) && styles.chipTextSelected]}>
                    {mood}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  const progress = ((step + 1) / 4) * 100;

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0B1020']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.logo}>VIBRIX</Text>
        <Text style={styles.title}>Set Up Your Profile</Text>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{step + 1}/4</Text>
        </View>

        {renderStep()}

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#8B5CF6', '#6D28D9']}
            style={styles.nextGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextText}>
              {step === 3 ? 'Get Started' : 'Continue'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: 40 },
  logo: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.black, color: Colors.text.primary, textAlign: 'center', letterSpacing: Typography.letterSpacing.wider, marginBottom: 4 },
  title: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, textAlign: 'center', marginBottom: Spacing.xl },
  progressContainer: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base, marginBottom: Spacing['2xl'] },
  progressBar: { flex: 1, height: 4, backgroundColor: Colors.text.muted, borderRadius: 2, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.secondary, borderRadius: 2 },
  progressText: { fontSize: Typography.fontSize.sm, color: Colors.text.tertiary, fontWeight: Typography.fontWeight.medium },
  stepTitle: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.xs },
  stepSubtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, marginBottom: Spacing.xl },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Spacing['2xl'] },
  chip: { paddingHorizontal: Spacing.base, paddingVertical: 12, borderRadius: BorderRadius.full, backgroundColor: Colors.surface.glass, borderWidth: 1, borderColor: Colors.surface.glassLight },
  chipSelected: { backgroundColor: 'rgba(139, 92, 246, 0.2)', borderColor: Colors.secondary },
  chipText: { fontSize: Typography.fontSize.base, color: Colors.text.secondary, fontWeight: Typography.fontWeight.medium },
  chipTextSelected: { color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
  nextButton: { borderRadius: BorderRadius.base, overflow: 'hidden', marginTop: Spacing.lg, ...Shadows.glow },
  nextGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
});

export default ProfileSetupScreen;
