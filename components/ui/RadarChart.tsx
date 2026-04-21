import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type AxisValues = {
	heritage: number;
	culinary: number;
	urban: number;
	nature: number;
	adventure: number;
	relaxation: number;
};

type RadarChartProps = {
	title?: string;
	primary: AxisValues;
	secondary?: AxisValues;
};

const labelMap: Array<keyof AxisValues> = ["heritage", "culinary", "urban", "nature", "adventure", "relaxation"];

function toPercent(value: number) {
	return Math.max(0, Math.min(100, Math.round(value * 100)));
}

export default function RadarChart({ title = "Travel Persona DNA", primary, secondary }: RadarChartProps) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{title}</Text>
			{labelMap.map((axis) => {
				const first = toPercent(primary[axis]);
				const second = secondary ? toPercent(secondary[axis]) : 0;
				return (
					<View key={axis} style={styles.row}>
						<Text style={styles.axis}>{axis.toUpperCase()}</Text>
						<View style={styles.track}>
							<View style={[styles.fillPrimary, { width: `${first}%` }]} />
							{secondary ? <View style={[styles.fillSecondary, { width: `${second}%` }]} /> : null}
						</View>
					</View>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.cardWhite,
		borderRadius: radius.lg,
		borderWidth: 1,
		borderColor: colors.borderSoft,
		padding: spacing.md,
		gap: spacing.sm,
	},
	title: {
		color: colors.primaryBlue,
		fontWeight: "700",
		fontSize: 16,
		marginBottom: spacing.xs,
	},
	row: {
		gap: 6,
	},
	axis: {
		color: colors.textMuted,
		fontSize: 11,
		letterSpacing: 0.4,
		fontWeight: "700",
	},
	track: {
		height: 9,
		borderRadius: radius.pill,
		backgroundColor: "#EAE3D8",
		overflow: "hidden",
		position: "relative",
	},
	fillPrimary: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		backgroundColor: colors.primaryBlue,
		opacity: 0.92,
	},
	fillSecondary: {
		position: "absolute",
		left: 0,
		top: 0,
		bottom: 0,
		backgroundColor: colors.accentGold,
		opacity: 0.88,
	},
});
