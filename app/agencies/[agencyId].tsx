import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import ArchCard from "@/components/ui/ArchCard";
import { colors, radius, spacing } from "@/constants/colors";

export default function AgencyProfileScreen() {
	const { agencyId } = useLocalSearchParams<{ agencyId: string }>();

	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="THE PREMIER COLLECTION" subtitle={(agencyId ?? "agency").toUpperCase()} />
			<Text style={styles.title}>The Royal Curator</Text>
			<Text style={styles.quote}>
				"We do not merely plan journeys; we orchestrate temporal transitions into the heart of history."
			</Text>

			<Text style={styles.heading}>Our Philosophy</Text>
			<Text style={styles.body}>
				Our practice blends narrative-led route design with deep heritage research to deliver journeys with context.
			</Text>

			<View style={styles.statBadge}>
				<Text style={styles.statNumber}>12</Text>
				<Text style={styles.statLabel}>UNESCO PARTNERS</Text>
			</View>

			<Text style={styles.heading}>Curated Itineraries</Text>
			<ArchCard
				imageUri="https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=900&q=80"
				title="The Mughal Legacy"
				subtitle="14 DAYS · NORTH INDIA"
			/>
			<View style={styles.cardGap} />
			<ArchCard
				imageUri="https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=900&q=80"
				title="Vessels of Faith"
				subtitle="10 DAYS · VARANASI"
			/>

			<View style={styles.ctaCard}>
				<Text style={styles.ctaTitle}>Begin Your Personal Monograph</Text>
				<View style={styles.primaryBtn}>
					<Text style={styles.primaryText}>✉ Contact Agent</Text>
				</View>
				<View style={styles.secondaryBtn}>
					<Text style={styles.secondaryText}>Schedule a Call</Text>
				</View>
			</View>

			<FrameBottomNav
				items={[
					{ label: "Compass" },
					{ label: "People" },
					{ label: "Person", active: true },
					{ label: "Chat" },
					{ label: "Profile" },
				]}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	title: { marginTop: spacing.md, fontSize: 34, fontWeight: "700", color: colors.primaryBlue },
	quote: { marginTop: spacing.sm, color: colors.textMuted, fontStyle: "italic", lineHeight: 22 },
	heading: { marginTop: spacing.md, color: colors.primaryBlue, fontSize: 20, fontWeight: "700" },
	body: { marginTop: 6, color: colors.textDark, lineHeight: 21 },
	statBadge: {
		marginTop: spacing.md,
		backgroundColor: colors.primaryBlue,
		borderRadius: radius.lg,
		padding: spacing.md,
		alignItems: "center",
	},
	statNumber: { color: colors.cardWhite, fontSize: 34, fontWeight: "700" },
	statLabel: { color: colors.cardWhite, fontWeight: "700", letterSpacing: 1 },
	cardGap: { height: spacing.sm },
	ctaCard: {
		marginTop: spacing.md,
		backgroundColor: "#EFE4D1",
		borderRadius: radius.lg,
		padding: spacing.md,
	},
	ctaTitle: { color: colors.primaryBlue, fontSize: 18, fontWeight: "700", marginBottom: spacing.sm },
	primaryBtn: { backgroundColor: colors.primaryBlue, borderRadius: 999, paddingVertical: 11, alignItems: "center" },
	primaryText: { color: colors.cardWhite, fontWeight: "700" },
	secondaryBtn: {
		marginTop: spacing.sm,
		borderWidth: 1,
		borderColor: colors.primaryBlue,
		borderRadius: 999,
		paddingVertical: 11,
		alignItems: "center",
	},
	secondaryText: { color: colors.primaryBlue, fontWeight: "700" },
});
