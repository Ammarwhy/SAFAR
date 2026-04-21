import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type SOSButtonProps = {
	onPress?: () => void;
};

export default function SOSButton({ onPress }: SOSButtonProps) {
	return (
		<Pressable onPress={onPress} style={styles.card}>
			<View style={styles.center}>
				<Text style={styles.sos}>SOS</Text>
				<Text style={styles.label}>TAP FOR HELP</Text>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderColor: "#F3CDCD",
		paddingVertical: spacing.xl,
		alignItems: "center",
		justifyContent: "center",
	},
	center: {
		alignItems: "center",
		justifyContent: "center",
	},
	sos: {
		color: colors.errorRed,
		fontSize: 44,
		fontWeight: "800",
		letterSpacing: 1,
	},
	label: {
		color: colors.errorRed,
		marginTop: 4,
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 1.1,
	},
});
