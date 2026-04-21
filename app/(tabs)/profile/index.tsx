import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import { colors, radius, spacing } from "@/constants/colors";

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeritageHeader title="USER PROFILE" subtitle="Settings" />
      <View style={styles.statsCard}>
        <Text style={styles.name}>Elias Thorne</Text>
        <Text style={styles.meta}>VERIFIED ACCOUNT · Curator</Text>
        <View style={styles.statsRow}>
          <Text style={styles.stat}>14 Expeditions</Text>
          <Text style={styles.stat}>8.2k Heritage Points</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Account</Text>
        <Text style={styles.item}>Personal Information</Text>
        <Text style={styles.item}>Email Address</Text>
        <Text style={styles.item}>Expense Ledger</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <Text style={styles.item}>Offline Safety Kit Toggle</Text>
        <Text style={styles.item}>Curated Theme Toggle</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Privacy & Security</Text>
        <Text style={styles.item}>Passkey Access</Text>
        <Text style={styles.item}>Privacy Mode</Text>
      </View>

      <Text style={styles.signOut}>SIGN OUT OF HERITAGE</Text>

      <FrameBottomNav
        items={[
          { label: "Compass" },
          { label: "Search" },
          { label: "People" },
          { label: "Chat" },
          { label: "Profile", active: true },
        ]}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundCream },
  content: { padding: spacing.md, gap: spacing.md },
  statsCard: {
    backgroundColor: colors.cardWhite,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  name: { color: colors.primaryBlue, fontSize: 24, fontWeight: "700" },
  meta: { color: colors.textMuted, marginTop: 4 },
  statsRow: { marginTop: spacing.sm, flexDirection: "row", justifyContent: "space-between", gap: spacing.sm },
  stat: { color: colors.textDark, fontWeight: "700" },
  sectionCard: {
    backgroundColor: colors.cardWhite,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: radius.lg,
    padding: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.primaryBlue,
    fontWeight: "700",
    fontSize: 18,
  },
  item: {
    color: colors.textDark,
  },
  signOut: {
    color: colors.errorRed,
    textAlign: "center",
    marginTop: spacing.sm,
    fontWeight: "700",
  },
});