import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "@/components/layouts/BottomTabBar";
import SafarHeader from "@/components/layouts/SafarHeader";
import ChatBubble from "@/components/ui/ChatBubble";
import { Colors, Spacing, Radius, Typography } from "@/constants/Theme";

export default function MessagesScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader title="VIBE ROOM" subtitle="4 Active Explorers" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pinnedCard}>
          <Text style={styles.pinnedLabel}>PINNED PRIORITY</Text>
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
          <Ionicons name="add" size={22} color={Colors.brand} />
          <Text style={styles.inputHint}>Share a vibe...</Text>
          <Ionicons name="send" size={18} color={Colors.brand} />
        </View>
      </ScrollView>
      <BottomTabBar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: 100 },
  pinnedCard: {
    backgroundColor: "#EDE8D6",
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  pinnedLabel: { ...Typography.label, color: Colors.textPrimary, marginBottom: 6 },
  pinnedTitle: { ...Typography.h4, color: Colors.brand },
  pinnedBody: { marginTop: 6, ...Typography.bodyMd, color: Colors.textPrimary },
  syncCard: {
    marginTop: Spacing.sm,
    backgroundColor: Colors.dangerBg,
    borderRadius: Radius.md,
    padding: Spacing.md,
  },
  syncTitle: { ...Typography.h4, color: Colors.danger },
  syncBody: { marginTop: 6, ...Typography.bodyMd, color: Colors.textMuted },
  syncAction: { marginTop: Spacing.sm, ...Typography.label, color: Colors.brand },
  inputBar: {
    marginTop: Spacing.md,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputHint: { ...Typography.bodyMd, color: Colors.textMuted, flex: 1, marginHorizontal: 8 },
});
