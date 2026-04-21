import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import { colors, radius, spacing } from "@/constants/colors";

export default function TravelerProfileScreen() {
	const { userId } = useLocalSearchParams<{ userId: string }>();

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="TRAVELER PROFILE" subtitle={(userId ?? "traveler").toUpperCase()} />
			<View style={styles.photoStub}>
				<Text style={styles.photoStubText}>📷</Text>
			</View>
			<Text style={styles.title}>Julian Thorne</Text>
			<Text style={styles.tagline}>The Global Archivist</Text>
			<Text style={styles.body}>
				Curating memories through the lens of ancient geometry and silent landscapes.
			</Text>

			<View style={styles.badgesRow}>
				<Text style={styles.badge}>📍 Based in London</Text>
				<Text style={styles.badge}>🌍 42 Countries</Text>
			</View>

			<Text style={styles.section}>Travel Persona DNA</Text>
			<View style={styles.chartMock}>
				<Text style={styles.chartText}>HERITAGE · CULINARY · URBAN · NATURE · ADVENTURE · RELAXATION</Text>
			</View>

			<View style={styles.achievementCard}>
				<Text style={styles.achievementLine}>🏛 Heritage Seeker — Explored 50+ UNESCO sites</Text>
				<Text style={styles.achievementLine}>🍽 Gourmand — Documented 120 local cuisines</Text>
				<Text style={styles.achievementLine}>🏕 Explorer — Off-grid specialist</Text>
			</View>

			<View style={styles.scoreCard}>
				<Text style={styles.scoreLabel}>Curation Score</Text>
				<Text style={styles.score}>94.8 ↗</Text>
			</View>

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
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	photoStub: {
		marginTop: spacing.md,
		alignSelf: "center",
		width: 112,
		height: 112,
		borderRadius: 56,
		backgroundColor: "#D9D2C6",
		alignItems: "center",
		justifyContent: "center",
	},
	photoStubText: { fontSize: 30 },
	title: { marginTop: spacing.sm, fontSize: 30, fontWeight: "700", color: colors.primaryBlue, textAlign: "center" },
	tagline: { textAlign: "center", color: colors.textMuted, fontStyle: "italic" },
	body: { marginTop: spacing.sm, color: colors.textDark, lineHeight: 21, textAlign: "center" },
	badgesRow: { marginTop: spacing.sm, flexDirection: "row", gap: spacing.sm, justifyContent: "center" },
	badge: {
		backgroundColor: colors.cardWhite,
		borderRadius: 999,
		paddingHorizontal: spacing.md,
		paddingVertical: 7,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		color: colors.primaryBlue,
	},
	section: { marginTop: spacing.md, color: colors.primaryBlue, fontSize: 20, fontWeight: "700" },
	chartMock: {
		marginTop: spacing.sm,
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		padding: spacing.md,
	},
	chartText: { color: colors.textMuted, textAlign: "center", lineHeight: 20, fontSize: 12 },
	achievementCard: {
		marginTop: spacing.md,
		backgroundColor: colors.primaryBlue,
		borderRadius: radius.lg,
		padding: spacing.md,
		gap: spacing.sm,
	},
	achievementLine: { color: colors.cardWhite, lineHeight: 20 },
	scoreCard: {
		marginTop: spacing.md,
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		padding: spacing.md,
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
	scoreLabel: { color: colors.textMuted },
	score: { color: colors.primaryBlue, fontWeight: "700", fontSize: 34, marginTop: 4 },
});
