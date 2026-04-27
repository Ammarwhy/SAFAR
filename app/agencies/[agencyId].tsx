import React from "react";
import {
	Alert,
	Image,
	ImageBackground,
	Linking,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../constants/Theme";
import { MOCK_AGENCY_DETAIL, MOCK_COST_COMPARISON } from "../../constants/mockData";
import BottomTabBar from "../../components/layouts/BottomTabBar";

function StarRow({ rating }: { rating: number }) {
	return (
		<View style={{ flexDirection: "row", gap: 2 }}>
			{[1, 2, 3, 4, 5].map((i) => (
				<Text key={i} style={{ color: i <= Math.round(rating) ? Colors.match : Colors.border, fontSize: 16 }}>
					★
				</Text>
			))}
		</View>
	);
}

export default function AgencyDetailScreen() {
	const router = useRouter();
	const { agencyId } = useLocalSearchParams<{ agencyId: string }>();
	const a = MOCK_AGENCY_DETAIL;
	const comparison = MOCK_COST_COMPARISON;

	const handleCall = () => {
		Linking.openURL(`tel:${a.phone}`).catch(() =>
			Alert.alert("Cannot Call", "Your device cannot make calls at this time.")
		);
	};

	const handleEmail = () => {
		Linking.openURL(`mailto:${a.email}`).catch(() =>
			Alert.alert("Cannot Email", "Your device cannot open email at this time.")
		);
	};

	const soloTotal = comparison.rows.reduce((sum, r) => sum + r.soloCost, 0) * comparison.groupSize;
	const agencyTotal = comparison.rows.reduce((sum, r) => sum + r.agencyCost, 0);

	return (
		<SafeAreaView style={styles.safe}>
			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
				<ImageBackground source={{ uri: a.heroImage }} style={styles.hero}>
					<View style={styles.heroOverlay}>
						<TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
							<Ionicons name="arrow-back" size={22} color={Colors.textOnDark} />
						</TouchableOpacity>
						<View style={styles.heroContent}>
							<Text style={styles.heroSuper}>FEATURED AGENCY</Text>
							<Text style={styles.heroTitle}>{a.name}</Text>
							<Text style={styles.heroTagline}>SCENIC TRAVEL DESTINATION</Text>
						</View>
					</View>
				</ImageBackground>

				<View style={styles.body}>
					<View style={styles.ratingRow}>
						<StarRow rating={a.rating} />
						<Text style={styles.reviewCount}>
							 {a.rating} ({a.reviewCount} reviews)
						</Text>
					</View>

					<Text style={styles.sectionTitle}>Our Philosophy</Text>
					<Text style={styles.philosophyText}>{a.philosophy}</Text>

					<View style={styles.certRow}>
						<View style={styles.certCard}>
							<View style={styles.certIconWrap}>
								<Ionicons name="globe-outline" size={18} color={Colors.brand} />
							</View>
							<View>
								<Text style={styles.certLabel}>SPECIALIZATION</Text>
								<Text style={styles.certVal}>{a.specialization}</Text>
							</View>
						</View>
						<View style={styles.certCard}>
							<View style={styles.certIconWrap}>
								<Ionicons name="shield-checkmark-outline" size={18} color={Colors.brand} />
							</View>
							<View>
								<Text style={styles.certLabel}>CERTIFIED</Text>
								<Text style={styles.certVal}>{a.certification}</Text>
							</View>
						</View>
					</View>

					<Text style={styles.sectionTitle}>Featured Itineraries</Text>
					{a.itineraries.map((it) => (
						<TouchableOpacity
							key={it.id}
							style={styles.itineraryCard}
							activeOpacity={0.88}
							onPress={() => router.push(`/flows/agency-booking?name=${encodeURIComponent(it.title)}`)}
						>
							<Image source={{ uri: it.image }} style={styles.itineraryImg} />
							<View style={styles.itineraryBody}>
								<View style={styles.itineraryTitleRow}>
									<Text style={styles.itineraryTitle}>{it.title}</Text>
									<Text style={styles.itineraryPrice}>PKR {(it.price / 1000).toFixed(0)}K</Text>
								</View>
								<View style={styles.itineraryMeta}>
									<Ionicons name="calendar-outline" size={11} color={Colors.textSecondary} /><Text style={styles.itineraryMetaText}> {it.date}</Text>
									<Text style={styles.itineraryMetaText}>  ⏱ {it.duration} Days</Text>
								</View>
								<View style={styles.tagsRow}>
									{it.tags.map((tag) => (
										<View key={tag} style={styles.tag}>
											<Text style={styles.tagText}>{tag}</Text>
										</View>
									))}
								</View>
							</View>
						</TouchableOpacity>
					))}

					<View style={styles.bookCard}>
						<Text style={styles.bookPriceSuper}>STARTING FROM</Text>
						<Text style={styles.bookPrice}>
							PKR {(a.startingPrice / 1000).toFixed(0)}K
							<Text style={styles.bookPriceSub}>/person</Text>
						</Text>
						<TouchableOpacity style={styles.bookBtn} onPress={() => router.push(`/flows/agency-booking?name=${encodeURIComponent(a.name)}`)}>
							<Text style={styles.bookBtnText}>Book Now</Text>
						</TouchableOpacity>
						<View style={styles.contactRow}>
							<TouchableOpacity style={styles.contactBtn} onPress={handleEmail}>
								<Text style={styles.contactBtnText}>Email</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.contactBtn} onPress={handleCall}>
								<Text style={styles.contactBtnText}>Call Now</Text>
							</TouchableOpacity>
						</View>
					</View>

					<Text style={styles.sectionTitle}>Cost Comparison</Text>
					<Text style={styles.comparisonSubtitle}>{comparison.destination} · Group of {comparison.groupSize}</Text>
					<View style={styles.comparisonCard}>
						<View style={styles.comparisonHeader}>
							<Text style={[styles.comparisonCol, styles.comparisonColItem]}>Item</Text>
							<Text style={styles.comparisonColHead}>DIY Solo</Text>
							<Text style={styles.comparisonColHead}>Agency</Text>
						</View>
						{comparison.rows.map((row, i) => (
							<View key={i} style={styles.comparisonRow}>
								<Text style={[styles.comparisonCol, styles.comparisonColItem]}>{row.item}</Text>
								<Text style={styles.comparisonColVal}>
									{row.soloCost > 0 ? `${(row.soloCost / 1000).toFixed(0)}K` : '—'}
								</Text>
								<Text style={styles.comparisonColVal}>
									{row.agencyCost > 0 ? `${(row.agencyCost / 1000).toFixed(0)}K` : '—'}
								</Text>
							</View>
						))}
						<View style={styles.comparisonTotalRow}>
							<Text style={[styles.comparisonCol, styles.comparisonColItem, styles.comparisonTotalLabel]}>Total (per group)</Text>
							<Text style={[styles.comparisonColVal, styles.comparisonTotalVal]}>
								PKR {(soloTotal / 1000).toFixed(0)}K
							</Text>
							<Text style={[styles.comparisonColVal, styles.comparisonTotalVal, { color: Colors.success }]}>
								PKR {(agencyTotal / 1000).toFixed(0)}K
							</Text>
						</View>
					</View>

					<View style={styles.mapCard}>
						<View style={styles.mapHeader}>
							<Text style={styles.mapTitle}>Main Office</Text>
							<Ionicons name="map-outline" size={18} color={Colors.textSecondary} />
						</View>
						<View style={styles.mapPlaceholder}>
							<View style={styles.mapPin}>
								<Ionicons name="location" size={36} color={Colors.brand} />
							</View>
						</View>
						<Text style={styles.mapAddress}>{a.officeAddress}</Text>
					</View>

					<View style={{ height: 20 }} />
				</View>
			</ScrollView>
			<BottomTabBar />
		</SafeAreaView>
	);
}

	const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },

	hero: { height: 260, justifyContent: "flex-end" },
	heroOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "space-between", padding: 16 },
	backBtn: {
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: "rgba(255,255,255,0.2)",
		alignItems: "center",
		justifyContent: "center",
	},
	heroContent: {},
	heroSuper: { ...Typography.label, color: "rgba(255,255,255,0.75)", fontSize: 10, marginBottom: 4 },
	heroTitle: { ...Typography.h1, color: Colors.textOnDark, fontSize: 32, marginBottom: 4 },
	heroTagline: { ...Typography.label, color: "rgba(255,255,255,0.65)", letterSpacing: 1.5 },

	body: { paddingHorizontal: Spacing.screen, paddingTop: 16 },

	ratingRow: { flexDirection: "row", alignItems: "center", marginBottom: 14 },
	reviewCount: { ...Typography.bodyMd, color: Colors.textSecondary },

	sectionTitle: { ...Typography.h3, color: Colors.textPrimary, marginBottom: 8 },
	philosophyText: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22, marginBottom: 16 },

	certRow: { gap: 10, marginBottom: 20 },
	certCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 14,
		...Shadow.sm,
	},
	certIconWrap: {
		width: 40,
		height: 40,
		borderRadius: Radius.md,
		backgroundColor: Colors.bgMuted,
		alignItems: "center",
		justifyContent: "center",
	},
	certLabel: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
	certVal: { ...Typography.h4, color: Colors.textPrimary },

	itineraryCard: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		overflow: "hidden",
		marginBottom: 12,
		...Shadow.sm,
	},
	itineraryImg: { width: "100%", height: 150 },
	itineraryBody: { padding: 12 },
	itineraryTitleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
	itineraryTitle: { ...Typography.h4, color: Colors.textPrimary, flex: 1 },
	itineraryPrice: { ...Typography.h4, color: Colors.textPrimary },
	itineraryMeta: { flexDirection: "row", marginBottom: 8 },
	itineraryMetaText: { ...Typography.caption, color: Colors.textSecondary },
	tagsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
	tag: {
		backgroundColor: Colors.bgMuted,
		borderRadius: Radius.full,
		paddingHorizontal: 8,
		paddingVertical: 3,
	},
	tagText: { ...Typography.label, color: Colors.textSecondary, fontSize: 9 },

	bookCard: {
		backgroundColor: Colors.brand,
		borderRadius: Radius.xl,
		padding: 20,
		marginBottom: 12,
	},
	bookPriceSuper: { ...Typography.label, color: "rgba(255,255,255,0.65)", fontSize: 10, marginBottom: 4 },
	bookPrice: { ...Typography.h1, color: Colors.textOnDark, fontSize: 36, marginBottom: 14 },
	bookPriceSub: { fontSize: 18, fontWeight: "400" },
	bookBtn: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.full,
		paddingVertical: 14,
		alignItems: "center",
		marginBottom: 10,
	},
	bookBtnText: { ...Typography.h4, color: Colors.brand },
	contactRow: { flexDirection: "row", gap: 10 },
	contactBtn: {
		flex: 1,
		borderWidth: 1,
		borderColor: "rgba(255,255,255,0.4)",
		borderRadius: Radius.button,
		paddingVertical: 11,
		minHeight: 44,
		alignItems: "center",
		justifyContent: "center",
	},
	contactBtnText: { ...Typography.h4, color: Colors.textOnDark, fontSize: 13 },

	comparisonSubtitle: { ...Typography.bodyMd, color: Colors.textSecondary, marginBottom: 10 },
	comparisonCard: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		overflow: "hidden",
		marginBottom: 20,
		...Shadow.sm,
	},
	comparisonHeader: {
		flexDirection: "row",
		backgroundColor: Colors.brand,
		paddingHorizontal: 14,
		paddingVertical: 10,
	},
	comparisonRow: {
		flexDirection: "row",
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	comparisonTotalRow: {
		flexDirection: "row",
		paddingHorizontal: 14,
		paddingVertical: 12,
		backgroundColor: Colors.bgMuted,
	},
	comparisonCol: { ...Typography.bodyMd, color: Colors.textPrimary },
	comparisonColItem: { flex: 1, paddingRight: 8 },
	comparisonColHead: { ...Typography.label, color: Colors.textOnDark, width: 70, textAlign: "right", fontSize: 11 },
	comparisonColVal: { ...Typography.bodyMd, color: Colors.textPrimary, width: 70, textAlign: "right" },
	comparisonTotalLabel: { ...Typography.label, color: Colors.textPrimary, fontWeight: "700" },
	comparisonTotalVal: { ...Typography.label, color: Colors.textPrimary, fontWeight: "700", width: 70, textAlign: "right" },

	mapCard: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		overflow: "hidden",
		marginBottom: 8,
		...Shadow.sm,
	},
	mapHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 14,
		paddingVertical: 12,
	},
	mapTitle: { ...Typography.h4, color: Colors.textPrimary },
	mapPlaceholder: {
		height: 120,
		backgroundColor: Colors.bgMuted,
		alignItems: "center",
		justifyContent: "center",
	},
	mapPin: {},
	mapAddress: { ...Typography.bodyMd, color: Colors.textSecondary, padding: 12, paddingTop: 8 },
});
