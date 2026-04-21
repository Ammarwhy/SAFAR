import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import { colors, radius, spacing } from "@/constants/colors";

export default function NewJourneyScreen() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="CURATED JOURNEYS" subtitle="New Journey" />
			<Text style={styles.title}>New Journey</Text>
			<Text style={styles.caption}>Create a curated expedition with destination and date range.</Text>

			<View style={styles.field}>
				<Text style={styles.label}>Journey Title</Text>
				<View style={styles.inputStub} />
			</View>
			<View style={styles.field}>
				<Text style={styles.label}>Destination</Text>
				<View style={styles.inputStub} />
			</View>
			<View style={styles.field}>
				<Text style={styles.label}>Date Range</Text>
				<View style={styles.inputStub} />
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
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	title: { marginTop: spacing.md, fontSize: 30, fontWeight: "700", color: colors.primaryBlue },
	caption: { marginTop: 8, color: colors.textMuted, marginBottom: spacing.md, lineHeight: 21 },
	field: {
		marginBottom: spacing.md,
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		padding: spacing.md,
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
	label: {
		color: colors.primaryBlue,
		fontWeight: "700",
		marginBottom: spacing.sm,
	},
	inputStub: {
		height: 2,
		backgroundColor: colors.borderSoft,
	},
});
