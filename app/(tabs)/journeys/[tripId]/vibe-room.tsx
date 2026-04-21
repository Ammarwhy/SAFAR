import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import ChatBubble from "@/components/ui/ChatBubble";
import { colors, spacing } from "@/constants/colors";

export default function VibeRoomScreen() {
	const { tripId } = useLocalSearchParams<{ tripId: string }>();

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="VIBE ROOM" subtitle={`${tripId ?? "Trip"} · 4 Active Explorers`} />
			<View style={styles.pinnedCard}>
				<Text style={styles.pinnedLabel}>📌 PINNED PRIORITY</Text>
				<Text style={styles.pinnedTitle}>Kashi Trip Itinerary — Day 3</Text>
				<Text style={styles.pinnedBody}>Sunrise Aarti at Dashashwamedh Ghat & Silk Weaving Workshop</Text>
			</View>
			<ChatBubble sender="AMARA" message="Does everyone have the exact location for the sunrise boat meet-up?" />
			<ChatBubble isMe message="Pinned in the map card. Meet-up 5:30 AM." />
			<FrameBottomNav
				items={[
					{ label: "Explore" },
					{ label: "Journey" },
					{ label: "Peers" },
					{ label: "Chat", active: true },
					{ label: "Profile" },
				]}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	pinnedCard: { backgroundColor: "#EEDFB8", borderRadius: 16, padding: spacing.md, marginBottom: spacing.md },
	pinnedLabel: { color: colors.textDark, fontWeight: "700", fontSize: 11, marginBottom: 6 },
	pinnedTitle: { color: colors.primaryBlue, fontWeight: "700", fontSize: 17 },
	pinnedBody: { marginTop: 6, color: colors.textDark, lineHeight: 20 },
});
