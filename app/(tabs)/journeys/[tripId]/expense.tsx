import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
	Modal,
	TextInput,
	SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../../../constants/Theme";
import { MOCK_EXPENSES } from "../../../../constants/mockData";
import BottomTabBar from "../../../../components/layouts/BottomTabBar";

export default function ExpenseScreen() {
	const router = useRouter();
	const [settled, setSettled] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [newName, setNewName] = useState("");
	const [newAmt, setNewAmt] = useState("");

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Text style={styles.backText}>←</Text>
				</TouchableOpacity>
				<View style={styles.headerTitle}>
					<Text style={styles.headerSuper}>{MOCK_EXPENSES.tripTitle.toUpperCase()}</Text>
					<Text style={styles.headerMain}>Expense Ledger</Text>
				</View>
				<TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addBtn}>
					<Text style={styles.addBtnText}>+</Text>
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.totalCard}>
					<View style={styles.totalIconRow}>
						<Text style={styles.totalIcon}>💳</Text>
					</View>
					<Text style={styles.totalLabel}>TOTAL GROUP SPEND</Text>
					<Text style={styles.totalAmount}>PKR {MOCK_EXPENSES.totalGroupSpend.toLocaleString()}</Text>
				</View>

				<View style={styles.balanceCard}>
					<Text style={styles.balanceIcon}>💳</Text>
					<Text style={styles.balanceLabel}>YOUR BALANCE</Text>
					<Text style={[styles.balanceAmount, { color: Colors.success }]}>+PKR {MOCK_EXPENSES.yourBalance.toLocaleString()}</Text>
					<Text style={styles.pendingText}>{MOCK_EXPENSES.pendingSettlements} Pending settlements</Text>
				</View>

				<TouchableOpacity
					style={[styles.settleBtn, settled && styles.settleBtnDone]}
					onPress={() => setSettled(!settled)}
				>
					<Text style={styles.settleBtnText}>{settled ? "✓ Settled!" : "✓  Mark as Settled"}</Text>
				</TouchableOpacity>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Recent Activity</Text>
						<TouchableOpacity>
							<Text style={styles.viewAllText}>VIEW ALL</Text>
						</TouchableOpacity>
					</View>

					{MOCK_EXPENSES.items.map((item) => (
						<View key={item.id} style={styles.expenseRow}>
							<View style={styles.expenseIconWrap}>
								<Text style={styles.expenseIcon}>{item.icon}</Text>
							</View>
							<View style={styles.expenseInfo}>
								<Text style={styles.expenseName}>{item.name}</Text>
								<Text style={styles.expenseMeta}>Paid by {item.paidBy} • {item.category}</Text>
							</View>
							<View style={styles.expenseRight}>
								<Text style={styles.expenseAmount}>PKR {item.amount.toLocaleString()}</Text>
								<Text style={styles.expenseSplit}>{item.split}</Text>
							</View>
						</View>
					))}
				</View>

				<View style={{ height: 20 }} />
			</ScrollView>

			<Modal visible={showAddModal} transparent animationType="slide">
				<View style={styles.modalOverlay}>
					<View style={styles.addModal}>
						<Text style={styles.addModalTitle}>Add Expense</Text>
						<TextInput
							style={styles.addInput}
							placeholder="Description"
							placeholderTextColor={Colors.textMuted}
							value={newName}
							onChangeText={setNewName}
						/>
						<TextInput
							style={styles.addInput}
							placeholder="Amount (PKR)"
							placeholderTextColor={Colors.textMuted}
							value={newAmt}
							onChangeText={setNewAmt}
							keyboardType="numeric"
						/>
						<TouchableOpacity style={styles.addConfirmBtn} onPress={() => setShowAddModal(false)}>
							<Text style={styles.addConfirmText}>Add Expense</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setShowAddModal(false)}>
							<Text style={styles.cancelText}>Cancel</Text>
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: Spacing.screen,
		paddingTop: 10,
		paddingBottom: 8,
		gap: 12,
	},
	backText: { fontSize: 22, color: Colors.textPrimary },
	headerTitle: { flex: 1 },
	headerSuper: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },
	headerMain: { ...Typography.h1, color: Colors.textPrimary },
	addBtn: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: Colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	addBtnText: { color: "#fff", fontSize: 22, lineHeight: 24 },

	totalCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 12,
		backgroundColor: "#DDD4CD",
		borderRadius: Radius.xl,
		padding: 20,
	},
	totalIconRow: { marginBottom: 8 },
	totalIcon: { fontSize: 22 },
	totalLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 8 },
	totalAmount: { ...Typography.h1, color: Colors.textPrimary, fontSize: 32 },

	balanceCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 12,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.xl,
		padding: 20,
		...Shadow.sm,
	},
	balanceIcon: { fontSize: 22, marginBottom: 6 },
	balanceLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 8 },
	balanceAmount: { ...Typography.h1, fontSize: 28, marginBottom: 4 },
	pendingText: { ...Typography.bodyMd, color: Colors.textSecondary },

	settleBtn: {
		marginHorizontal: Spacing.screen,
		backgroundColor: Colors.brand,
		borderRadius: Radius.xl,
		paddingVertical: 16,
		alignItems: "center",
		marginBottom: 20,
	},
	settleBtnDone: { backgroundColor: Colors.success },
	settleBtnText: { ...Typography.h4, color: "#fff", fontSize: 16 },

	section: { paddingHorizontal: Spacing.screen },
	sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
	sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
	viewAllText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },

	expenseRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	expenseIconWrap: {
		width: 42,
		height: 42,
		borderRadius: Radius.md,
		backgroundColor: Colors.bgMuted,
		alignItems: "center",
		justifyContent: "center",
	},
	expenseIcon: { fontSize: 18 },
	expenseInfo: { flex: 1 },
	expenseName: { ...Typography.h4, color: Colors.textPrimary, marginBottom: 2 },
	expenseMeta: { ...Typography.caption, color: Colors.textSecondary },
	expenseRight: { alignItems: "flex-end" },
	expenseAmount: { ...Typography.h4, color: Colors.textPrimary },
	expenseSplit: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
		justifyContent: "flex-end",
	},
	addModal: {
		backgroundColor: Colors.bgCard,
		borderTopLeftRadius: Radius.xl,
		borderTopRightRadius: Radius.xl,
		padding: 24,
		gap: 12,
	},
	addModalTitle: { ...Typography.h2, color: Colors.textPrimary, marginBottom: 4 },
	addInput: {
		backgroundColor: Colors.bgMuted,
		borderRadius: Radius.md,
		paddingHorizontal: 14,
		paddingVertical: 12,
		...Typography.body,
		color: Colors.textPrimary,
	},
	addConfirmBtn: {
		backgroundColor: Colors.brand,
		borderRadius: Radius.full,
		paddingVertical: 14,
		alignItems: "center",
	},
	addConfirmText: { ...Typography.h4, color: "#fff" },
	cancelText: { ...Typography.body, color: Colors.textSecondary, textAlign: "center" },
});
