import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { scale, vscale } from '../../constants/Theme';
import { setAuthenticated } from '../../stores/authStore';

const D = {
  bg: '#F2EFE9',
  card: '#FFFFFF',
  brand: '#3B1A1A',
  brandMuted: 'rgba(59,26,26,0.08)',
  inputBg: '#EDEDEC',
  label: '#9B8E84',
  muted: '#9B8E84',
  placeholder: '#B8B0A8',
  border: '#E2DDD8',
  divider: '#E2DDD8',
  error: '#C0392B',
};

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordRef = useRef<TextInput>(null);

  const validate = () => {
    let valid = true;
    if (!email.trim()) {
      setEmailError('Email is required');
      valid = false;
    } else if (!email.includes('@')) {
      setEmailError('Enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleSignIn = () => {
    if (isLoading) return;
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthenticated(true);
      router.replace('/(tabs)/explore');
    }, 900);
  };

  const handleGoogle = () => {
    Alert.alert('Coming Soon', 'Google login is on the way.');
  };

  const handleSignUp = () => {
    Alert.alert('Coming Soon', 'Sign up is on the way.');
  };

  const handleForgotPassword = () => {
    Alert.alert('Coming Soon', 'Password reset is on the way.');
  };

  return (
    <KeyboardAvoidingView
      style={s.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Logo area ── */}
        <View style={s.logoArea}>
          <View style={s.iconWrap}>
            <Ionicons name="triangle-outline" size={26} color={D.brand} />
          </View>
          <Text style={s.brandName}>SAFAR</Text>
          <Text style={s.tagline}>ELEVATED EXPLORATION</Text>
        </View>

        {/* ── Card ── */}
        <View style={s.card}>
          <Text style={s.heading}>Welcome Back</Text>
          <Text style={s.subtext}>Continue your journey across the peaks.</Text>

          {/* Email */}
          <View style={s.fieldGroup}>
            <Text style={s.fieldLabel}>EMAIL ADDRESS</Text>
            <TextInput
              style={[s.input, emailFocused && s.inputFocused, !!emailError && s.inputError]}
              placeholder="your@email.com"
              placeholderTextColor={D.placeholder}
              value={email}
              onChangeText={(v) => { setEmail(v); if (emailError) setEmailError(''); }}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              maxLength={80}
            />
            {!!emailError && <Text style={s.inlineError}>{emailError}</Text>}
          </View>

          {/* Password */}
          <View style={s.fieldGroup}>
            <View style={s.labelRow}>
              <Text style={s.fieldLabel}>PASSWORD</Text>
              <TouchableOpacity onPress={handleForgotPassword} hitSlop={12}>
                <Text style={s.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={s.passwordWrap}>
              <TextInput
                ref={passwordRef}
                style={[
                  s.input,
                  s.passwordInput,
                  passwordFocused && s.inputFocused,
                  !!passwordError && s.inputError,
                ]}
                placeholder="••••••••"
                placeholderTextColor={D.placeholder}
                value={password}
                onChangeText={(v) => { setPassword(v); if (passwordError) setPasswordError(''); }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!showPassword}
                returnKeyType="done"
                onSubmitEditing={handleSignIn}
                maxLength={32}
              />
              <TouchableOpacity
                style={s.eyeBtn}
                onPress={() => setShowPassword((p) => !p)}
                hitSlop={12}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={D.muted}
                />
              </TouchableOpacity>
            </View>
            {!!passwordError && <Text style={s.inlineError}>{passwordError}</Text>}
          </View>

          {/* CTA */}
          <Pressable
            style={({ pressed }) => [
              s.signInBtn,
              isLoading && s.signInBtnDisabled,
              pressed && s.signInBtnPressed,
            ]}
            onPress={handleSignIn}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel="Sign in to your account"
          >
            {isLoading
              ? <ActivityIndicator color="#FFFFFF" />
              : <Text style={s.signInText}>Sign In  →</Text>
            }
          </Pressable>

          {/* Divider */}
          <View style={s.dividerRow}>
            <View style={s.dividerLine} />
            <Text style={s.dividerLabel}>OR JOIN WITH</Text>
            <View style={s.dividerLine} />
          </View>

          {/* Google */}
          <TouchableOpacity
            style={s.googleBtn}
            onPress={handleGoogle}
            activeOpacity={0.85}
            accessibilityRole="button"
            accessibilityLabel="Continue with Google"
          >
            <Text style={s.googleG}>G</Text>
            <Text style={s.googleBtnText}>Google</Text>
          </TouchableOpacity>

          {/* Dev bypass — stripped in production builds */}
          {__DEV__ && (
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)/explore')}
              style={s.devSkipBtn}
              accessibilityLabel="Skip login (dev only)"
            >
              <Text style={s.devSkip}>Skip for now →</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Bottom links ── */}
        <TouchableOpacity onPress={handleSignUp} style={s.signUpRow} hitSlop={8}>
          <Text style={s.signUpBase}>
            Don't have an account?{'  '}
            <Text style={s.signUpLink}>Create Account</Text>
          </Text>
        </TouchableOpacity>

        <Text style={s.footer}>PRIVACY  •  TERMS  •  SUPPORT</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: D.bg,
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(24),
    paddingVertical: vscale(48),
  },

  // ── Logo area ──
  logoArea: {
    alignItems: 'center',
    marginBottom: vscale(28),
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: D.brandMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  brandName: {
    fontSize: scale(20),
    fontWeight: '800',
    color: D.brand,
    letterSpacing: scale(5),
    marginBottom: 4,
  },
  tagline: {
    fontSize: scale(8),
    fontWeight: '300',
    color: D.muted,
    letterSpacing: scale(2.5),
    textTransform: 'uppercase',
  },

  // ── Card ──
  card: {
    width: '100%',
    backgroundColor: D.card,
    borderRadius: 20,
    padding: scale(24),
    shadowColor: '#3B1A1A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.09,
    shadowRadius: 20,
    elevation: 5,
    marginBottom: vscale(20),
  },
  heading: {
    fontSize: scale(22),
    fontWeight: '700',
    color: D.brand,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtext: {
    fontSize: scale(12),
    color: D.muted,
    textAlign: 'center',
    lineHeight: scale(18),
    marginBottom: vscale(22),
  },

  // ── Form ──
  fieldGroup: {
    marginBottom: vscale(14),
  },
  fieldLabel: {
    fontSize: scale(9),
    fontWeight: '600',
    color: D.label,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  forgotText: {
    fontSize: scale(11),
    color: D.brand,
    fontWeight: '500',
  },
  input: {
    height: 48,
    backgroundColor: D.inputBg,
    borderRadius: 999,
    paddingHorizontal: scale(18),
    fontSize: scale(14),
    color: D.brand,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: D.brand,
    backgroundColor: '#FAFAF8',
  },
  inputError: {
    borderColor: D.error,
  },
  passwordWrap: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: scale(50),
  },
  eyeBtn: {
    position: 'absolute',
    right: scale(16),
    top: 0,
    bottom: 0,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inlineError: {
    fontSize: scale(11),
    color: D.error,
    marginTop: 4,
    paddingLeft: scale(6),
  },

  // ── CTA ──
  signInBtn: {
    height: 52,
    backgroundColor: D.brand,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vscale(6),
    marginBottom: vscale(20),
  },
  signInBtnDisabled: {
    opacity: 0.6,
  },
  signInBtnPressed: {
    opacity: 0.82,
  },
  signInText: {
    fontSize: scale(15),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },

  // ── Divider ──
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vscale(16),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: D.divider,
  },
  dividerLabel: {
    fontSize: scale(9),
    fontWeight: '600',
    color: D.muted,
    paddingHorizontal: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // ── Google ──
  googleBtn: {
    height: 52,
    borderRadius: 999,
    borderWidth: 1.5,
    borderColor: D.border,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleG: {
    fontSize: scale(16),
    fontWeight: '800',
    color: '#4285F4',
    fontStyle: 'italic',
  },
  googleBtnText: {
    fontSize: scale(14),
    fontWeight: '600',
    color: '#3C4043',
  },

  // ── Dev bypass ──
  devSkipBtn: {
    alignItems: 'center',
    marginTop: vscale(14),
    minHeight: 44,
    justifyContent: 'center',
  },
  devSkip: {
    fontSize: scale(11),
    color: D.muted,
    textAlign: 'center',
  },

  // ── Bottom ──
  signUpRow: {
    alignItems: 'center',
    marginBottom: vscale(14),
    minHeight: 44,
    justifyContent: 'center',
  },
  signUpBase: {
    fontSize: scale(12),
    color: D.muted,
    textAlign: 'center',
  },
  signUpLink: {
    color: D.brand,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  footer: {
    fontSize: scale(8),
    color: '#C4B8B0',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});
