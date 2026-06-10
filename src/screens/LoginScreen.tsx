import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { Colors, Typography, BorderRadius, Spacing, Shadows, Glassmorphism } from '../theme';
import { APP_NAME } from '../constants';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    // Mock login - navigate to main tabs
    navigation.replace('MainTabs');
  };

  const socialButtons = [
    { name: 'Google', icon: '🔴', onPress: () => {} },
    { name: 'Apple', icon: '🍎', onPress: () => {} },
    { name: 'Phone', icon: '📱', onPress: () => {} },
  ];

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0B1020']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          {/* Logo */}
          <Text style={styles.logo}>{APP_NAME}</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your vibe</Text>

          {/* Glassmorphism Card */}
          <View style={styles.glassCard}>
            <BlurView
              style={StyleSheet.absoluteFill}
              blurType="dark"
              blurAmount={15}
              reducedTransparencyFallbackColor="rgba(20, 26, 50, 0.8)"
            />
            <View style={styles.glassContent}>
              {/* Email */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.text.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password */}
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.text.muted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeText}>{showPassword ? '👁' : '👁‍🗨'}</Text>
                </TouchableOpacity>
              </View>

              {/* Forgot Password */}
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <LinearGradient
                  colors={['#8B5CF6', '#6D28D9']}
                  style={styles.loginGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.loginText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialContainer}>
            {socialButtons.map((btn, index) => (
              <TouchableOpacity key={btn.name} style={styles.socialButton} onPress={btn.onPress}>
                <Text style={styles.socialIcon}>{btn.icon}</Text>
                <Text style={styles.socialText}>{btn.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1, justifyContent: 'center' },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: Spacing.xl, paddingTop: 80, paddingBottom: 40 },
  logo: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.black, color: Colors.text.primary, textAlign: 'center', letterSpacing: Typography.letterSpacing.wider, marginBottom: 8, textShadowColor: 'rgba(139, 92, 246, 0.3)', textShadowRadius: 10 },
  welcomeText: { fontSize: Typography.fontSize['4xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: Typography.fontSize.md, color: Colors.text.tertiary, textAlign: 'center', marginBottom: Spacing['2xl'], letterSpacing: Typography.letterSpacing.wide },
  glassCard: { borderRadius: BorderRadius['2xl'], overflow: 'hidden', ...Shadows.xl },
  glassContent: { padding: Spacing.xl, gap: Spacing.base },
  inputContainer: { marginBottom: Spacing.sm },
  inputLabel: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.medium, color: Colors.text.secondary, marginBottom: Spacing.xs, letterSpacing: Typography.letterSpacing.wide },
  input: { backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.base, paddingVertical: 14, fontSize: Typography.fontSize.md, color: Colors.text.primary },
  eyeButton: { position: 'absolute', right: 16, bottom: 16 },
  eyeText: { fontSize: 20 },
  forgotButton: { alignSelf: 'flex-end' },
  forgotText: { fontSize: Typography.fontSize.sm, color: Colors.secondary, fontWeight: Typography.fontWeight.medium },
  loginButton: { marginTop: Spacing.sm, borderRadius: BorderRadius.base, overflow: 'hidden', ...Shadows.glow },
  loginGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  loginText: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.xl },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.text.muted },
  dividerText: { marginHorizontal: Spacing.base, fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.base },
  socialButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.glass, paddingVertical: 12, paddingHorizontal: Spacing.base, borderRadius: BorderRadius.base, gap: 8, borderWidth: 1, borderColor: Colors.surface.glassLight },
  socialIcon: { fontSize: 18 },
  socialText: { fontSize: Typography.fontSize.sm, color: Colors.text.secondary, fontWeight: Typography.fontWeight.medium },
  signupContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  signupText: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary },
  signupLink: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
});

export default LoginScreen;
