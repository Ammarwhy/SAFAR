import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type HeritageHeaderProps = {
	title?: string;
	subtitle?: string;
};

export default function HeritageHeader({ title = "Heritage", subtitle }: HeritageHeaderProps) {
	return (
		<View style={styles.wrap}>
			<View>
				<Text style={styles.title}>{title}</Text>
				{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			</View>
			<View style={styles.avatar}>
				<Text style={styles.avatarText}>◉</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		backgroundColor: colors.accentGold,
		borderRadius: radius.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		color: colors.textDark,
		fontSize: 13,
		fontWeight: "700",
		letterSpacing: 1.2,
	},
	subtitle: {
		color: colors.textDark,
		marginTop: 3,
		opacity: 0.75,
		fontSize: 11,
	},
	avatar: {
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: colors.cardWhite,
		alignItems: "center",
		justifyContent: "center",
	},
	avatarText: {
		fontWeight: "700",
		color: colors.primaryBlue,
		fontSize: 10,
	},
});
