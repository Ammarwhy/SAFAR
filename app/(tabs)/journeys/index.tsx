import React, { useState } from "react";
import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../../constants/Theme";
import { MOCK_JOURNEYS } from "../../../constants/mockData";
import SafarHeader from "../../../components/layouts/SafarHeader";
import BottomTabBar from "../../../components/layouts/BottomTabBar";

const TABS = ["Upcoming", "Past Trips", "Wishlist"];

export default function JourneysScreen() {
  const router = useRouter();
  const [tab, setTab] = useState("Upcoming");
  const [j1, j2] = MOCK_JOURNEYS;

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.titleSection}>
          <Text style={styles.super}>YOUR EXPEDITIONS</Text>
          <Text style={styles.pageTitle}>The Nomad&apos;s{"\n"}Journey</Text>
        </View>

        <View style={styles.tabRow}>
          {TABS.map((t) => (
            <TouchableOpacity key={t} style={styles.tabBtn} onPress={() => setTab(t)}>
              <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>{t}</Text>
              {tab === t && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.mainCard}
          activeOpacity={0.9}
          onPress={() => router.push(`/(tabs)/journeys/${j1.id}/itinerary`)}
        >
          <ImageBackground source={{ uri: j1.heroImage }} style={styles.mainCardBg} imageStyle={{ borderRadius: Radius.xl }}>
            <View style={styles.mainCardOverlay}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{j1.status}</Text>
              </View>
              <Text style={styles.mainCardTitle}>{j1.title}</Text>
              <View style={styles.mainCardMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.85)" />
                  <Text style={styles.metaText}>{j1.dates}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.85)" />
                  <Text style={styles.metaText}>{j1.destination}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewItineraryBtn}
                onPress={() => router.push(`/(tabs)/journeys/${j1.id}/itinerary`)}
              >
                <Text style={styles.viewItineraryText}>View Itinerary →</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.gearCard}>
          <View style={styles.gearHeader}>
            <Ionicons name="triangle-outline" size={24} color={Colors.textPrimary} />
            <View>
              <Text style={styles.gearDistance}>{j1.distanceKM?.toLocaleString()} KM</Text>
              <Text style={styles.gearSub}>to your next summit</Text>
            </View>
          </View>
          <Text style={styles.gearText}>{j1.gearAdvisory}</Text>
          <TouchableOpacity
            style={styles.gearBtn}
            onPress={() => router.push('/flows/gear-list')}
          >
            <Text style={styles.gearBtnText}>Check Gear List</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.visaCard}>
          <Text style={styles.visaLabel}>LATEST UPDATE</Text>
          <Text style={styles.visaText}>{j1.visaUpdate}</Text>
          <View style={styles.visaAvatarRow}>
            {[1, 2, 3].map((i) => (
              <View key={i} style={[styles.visaAvatar, { left: (i - 1) * 20 }]} />
            ))}
            <Text style={styles.visaMore}>+3</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.secondCard}
          activeOpacity={0.9}
          onPress={() => router.push(`/(tabs)/journeys/${j2.id}/itinerary`)}
        >
          <ImageBackground source={{ uri: j2.heroImage }} style={styles.secondCardBg} imageStyle={{ borderRadius: Radius.xl }}>
            <View style={styles.secondCardOverlay}>
              <View style={[styles.statusBadge, styles.bookingBadge]}>
                <Text style={styles.statusText}>{j2.status}</Text>
              </View>
              <Text style={styles.secondCardTitle}>{j2.title}</Text>
              <Text style={styles.secondCardDates}>{j2.dates}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        <View style={styles.extendCard}>
          <Text style={styles.extendTitle}>Extend your{"\n"}journey?</Text>
          <Text style={styles.extendDesc}>
            Discover hidden tea houses in the Marsyangdi Valley, just 4 hours from your Annapurna route.
          </Text>
          <TouchableOpacity style={styles.extendBtn} onPress={() => router.push('/(tabs)/explore')}>
            <Text style={styles.extendBtnText}>Explore Detours</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  titleSection: { paddingHorizontal: Spacing.screen, paddingTop: 8, paddingBottom: 4 },
  super: { ...Typography.label, color: Colors.textMuted, marginBottom: 4 },
  pageTitle: { ...Typography.h1, color: Colors.textPrimary, lineHeight: 36 },
  tabRow: { flexDirection: "row", paddingHorizontal: Spacing.screen, marginBottom: 16, marginTop: 12 },
  tabBtn: { marginRight: 20, paddingBottom: 6 },
  tabText: { ...Typography.h4, color: Colors.textMuted },
  tabTextActive: { color: Colors.textPrimary },
  tabUnderline: { height: 2, backgroundColor: Colors.textPrimary, borderRadius: 1, marginTop: 4 },

  mainCard: { marginHorizontal: Spacing.screen, marginBottom: 12, borderRadius: Radius.xl, ...Shadow.md },
  mainCardBg: { height: 280, justifyContent: "flex-end" },
  mainCardOverlay: { padding: 16, backgroundColor: "rgba(0,0,0,0.5)", borderRadius: Radius.xl },
  statusBadge: {
    backgroundColor: Colors.brand,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  bookingBadge: { backgroundColor: Colors.match + "CC" },
  statusText: { ...Typography.label, color: "#fff", fontSize: 10 },
  mainCardTitle: { ...Typography.h1, color: "#fff", marginBottom: 8 },
  mainCardMeta: { flexDirection: "row", gap: 14, marginBottom: 12 },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 4 },
  metaText: { ...Typography.bodyMd, color: "rgba(255,255,255,0.85)" },
  viewItineraryBtn: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    borderRadius: Radius.full,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  viewItineraryText: { ...Typography.h4, color: "#fff" },

  gearCard: {
    marginHorizontal: Spacing.screen,
    marginBottom: 12,
    backgroundColor: Colors.dangerBg,
    borderRadius: Radius.lg,
    padding: 16,
  },
  gearHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  gearDistance: { ...Typography.h2, color: Colors.textPrimary },
  gearSub: { ...Typography.bodyMd, color: Colors.textSecondary },
  gearText: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 12 },
  gearBtn: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.full,
    paddingVertical: 10,
    alignItems: "center",
  },
  gearBtnText: { ...Typography.h4, color: Colors.textPrimary },

  visaCard: {
    marginHorizontal: Spacing.screen,
    marginBottom: 12,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    padding: 16,
    ...Shadow.sm,
  },
  visaLabel: { ...Typography.label, color: Colors.textMuted, marginBottom: 6 },
  visaText: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 10 },
  visaAvatarRow: { flexDirection: "row", alignItems: "center" },
  visaAvatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.bgMuted,
    borderWidth: 2,
    borderColor: Colors.bgCard,
    position: "relative",
  },
  visaMore: { ...Typography.label, color: Colors.textSecondary, marginLeft: 8, fontSize: 12 },

  secondCard: { marginHorizontal: Spacing.screen, marginBottom: 12, borderRadius: Radius.xl, ...Shadow.sm },
  secondCardBg: { height: 180, justifyContent: "flex-end" },
  secondCardOverlay: { padding: 14, backgroundColor: "rgba(0,0,0,0.55)", borderRadius: Radius.xl },
  secondCardTitle: { ...Typography.h2, color: "#fff", marginTop: 4 },
  secondCardDates: { ...Typography.bodyMd, color: "rgba(255,255,255,0.8)" },

  extendCard: {
    marginHorizontal: Spacing.screen,
    backgroundColor: Colors.brand,
    borderRadius: Radius.xl,
    padding: 20,
    marginBottom: 12,
  },
  extendTitle: { ...Typography.h2, color: "#fff", lineHeight: 30, marginBottom: 8 },
  extendDesc: { ...Typography.body, color: "rgba(255,255,255,0.8)", marginBottom: 16 },
  extendBtn: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.full,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
  },
  extendBtnText: { ...Typography.h4, color: Colors.brand },
});