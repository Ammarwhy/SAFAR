import React, { useEffect, useRef, useState } from "react";
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../constants/Theme";
import SafarHeader from "../../components/layouts/SafarHeader";
import BottomTabBar from "../../components/layouts/BottomTabBar";

const SAFETY_TOOLS = [
	{
		id: "checkin",
		icon: "🛡",
		title: "Safety Check-in",
		desc: "Set a timer for your journey. We'll check on you if it expires.",
		action: "CONFIGURE ›",
	},
	{
		id: "live",
		icon: "📍",
		title: "Live Sharing",
		desc: "Share your real-time path with trusted friends or family.",
		action: "MANAGE CIRCLES ›",
	},
	{
		id: "local",
		icon: "🏥",
		title: "Local Services",
		desc: "Quick access to local police, medical, and fire departments.",
		action: "VIEW LIST ›",
	},
	{
		id: "legal",
		icon: "⚖",
		title: "Legal Help",
		desc: "24/7 access to legal assistance and consular services.",
		action: "GET SUPPORT ›",
	},
];

export default function SafetyCenterScreen() {
	const router = useRouter();
	const [sosActive, setSosActive] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [liveShare, setLiveShare] = useState(false);
	const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const clearCountdown = () => {
		if (countdownRef.current) {
			clearInterval(countdownRef.current);
			countdownRef.current = null;
		}
	};

	useEffect(() => clearCountdown, []);

	const handleSOSPress = () => {
		clearCountdown();
		setCountdown(5);
		setConfirmModal(true);
		let c = 5;
		countdownRef.current = setInterval(() => {
			c -= 1;
			setCountdown(c);
			if (c <= 0) {
				clearCountdown();
				setConfirmModal(false);
				setSosActive(true);
				router.push('/flows/sos-activated');
			}
		}, 1000);
	};

	return (
		<SafeAreaView style={styles.safe}>
			<SafarHeader />
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.titleSection}>
					<Text style={styles.pageTitle}>Safety Center</Text>
					<Text style={styles.pageDesc}>
						Your security is our priority. Access immediate assistance and safety tools tailored for your current location.
					</Text>
				</View>

				<Animated.View entering={FadeInDown.duration(420).springify()} style={[styles.sosCard, sosActive && styles.sosCardActive]}>
					<View style={styles.sosTop}>
						<View style={styles.sosBadge}>
							<Text style={styles.sosBadgeIcon}>📡</Text>
							<Text style={styles.sosBadgeText}>EMERGENCY PROTOCOLS</Text>
						</View>
						<Text style={styles.sosTitle}>Emergency SOS</Text>
						<Text style={styles.sosDesc}>
							Instantly notify local authorities and your emergency contacts with your live location.
						</Text>
					</View>
					<TouchableOpacity
						style={[styles.sosBtn, sosActive && styles.sosBtnActive]}
						onPress={sosActive ? () => setSosActive(false) : handleSOSPress}
						activeOpacity={0.85}
					>
						<Text style={styles.sosBtnLabel}>SOS</Text>
						<Text style={styles.sosBtnText}>{sosActive ? "TAP TO CANCEL SOS" : "ACTIVATE SOS"}</Text>
					</TouchableOpacity>
				</Animated.View>

				<Text style={styles.toolsLabel}>ACTIVE SAFETY TOOLS</Text>
				{SAFETY_TOOLS.map((tool) => (
					<Animated.View key={tool.id} entering={FadeInUp.delay(60).springify()}>
					<TouchableOpacity
						key={tool.id}
						style={styles.toolCard}
						onPress={() => {
							if (tool.id === "live") {
								setLiveShare(!liveShare);
								return;
							}
							if (tool.id === "checkin") {
								router.push('/flows/safety-checkin');
								return;
							}
							if (tool.id === "local") {
								router.push('/flows/safety-local-services');
								return;
							}
							router.push('/flows/safety-legal-help');
						}}
						activeOpacity={0.8}
					>
						<Text style={styles.toolIcon}>{tool.icon}</Text>
						<View style={styles.toolBody}>
							<Text style={styles.toolTitle}>{tool.title}</Text>
							<Text style={styles.toolDesc}>{tool.desc}</Text>
							<Text style={styles.toolAction}>
								{tool.id === "live" && liveShare ? "🟢 ACTIVE — STOP SHARING ›" : tool.action}
							</Text>
						</View>
					</TouchableOpacity>
					</Animated.View>
				))}

				<Animated.View entering={FadeInUp.delay(220).springify()} style={styles.reportCard}>
					<View style={styles.reportLeft}>
						<Text style={styles.reportIcon}>⚠</Text>
					</View>
					<View style={styles.reportBody}>
						<Text style={styles.reportTitle}>Report a Concern</Text>
						<Text style={styles.reportDesc}>
							Found a location that feels unsafe? Help the community by reporting it anonymously.
						</Text>
						<TouchableOpacity onPress={() => router.push('/flows/safety-report')}>
							<Text style={styles.reportAction}>SUBMIT REPORT</Text>
						</TouchableOpacity>
					</View>
				</Animated.View>

				<Text style={styles.toolsLabel}>CURRENT LOCATION SAFETY</Text>
				<Animated.View entering={FadeInUp.delay(260).springify()} style={styles.safetyRatingCard}>
					<View style={styles.safetyRatingOverlay}>
						<View style={styles.safetyRatingContent}>
							<Text style={styles.safetyRatingCity}>MARRAKECH</Text>
							<Text style={styles.safetyRatingLabel}>High Safety Rating</Text>
						</View>
						<View style={styles.safetyRatingBadge}>
							<Text style={styles.safetyRatingScore}>9.2 / 10</Text>
						</View>
					</View>
					<View style={styles.safetyBars}>
						{[
							{ label: "Personal Safety", pct: 92 },
							{ label: "Transportation", pct: 85 },
							{ label: "Emergency Response", pct: 88 },
						].map((b) => (
							<View key={b.label} style={styles.safetyBarRow}>
								<Text style={styles.safetyBarLabel}>{b.label}</Text>
								<View style={styles.safetyBarTrack}>
									<View style={[styles.safetyBarFill, { width: `${b.pct}%` }]} />
								</View>
								<Text style={styles.safetyBarPct}>{b.pct}%</Text>
							</View>
						))}
					</View>
				</Animated.View>

				<View style={{ height: 20 }} />
			</ScrollView>

			<Modal visible={confirmModal} transparent animationType="fade">
				<View style={styles.modalOverlay}>
					<View style={styles.countdownModal}>
						<View style={styles.countdownCircle}>
							<Text style={styles.countdownNum}>{countdown}</Text>
						</View>
						<Text style={styles.countdownTitle}>SOS activating in {countdown}s</Text>
						<Text style={styles.countdownDesc}>
							Tap cancel to abort. Emergency services will be contacted automatically.
						</Text>
						<TouchableOpacity
							style={styles.cancelSosBtn}
							onPress={() => {
								clearCountdown();
								setConfirmModal(false);
								setCountdown(5);
							}}
						>
							<Text style={styles.cancelSosBtnText}>Cancel</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<BottomTabBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },
	titleSection: { paddingHorizontal: Spacing.screen, paddingTop: 8, paddingBottom: 12 },
	pageTitle: { ...Typography.h1, color: Colors.textPrimary, marginBottom: 6 },
	pageDesc: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },

	sosCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 20,
		backgroundColor: Colors.brand,
		borderRadius: Radius.xl,
		padding: 20,
		...Shadow.md,
	},
	sosCardActive: { backgroundColor: "#8B0000" },
	sosTop: { marginBottom: 16 },
	sosBadge: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 10 },
	sosBadgeIcon: { fontSize: 14 },
	sosBadgeText: { ...Typography.label, color: "rgba(255,255,255,0.7)", fontSize: 10 },
	sosTitle: { ...Typography.h2, color: "#fff", marginBottom: 6 },
	sosDesc: { ...Typography.bodyMd, color: "rgba(255,255,255,0.8)" },
	sosBtn: {
		backgroundColor: Colors.danger,
		borderRadius: Radius.lg,
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	sosBtnActive: { backgroundColor: "#FF6B6B" },
	sosBtnLabel: {
		...Typography.label,
		color: "#fff",
		fontSize: 13,
		backgroundColor: "rgba(255,255,255,0.25)",
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 4,
	},
	sosBtnText: { ...Typography.h4, color: "#fff", letterSpacing: 1 },

	toolsLabel: {
		...Typography.label,
		color: Colors.textMuted,
		marginHorizontal: Spacing.screen,
		marginBottom: 10,
	},
	toolCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 8,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 16,
		flexDirection: "row",
		gap: 14,
		...Shadow.sm,
	},
	toolIcon: { fontSize: 22, marginTop: 2 },
	toolBody: { flex: 1 },
	toolTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 4 },
	toolDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 8 },
	toolAction: { ...Typography.label, color: Colors.brand, fontSize: 10 },

	reportCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 20,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 16,
		flexDirection: "row",
		gap: 12,
		...Shadow.sm,
	},
	reportLeft: {
		width: 36,
		height: 36,
		borderRadius: Radius.md,
		backgroundColor: Colors.bgMuted,
		alignItems: "center",
		justifyContent: "center",
	},
	reportIcon: { fontSize: 18 },
	reportBody: { flex: 1 },
	reportTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 2 },
	reportDesc: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 6 },
	reportAction: { ...Typography.label, color: Colors.brand, fontSize: 10, textDecorationLine: "underline" },

	safetyRatingCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 8,
		backgroundColor: Colors.bgMuted,
		borderRadius: Radius.xl,
		overflow: "hidden",
	},
	safetyRatingOverlay: {
		backgroundColor: Colors.brandLight,
		padding: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	safetyRatingContent: {},
	safetyRatingCity: { ...Typography.label, color: "rgba(255,255,255,0.7)", fontSize: 10, marginBottom: 4 },
	safetyRatingLabel: { ...Typography.h3, color: "#fff" },
	safetyRatingBadge: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: Radius.md,
		paddingHorizontal: 12,
		paddingVertical: 6,
	},
	safetyRatingScore: { ...Typography.h4, color: "#fff" },
	safetyBars: { padding: 16, gap: 10 },
	safetyBarRow: { flexDirection: "row", alignItems: "center", gap: 10 },
	safetyBarLabel: { ...Typography.bodyMd, color: Colors.textSecondary, width: 130 },
	safetyBarTrack: { flex: 1, height: 6, backgroundColor: Colors.border, borderRadius: 3 },
	safetyBarFill: { height: 6, backgroundColor: Colors.success, borderRadius: 3 },
	safetyBarPct: { ...Typography.label, color: Colors.textSecondary, fontSize: 11, width: 36, textAlign: "right" },

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.6)",
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	countdownModal: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.xl,
		padding: 28,
		alignItems: "center",
		width: "100%",
	},
	countdownCircle: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 4,
		borderColor: Colors.danger,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	countdownNum: { ...Typography.display, color: Colors.danger, fontSize: 36 },
	countdownTitle: { ...Typography.h3, color: Colors.textPrimary, textAlign: "center", marginBottom: 8 },
	countdownDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: "center", marginBottom: 20 },
	cancelSosBtn: {
		backgroundColor: Colors.bgMuted,
		borderRadius: Radius.full,
		paddingVertical: 12,
		paddingHorizontal: 40,
	},
	cancelSosBtnText: { ...Typography.h4, color: Colors.textPrimary },
});
