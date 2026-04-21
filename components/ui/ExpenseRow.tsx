import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type ExpenseRowProps = {
	icon: string;
	title: string;
	payer: string;
	amount: string;
	split: string;
	verified?: boolean;
};

export default function ExpenseRow({ icon, title, payer, amount, split, verified = false }: ExpenseRowProps) {
	return (
		<View style={styles.row}>
			<View style={styles.left}>
				<Text style={styles.icon}>{icon}</Text>
				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.meta}>Paid by {payer} · {split}</Text>
				</View>
			</View>

			<View style={styles.right}>
				{verified ? <Text style={styles.verified}>VERIFIED</Text> : null}
				<Text style={styles.amount}>{amount}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: spacing.md,
		borderRadius: radius.md,
		backgroundColor: colors.cardWhite,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		marginBottom: spacing.sm,
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		gap: spacing.sm,
		flex: 1,
	},
	right: {
		alignItems: "flex-end",
		gap: 4,
	},
	icon: {
		fontSize: 20,
	},
	title: {
		color: colors.textDark,
		fontWeight: "600",
	},
	meta: {
		marginTop: 2,
		color: colors.textMuted,
		fontSize: 12,
	},
	amount: {
		color: colors.primaryBlue,
		fontWeight: "700",
	},
	verified: {
		color: colors.successGreen,
		fontSize: 10,
		fontWeight: "700",
		letterSpacing: 0.4,
	},
});
