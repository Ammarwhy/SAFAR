import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import ExpenseRow from "@/components/ui/ExpenseRow";
import OfflineBanner from "@/components/ui/OfflineBanner";
import { colors, radius, spacing } from "@/constants/colors";

export default function ExpenseLedgerScreen() {
	const { tripId } = useLocalSearchParams<{ tripId: string }>();

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="Expense Ledger" subtitle={`${tripId ?? "Silk Road Expedition"}`} />
			<Text style={styles.subtitle}>Silk Road Expedition · Samarkand to Bukhara</Text>

			<View style={styles.statsRow}>
				<View style={styles.statCardLight}>
					<Text style={styles.statLabel}>TOTAL EXPENSES</Text>
					<Text style={styles.statValue}>$1,245.50</Text>
				</View>
				<View style={styles.statCardBlue}>
					<Text style={styles.statLabelBlue}>YOUR SHARE</Text>
					<Text style={styles.statValueBlue}>$622.75</Text>
				</View>
			</View>

			<Text style={styles.sectionTitle}>Recent Transactions</Text>
			<ExpenseRow icon="🍽" title="Dinner at Old City" payer="David" amount="$84.20" split="Split equally" />
			<ExpenseRow icon="🎟" title="Registan Tour Tickets" payer="You" amount="$120.00" split="Split equally" verified />
			<ExpenseRow icon="🚗" title="Private Transfer" payer="David" amount="$450.00" split="Split equally" />
			<ExpenseRow icon="🏛" title="Museum Entry Fee" payer="You" amount="$15.00" split="Individual" />

			<View style={styles.settleCard}>
				<Text style={styles.settleTitle}>Ready to Settle?</Text>
				<Text style={styles.settleBody}>You currently owe David $180.35 for shared expenses.</Text>
				<View style={styles.settleButton}>
					<Text style={styles.settleButtonText}>Settle Up Now</Text>
				</View>
			</View>

			<OfflineBanner text="OFFLINE SYNC ACTIVE · Data will sync when network is restored" />

			<FrameBottomNav
				items={[
					{ label: "Explore" },
					{ label: "Journey" },
					{ label: "Connect" },
					{ label: "Ledger", active: true },
					{ label: "Profile" },
				]}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	subtitle: { marginTop: spacing.sm, marginBottom: spacing.md, color: colors.textMuted },
	statsRow: { flexDirection: "row", gap: spacing.sm },
	statCardLight: {
		flex: 1,
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		padding: spacing.md,
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
	statCardBlue: {
		flex: 1,
		backgroundColor: colors.primaryBlue,
		borderRadius: radius.lg,
		padding: spacing.md,
	},
	statLabel: { color: colors.textMuted, fontSize: 11, fontWeight: "700" },
	statValue: { marginTop: 6, color: colors.primaryBlue, fontSize: 22, fontWeight: "700" },
	statLabelBlue: { color: colors.cardWhite, fontSize: 11, fontWeight: "700" },
	statValueBlue: { marginTop: 6, color: colors.cardWhite, fontSize: 22, fontWeight: "700" },
	sectionTitle: { marginTop: spacing.md, marginBottom: spacing.sm, color: colors.primaryBlue, fontWeight: "700", fontSize: 20 },
	settleCard: {
		marginTop: spacing.sm,
		backgroundColor: "#EFE4D1",
		borderRadius: radius.lg,
		padding: spacing.md,
	},
	settleTitle: { color: colors.primaryBlue, fontWeight: "700", fontSize: 18 },
	settleBody: { color: colors.textDark, marginTop: 6, lineHeight: 20 },
	settleButton: {
		marginTop: spacing.sm,
		backgroundColor: colors.primaryBlue,
		borderRadius: 999,
		paddingVertical: 11,
		alignItems: "center",
	},
	settleButtonText: { color: colors.cardWhite, fontWeight: "700" },
});
