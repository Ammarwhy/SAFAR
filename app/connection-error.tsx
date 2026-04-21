import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

export default function ConnectionErrorScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<Text style={styles.icon}>☁</Text>
				<Text style={styles.title}>Sync Interrupted</Text>
				<Text style={styles.body}>
					Heritage sites often have weak signals. Your messages will be sent once we're back online.
				</Text>
				<View style={styles.button}>
					<Text style={styles.buttonText}>TRY AGAIN</Text>
				</View>
				<Text style={styles.link}>CHECK SAFETY KIT</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.backgroundCream,
		padding: spacing.lg,
		justifyContent: "center",
	},
	card: {
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		padding: spacing.lg,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		alignItems: "center",
	},
	icon: { fontSize: 42, color: colors.textMuted },
	title: { marginTop: spacing.sm, color: colors.primaryBlue, fontSize: 28, fontWeight: "700" },
	body: { marginTop: spacing.sm, color: colors.textMuted, textAlign: "center", lineHeight: 22 },
	button: {
		marginTop: spacing.md,
		backgroundColor: colors.primaryBlue,
		borderRadius: radius.pill,
		paddingVertical: 11,
		paddingHorizontal: spacing.xl,
	},
	buttonText: { color: colors.cardWhite, fontWeight: "700" },
	link: { marginTop: spacing.sm, color: colors.textMuted, fontWeight: "600" },
});
