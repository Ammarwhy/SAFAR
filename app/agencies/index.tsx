import React from "react";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../constants/Theme";
import { MOCK_AGENCIES } from "../../constants/mockData";
import SafarHeader from "../../components/layouts/SafarHeader";
import BottomTabBar from "../../components/layouts/BottomTabBar";

export default function AgenciesScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.safe}>
			<SafarHeader />
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
				<View style={styles.titleSection}>
					<Text style={styles.super}>CURATION</Text>
					<Text style={styles.pageTitle}>Agencies</Text>
				</View>

				{MOCK_AGENCIES.map((agency) => (
					<TouchableOpacity
						key={agency.id}
						style={styles.agencyCard}
						onPress={() => router.push(`/agencies/${agency.id}`)}
						activeOpacity={0.88}
					>
						<View style={styles.imgWrap}>
							<Image source={{ uri: agency.heroImage }} style={styles.heroImg} />
							<View style={styles.ratingBadge}>
								<Text style={styles.ratingStar}>★</Text>
								<Text style={styles.ratingScore}>{agency.rating}</Text>
							</View>
						</View>

						<View style={styles.cardBody}>
							<View style={styles.cardRow}>
								<View style={styles.cardLeft}>
									<View style={styles.agencyNameRow}>
										<Text style={styles.agencyName}>{agency.name}</Text>
										{agency.verified && (
											<View style={styles.verifiedBadge}>
												<Ionicons name="checkmark-circle" size={12} color={Colors.success} />
												<Text style={styles.verifiedText}>Verified</Text>
											</View>
										)}
									</View>
									<View style={styles.regionRow}>
										<Ionicons name="location-outline" size={12} color={Colors.textSecondary} />
										<Text style={styles.regionText}>{agency.region}</Text>
									</View>
								</View>
								<View style={styles.priceWrap}>
									<Text style={styles.priceLabel}>STARTING AT</Text>
									<Text style={styles.priceVal}>PKR {(agency.startingPrice / 1000).toFixed(0)}K</Text>
								</View>
							</View>

							{agency.description && <Text style={styles.agencyDesc}>{agency.description}</Text>}

							{agency.avatars && (
								<View style={styles.cardFooter}>
									<View style={styles.avatarStrip}>
										{agency.avatars.map((uri, i) => (
											<Image
												key={i}
												source={{ uri }}
												style={[styles.stripAvatar, { marginLeft: i > 0 ? -8 : 0 }]}
											/>
										))}
									</View>
									<Text style={styles.fullPrice}>
										PKR {(agency.startingPrice / 1000).toFixed(0)}K
										<Text style={styles.perHead}>/per head</Text>
									</Text>
								</View>
							)}
						</View>
					</TouchableOpacity>
				))}

				<View style={{ height: 20 }} />
			</ScrollView>
			<BottomTabBar />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },
	titleSection: { paddingHorizontal: Spacing.screen, paddingTop: 8, paddingBottom: 12 },
	super: { ...Typography.label, color: Colors.textMuted, marginBottom: 2 },
	pageTitle: { ...Typography.h1, color: Colors.textPrimary, fontSize: 36, fontWeight: "800" },

	agencyCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 16,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.xl,
		overflow: "hidden",
		...Shadow.md,
	},
	imgWrap: { position: "relative" },
	heroImg: { width: "100%", height: 200 },
	ratingBadge: {
		position: "absolute",
		top: 12,
		right: 12,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.full,
		paddingHorizontal: 10,
		paddingVertical: 5,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		...Shadow.sm,
	},
	ratingStar: { color: Colors.match, fontSize: 13 },
	ratingScore: { ...Typography.h4, color: Colors.textPrimary, fontSize: 14 },

	cardBody: { padding: 14 },
	cardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 },
	cardLeft: { flex: 1 },
	agencyNameRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 },
	agencyName: { ...Typography.h3, color: Colors.textPrimary },
	verifiedBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: Colors.bgMuted, borderRadius: Radius.full, paddingHorizontal: 8, paddingVertical: 3 },
	verifiedText: { ...Typography.label, color: Colors.success, fontSize: 10 },
	regionRow: { flexDirection: "row", alignItems: "center", gap: 3 },
	regionText: { ...Typography.bodyMd, color: Colors.textSecondary },
	priceWrap: { alignItems: "flex-end" },
	priceLabel: { ...Typography.label, color: Colors.textMuted, fontSize: 9, marginBottom: 2 },
	priceVal: { ...Typography.h4, color: Colors.textPrimary },

	agencyDesc: { ...Typography.bodyMd, color: Colors.textSecondary, lineHeight: 20, marginBottom: 10 },

	cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	avatarStrip: { flexDirection: "row", alignItems: "center" },
	stripAvatar: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: Colors.bgCard },
	fullPrice: { ...Typography.h4, color: Colors.textPrimary },
	perHead: { ...Typography.bodyMd, color: Colors.textSecondary, fontWeight: "400" },
});
