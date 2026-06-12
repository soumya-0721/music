import React, { useState, useRef } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors, BorderRadius, Spacing, Typography, Shadows } from '../theme';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const { colors } = useThemeColors();
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleSend = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsSent(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <LinearGradient colors={[colors.primary, colors.gradients.primary[1], colors.surface.primary]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.backIcon, { color: colors.text.secondary }]}>←</Text>
        </TouchableOpacity>

        <Animated.View style={{ opacity: fadeAnim, flex: 1, justifyContent: 'center' }}>
          {!isSent ? (
            <>
              <Text style={[styles.icon]}>🔑</Text>
              <Text style={[styles.title, { color: colors.text.primary }]}>Forgot Password</Text>
              <Text style={[styles.subtitle, { color: colors.text.tertiary }]}>
                Enter your email address and we'll send you a code to reset your password.
              </Text>

              <View style={[styles.inputContainer, { backgroundColor: colors.inputBg, borderColor: colors.inputBorder }]}>
                <Text style={[styles.inputIcon]}>✉️</Text>
                <TextInput
                  style={[styles.input, { color: colors.text.primary }]}
                  placeholder="Email address"
                  placeholderTextColor={colors.text.muted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.sendButton} onPress={handleSend} activeOpacity={0.8}>
                <LinearGradient colors={[colors.secondary, colors.gradients.secondary[1]]} style={styles.sendGradient}>
                  <Text style={styles.sendText}>Send Reset Code</Text>
                </LinearGradient>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={[styles.icon]}>📧</Text>
              <Text style={[styles.title, { color: colors.text.primary }]}>Check Your Email</Text>
              <Text style={[styles.subtitle, { color: colors.text.tertiary }]}>
                We've sent a password reset code to {email}
              </Text>

              <TouchableOpacity
                style={styles.sendButton}
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.8}
              >
                <LinearGradient colors={[colors.secondary, colors.gradients.secondary[1]]} style={styles.sendGradient}>
                  <Text style={styles.sendText}>Back to Login</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity style={styles.resendButton} onPress={handleSend}>
                <Text style={[styles.resendText, { color: colors.secondary }]}>Resend Code</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.xl },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  backIcon: { fontSize: 28, fontWeight: '700' },
  icon: { fontSize: 56, textAlign: 'center', marginBottom: Spacing.lg },
  title: { fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: Spacing.sm, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: Spacing['2xl'], paddingHorizontal: Spacing.lg },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderRadius: BorderRadius.base, paddingHorizontal: Spacing.base, borderWidth: 1, marginBottom: Spacing.xl, height: 52 },
  inputIcon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, paddingVertical: 14, fontSize: 15, fontWeight: '500' },
  sendButton: { borderRadius: BorderRadius.base, overflow: 'hidden', marginBottom: Spacing.base, ...Shadows.glow },
  sendGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  sendText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  resendButton: { alignItems: 'center', paddingVertical: Spacing.base },
  resendText: { fontSize: 14, fontWeight: '600' },
});

export default ForgotPasswordScreen;
