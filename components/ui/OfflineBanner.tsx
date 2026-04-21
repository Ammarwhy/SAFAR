import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type OfflineBannerProps = {
	text?: string;
};

export default function OfflineBanner({ text = "OFFLINE MODE ACTIVE" }: OfflineBannerProps) {
	return (
		<View style={styles.wrap}>
			<Text style={styles.text}>● {text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		alignSelf: "flex-start",
		backgroundColor: colors.cardWhite,
		borderRadius: radius.pill,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		paddingHorizontal: spacing.md,
		paddingVertical: 8,
	},
	text: {
		color: colors.textDark,
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 0.4,
	},
});
