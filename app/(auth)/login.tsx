import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  ScrollView, KeyboardAvoidingView, Platform, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../constants/Theme';

function GoogleIcon() {
  // Simple G icon with 4-color segments
  return (
    <View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 16, fontWeight: '700' }}>
        <Text style={{ color: '#4285F4' }}>G</Text>
      </Text>
    </View>
  );
}

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    // Simulate wrong credentials (Screen 15 state)
    if (password !== 'safar123') {
      setError('Incorrect email or password. Please check your credentials and try again.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/(tabs)/explore');
    }, 800);
  };

  const handleDemoLogin = () => {
    // Quick demo bypass
    router.replace('/(tabs)/explore');
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo area */}
        <View style={styles.logoArea}>
          <View style={styles.logoMark}>
            <MiniMountain />
          </View>
          <Text style={styles.wordmark}>SAFAR</Text>
          <Text style={styles.tagline}>ELEVATED EXPLORATION</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome Back</Text>
          <Text style={styles.cardSubtitle}>Continue your journey across the peaks.</Text>

          {/* Error banner (Screen 15) */}
          {!!error && (
            <View style={styles.errorBanner}>
              <View style={styles.errorIconWrap}>
                <Text style={styles.errorIcon}>!</Text>
              </View>
              <View style={styles.errorContent}>
                <Text style={styles.errorTitle}>Login Issue</Text>
                <Text style={styles.errorMsg}>{error}</Text>
              </View>
              <TouchableOpacity onPress={() => setError('')} style={styles.errorClose}>
                <Text style={styles.errorCloseText}>×</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
            <TextInput
              style={[styles.input, !!error && styles.inputError]}
              placeholder="traveler@safar.com"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <TextInput
              style={[styles.input, !!error && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In */}
          <TouchableOpacity
            style={[styles.signInBtn, loading && styles.signInBtnDisabled]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.signInText}>{loading ? 'Signing in…' : 'Sign In →'}</Text>
          </TouchableOpacity>

          {/* Demo bypass */}
          <TouchableOpacity onPress={handleDemoLogin} style={styles.demoBtn}>
            <Text style={styles.demoText}>Skip to Demo →</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>OR JOIN WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Google */}
          <TouchableOpacity style={styles.googleBtn} onPress={handleDemoLogin}>
            <GoogleIcon />
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.createRow}>
          Don't have an account?{'  '}
          <Text style={styles.createLink}>Create Account</Text>
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerLink}>PRIVACY</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>TERMS</Text>
          <Text style={styles.footerDot}>•</Text>
          <Text style={styles.footerLink}>SUPPORT</Text>
        </View>
      </ScrollView>
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
  errorIcon: { color: '#fff', fontWeight: '800', fontSize: 12 },
  errorContent: { flex: 1 },
  errorTitle: { ...Typography.h4, color: Colors.danger, marginBottom: 2 },
  errorMsg: { ...Typography.bodySm, color: Colors.danger },
  errorClose: { padding: 2 },
  errorCloseText: { fontSize: 18, color: Colors.danger },

  fieldGroup: { marginBottom: 14 },
  fieldLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 6 },
  input: {
    backgroundColor: Colors.bgMuted,
    borderRadius: Radius.md,
    paddingHorizontal: 16,
    paddingVertical: 14,
    ...Typography.body,
    color: Colors.textPrimary,
  },
  inputError: { borderWidth: 1, borderColor: Colors.danger + '60' },
  forgotBtn: { alignSelf: 'flex-end', marginTop: 8 },
  forgotText: { ...Typography.bodyMd, color: Colors.textSecondary },

  signInBtn: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.lg,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  signInBtnDisabled: { opacity: 0.6 },
  signInText: { ...Typography.h4, color: '#fff', fontSize: 16 },

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
    borderRadius: Radius.lg,
    paddingVertical: 14,
    gap: 10,
    backgroundColor: Colors.bgCard,
  },
  googleText: { ...Typography.h4, color: Colors.textPrimary },

  createRow: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 16 },
  createLink: { ...Typography.h4, color: Colors.textPrimary, fontSize: 14 },
  footer: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  footerLink: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },
  footerDot: { ...Typography.label, color: Colors.textMuted },
});