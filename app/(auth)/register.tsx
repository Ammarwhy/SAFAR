import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Radius, Shadow, Spacing, Typography, scale, vscale } from '../../constants/Theme';
import { setAuthenticated } from '../../stores/authStore';

type Role = 'traveler' | 'agency';

type TravelerFields = { name: string; email: string; password: string; confirm: string };
type AgencyFields = {
  agencyName: string;
  contactPerson: string;
  email: string;
  password: string;
  dtsLicense: string;
  bankCert: string;
  officeAddress: string;
};
type FieldErrors = Partial<Record<string, string>>;

function validate(role: Role, t: TravelerFields, a: AgencyFields): FieldErrors {
  const errors: FieldErrors = {};
  if (role === 'traveler') {
    if (!t.name.trim()) errors.name = 'Full name is required.';
    if (!t.email.trim() || !t.email.includes('@')) errors.email = 'Valid email is required.';
    if (t.password.length < 8) errors.password = 'Password must be at least 8 characters.';
    if (t.password !== t.confirm) errors.confirm = 'Passwords do not match.';
  } else {
    if (!a.agencyName.trim()) errors.agencyName = 'Agency name is required.';
    if (!a.contactPerson.trim()) errors.contactPerson = 'Contact person name is required.';
    if (!a.email.trim() || !a.email.includes('@')) errors.email = 'Valid email is required.';
    if (a.password.length < 8) errors.password = 'Password must be at least 8 characters.';
    if (!a.officeAddress.trim()) errors.officeAddress = 'Office address is required.';
  }
  return errors;
}

export default function RegisterScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('traveler');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPass, setShowPass] = useState(false);

  const [tFields, setTFields] = useState<TravelerFields>({ name: '', email: '', password: '', confirm: '' });
  const [aFields, setAFields] = useState<AgencyFields>({
    agencyName: '', contactPerson: '', email: '', password: '',
    dtsLicense: '', bankCert: '', officeAddress: '',
  });

  const emailRef = useRef<TextInput>(null);
  const passRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);

  const updateT = (key: keyof TravelerFields, val: string) => {
    setTFields((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };
  const updateA = (key: keyof AgencyFields, val: string) => {
    setAFields((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const handleSubmit = () => {
    if (isLoading) return;
    const errs = validate(role, tFields, aFields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthenticated(true);
      router.replace('/(tabs)/explore');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView style={s.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        style={s.scroll}
        contentContainerStyle={s.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={s.header}>
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <Text style={s.title}>Create Account</Text>
        <Text style={s.subtitle}>Join the SAFAR community.</Text>

        <View style={s.roleRow}>
          {(['traveler', 'agency'] as Role[]).map((r) => (
            <TouchableOpacity
              key={r}
              style={[s.roleBtn, role === r && s.roleBtnActive]}
              onPress={() => { setRole(r); setErrors({}); }}
              accessibilityLabel={r === 'traveler' ? 'Select Traveler role' : 'Select Verified Agency role'}
            >
              <Ionicons
                name={r === 'traveler' ? 'person-outline' : 'business-outline'}
                size={16}
                color={role === r ? Colors.textOnDark : Colors.textSecondary}
              />
              <Text style={[s.roleBtnText, role === r && s.roleBtnTextActive]}>
                {r === 'traveler' ? 'Traveler' : 'Verified Agency'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {role === 'traveler' ? (
          <View style={s.form}>
            <Field label="FULL NAME" error={errors.name}>
              <TextInput
                style={[s.input, !!errors.name && s.inputError]}
                placeholder="Your full name"
                placeholderTextColor={Colors.textMuted}
                value={tFields.name}
                onChangeText={(v) => updateT('name', v)}
                returnKeyType="next"
                onSubmitEditing={() => emailRef.current?.focus()}
                maxLength={60}
              />
            </Field>
            <Field label="EMAIL ADDRESS" error={errors.email}>
              <TextInput
                ref={emailRef}
                style={[s.input, !!errors.email && s.inputError]}
                placeholder="you@email.com"
                placeholderTextColor={Colors.textMuted}
                value={tFields.email}
                onChangeText={(v) => updateT('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passRef.current?.focus()}
                maxLength={80}
              />
            </Field>
            <Field label="PASSWORD" error={errors.password}>
              <View style={s.passWrap}>
                <TextInput
                  ref={passRef}
                  style={[s.input, s.passInput, !!errors.password && s.inputError]}
                  placeholder="Min. 8 characters"
                  placeholderTextColor={Colors.textMuted}
                  value={tFields.password}
                  onChangeText={(v) => updateT('password', v)}
                  secureTextEntry={!showPass}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmRef.current?.focus()}
                  maxLength={32}
                />
                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass((p) => !p)} hitSlop={12}>
                  <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </Field>
            <Field label="CONFIRM PASSWORD" error={errors.confirm}>
              <TextInput
                ref={confirmRef}
                style={[s.input, !!errors.confirm && s.inputError]}
                placeholder="Repeat your password"
                placeholderTextColor={Colors.textMuted}
                value={tFields.confirm}
                onChangeText={(v) => updateT('confirm', v)}
                secureTextEntry={!showPass}
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                maxLength={32}
              />
            </Field>
          </View>
        ) : (
          <View style={s.form}>
            <Field label="AGENCY NAME" error={errors.agencyName}>
              <TextInput
                style={[s.input, !!errors.agencyName && s.inputError]}
                placeholder="e.g. Atlas Nomad Co."
                placeholderTextColor={Colors.textMuted}
                value={aFields.agencyName}
                onChangeText={(v) => updateA('agencyName', v)}
                maxLength={80}
              />
            </Field>
            <Field label="CONTACT PERSON" error={errors.contactPerson}>
              <TextInput
                style={[s.input, !!errors.contactPerson && s.inputError]}
                placeholder="Representative full name"
                placeholderTextColor={Colors.textMuted}
                value={aFields.contactPerson}
                onChangeText={(v) => updateA('contactPerson', v)}
                maxLength={60}
              />
            </Field>
            <Field label="BUSINESS EMAIL" error={errors.email}>
              <TextInput
                style={[s.input, !!errors.email && s.inputError]}
                placeholder="info@agency.com"
                placeholderTextColor={Colors.textMuted}
                value={aFields.email}
                onChangeText={(v) => updateA('email', v)}
                keyboardType="email-address"
                autoCapitalize="none"
                maxLength={80}
              />
            </Field>
            <Field label="PASSWORD" error={errors.password}>
              <View style={s.passWrap}>
                <TextInput
                  style={[s.input, s.passInput, !!errors.password && s.inputError]}
                  placeholder="Min. 8 characters"
                  placeholderTextColor={Colors.textMuted}
                  value={aFields.password}
                  onChangeText={(v) => updateA('password', v)}
                  secureTextEntry={!showPass}
                  maxLength={32}
                />
                <TouchableOpacity style={s.eyeBtn} onPress={() => setShowPass((p) => !p)} hitSlop={12}>
                  <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </Field>
            <Field label="DTS LICENSE NO. (OPTIONAL)" error={errors.dtsLicense}>
              <TextInput
                style={[s.input, !!errors.dtsLicense && s.inputError]}
                placeholder="e.g. DTS-2024-00123"
                placeholderTextColor={Colors.textMuted}
                value={aFields.dtsLicense}
                onChangeText={(v) => updateA('dtsLicense', v)}
                maxLength={40}
              />
            </Field>
            <Field label="BANK CERTIFICATE / FINCEN (OPTIONAL)" error={errors.bankCert}>
              <TextInput
                style={[s.input, !!errors.bankCert && s.inputError]}
                placeholder="Certificate reference number"
                placeholderTextColor={Colors.textMuted}
                value={aFields.bankCert}
                onChangeText={(v) => updateA('bankCert', v)}
                maxLength={60}
              />
            </Field>
            <Field label="OFFICE ADDRESS" error={errors.officeAddress}>
              <TextInput
                style={[s.input, s.textArea, !!errors.officeAddress && s.inputError]}
                placeholder="Full street address, city, region"
                placeholderTextColor={Colors.textMuted}
                value={aFields.officeAddress}
                onChangeText={(v) => updateA('officeAddress', v)}
                multiline
                maxLength={120}
              />
            </Field>
          </View>
        )}

        <TouchableOpacity
          style={[s.submitBtn, isLoading && s.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
          accessibilityLabel="Create account"
        >
          {isLoading
            ? <ActivityIndicator color={Colors.textOnDark} />
            : <Text style={s.submitText}>Create Account  →</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={s.loginRow} hitSlop={8}>
          <Text style={s.loginBase}>
            Already have an account?{'  '}
            <Text style={s.loginLink}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <View style={s.fieldGroup}>
      <Text style={s.fieldLabel}>{label}</Text>
      {children}
      {!!error && <Text style={s.inlineError}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  flex: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  container: {
    flexGrow: 1,
    paddingHorizontal: Spacing.screen,
    paddingBottom: vscale(40),
  },
  header: { paddingTop: 14, marginBottom: 8 },
  backBtn: { width: 44, height: 44, alignItems: 'flex-start', justifyContent: 'center' },
  title: { ...Typography.h1, color: Colors.textPrimary, marginBottom: 4 },
  subtitle: { ...Typography.body, color: Colors.textSecondary, marginBottom: vscale(24) },

  roleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: vscale(20),
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: Radius.button,
    backgroundColor: Colors.bgCard,
    borderWidth: 1.5,
    borderColor: Colors.border,
    minHeight: 44,
  },
  roleBtnActive: { backgroundColor: Colors.brand, borderColor: Colors.brand },
  roleBtnText: { ...Typography.label, color: Colors.textSecondary },
  roleBtnTextActive: { color: Colors.textOnDark },

  form: { gap: 4 },
  fieldGroup: { marginBottom: 14 },
  fieldLabel: {
    fontSize: scale(9),
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.input,
    paddingHorizontal: 14,
    ...Typography.body,
    color: Colors.textPrimary,
    borderWidth: 1.5,
    borderColor: Colors.border,
    ...Shadow.sm,
  },
  inputError: { borderColor: Colors.error },
  passWrap: { position: 'relative' },
  passInput: { paddingRight: scale(50) },
  eyeBtn: {
    position: 'absolute', right: 14, top: 0, bottom: 0,
    width: 44, alignItems: 'center', justifyContent: 'center',
  },
  textArea: { height: 80, textAlignVertical: 'top', paddingTop: 12 },
  inlineError: { ...Typography.caption, color: Colors.error, marginTop: 4, paddingLeft: 4 },

  submitBtn: {
    height: 52,
    backgroundColor: Colors.brand,
    borderRadius: Radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: vscale(8),
    marginBottom: vscale(16),
  },
  submitBtnDisabled: { opacity: 0.6 },
  submitText: { ...Typography.h4, color: Colors.textOnDark, letterSpacing: 0.4 },

  loginRow: { alignItems: 'center', minHeight: 44, justifyContent: 'center' },
  loginBase: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },
  loginLink: { color: Colors.brand, fontWeight: '700', textDecorationLine: 'underline' },
});
