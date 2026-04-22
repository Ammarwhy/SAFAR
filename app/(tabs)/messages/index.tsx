import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomTabBar from "@/components/layouts/BottomTabBar";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import ChatBubble from "@/components/ui/ChatBubble";
import { colors, spacing } from "@/constants/colors";

export default function MessagesScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <HeritageHeader title="VIBE ROOM" subtitle="4 Active Explorers" />
      <View style={styles.pinnedCard}>
        <Text style={styles.pinnedLabel}>📌 PINNED PRIORITY</Text>
        <Text style={styles.pinnedTitle}>Kashi Trip Itinerary — Day 3</Text>
        <Text style={styles.pinnedBody}>Sunrise Aarti at Dashashwamedh Ghat & Silk Weaving Workshop</Text>
      </View>

      <ChatBubble
        sender="Amara"
        message="Does everyone have the exact location for the sunrise boat meet-up?"
      />
      <ChatBubble
        sender="Julian"
        message="I just pinned the coordinates in the ledger. It's by the temple entrance."
      />
      <ChatBubble isMe message="The morning light here is incredible. I'll be there at 5:40 AM." />

      <View style={styles.syncCard}>
        <Text style={styles.syncTitle}>Sync Interrupted</Text>
        <Text style={styles.syncBody}>Messages will be sent once we're back online.</Text>
        <Text style={styles.syncAction}>TRY AGAIN</Text>
      </View>

      <View style={styles.inputBar}>
        <Text style={styles.inputPlus}>＋</Text>
        <Text style={styles.inputHint}>Share a vibe...</Text>
        <Text style={styles.inputSend}>➤</Text>
      </View>

      <BottomTabBar />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundCream },
  content: { padding: spacing.md },
  pinnedCard: {
    backgroundColor: "#EEDFB8",
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  pinnedLabel: { color: colors.textDark, fontWeight: "700", fontSize: 11, marginBottom: 6 },
  pinnedTitle: { color: colors.primaryBlue, fontWeight: "700", fontSize: 17 },
  pinnedBody: { marginTop: 6, color: colors.textDark, lineHeight: 20 },
  syncCard: {
    marginTop: spacing.sm,
    backgroundColor: "#FCEDEA",
    borderRadius: 16,
    padding: spacing.md,
  },
  syncTitle: { color: colors.errorRed, fontWeight: "700", fontSize: 18 },
  syncBody: { marginTop: 6, color: colors.textMuted },
  syncAction: { marginTop: spacing.sm, color: colors.primaryBlue, fontWeight: "700" },
  inputBar: {
    marginTop: spacing.md,
    backgroundColor: colors.cardWhite,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputPlus: { color: colors.primaryBlue, fontWeight: "700", fontSize: 22 },
  inputHint: { color: colors.textMuted },
  inputSend: { color: colors.primaryBlue, fontWeight: "700", fontSize: 18 },
});