import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "@/components/layouts/BottomTabBar";
import SafarHeader from "@/components/layouts/SafarHeader";
import ChatBubble from "@/components/ui/ChatBubble";
import { Colors, Spacing, Radius, Typography } from "@/constants/Theme";

export default function MessagesScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setHasError(false);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <SafarHeader title="VIBE ROOM" subtitle="4 Active Explorers" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View style={styles.centerState}>
            <ActivityIndicator size="large" color={Colors.brand} />
            <Text style={styles.stateBody}>Loading your latest messages...</Text>
          </View>
        ) : hasError ? (
          <View style={styles.centerState}>
            <Ionicons name="warning-outline" size={36} color={Colors.warning} />
            <Text style={styles.stateTitle}>Messages are unavailable right now</Text>
            <Text style={styles.stateBody}>Check your connection and try again.</Text>
            <TouchableOpacity style={styles.stateBtn} onPress={retry} accessibilityLabel="Retry loading messages">
              <Text style={styles.stateBtnText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
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
          <TouchableOpacity onPress={retry} accessibilityLabel="Try syncing messages again">
            <Text style={styles.syncAction}>Try Again</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputBar}>
          <Ionicons name="add" size={22} color={Colors.brand} />
          <Text style={styles.inputHint}>Share a vibe...</Text>
          <Ionicons name="send" size={18} color={Colors.brand} />
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
  scroll: { flex: 1 },
  content: { padding: Spacing.md, paddingBottom: 100 },
  pinnedCard: {
    backgroundColor: Colors.bgMuted,
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
  centerState: { alignItems: "center", justifyContent: "center", padding: 40, gap: 8 },
  stateTitle: { ...Typography.h4, color: Colors.textPrimary, textAlign: "center" },
  stateBody: { ...Typography.bodyMd, color: Colors.textSecondary, textAlign: "center" },
  stateBtn: { marginTop: 8, backgroundColor: Colors.brand, borderRadius: Radius.button, minHeight: 44, paddingHorizontal: 20, justifyContent: "center" },
  stateBtnText: { ...Typography.label, color: Colors.textOnDark },
  inputBar: {
    marginTop: Spacing.md,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.button,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 44,
  },
  inputHint: { ...Typography.bodyMd, color: Colors.textMuted, flex: 1, marginHorizontal: 8 },
});
