import { StyleSheet, Text, View } from "react-native";
import { colors, spacing } from "@/constants/colors";

type NavItem = {
	label: string;
	active?: boolean;
};

type FrameBottomNavProps = {
	items: NavItem[];
};

export default function FrameBottomNav({ items }: FrameBottomNavProps) {
	return (
		<View style={styles.wrap}>
			{items.map((item) => (
				<View key={item.label} style={styles.item}>
					<Text style={[styles.icon, item.active ? styles.active : undefined]}>●</Text>
					<Text style={[styles.label, item.active ? styles.active : undefined]}>{item.label}</Text>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		marginTop: spacing.md,
		borderTopWidth: 1,
		borderTopColor: colors.borderSoft,
		backgroundColor: colors.cardWhite,
		paddingTop: spacing.sm,
		paddingBottom: spacing.sm,
		paddingHorizontal: spacing.sm,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	item: {
		flex: 1,
		alignItems: "center",
		gap: 4,
	},
	icon: {
		fontSize: 10,
		color: colors.textMuted,
	},
	label: {
		fontSize: 10,
		color: colors.textMuted,
		fontWeight: "600",
	},
	active: {
		color: colors.primaryBlue,
		fontWeight: "700",
	},
});
