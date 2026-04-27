import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Radius, Shadow, Spacing, Typography } from '../constants/Theme';

export default function FeedbackScreen() {
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('Empty Feedback', 'Please write something before submitting.');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Thank You!',
        'Your feedback has been submitted. We read every message.',
        [{ text: 'Done', onPress: () => router.back() }]
      );
    }, 700);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={styles.backBtn}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Send Feedback</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Ionicons name="chatbox-ellipses-outline" size={28} color={Colors.brand} style={styles.icon} />
          <Text style={styles.title}>We're Listening</Text>
          <Text style={styles.subtitle}>
            Share a bug, suggest a feature, or just tell us what you love about SAFAR.
          </Text>
        </View>

        <Text style={styles.label}>YOUR FEEDBACK</Text>
        <TextInput
          style={styles.input}
          value={feedback}
          onChangeText={setFeedback}
          placeholder="Write your thoughts here..."
          placeholderTextColor={Colors.textMuted}
          multiline
          maxLength={600}
          textAlignVertical="top"
          accessibilityLabel="Feedback text"
        />
        <Text style={styles.charCount}>{feedback.length}/600</Text>

        <TouchableOpacity
          style={[styles.submitBtn, (isLoading || !feedback.trim()) && styles.submitBtnDisabled]}
          onPress={handleSubmit}
          disabled={isLoading || !feedback.trim()}
          accessibilityLabel="Submit feedback"
        >
          {isLoading
            ? <ActivityIndicator color={Colors.textOnDark} />
            : <Text style={styles.submitText}>Submit Feedback</Text>
          }
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.screen, paddingTop: 10, paddingBottom: 8,
  },
  backBtn: { width: 44, height: 44, alignItems: 'flex-start', justifyContent: 'center' },
  headerTitle: { ...Typography.h3, color: Colors.textPrimary },
  content: { paddingHorizontal: Spacing.screen, paddingTop: 8 },
  card: {
    backgroundColor: Colors.bgCard, borderRadius: Radius.xl,
    padding: 20, ...Shadow.sm, alignItems: 'center', marginBottom: 20,
  },
  icon: { marginBottom: 10 },
  title: { ...Typography.h3, color: Colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  subtitle: { ...Typography.bodyMd, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },
  label: {
    ...Typography.label, color: Colors.textMuted,
    textTransform: 'uppercase' as const, letterSpacing: 0.9, marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.bgCard, borderRadius: Radius.md,
    borderWidth: 1.5, borderColor: Colors.border,
    paddingHorizontal: 14, paddingVertical: 12,
    minHeight: 140, ...Typography.body, color: Colors.textPrimary,
    ...Shadow.sm,
  },
  charCount: { ...Typography.caption, color: Colors.textMuted, textAlign: 'right', marginTop: 4, marginBottom: 20 },
  submitBtn: {
    height: 52, backgroundColor: Colors.brand,
    borderRadius: Radius.full, alignItems: 'center', justifyContent: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitText: { ...Typography.bodySm, fontWeight: '700', color: Colors.textOnDark },
});
