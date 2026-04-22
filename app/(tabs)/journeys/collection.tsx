import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  ImageBackground, Image, SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadow } from '../../../constants/Theme';
import { MOCK_TRIPS } from '../../../constants/mockData';
import SafarHeader from '../../../components/layouts/SafarHeader';
import BottomTabBar from '../../../components/layouts/BottomTabBar';

export default function CollectionScreen() {
  const router = useRouter();
  const [upcoming, ...archived] = MOCK_TRIPS;

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleSection}>
          <Text style={styles.super}>YOUR COLLECTION</Text>
          <Text style={styles.pageTitle}>Trips</Text>
          <Text style={styles.pageDesc}>
            Curated journeys, upcoming adventures, and the digital ledger of your nomadic life.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.heroCard}
          onPress={() => router.push(`/(tabs)/journeys/${upcoming.id}/itinerary`)}
          activeOpacity={0.9}
        >
          <ImageBackground
            source={{ uri: upcoming.heroImage }}
            style={styles.heroBg}
            imageStyle={{ borderRadius: Radius.xl }}
          >
            <View style={styles.heroOverlay}>
              <View style={styles.upcomingBadge}>
                <View style={styles.greenDot} />
                <Text style={styles.upcomingText}>UPCOMING — {upcoming.daysLeft} DAYS LEFT</Text>
              </View>
              <Text style={styles.heroTitle}>{upcoming.title}</Text>
              <View style={styles.heroMeta}>
                <Text style={styles.heroMetaText}>📍 {upcoming.destination}</Text>
                <Text style={styles.heroMetaText}>  •  </Text>
                <Text style={styles.heroMetaText}>{upcoming.dates}</Text>
              </View>
              <View style={styles.heroActions}>
                <TouchableOpacity
                  style={styles.heroActionBtn}
                  onPress={() => router.push(`/(tabs)/journeys/${upcoming.id}/itinerary`)}
                >
                  <Text style={styles.heroActionText}>View{'\n'}Itinerary</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.heroActionBtn, styles.heroActionDark]}
                  onPress={() => router.push('/flows/manage-docs')}
                >
                  <Text style={[styles.heroActionText, { color: '#fff' }]}>Manage{'\n'}Docs</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {archived.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={styles.archiveCard}
            onPress={() => router.push(`/(tabs)/journeys/${trip.id}/itinerary`)}
          >
            <View style={styles.archiveHeader}>
              <Image source={{ uri: trip.heroImage }} style={styles.archiveThumb} />
              <View style={styles.archiveBody}>
                <Text style={styles.archiveMeta}>ARCHIVE — {trip.year}</Text>
                <Text style={styles.archiveTitle}>{trip.title}</Text>
                <Text style={styles.archiveSubtitle}>{trip.subtitle}</Text>
                <View style={styles.archiveDetail}>
                  <Text style={styles.archiveDetailText}>📅  {trip.dates}</Text>
                </View>
                <View style={styles.archiveDetail}>
                  <Text style={styles.archiveDetailText}>🛏  {trip.hotel}</Text>
                </View>
              </View>
            </View>
            <View style={styles.archiveFooter}>
              <Text style={styles.stopsText}>{trip.stops} STOPS</Text>
              <TouchableOpacity onPress={() => router.push(`/(tabs)/journeys/${trip.id}/itinerary`)}>
                <Text style={styles.recallText}>Recall →</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.draftsSection}>
          <View style={styles.draftsSectionHeader}>
            <View>
              <Text style={styles.draftsSuper}>IN PROGRESS</Text>
              <Text style={styles.draftsTitle}>Drafted{'\n'}Explorations</Text>
            </View>
            <TouchableOpacity onPress={() => router.push('/(tabs)/journeys/new-journey')}>
              <Text style={styles.seeAllDrafts}>SEE ALL{'\n'}DRAFTS</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.draftsList}>
            {[
              { title: 'Andean Peaks', sub: 'PERU EXPEDITION', collab: true },
              { title: 'Namib Dunes', sub: 'DESERT ODYSSEY', collab: false },
            ].map((draft) => (
              <TouchableOpacity
                key={draft.title}
                style={styles.draftCard}
                onPress={() => router.push('/(tabs)/journeys/new-journey')}
              >
                <Text style={styles.draftTitle}>{draft.title}</Text>
                <Text style={styles.draftSub}>{draft.sub}</Text>
                {draft.collab && (
                  <View style={styles.draftCollab}>
                    <View style={[styles.draftAvatar, { backgroundColor: '#8D7868' }]} />
                    <View style={[styles.draftAvatar, { backgroundColor: '#5C3A26', marginLeft: -8 }]} />
                    <Text style={styles.draftCollabText}>Collaborative</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  titleSection: { paddingHorizontal: Spacing.screen, paddingTop: 8, paddingBottom: 12 },
  super: { ...Typography.label, color: Colors.textMuted, marginBottom: 2 },
  pageTitle: { ...Typography.h1, color: Colors.textPrimary, fontSize: 36 },
  pageDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginTop: 4 },

  heroCard: { marginHorizontal: Spacing.screen, marginBottom: 16, borderRadius: Radius.xl, ...Shadow.md },
  heroBg: { height: 320, justifyContent: 'flex-end' },
  heroOverlay: { padding: 16, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: Radius.xl },
  upcomingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radius.full, paddingHorizontal: 10, paddingVertical: 4,
    alignSelf: 'flex-start', marginBottom: 8,
  },
  greenDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.success },
  upcomingText: { ...Typography.label, color: '#fff', fontSize: 10 },
  heroTitle: { ...Typography.h1, color: '#fff', fontSize: 30, marginBottom: 6 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', marginBottom: 14 },
  heroMetaText: { ...Typography.bodyMd, color: 'rgba(255,255,255,0.85)' },
  heroActions: { flexDirection: 'row', gap: 10 },
  heroActionBtn: {
    flex: 1, backgroundColor: Colors.bgCard, borderRadius: Radius.md,
    paddingVertical: 10, alignItems: 'center',
  },
  heroActionDark: { backgroundColor: 'rgba(255,255,255,0.2)' },
  heroActionText: { ...Typography.bodyMd, color: Colors.textPrimary, textAlign: 'center', fontWeight: '600' },

  archiveCard: {
    marginHorizontal: Spacing.screen, marginBottom: 12,
    backgroundColor: Colors.bgCard, borderRadius: Radius.lg, padding: 14, ...Shadow.sm,
  },
  archiveHeader: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  archiveThumb: { width: 64, height: 64, borderRadius: Radius.md },
  archiveBody: { flex: 1 },
  archiveMeta: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
  archiveTitle: { ...Typography.h3, color: Colors.textPrimary },
  archiveSubtitle: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 4 },
  archiveDetail: { flexDirection: 'row', gap: 6, marginBottom: 2 },
  archiveDetailText: { ...Typography.caption, color: Colors.textSecondary },
  archiveFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  stopsText: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },
  recallText: { ...Typography.h4, color: Colors.brand, fontSize: 14 },

  draftsSection: { paddingHorizontal: Spacing.screen, marginTop: 4 },
  draftsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  draftsSuper: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
  draftsTitle: { ...Typography.h2, color: Colors.textPrimary, lineHeight: 28 },
  seeAllDrafts: { ...Typography.label, color: Colors.textSecondary, fontSize: 10, textAlign: 'right' },
  draftsList: { marginLeft: -4 },
  draftCard: {
    backgroundColor: Colors.bgCard, borderRadius: Radius.lg,
    padding: 14, marginRight: 10, width: 160, ...Shadow.sm,
  },
  draftTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 2 },
  draftSub: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 10 },
  draftCollab: { flexDirection: 'row', alignItems: 'center' },
  draftAvatar: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: Colors.bgCard },
  draftCollabText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10, marginLeft: 6 },
});
