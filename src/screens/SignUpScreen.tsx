import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Colors, Typography, BorderRadius, Spacing, Shadows } from '../theme';
import { APP_NAME } from '../constants';

const SignUpScreen = ({ navigation }: any) => {
  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const updateForm = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSignUp = () => {
    const { fullName, username, email, password, confirmPassword } = form;
    if (!fullName || !username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    navigation.navigate('ProfileSetup');
  };

  const fields = [
    { key: 'fullName', label: 'Full Name', placeholder: 'Enter your full name', keyboardType: 'default' },
    { key: 'username', label: 'Username', placeholder: 'Choose a username', keyboardType: 'default' },
    { key: 'email', label: 'Email', placeholder: 'Enter your email', keyboardType: 'email-address' },
    { key: 'password', label: 'Password', placeholder: 'Create a password', secure: true, show: showPassword, toggle: () => setShowPassword(!showPassword) },
    { key: 'confirmPassword', label: 'Confirm Password', placeholder: 'Confirm your password', secure: true, show: showConfirm, toggle: () => setShowConfirm(!showConfirm) },
  ];

  return (
    <LinearGradient colors={['#0B1020', '#1A1040', '#0B1020']} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.logo}>{APP_NAME}</Text>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join the VIBRIX community</Text>

          <View style={styles.glassCard}>
            <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={15} />
            <View style={styles.glassContent}>
              {fields.map((field) => (
                <View key={field.key} style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>{field.label}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    placeholderTextColor={Colors.text.muted}
                    value={(form as any)[field.key]}
                    onChangeText={(v) => updateForm(field.key, v)}
                    keyboardType={(field as any).keyboardType || 'default'}
                    secureTextEntry={(field as any).secure && !(field as any).show}
                    autoCapitalize="none"
                  />
                  {(field as any).toggle && (
                    <TouchableOpacity style={styles.eyeButton} onPress={(field as any).toggle}>
                      <Text style={styles.eyeText}>{(field as any).show ? '👁' : '👁‍🗨'}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}

              <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                <LinearGradient colors={['#8B5CF6', '#6D28D9']} style={styles.gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialContainer}>
            {[{ name: 'Google', icon: '🔴' }, { name: 'Apple', icon: '🍎' }].map((btn) => (
              <TouchableOpacity key={btn.name} style={styles.socialButton}>
                <Text style={styles.socialIcon}>{btn.icon}</Text>
                <Text style={styles.socialText}>{btn.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: { paddingHorizontal: Spacing.xl, paddingTop: 60, paddingBottom: 40 },
  logo: { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.black, color: Colors.text.primary, textAlign: 'center', letterSpacing: Typography.letterSpacing.wider, marginBottom: 4, textShadowColor: 'rgba(139, 92, 246, 0.3)', textShadowRadius: 10 },
  title: { fontSize: Typography.fontSize['3xl'], fontWeight: Typography.fontWeight.bold, color: Colors.text.primary, textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary, textAlign: 'center', marginBottom: Spacing.xl, letterSpacing: Typography.letterSpacing.wide },
  glassCard: { borderRadius: BorderRadius['2xl'], overflow: 'hidden', ...Shadows.xl },
  glassContent: { padding: Spacing.xl, gap: Spacing.sm },
  inputContainer: { marginBottom: Spacing.xs },
  inputLabel: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.medium, color: Colors.text.secondary, marginBottom: Spacing.xs },
  input: { backgroundColor: Colors.inputBg, borderWidth: 1, borderColor: Colors.inputBorder, borderRadius: BorderRadius.md, paddingHorizontal: Spacing.base, paddingVertical: 14, fontSize: Typography.fontSize.md, color: Colors.text.primary },
  eyeButton: { position: 'absolute', right: 16, bottom: 16 },
  eyeText: { fontSize: 20 },
  signUpButton: { marginTop: Spacing.sm, borderRadius: BorderRadius.base, overflow: 'hidden', ...Shadows.glow },
  gradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semibold, color: Colors.text.primary, letterSpacing: Typography.letterSpacing.wide },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: Spacing.lg },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.text.muted },
  dividerText: { marginHorizontal: Spacing.base, fontSize: Typography.fontSize.sm, color: Colors.text.tertiary },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: Spacing.base },
  socialButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface.glass, paddingVertical: 12, paddingHorizontal: Spacing.base, borderRadius: BorderRadius.base, gap: 8, borderWidth: 1, borderColor: Colors.surface.glassLight },
  socialIcon: { fontSize: 18 },
  socialText: { fontSize: Typography.fontSize.sm, color: Colors.text.secondary, fontWeight: Typography.fontWeight.medium },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: Spacing.xl },
  loginText: { fontSize: Typography.fontSize.base, color: Colors.text.tertiary },
  loginLink: { fontSize: Typography.fontSize.base, color: Colors.secondary, fontWeight: Typography.fontWeight.semibold },
});

export default SignUpScreen;
