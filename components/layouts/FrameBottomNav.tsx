import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Spacing } from "@/constants/Theme";

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

	const NavButton = ({ item, index }: { item: NavItem; index: number }) => {
		const scale = useSharedValue(1);

		const animatedStyle = useAnimatedStyle(() => ({
			transform: [{ scale: scale.value }],
		}));

		return (
			<Animated.View entering={FadeInUp.delay(index * 35).duration(280)} style={[styles.itemWrap, animatedStyle]}>
				<Pressable
					onPress={() => {
						if (item.onPress) {
							item.onPress();
							return;
						}
						if (item.href) {
							router.push(item.href as never);
						}
					}}
					onPressIn={() => {
						scale.value = withSpring(0.96);
					}}
					onPressOut={() => {
						scale.value = withSpring(1);
					}}
					style={({ pressed }) => [styles.item, item.active && styles.itemActive, pressed && styles.itemPressed]}
				>
					<Ionicons name={item.iconName as any} size={20} color={item.active ? Colors.brand : Colors.textMuted} />
					<Text style={[styles.label, item.active ? styles.active : undefined]}>{item.label}</Text>
				</Pressable>
			</Animated.View>
		);
	};

	return (
		<View style={styles.wrap}>
			{items.map((item, index) => (
				<NavButton key={item.label} item={item} index={index} />
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		marginHorizontal: 12,
		marginBottom: 8,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: 24,
		backgroundColor: Colors.bgCard,
		paddingVertical: 8,
		paddingHorizontal: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		shadowColor: "#371B17",
		shadowOffset: { width: 0, height: 6 },
		shadowOpacity: 0.08,
		shadowRadius: 16,
		elevation: 6,
	},
	itemWrap: { flex: 1 },
	item: {
		alignItems: "center",
		justifyContent: "center",
		gap: 3,
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 18,
	},
	itemActive: { backgroundColor: Colors.bgMuted },
	itemPressed: { opacity: 0.9 },
	label: {
		fontSize: 10,
		color: Colors.textMuted,
		fontWeight: "600",
		letterSpacing: 0.6,
	},
	active: {
		color: Colors.brand,
		fontWeight: "700",
	},
});
