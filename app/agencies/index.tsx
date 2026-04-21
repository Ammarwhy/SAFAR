import { ScrollView, StyleSheet, Text, View } from "react-native";
import FrameBottomNav from "@/components/layouts/FrameBottomNav";
import HeritageHeader from "@/components/layouts/HeritageHeader";
import AgencyCard from "@/components/ui/AgencyCard";
import { colors, spacing } from "@/constants/colors";
import { agencies } from "@/constants/agencies";

export default function AgenciesScreen() {
	return (
		<ScrollView style={styles.container} contentContainerStyle={styles.content}>
			<HeritageHeader title="THE CURATED SELECTION" subtitle="Agencies" />
			<Text style={styles.title}>Master Curators of the Silk Road</Text>
			<Text style={styles.body}>
				We have partnered with the world's most distinguished travel agencies to provide unparalleled access to historical landmarks and hidden cultural gems.
			</Text>

			{agencies.map((agency) => (
				<AgencyCard
					key={agency.id}
					name={agency.name}
					year={agency.year}
					specialty={agency.specialty}
					imageUri={agency.imageUri}
				/>
			))}

			<View style={styles.ctaCard}>
				<Text style={styles.ctaTitle}>Are you a custodian of history?</Text>
				<Text style={styles.ctaBody}>
					Join our exclusive network of certified travel agencies and showcase your expertise.
				</Text>
				<View style={styles.outlineButton}>
					<Text style={styles.outlineText}>APPLY FOR CERTIFICATION</Text>
				</View>
			</View>

			<FrameBottomNav
				items={[
					{ label: "Explore Routes" },
					{ label: "Agencies", active: true },
					{ label: "Concierge" },
					{ label: "Profile" },
				]}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: colors.backgroundCream },
	content: { padding: spacing.md, paddingBottom: spacing.xl },
	title: { marginTop: spacing.lg, fontSize: 26, fontWeight: "700", color: colors.primaryBlue },
	body: { marginTop: spacing.xs, marginBottom: spacing.md, color: colors.textMuted, lineHeight: 20 },
	ctaCard: {
		marginTop: spacing.md,
		backgroundColor: "#EFE4D1",
		borderRadius: 16,
		padding: spacing.md,
	},
	ctaTitle: {
		color: colors.primaryBlue,
		fontSize: 18,
		fontWeight: "700",
	},
	ctaBody: {
		color: colors.textDark,
		marginTop: 6,
		lineHeight: 20,
	},
	outlineButton: {
		marginTop: spacing.sm,
		borderWidth: 1,
		borderColor: colors.primaryBlue,
		borderRadius: 999,
		paddingVertical: 11,
		alignItems: "center",
	},
	outlineText: {
		color: colors.primaryBlue,
		fontWeight: "700",
	},
});
