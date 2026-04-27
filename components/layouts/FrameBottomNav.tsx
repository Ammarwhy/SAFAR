import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "@/constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type NavItem = {
	label: string;
	iconName?: string;
	href?: string;
	onPress?: () => void;
	active?: boolean;
};

type FrameBottomNavProps = {
	items: NavItem[];
};

export default function FrameBottomNav({ items }: FrameBottomNavProps) {
	const router = useRouter();
	const insets = useSafeAreaInsets();

	return (
		<View style={[styles.wrap, { height: 60 + insets.bottom, paddingBottom: insets.bottom + 8 }]}>
			{items.map((item) => (
				<View key={item.label} style={styles.itemWrap}>
					<Pressable
						accessibilityLabel={`${item.label} tab`}
						onPress={() => {
							if (item.onPress) {
								item.onPress();
								return;
							}
							if (item.href && !item.active) {
								router.replace(item.href as never);
							}
						}}
						style={({ pressed }) => [styles.item, item.active && styles.itemActive, pressed && styles.itemPressed]}
					>
						<Ionicons name={item.iconName as any} size={20} color={item.active ? Colors.brand : Colors.textMuted} />
						<Text style={[styles.label, item.active ? styles.active : undefined]}>{item.label}</Text>
					</Pressable>
				</View>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		marginHorizontal: 12,
		marginBottom: 0,
		borderRadius: 24,
		backgroundColor: Colors.bg,
		paddingTop: 8,
		paddingHorizontal: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		shadowColor: Colors.brand,
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.07,
		shadowRadius: 12,
		elevation: 3,
	},
	itemWrap: { flex: 1 },
	item: {
		alignItems: "center",
		justifyContent: "center",
		gap: 3,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 18,
		minHeight: 44,
		width: "100%",
	},
	itemActive: { backgroundColor: Colors.bgMuted },
	itemPressed: { opacity: 0.9 },
	label: {
		fontSize: 10,
		color: Colors.tabInactive,
		fontWeight: "600",
		letterSpacing: 0.6,
	},
	active: {
		color: Colors.brand,
		fontWeight: "700",
	},
});
