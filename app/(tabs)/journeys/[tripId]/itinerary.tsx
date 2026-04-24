import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Typography, Spacing, Radius } from "../../../../constants/Theme";
import BottomTabBar from "../../../../components/layouts/BottomTabBar";

const STOPS = [
	{ day: 1, name: "Islamabad", note: "Departure point. Check gear, meet team." },
	{ day: 2, name: "Chilas", note: "Night halt. Karakoram Highway begins." },
	{ day: 3, name: "Skardu", note: "Base city. Rest and acclimatize." },
	{ day: 5, name: "Askole", note: "Last village. Porter assembly." },
	{ day: 8, name: "Concordia", note: "Throne Room of the Mountain Gods." },
	{ day: 10, name: "K2 Base Camp", note: "Main objective. Altitude: 5,150m." },
];

export default function ItineraryScreen() {
	const router = useRouter();
	const { tripId } = useLocalSearchParams<{ tripId: string }>();

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
					<Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Itinerary</Text>
				<TouchableOpacity onPress={() => router.push(`/(tabs)/journeys/${tripId}/vibe-room`)}>
					<Text style={styles.chatLink}>Chat →</Text>
				</TouchableOpacity>
			</View>

			<ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
				<Text style={styles.tripTitle}>Karakoram Expedition</Text>
				<Text style={styles.tripMeta}>14 Days  •  AUG 12 – AUG 28  •  Gilgit-Baltistan</Text>

				{STOPS.map((stop, i) => (
					<View key={i} style={styles.stopRow}>
						<View style={styles.stopLeft}>
							<View style={styles.stopDot} />
							{i < STOPS.length - 1 && <View style={styles.stopLine} />}
						</View>
						<View style={styles.stopBody}>
							<Text style={styles.stopDay}>DAY {stop.day}</Text>
							<Text style={styles.stopName}>{stop.name}</Text>
							<Text style={styles.stopNote}>{stop.note}</Text>
						</View>
					</View>
				))}

				<View style={styles.actionRow}>
					<TouchableOpacity
						style={styles.expenseBtn}
						onPress={() => router.push(`/(tabs)/journeys/${tripId}/expense`)}
					>
						<Text style={styles.expenseBtnText}>Expense Ledger</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.vibeBtn}
						onPress={() => router.push(`/(tabs)/journeys/${tripId}/vibe-room`)}
					>
						<Text style={styles.vibeBtnText}>Vibe Room</Text>
					</TouchableOpacity>
				</View>
				<View style={{ height: 20 }} />
			</ScrollView>
			<BottomTabBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: Spacing.screen,
		paddingTop: 10,
		paddingBottom: 8,
	},
	headerTitle: { ...Typography.h3, color: Colors.textPrimary },
	chatLink: { ...Typography.h4, color: Colors.brand, fontSize: 14 },
	content: { paddingHorizontal: Spacing.screen, paddingBottom: 20 },
	tripTitle: { ...Typography.h1, color: Colors.textPrimary, marginBottom: 4 },
	tripMeta: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 24 },
	stopRow: { flexDirection: "row", gap: 14, marginBottom: 0 },
	stopLeft: { alignItems: "center", width: 16 },
	stopDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.brand, marginTop: 4 },
	stopLine: { flex: 1, width: 2, backgroundColor: Colors.border, marginTop: 4, minHeight: 40 },
	stopBody: { flex: 1, paddingBottom: 20 },
	stopDay: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
	stopName: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 2 },
	stopNote: { ...Typography.bodyMd, color: Colors.textSecondary },
	actionRow: { flexDirection: "row", gap: 10, marginTop: 8 },
	expenseBtn: {
		flex: 1,
		backgroundColor: Colors.brand,
		borderRadius: Radius.full,
		paddingVertical: 12,
		alignItems: "center",
	},
	expenseBtnText: { ...Typography.h4, color: "#fff" },
	vibeBtn: {
		flex: 1,
		backgroundColor: Colors.bgCard,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: Radius.full,
		paddingVertical: 12,
		alignItems: "center",
	},
	vibeBtnText: { ...Typography.h4, color: Colors.textPrimary },
});
