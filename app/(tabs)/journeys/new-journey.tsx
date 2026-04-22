import React, { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../../constants/Theme";
import BottomTabBar from "../../../components/layouts/BottomTabBar";

export default function NewJourneyScreen() {
	const router = useRouter();
	const [title, setTitle] = useState("");
	const [dest, setDest] = useState("");
	const [dates, setDates] = useState("");

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text style={styles.backText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>New Journey</Text>
				<View style={{ width: 36 }} />
			</View>
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.sectionLabel}>JOURNEY DETAILS</Text>
				{[
					{ label: "Journey Title", val: title, set: setTitle, placeholder: "e.g. Karakoram Expedition" },
					{ label: "Destination", val: dest, set: setDest, placeholder: "e.g. Gilgit-Baltistan" },
					{ label: "Travel Dates", val: dates, set: setDates, placeholder: "e.g. Aug 12 – Aug 28" },
				].map((f) => (
					<View key={f.label} style={styles.fieldGroup}>
						<Text style={styles.fieldLabel}>{f.label}</Text>
						<TextInput
							style={styles.input}
							placeholder={f.placeholder}
							placeholderTextColor={Colors.textMuted}
							value={f.val}
							onChangeText={f.set}
						/>
					</View>
				))}

				<TouchableOpacity
					style={styles.createBtn}
					onPress={() => {
						router.replace("/(tabs)/journeys");
					}}
				>
					<Text style={styles.createBtnText}>Create Journey →</Text>
				</TouchableOpacity>
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
	backText: { fontSize: 22, color: Colors.textPrimary },
	headerTitle: { ...Typography.h3, color: Colors.textPrimary },
	content: { padding: Spacing.screen, gap: 4 },
	sectionLabel: { ...Typography.label, color: Colors.textMuted, marginBottom: 12 },
	fieldGroup: { marginBottom: 14 },
	fieldLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 6 },
	input: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.md,
		paddingHorizontal: 14,
		paddingVertical: 13,
		...Typography.body,
		color: Colors.textPrimary,
		...Shadow.sm,
	},
	createBtn: {
		backgroundColor: Colors.brand,
		borderRadius: Radius.full,
		paddingVertical: 16,
		alignItems: "center",
		marginTop: 12,
	},
	createBtnText: { ...Typography.h4, color: "#fff", fontSize: 16 },
});
