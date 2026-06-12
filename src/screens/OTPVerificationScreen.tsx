import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, TextInput, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColors, BorderRadius, Spacing, Typography, Shadows } from '../theme';

const OTP_LENGTH = 6;

const OTPVerificationScreen = ({ navigation, route }: any) => {
  const { colors } = useThemeColors();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timeLeft, setTimeLeft] = useState(60);
  const inputRefs = useRef<TextInput[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length === OTP_LENGTH) {
      navigation.replace('ProfileSetup');
    }
  };

  const handleResend = () => {
    setTimeLeft(60);
    setOtp(Array(OTP_LENGTH).fill(''));
    inputRefs.current[0]?.focus();
  };

  return (
    <LinearGradient colors={[colors.primary, colors.gradients.primary[1], colors.surface.primary]} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={[styles.backIcon, { color: colors.text.secondary }]}>←</Text>
        </TouchableOpacity>

        <View style={styles.inner}>
          <Text style={[styles.icon]}>📱</Text>
          <Text style={[styles.title, { color: colors.text.primary }]}>Enter OTP Code</Text>
          <Text style={[styles.subtitle, { color: colors.text.tertiary }]}>
            We've sent a 6-digit code to your email/phone
          </Text>

          {/* OTP Input Fields */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => { if (ref) inputRefs.current[index] = ref; }}
                style={[
                  styles.otpInput,
                  { backgroundColor: colors.inputBg, borderColor: colors.inputBorder, color: colors.text.primary },
                  digit && { borderColor: colors.secondary, backgroundColor: `${colors.secondary}10` },
                ]}
                value={digit}
                onChangeText={text => handleOtpChange(text, index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} activeOpacity={0.8}>
            <LinearGradient colors={[colors.secondary, colors.gradients.secondary[1]]} style={styles.verifyGradient}>
              <Text style={styles.verifyText}>Verify Code</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            {timeLeft > 0 ? (
              <Text style={[styles.timerText, { color: colors.text.tertiary }]}>
                Resend code in {timeLeft}s
              </Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={[styles.resendText, { color: colors.secondary }]}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.xl },
  backButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginTop: 60 },
  backIcon: { fontSize: 28, fontWeight: '700' },
  inner: { flex: 1, justifyContent: 'center' },
  icon: { fontSize: 56, textAlign: 'center', marginBottom: Spacing.lg },
  title: { fontSize: 28, fontWeight: '900', textAlign: 'center', marginBottom: Spacing.sm, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: Spacing['2xl'], paddingHorizontal: Spacing.lg },
  otpContainer: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginBottom: Spacing['2xl'] },
  otpInput: { width: 48, height: 56, borderRadius: BorderRadius.md, borderWidth: 2, textAlign: 'center', fontSize: 22, fontWeight: '800' },
  verifyButton: { borderRadius: BorderRadius.base, overflow: 'hidden', marginBottom: Spacing.base },
  verifyGradient: { paddingVertical: 16, alignItems: 'center', justifyContent: 'center' },
  verifyText: { fontSize: 16, fontWeight: '700', color: '#FFFFFF' },
  resendContainer: { alignItems: 'center', paddingVertical: Spacing.base },
  timerText: { fontSize: 14, fontWeight: '500' },
  resendText: { fontSize: 14, fontWeight: '600' },
});

export default OTPVerificationScreen;
