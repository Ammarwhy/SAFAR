import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../constants/Theme";
import { MOCK_TRAVELER } from "../../constants/mockData";
import BottomTabBar from "../../components/layouts/BottomTabBar";

function DNABar({ label, value, side }: { label: string; value: number; side: string }) {
	return (
		<View style={dnaStyles.row}>
			<Text style={dnaStyles.label}>{label}</Text>
			<View style={dnaStyles.trackWrap}>
				<View style={dnaStyles.track}>
					<View style={[dnaStyles.fill, { width: `${value}%` }]} />
				</View>
			</View>
			<Text style={dnaStyles.side}>
				{value}% {side}
			</Text>
		</View>
	);
}

export default function TravelerProfileScreen() {
	const router = useRouter();
	useLocalSearchParams<{ userId: string }>();
	const t = MOCK_TRAVELER;

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
					<Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
				</TouchableOpacity>
				<View style={styles.headerAvatar}>
					<Image source={{ uri: "https://i.pravatar.cc/80?img=11" }} style={styles.headerAvatarImg} />
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
				<Animated.View entering={FadeInDown.duration(350)} style={styles.heroSection}>
					<View style={styles.avatarWrap}>
						<Image source={{ uri: t.avatar }} style={styles.avatar} />
						<View style={styles.verifiedBadge}>
							<Ionicons name="checkmark" size={11} color={Colors.textOnDark} />
						</View>
					</View>
					<Text style={styles.curation}>{t.curationNo}</Text>
					<Text style={styles.name}>{t.name}</Text>
					<Text style={styles.bio}>{t.bio}</Text>
				</Animated.View>

				<View style={styles.statsGrid}>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>DESTINATIONS</Text>
						<Text style={styles.statVal}>{t.destinations}</Text>
					</View>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>PASSPORT AGE</Text>
						<Text style={styles.statVal}>{t.passportAge}</Text>
					</View>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>TRAVEL STYLE</Text>
						<Text style={styles.statVal}>{t.travelStyle}</Text>
					</View>
					<View style={styles.statBox}>
						<Text style={styles.statLabel}>PACE</Text>
						<Text style={styles.statVal}>{t.pace}</Text>
					</View>
				</View>

				<View style={styles.manifestoCard}>
					<Text style={styles.manifestoTitle}>The Nomad&apos;s Manifesto</Text>
					<Text style={styles.manifestoText}>{t.manifesto}</Text>
					<View style={styles.tagsRow}>
						{t.tags.map((tag) => (
							<View key={tag} style={styles.tag}>
								<Text style={styles.tagText}>{tag}</Text>
							</View>
						))}
					</View>
				</View>

				<View style={styles.locationCard}>
					<Text style={styles.locationTitle}>Currently In</Text>
					<Text style={styles.locationCity}>{t.currentCity}</Text>
					<View style={styles.mapPlaceholder}>
						<Ionicons name="compass" size={32} color="rgba(255,255,255,0.6)" />
					</View>
				</View>

				<Text style={styles.sectionLabel}>LATEST FIND</Text>
				<View style={styles.findCard}>
					<Image source={{ uri: t.latestFind.image }} style={styles.findImg} />
					<Text style={styles.findTitle}>{t.latestFind.title}</Text>
					<Text style={styles.findSub}>{t.latestFind.subtitle}</Text>
				</View>

				<View style={styles.dnaCard}>
					<Text style={styles.dnaTitle}>Travel Persona DNA</Text>
					{t.personaDNA.map((item) => (
						<DNABar key={item.label} label={item.label} value={item.value} side={item.side} />
					))}
				</View>

				<View style={styles.ctaRow}>
					<TouchableOpacity
						style={styles.connectBtn}
						onPress={() => router.push('/flows/community-persona')}
					>
						<Text style={styles.connectBtnText}>Connect</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.msgBtn} onPress={() => router.push('/(tabs)/messages')}>
						<Text style={styles.msgBtnText}>Message</Text>
					</TouchableOpacity>
				</View>

				<View style={{ height: 20 }} />
			</ScrollView>
			<BottomTabBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: Spacing.screen,
		paddingTop: 10,
		paddingBottom: 4,
	},
	headerAvatar: {},
	headerAvatarImg: { width: 34, height: 34, borderRadius: 17, borderWidth: 2, borderColor: Colors.border },

	heroSection: { alignItems: "flex-start", paddingHorizontal: Spacing.screen, paddingBottom: 16 },
	avatarWrap: { position: "relative", marginBottom: 10 },
	avatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 2, borderColor: Colors.border },
	verifiedBadge: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 22,
		height: 22,
		borderRadius: 11,
		backgroundColor: Colors.brand,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: Colors.bg,
	},
	curation: { ...Typography.label, color: Colors.textMuted, marginBottom: 4 },
	name: { ...Typography.h1, color: Colors.textPrimary, marginBottom: 6 },
	bio: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },

	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		paddingHorizontal: Spacing.screen,
		marginBottom: 12,
		gap: 10,
	},
	statBox: {
		flex: 1,
		minWidth: "45%",
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.md,
		padding: 12,
		...Shadow.sm,
	},
	statLabel: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 4 },
	statVal: { ...Typography.h3, color: Colors.textPrimary },

	manifestoCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 12,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 16,
		...Shadow.sm,
	},
	manifestoTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 10 },
	manifestoText: {
		...Typography.body,
		color: Colors.textSecondary,
		fontStyle: "italic",
		lineHeight: 22,
		marginBottom: 12,
	},
	tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
	tag: {
		borderWidth: 1,
		borderColor: Colors.borderDark,
		borderRadius: Radius.full,
		paddingHorizontal: 12,
		paddingVertical: 5,
	},
	tagText: { ...Typography.bodySm, color: Colors.textSecondary },

	locationCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 12,
		backgroundColor: Colors.brand,
		borderRadius: Radius.lg,
		padding: 16,
	},
	locationTitle: { ...Typography.h4, color: Colors.textOnDark, marginBottom: 2 },
	locationCity: { ...Typography.bodyMd, color: "rgba(245,240,232,0.7)", marginBottom: 10 },
	mapPlaceholder: {
		height: 100,
		backgroundColor: "rgba(255,255,255,0.1)",
		borderRadius: Radius.md,
		alignItems: "center",
		justifyContent: "center",
	},
	sectionLabel: { ...Typography.label, color: Colors.textMuted, marginHorizontal: Spacing.screen, marginBottom: 8 },
	findCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 12,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		overflow: "hidden",
		...Shadow.sm,
	},
	findImg: { width: "100%", height: 160 },
	findTitle: { ...Typography.h4, color: Colors.textPrimary, margin: 12, marginBottom: 2 },
	findSub: { ...Typography.bodyMd, color: Colors.textSecondary, marginHorizontal: 12, marginBottom: 12 },

	dnaCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 16,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 16,
		...Shadow.sm,
	},
	dnaTitle: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 14 },

	ctaRow: { flexDirection: "row", gap: 10, paddingHorizontal: Spacing.screen },
	connectBtn: {
		flex: 1,
		backgroundColor: Colors.brand,
		borderRadius: Radius.button,
		paddingVertical: 13,
		minHeight: 44,
		alignItems: "center",
		justifyContent: "center",
	},
	connectBtnText: { ...Typography.h4, color: Colors.textOnDark },
	msgBtn: {
		flex: 1,
		backgroundColor: Colors.bgCard,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: Radius.button,
		paddingVertical: 13,
		minHeight: 44,
		alignItems: "center",
		justifyContent: "center",
	},
	msgBtnText: { ...Typography.h4, color: Colors.textPrimary },
});

const dnaStyles = StyleSheet.create({
	row: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
	label: { ...Typography.bodyMd, color: Colors.textSecondary, width: 100 },
	trackWrap: { flex: 1 },
	track: { height: 6, backgroundColor: Colors.bgMuted, borderRadius: 3 },
	fill: { height: 6, backgroundColor: Colors.brand, borderRadius: 3 },
	side: { ...Typography.label, color: Colors.textSecondary, fontSize: 10, width: 80, textAlign: "right" },
});
