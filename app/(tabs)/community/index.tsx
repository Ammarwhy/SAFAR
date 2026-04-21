import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Image, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_MATCHES } from '../../../constants/mockData';
import SafarHeader from '../../../components/layouts/SafarHeader';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

const WHY_ITEMS = [
  { icon: '🤖', color: '#FFF3CD', title: 'AI Compatibility', desc: 'Our neural engine analyzes over 50 travel preferences to find your ideal nomad companion.' },
  { icon: '🛡', color: '#FFF8E1', title: 'Safety First', desc: 'All profiles are verified with a multi-step identity check before matching.' },
  { icon: '🗺', color: '#F5F5F5', title: 'Route Sync', desc: 'We match travelers whose routes overlap, making spontaneous meetups possible.' },
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroSuper}>ADVENTURE AWAITS</Text>
          <Text style={styles.heroTitle}>Your Potential{"\n"}Travel Partners</Text>
          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterBtn}>
              <Text style={styles.filterBtnText}>⚙ Filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.personaTag}>
              <Text style={styles.personaTagText}>⛰ Mountain Seekers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {visible.map((match) => (
          <View key={match.id} style={styles.matchCard}>
            <View style={styles.imgWrap}>
              <Image source={{ uri: match.avatar }} style={styles.matchImg} />
              <View style={styles.matchBadge}>
                <Text style={styles.matchBadgeIcon}>⚡</Text>
                <Text style={styles.matchBadgeText}>{match.matchPct}% Match</Text>
              </View>
            </View>

            <View style={styles.matchBody}>
              <Text style={styles.matchName}>{match.name}, {match.age}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.locationPin}>📍</Text>
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
                  <Text style={styles.skipText}>✕  Skip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.connectBtn, connected.includes(match.id) && styles.connectBtnActive]}
                  onPress={() => connect(match.id)}
                >
                  <Text style={styles.connectText}>
                    {connected.includes(match.id) ? '✓ Connected' : '♥  Connect'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}

        {visible.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🏔</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyDesc}>Refresh to find more travelers heading your way.</Text>
          </View>
        )}

        <View style={styles.whySection}>
          <Text style={styles.whyTitle}>Why These Matches?</Text>
          {WHY_ITEMS.map((item) => (
            <View key={item.title} style={[styles.whyCard, { backgroundColor: item.color }]}>
              <Text style={styles.whyIcon}>{item.icon}</Text>
              <View style={styles.whyBody}>
                <Text style={styles.whyCardTitle}>{item.title}</Text>
                <Text style={styles.whyCardDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
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
  matchBadgeIcon: { fontSize: 11 },
  matchBadgeText: { ...Typography.label, color: Colors.brand, fontSize: 11 },

  matchBody: { padding: 16 },
  matchName: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 },
  locationPin: { fontSize: 12 },
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
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 6 },
  emptyDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center' },

  whySection: { paddingHorizontal: Spacing.screen, paddingTop: 8 },
  whyTitle: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 12 },
  whyCard: {
    borderRadius: Radius.lg, padding: 14, marginBottom: 10,
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
  },
  whyIcon: { fontSize: 20, marginTop: 2 },
  whyBody: { flex: 1 },
  whyCardTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 4 },
  whyCardDesc: { ...Typography.bodyMd, color: Colors.textSecondary },
});
