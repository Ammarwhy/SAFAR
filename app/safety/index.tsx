import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import OfflineBanner from "@/components/ui/OfflineBanner";
import { colors, radius, spacing } from "@/constants/colors";

export default function SafetyCenterScreen() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="Safety Center" subtitle="Emergency" />
			<OfflineBanner text="OFFLINE SAFETY KIT: ACTIVE" />

			<View style={styles.sosCard}>
				<Text style={styles.sosText}>SOS</Text>
				<Text style={styles.sosSub}>TAP FOR HELP</Text>
			</View>

			<View style={styles.gridRow}>
				<View style={styles.featureCard}>
					<Text style={styles.featureTitle}>📍 Location</Text>
					<Text style={styles.featureBody}>Live coordinate broadcast active</Text>
				</View>
				<View style={styles.featureCard}>
					<Text style={styles.featureTitle}>🛡 Guide</Text>
					<Text style={styles.featureBody}>Verify local heritage expert credentials</Text>
				</View>
			</View>

			<View style={styles.contactsCard}>
				<Text style={styles.contactsTitle}>Emergency Contacts</Text>
				<Text style={styles.contactsBody}>3 trusted contacts linked</Text>
			</View>

			<View style={styles.sectionCard}>
				<Text style={styles.sectionTitle}>Local Authorities</Text>
				<Text style={styles.line}>Tourist Police · CALL</Text>
				<Text style={styles.line}>Heritage Hospital · CALL</Text>
			</View>

			<View style={styles.mapCard}>
				<Text style={styles.mapText}>YOU ARE HERE: VARANASI GHAT DISTRICT</Text>
			</View>

			<FrameBottomNav
				items={[
					{ label: "Explore" },
					{ label: "Journey" },
					{ label: "Safety", active: true },
					{ label: "Messages" },
					{ label: "Profile" },
				]}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, gap: spacing.md },
	sosCard: {
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		padding: spacing.lg,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#F4C8C8",
	},
	sosText: {
		color: colors.errorRed,
		fontSize: 48,
		fontWeight: "700",
	},
	sosSub: {
		color: colors.textDark,
		fontWeight: "700",
		letterSpacing: 1.2,
	},
	gridRow: {
		flexDirection: "row",
		gap: spacing.sm,
	},
	featureCard: {
		flex: 1,
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		padding: spacing.md,
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
	featureTitle: {
		color: colors.primaryBlue,
		fontWeight: "700",
	},
	featureBody: {
		marginTop: 6,
		color: colors.textMuted,
		fontSize: 12,
	},
	contactsCard: {
		backgroundColor: colors.primaryBlue,
		borderRadius: radius.lg,
		padding: spacing.md,
	},
	contactsTitle: { color: colors.cardWhite, fontWeight: "700", fontSize: 18 },
	contactsBody: { color: colors.cardWhite, marginTop: 6 },
	sectionCard: {
		backgroundColor: colors.overlayDark,
		borderRadius: radius.lg,
		padding: spacing.md,
		gap: spacing.xs,
	},
	sectionTitle: { color: colors.cardWhite, fontWeight: "700", fontSize: 16, marginBottom: spacing.xs },
	line: { color: "#D5D5D6", lineHeight: 20 },
	mapCard: {
		backgroundColor: colors.overlayDark,
		borderRadius: radius.lg,
		padding: spacing.lg,
		alignItems: "center",
	},
	mapText: {
		color: colors.cardWhite,
		fontWeight: "700",
		textAlign: "center",
	},
});
