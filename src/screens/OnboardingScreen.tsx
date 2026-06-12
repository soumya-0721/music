import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { ONBOARDING_DATA } from '../constants';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const renderSlide = ({ item, index }: any) => (
    <View style={styles.slide}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.slideImage}
        blurRadius={2}
      >
        <LinearGradient
          colors={['transparent', Colors.primary]}
          style={styles.slideOverlay}
        />
        <LinearGradient
          colors={item.gradient}
          style={styles.slideAccent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </ImageBackground>
      <View style={styles.slideContent}>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    </View>
  );

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      {/* Skip button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Bottom controls */}
      <View style={styles.bottomContainer}>
        {/* Dots */}
        <View style={styles.dotsContainer}>
          {ONBOARDING_DATA.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>

        {/* Next/Get Started button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#8B5CF6', '#6D28D9']}
            style={styles.nextGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextText}>
              {currentIndex === ONBOARDING_DATA.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.primary },
  slide: { width, flex: 1 },
  slideImage: { width, height: height * 0.6, justifyContent: 'flex-end' },
  slideOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 200 },
  slideAccent: { position: 'absolute', top: 0, left: 0, right: 0, height: 4 },
  slideContent: { flex: 1, paddingHorizontal: Spacing.xl, paddingTop: Spacing['2xl'], justifyContent: 'center' },
  slideTitle: { fontSize: Typography.fontSize['4xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, marginBottom: Spacing.base, letterSpacing: Typography.letterSpacing.tight },
  slideSubtitle: { fontSize: Typography.fontSize.md, color: Colors.text.secondary, lineHeight: 24, letterSpacing: Typography.letterSpacing.wide },
  skipButton: { position: 'absolute', top: 60, right: 24, padding: 12 },
  skipText: { fontSize: Typography.fontSize.md, color: Colors.text.tertiary, fontWeight: Typography.fontWeight.medium },
  bottomContainer: { paddingHorizontal: Spacing.xl, paddingBottom: 50, paddingTop: Spacing.lg, gap: Spacing.xl },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.text.muted },
  dotActive: { width: 32, backgroundColor: Colors.secondary, borderRadius: 4 },
  nextButton: { borderRadius: BorderRadius.base, overflow: 'hidden', ...Shadows.glow },
  nextGradient: { paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
  nextText: { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
});

export default OnboardingScreen;
