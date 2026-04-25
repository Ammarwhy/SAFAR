import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_MATCHES } from '../../../constants/mockData';
import SafarHeader from '../../../components/layouts/SafarHeader';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

const WHY_ITEMS = [
  { ionName: 'sparkles-outline', color: '#F4EFE8', title: 'AI Compatibility', desc: 'Our neural engine analyzes over 50 travel preferences to find your ideal nomad companion.' },
  { ionName: 'shield-checkmark-outline', color: '#EFF4F1', title: 'Safety First', desc: 'All profiles are verified with a multi-step identity check before matching.' },
  { ionName: 'map-outline', color: '#F0ECE8', title: 'Route Sync', desc: 'We match travelers whose routes overlap, making spontaneous meetups possible.' },
];

export default function MatchesScreen() {
  const router = useRouter();
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [connected, setConnected] = useState<string[]>([]);

  const skip = (id: string) => setDismissed((p) => [...p, id]);
  const connect = (id: string) => setConnected((p) => [...p, id]);

  const visible = MOCK_MATCHES.filter((m) => !dismissed.includes(m.id));

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader title="AI MATCH" subtitle="Discovery" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
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

        {visible.map((match) => (
          <View key={match.id} style={styles.matchCard}>
            <View style={styles.imgWrap}>
              <Image source={{ uri: match.avatar }} style={styles.matchImg} />
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeText}>{match.matchPct}% Match</Text>
              </View>
            </View>

            <View style={styles.matchBody}>
              <Text style={styles.matchName}>{match.name}, {match.age}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={13} color={Colors.textSecondary} />
                <Text style={styles.locationText}>{match.location}</Text>
              </View>
              <Text style={styles.matchBio}>{match.bio}</Text>

              <View style={styles.tagsRow}>
                {match.tags.map((tag) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.skipBtn} onPress={() => skip(match.id)}>
                  <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.connectBtn, connected.includes(match.id) && styles.connectBtnActive]}
                  onPress={() => connect(match.id)}
                >
                  <Text style={styles.connectText}>
                    {connected.includes(match.id) ? 'Connected' : 'Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {visible.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="compass-outline" size={48} color={Colors.textMuted} style={{ marginBottom: 12 }} />
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyDesc}>Refresh to find more travelers heading your way.</Text>
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
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  matchBadgeText: { ...Typography.label, color: Colors.brand, fontSize: 11 },

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
    borderRadius: Radius.pill, paddingVertical: 12, alignItems: 'center',
  },
  skipText: { ...Typography.h4, color: Colors.textSecondary },
  connectBtn: {
    flex: 1, backgroundColor: Colors.brand,
    borderRadius: Radius.pill, paddingVertical: 12, alignItems: 'center',
  },
  connectBtnActive: { backgroundColor: Colors.success },
  connectText: { ...Typography.h4, color: '#fff' },

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
