import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../constants/Theme";

export default function ConnectionErrorScreen() {
	const router = useRouter();
	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.container}>
				<View style={styles.iconBox}>
					<Text style={styles.icon}>🚫</Text>
				</View>
				<Text style={styles.title}>No Connection</Text>
				<Text style={styles.desc}>
					You seem to be offline. Your saved trips and expense ledger are still available. Reconnect to sync changes.
				</Text>
				<TouchableOpacity style={styles.retryBtn} onPress={() => router.back()}>
					<Text style={styles.retryText}>Retry</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => router.replace("/(tabs)/journeys")}>
					<Text style={styles.offlineText}>Browse Offline Content</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },
	container: { flex: 1, alignItems: "center", justifyContent: "center", padding: Spacing.lg },
	iconBox: {
		width: 80,
		height: 80,
		borderRadius: 20,
		backgroundColor: Colors.dangerBg,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
	},
	icon: { fontSize: 36 },
	title: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 10 },
	desc: { ...Typography.body, color: Colors.textSecondary, textAlign: "center", lineHeight: 22, marginBottom: 28 },
	retryBtn: {
		backgroundColor: "#5B6BF5",
		borderRadius: Radius.full,
		paddingVertical: 14,
		paddingHorizontal: 48,
		marginBottom: 16,
	},
	retryText: { ...Typography.h4, color: "#fff" },
	offlineText: { ...Typography.h4, color: "#5B6BF5" },
});
