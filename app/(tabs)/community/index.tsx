import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView, ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_MATCHES } from '../../../constants/mockData';
import SafarHeader from '../../../components/layouts/SafarHeader';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

const WHY_ITEMS = [
  { ionName: 'sparkles-outline', color: Colors.bgMuted, title: 'AI Compatibility', desc: 'Our neural engine analyzes over 50 travel preferences to find your ideal nomad companion.' },
  { ionName: 'shield-checkmark-outline', color: Colors.bgCard, title: 'Safety First', desc: 'All profiles are verified with a multi-step identity check before matching.' },
  { ionName: 'map-outline', color: Colors.bgMuted, title: 'Route Sync', desc: 'We match travelers whose routes overlap, making spontaneous meetups possible.' },
];

export default function MatchesScreen() {
  const router = useRouter();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const visible = useMemo(() => MOCK_MATCHES.filter((m) => !dismissed.includes(m.id)), [dismissed]);
  const currentMatch = visible[0];

  const retry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const skip = (id: string) => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    setStatusText('Skipped. Showing your next travel partner...');
    setDismissed((p) => [...p, id]);
    setTimeout(() => {
      setIsProcessing(false);
      setStatusText('');
    }, 1000);
  };

  const connect = (id: string) => {
    if (isProcessing) {
      return;
    }
    setIsProcessing(true);
    setStatusText('Connection request sent! Preparing your next match...');
    setConnected((p) => [...p, id]);
    setDismissed((p) => [...p, id]);
    setTimeout(() => {
      setIsProcessing(false);
      setStatusText('');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader title="AI MATCH" subtitle="Discovery" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={Colors.brand} />
            <Text style={styles.stateBody}>Finding your next compatible traveler...</Text>
          </View>
        ) : hasError ? (
          <View style={styles.centerState}>
            <Ionicons name="warning-outline" size={36} color={Colors.warning} />
            <Text style={styles.stateTitle}>We couldn’t load matches</Text>
            <Text style={styles.stateBody}>Check your connection and try again.</Text>
            <TouchableOpacity style={styles.stateBtn} onPress={retry} accessibilityLabel="Try loading matches again">
              <Text style={styles.stateBtnText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
        <>
        <View style={styles.heroSection}>
          <Text style={styles.heroSuper}>ADVENTURE AWAITS</Text>
          <Text style={styles.heroTitle}>Your Potential{"\n"}Travel Partners</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity
              style={styles.filterBtn}
              onPress={() => router.push('/flows/community-filters')}
            >
              <Ionicons name="options-outline" size={13} color={Colors.textPrimary} />
              <Text style={styles.filterBtnText}>Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.personaTag}
              onPress={() => router.push('/flows/community-persona')}
            >
              <Text style={styles.personaTagText}>Mountain Seekers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {!!statusText && <Text style={styles.statusText}>{statusText}</Text>}

        {currentMatch ? (
          <View key={currentMatch.id} style={styles.matchCard}>
            <View style={styles.imgWrap}>
              <Image source={{ uri: currentMatch.avatar }} style={styles.matchImg} accessible accessibilityLabel={`${currentMatch.name} traveler profile photo`} />
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>{currentMatch.matchPct}%</Text>
                <Text style={styles.matchBadgeSub}>Compatibility</Text>
              </View>
            </View>

            <View style={styles.matchBody}>
              <Text style={styles.matchName}>{currentMatch.name}, {currentMatch.age}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
                <Text style={styles.locationText}>{currentMatch.location}</Text>
              </View>
              <Text style={styles.matchBio}>{currentMatch.bio}</Text>

              <View style={styles.tagsRow}>
                {currentMatch.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.skipBtn} onPress={() => skip(currentMatch.id)} disabled={isProcessing} accessibilityLabel="Skip this travel partner">
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.connectBtn, connected.includes(currentMatch.id) && styles.connectBtnActive]}
                  onPress={() => connect(currentMatch.id)}
                  disabled={isProcessing}
                  accessibilityLabel="Connect with this travel partner"
                >
                  {isProcessing ? <ActivityIndicator color={Colors.textOnDark} /> : <Text style={styles.connectText}>Connect</Text>}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {visible.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="compass-outline" size={48} color={Colors.textMuted} style={{ marginBottom: 12 }} />
            <Text style={styles.emptyTitle}>No matches yet — check back soon</Text>
            <Text style={styles.emptyDesc}>Update your filters to discover more travel partners.</Text>
            <TouchableOpacity style={styles.stateBtn} onPress={() => router.push('/flows/community-filters')} accessibilityLabel="Adjust match filters">
              <Text style={styles.stateBtnText}>Adjust Filters</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.whySection}>
          <Text style={styles.whyTitle}>Why These Matches?</Text>
          {WHY_ITEMS.map((item) => (
            <View key={item.title} style={[styles.whyCard, { backgroundColor: item.color }]}>
              <Ionicons name={item.ionName as any} size={20} color={Colors.brand} />
              <View style={styles.whyBody}>
                <Text style={styles.whyCardTitle}>{item.title}</Text>
                <Text style={styles.whyCardDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        </>
        )}

      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  heroSection: { paddingHorizontal: Spacing.screen, paddingTop: 8, paddingBottom: 16 },
  heroSuper: { ...Typography.label, color: Colors.accent, marginBottom: 4 },
  heroTitle: { ...Typography.h1, color: Colors.textPrimary, lineHeight: 36, marginBottom: 12 },
  filterRow: { flexDirection: 'row', gap: 10 },
  filterBtn: {
    borderWidth: 1, borderColor: Colors.borderDark,
    borderRadius: Radius.pill, paddingHorizontal: 14, paddingVertical: 7,
    flexDirection: "row", alignItems: "center", gap: 5,
  },
  filterBtnText: { ...Typography.label, color: Colors.textPrimary, fontSize: 11 },
  personaTag: {
    borderWidth: 1, borderColor: Colors.borderDark,
    borderRadius: Radius.pill, paddingHorizontal: 14, paddingVertical: 7,
  },
  personaTagText: { ...Typography.label, color: Colors.textPrimary, fontSize: 11 },

  matchCard: {
    marginHorizontal: Spacing.screen, marginBottom: 16,
    backgroundColor: Colors.bgCard, borderRadius: Radius.lg, overflow: 'hidden', ...Shadow.sm,
  },
  imgWrap: { position: 'relative' },
  matchImg: { width: '100%', height: 220 },
  matchBadge: {
    position: 'absolute', top: 12, right: 12,
    backgroundColor: Colors.bgMuted,
    borderRadius: Radius.pill, paddingHorizontal: 10, paddingVertical: 5,
    alignItems: 'center',
  },
  matchBadgeText: { ...Typography.h2, color: Colors.brand },
  matchBadgeSub: { ...Typography.caption, color: Colors.textSecondary },

  matchBody: { padding: 16 },
  matchName: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 },
  locationText: { ...Typography.bodyMd, color: Colors.textSecondary },
  matchBio: { ...Typography.bodyMd, color: Colors.textSecondary, lineHeight: 20, marginBottom: 12 },

  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  tag: {
    backgroundColor: Colors.bgMuted, borderRadius: Radius.pill,
    paddingHorizontal: 10, paddingVertical: 4,
  },
  tagText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },

  actionsRow: { flexDirection: 'row', gap: 10 },
  skipBtn: {
    flex: 1, borderWidth: 1, borderColor: Colors.borderDark,
    borderRadius: Radius.button, paddingVertical: 12, alignItems: 'center', minHeight: 44, justifyContent: 'center',
  },
  skipText: { ...Typography.h4, color: Colors.textSecondary },
  connectBtn: {
    flex: 1, backgroundColor: Colors.brand,
    borderRadius: Radius.button, paddingVertical: 12, alignItems: 'center', minHeight: 44, justifyContent: 'center',
  },
  connectBtnActive: { backgroundColor: Colors.success },
  connectText: { ...Typography.h4, color: Colors.textOnDark },

  statusText: { ...Typography.bodySm, color: Colors.success, marginHorizontal: Spacing.screen, marginBottom: 8 },

  centerState: { alignItems: 'center', justifyContent: 'center', padding: 40, gap: 8 },
  stateTitle: { ...Typography.h4, color: Colors.textPrimary, textAlign: 'center' },
  stateBody: { ...Typography.bodyMd, color: Colors.textSecondary, textAlign: 'center' },
  stateBtn: { marginTop: 8, backgroundColor: Colors.brand, borderRadius: Radius.button, minHeight: 44, paddingHorizontal: 20, justifyContent: 'center' },
  stateBtnText: { ...Typography.label, color: Colors.textOnDark },

  emptyState: { alignItems: 'center', padding: 40 },
  emptyTitle: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 6 },
  emptyDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },

  whySection: { paddingHorizontal: Spacing.screen, paddingTop: 8 },
  whyTitle: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 12 },
  whyCard: {
    borderRadius: Radius.lg, padding: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
  },
  whyBody: { flex: 1 },
  whyCardTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 4 },
  whyCardDesc: { ...Typography.bodyMd, color: Colors.textSecondary },
});
