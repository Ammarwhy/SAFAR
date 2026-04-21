import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import OfflineBanner from "@/components/ui/OfflineBanner";
import ArchCard from "@/components/ui/ArchCard";
import { colors, spacing } from "@/constants/colors";
import { destinations } from "@/constants/mockData";

export default function JourneysScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeritageHeader title="CURRENT EXPEDITION" subtitle="Journeys" />

      <ArchCard
        imageUri={destinations[0].imageUri}
        title="Samarkand: The Blue City"
        subtitle="Offline Access Available"
        badge="☁"
      />

      <Text style={styles.title}>Nomad's Journey</Text>
      <Text style={styles.body}>Tracing the ancient routes of the Silk Road through curated modern expeditions.</Text>

      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>The Turquoise Gates</Text>
        <Text style={styles.timelineMeta}>Active · ✓ CACHED</Text>
      </View>
      <View style={styles.timelineCard}>
        <Text style={styles.timelineTitle}>Varanasi: Eternal City</Text>
        <Text style={styles.timelineMeta}>COMPLETED SEPT 2023 · 8 Archive Logs</Text>
      </View>
      <View style={[styles.timelineCard, styles.lockedCard]}>
        <Text style={styles.timelineTitle}>The High Pamir Pass</Text>
        <Text style={styles.timelineMeta}>🔒 Unlocking Spring 2024</Text>
      </View>

      <View style={styles.bannerWrap}>
        <OfflineBanner text="Offline Safety Kit · 3 Destinations Downloaded · Update" />
      </View>

      <FrameBottomNav
        items={[
          { label: "Explore" },
          { label: "Journeys", active: true },
          { label: "Guild" },
          { label: "Messages" },
          { label: "Profile" },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundCream },
  content: { padding: spacing.md, gap: spacing.sm },
  bannerWrap: { marginTop: spacing.md },
  title: { marginTop: spacing.md, fontSize: 30, fontWeight: "700", color: colors.primaryBlue },
  body: { color: colors.textMuted, marginBottom: spacing.sm },
  timelineCard: {
    backgroundColor: colors.cardWhite,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.md,
  },
  lockedCard: {
    opacity: 0.6,
  },
  timelineTitle: {
    color: colors.primaryBlue,
    fontWeight: "700",
    fontSize: 18,
  },
  timelineMeta: {
    marginTop: 6,
    color: colors.textMuted,
  },
});