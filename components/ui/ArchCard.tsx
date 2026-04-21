import { ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type ArchCardProps = {
	imageUri: string;
	title: string;
	subtitle?: string;
	badge?: string;
	onPress?: () => void;
};

export default function ArchCard({ imageUri, title, subtitle, badge, onPress }: ArchCardProps) {
	return (
		<Pressable style={styles.card} onPress={onPress}>
			<View style={styles.archWrap}>
				<ImageBackground source={{ uri: imageUri }} style={styles.image} imageStyle={styles.archImage}>
					{badge ? (
						<View style={styles.badge}>
							<Text style={styles.badgeText}>{badge}</Text>
						</View>
					) : null}
				</ImageBackground>
			</View>
			<View style={styles.body}>
				<Text style={styles.title}>{title}</Text>
				{subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
	archWrap: {
		backgroundColor: colors.primaryBlue,
		paddingHorizontal: spacing.sm,
		paddingTop: spacing.sm,
	},
	image: {
		height: 170,
		justifyContent: "flex-start",
		alignItems: "flex-end",
	},
	archImage: {
		borderTopLeftRadius: 120,
		borderTopRightRadius: 120,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	},
	badge: {
		margin: spacing.sm,
		backgroundColor: colors.successGreen,
		borderRadius: radius.pill,
		paddingHorizontal: spacing.sm,
		paddingVertical: 4,
	},
	badgeText: {
		color: colors.cardWhite,
		fontSize: 11,
		fontWeight: "700",
		letterSpacing: 0.4,
	},
	body: {
		padding: spacing.md,
		gap: spacing.xs,
	},
	title: {
		color: colors.primaryBlue,
		fontSize: 18,
		fontWeight: "700",
	},
	subtitle: {
		color: colors.textMuted,
		lineHeight: 20,
	},
});
