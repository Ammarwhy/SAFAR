import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/Theme';
import ScreenMotion from '@/components/ui/ScreenMotion';
import { setAuthenticated } from '../../stores/authStore';

function GoogleIcon() {
  return (
    <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ ...Typography.h4, color: Colors.brand }}>G</Text>
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [successText, setSuccessText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isFormValid = email.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    if (loading || isProcessing) {
      return;
    }
    setEmailError('');
    setPasswordError('');
    setFormError('');
    setSuccessText('');

    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 1000);

    if (!email || !password) {
      if (!email) {
        setEmailError('Email is required. Example: traveler@safar.com');
      }
      if (!password) {
        setPasswordError('Password is required to continue.');
      }
      return;
    }

    if (password !== 'safar123') {
      setFormError('We couldn’t sign you in. Check your email and password, then try again.');
      return;
    }

    setLoading(true);
    setSuccessText('Signing you in...');
    setTimeout(() => {
      setSuccessText('Welcome back! You are signed in.');
      setLoading(false);
      setAuthenticated(true);
      setTimeout(() => {
        router.replace('/(tabs)/explore');
      }, 600);
    }, 800);
  };

  const handleDemoLogin = () => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    setSuccessText('Opening demo mode...');
      setLoading(false);
    setTimeout(() => {
      router.replace('/(tabs)/explore');
      setAuthenticated(true);
      setIsProcessing(false);
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
    >
      <ScreenMotion style={styles.flex}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoArea}>
          <View style={styles.logoMark}>
            <MiniMountain />
          </View>
          <Text style={styles.wordmark}>SAFAR</Text>
          <Text style={styles.tagline}>ELEVATED EXPLORATION</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back</Text>
          <Text style={styles.cardSubtitle}>Continue your journey across the peaks.</Text>

          {!!formError && (
            <View style={styles.errorBanner}>
              <View style={styles.errorIconWrap}>
                <Text style={styles.errorIcon}>!</Text>
              </View>
              <View style={styles.errorContent}>
                <Text style={styles.errorTitle}>Login Issue</Text>
                <Text style={styles.errorMsg}>{formError}</Text>
              </View>
              <TouchableOpacity onPress={() => setFormError('')} style={styles.errorClose} accessibilityLabel="Close login issue message">
                <Text style={styles.errorCloseText}>×</Text>
              </TouchableOpacity>
            </View>
          )}

          {!!successText && <Text style={styles.successText}>{successText}</Text>}

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
            <TextInput
              accessibilityLabel="Email address input"
              style={[styles.input, !!emailError && styles.inputError]}
              placeholder="traveler@safar.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                if (emailError) {
                  setEmailError('');
                }
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              maxLength={80}
            />
            {!!emailError && <Text style={styles.inlineError}>{emailError}</Text>}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <TextInput
              accessibilityLabel="Password input"
              style={[styles.input, !!passwordError && styles.inputError]}
              placeholder="Example: safar123"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                if (passwordError) {
                  setPasswordError('');
                }
              }}
              secureTextEntry
              maxLength={32}
            />
            {!!passwordError && <Text style={styles.inlineError}>{passwordError}</Text>}
            <TouchableOpacity
              style={styles.forgotBtn}
              onPress={() => router.push('/flows/forgot-password')}
              accessibilityLabel="Forgot password"
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.signInBtn, (!isFormValid || loading || isProcessing) && styles.signInBtnDisabled]}
            onPress={handleLogin}
            disabled={!isFormValid || loading || isProcessing}
            activeOpacity={0.85}
            accessibilityLabel="Sign in"
          >
            {loading ? (
              <ActivityIndicator color={Colors.textOnDark} />
            ) : (
              <Text style={styles.signInText}>Sign In</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDemoLogin} style={styles.demoBtn} accessibilityLabel="Open demo mode" disabled={isProcessing}>
            <Text style={styles.demoText}>Open Demo Mode</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>OR JOIN WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.googleBtn} onPress={handleDemoLogin} accessibilityLabel="Continue with Google" disabled={isProcessing}>
            <GoogleIcon />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.createRow}>
          Don't have an account?{'  '}
          <Text
            style={styles.createLink}
            onPress={() => router.push('/flows/create-account')}
          >
            Create Account
          </Text>
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerLink}>PRIVACY</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>TERMS</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>SUPPORT</Text>
        </View>
      </ScrollView>
      </ScreenMotion>
    </KeyboardAvoidingView>
  );
}

function MiniMountain() {
  return (
    <View style={{ width: 36, height: 26, position: 'relative', alignItems: 'center' }}>
      <View style={{
        position: 'absolute', bottom: 0, right: 0,
        width: 0, height: 0,
        borderLeftWidth: 14, borderRightWidth: 14, borderBottomWidth: 26,
        borderStyle: 'solid',
        borderLeftColor: 'transparent', borderRightColor: 'transparent',
        borderBottomColor: Colors.brand,
      }} />
      <View style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 0, height: 0,
        borderLeftWidth: 10, borderRightWidth: 10, borderBottomWidth: 18,
        borderStyle: 'solid',
        borderLeftColor: 'transparent', borderRightColor: 'transparent',
        borderBottomColor: Colors.brand,
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.screen,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: Colors.bg,
  },
  logoArea: { alignItems: 'center', marginBottom: 28 },
  logoMark: {
    width: 52, height: 52, borderRadius: 12,
    backgroundColor: Colors.bgMuted,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 10,
  },
  wordmark: { ...Typography.display, fontSize: 28, color: Colors.brand, letterSpacing: 4, marginBottom: 4 },
  tagline: { ...Typography.label, color: Colors.textSecondary, letterSpacing: 2.5 },

  card: {
    width: '100%',
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    ...Shadow.md,
    marginBottom: 20,
  },
  cardTitle: { ...Typography.h1, color: Colors.textPrimary, textAlign: 'center', marginBottom: 6 },
  cardSubtitle: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', marginBottom: 20 },

  errorBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.dangerBg,
    borderRadius: Radius.md,
    padding: 12,
    marginBottom: 16,
    alignItems: 'flex-start',
    gap: 10,
  },
  errorIconWrap: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: Colors.danger,
    alignItems: 'center', justifyContent: 'center',
  },
  errorIcon: { color: Colors.textOnDark, fontWeight: '800', fontSize: 12 },
  errorContent: { flex: 1 },
  errorTitle: { ...Typography.h4, color: Colors.danger, marginBottom: 2 },
  errorMsg: { ...Typography.bodySm, color: Colors.danger },
  errorClose: { padding: 2 },
  errorCloseText: { fontSize: 18, color: Colors.danger },
  successText: { ...Typography.bodySm, color: Colors.success, marginBottom: 12, textAlign: 'center' },

  fieldGroup: { marginBottom: 14 },
  fieldLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: Colors.bgMuted,
    borderRadius: Radius.input,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  inputError: { borderWidth: 1, borderColor: Colors.danger + '60' },
  inlineError: { ...Typography.caption, color: Colors.danger, marginTop: 4 },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 8 },
  forgotText: { ...Typography.bodyMd, color: Colors.textSecondary },

  signInBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.button,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
    minHeight: 44,
    justifyContent: 'center',
  },
  signInBtnDisabled: { opacity: 0.6 },
  signInText: { ...Typography.h4, color: Colors.textOnDark },

  demoBtn: { alignItems: 'center', marginBottom: 16 },
  demoText: { ...Typography.bodySm, color: Colors.textMuted },

  dividerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.border },
  dividerLabel: { ...Typography.label, color: Colors.textMuted, marginHorizontal: 12, fontSize: 10 },

  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.button,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: Colors.bgCard,
    minHeight: 44,
  },
  googleText: { ...Typography.h4, color: Colors.textPrimary },

  createRow: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 16 },
  createLink: { ...Typography.h4, color: Colors.textPrimary, fontSize: 14 },
  footer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  footerLink: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },
  footerDot: { ...Typography.label, color: Colors.textMuted },
});