import { Pressable, StyleSheet, Text, View } from "react-native";
import ArchCard from "@/components/ui/ArchCard";
import { colors, radius, spacing } from "@/constants/colors";

type AgencyCardProps = {
	name: string;
	year: number;
	specialty: string;
	imageUri: string;
	onPress?: () => void;
};

export default function AgencyCard({ name, year, specialty, imageUri, onPress }: AgencyCardProps) {
	return (
		<Pressable onPress={onPress} style={styles.wrap}>
			<ArchCard imageUri={imageUri} title={name} subtitle={specialty} badge="DTS VERIFIED" />
			<View style={styles.metaRow}>
				<Text style={styles.meta}>est. {year}</Text>
				<Text style={styles.meta}>View Details →</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrap: {
		marginBottom: spacing.md,
	},
	metaRow: {
		marginTop: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing.sm,
	},
	meta: {
		color: colors.textMuted,
		fontSize: 12,
		fontWeight: "600",
		backgroundColor: colors.cardWhite,
		borderRadius: radius.pill,
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
});
