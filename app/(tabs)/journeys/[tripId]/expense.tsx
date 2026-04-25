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
	ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../../../constants/Theme";
import { MOCK_EXPENSES } from "../../../../constants/mockData";
import BottomTabBar from "../../../../components/layouts/BottomTabBar";

const CATEGORY_ICON: Record<string, React.ComponentProps<typeof Ionicons>["name"]> = {
	Dining: "restaurant-outline",
	Transport: "car-outline",
	Stay: "bed-outline",
	Activity: "bicycle-outline",
};

export default function ExpenseScreen() {
	const router = useRouter();
	const [settled, setSettled] = useState(false);
	const [showAddModal, setShowAddModal] = useState(false);
	const [newName, setNewName] = useState("");
	const [newAmt, setNewAmt] = useState("");
	const [fieldError, setFieldError] = useState("");
	const [actionMsg, setActionMsg] = useState("");
	const [isProcessing, setIsProcessing] = useState(false);

	const resetProcessing = () => {
		setTimeout(() => setIsProcessing(false), 1000);
	};

	const handleSettle = () => {
		if (isProcessing) {
			return;
		}
		setIsProcessing(true);
		setActionMsg(settled ? "Settlement reset." : "Great! Expenses marked as settled.");
		setSettled(!settled);
		resetProcessing();
	};

	const handleAddExpense = () => {
		if (isProcessing) {
			return;
		}
		const amount = Number(newAmt);
		if (!newName.trim()) {
			setFieldError("Add a short expense description, for example: Dinner at Eagle Nest.");
			return;
		}
		if (!newAmt.trim() || Number.isNaN(amount) || amount < 0) {
			setFieldError("Enter a non-negative amount in PKR, for example: 18500.");
			return;
		}

		setFieldError("");
		setIsProcessing(true);
		setActionMsg("Expense added to this trip.");
		setTimeout(() => {
			setShowAddModal(false);
			setNewAmt("");
			setNewName("");
			setIsProcessing(false);
		}, 700);
	};

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
					<Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
				</TouchableOpacity>
				<View style={styles.headerTitle}>
					<Text style={styles.headerSuper}>{MOCK_EXPENSES.tripTitle.toUpperCase()}</Text>
					<Text style={styles.headerMain}>Expense Ledger</Text>
				</View>
				<TouchableOpacity onPress={() => setShowAddModal(true)} style={styles.addBtn} accessibilityLabel="Add a new expense">
					<Text style={styles.addBtnText}>+</Text>
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
				<View style={styles.totalCard}>
					<View style={styles.totalIconRow}>
						<Ionicons name="card-outline" size={22} color={Colors.textSecondary} />
					</View>
					<Text style={styles.totalLabel}>TOTAL GROUP SPEND</Text>
					<Text style={styles.totalAmount}>PKR {MOCK_EXPENSES.totalGroupSpend.toLocaleString()}</Text>
				</View>

				<View style={styles.balanceCard}>
					<Ionicons name="wallet-outline" size={22} color={Colors.textSecondary} style={{ marginBottom: 6 }} />
					<Text style={styles.balanceLabel}>YOUR BALANCE</Text>
					<Text style={[styles.balanceAmount, { color: Colors.success }]}>+PKR {MOCK_EXPENSES.yourBalance.toLocaleString()}</Text>
					<Text style={styles.pendingText}>{MOCK_EXPENSES.pendingSettlements} Pending settlements</Text>
				</View>

				{!!actionMsg && <Text style={styles.actionMessage}>{actionMsg}</Text>}

				<TouchableOpacity
					style={[styles.settleBtn, settled && styles.settleBtnDone]}
					onPress={handleSettle}
					disabled={isProcessing}
					accessibilityLabel="Mark trip expenses as settled"
				>
					{isProcessing ? <ActivityIndicator color={Colors.textOnDark} /> : <Text style={styles.settleBtnText}>{settled ? "✓ Settled" : "✓ Mark as Settled"}</Text>}
				</TouchableOpacity>

				<View style={styles.section}>
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>Recent Activity</Text>
						<TouchableOpacity onPress={() => router.push('/flows/activity-history')}>
							<Text style={styles.viewAllText}>VIEW ALL</Text>
						</TouchableOpacity>
					</View>

					{MOCK_EXPENSES.items.map((item) => (
						<View key={item.id} style={styles.expenseRow}>
							<View style={styles.expenseIconWrap}>
								<Ionicons
									name={CATEGORY_ICON[item.category] ?? "receipt-outline"}
									size={20}
									color={Colors.brand}
								/>
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
							placeholder="e.g. Dinner at Eagle Nest"
							placeholderTextColor={Colors.textMuted}
							value={newName}
							onChangeText={(value) => {
								setNewName(value);
								if (fieldError) {
									setFieldError("");
								}
							}}
							maxLength={60}
							accessibilityLabel="Expense description"
						/>
						<TextInput
							style={styles.addInput}
							placeholder="e.g. 18500"
							placeholderTextColor={Colors.textMuted}
							value={newAmt}
							onChangeText={(value) => {
								setNewAmt(value.replace(/[^0-9.]/g, ""));
								if (fieldError) {
									setFieldError("");
								}
							}}
							keyboardType="numeric"
							maxLength={10}
							accessibilityLabel="Expense amount in PKR"
						/>
						{!!fieldError && <Text style={styles.inlineError}>{fieldError}</Text>}
						<TouchableOpacity style={styles.addConfirmBtn} onPress={handleAddExpense} disabled={isProcessing} accessibilityLabel="Save expense">
							{isProcessing ? <ActivityIndicator color={Colors.textOnDark} /> : <Text style={styles.addConfirmText}>Save Expense</Text>}
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setShowAddModal(false)} accessibilityLabel="Cancel adding expense">
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
	headerTitle: { flex: 1 },
	headerSuper: { ...Typography.label, color: Colors.textMuted, fontSize: 10 },
	headerMain: { ...Typography.h1, color: Colors.textPrimary },
	addBtn: {
		width: 44,
		height: 44,
		borderRadius: 22,
		backgroundColor: Colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	addBtnText: { color: Colors.textOnDark, fontSize: 22, lineHeight: 24 },

	totalCard: {
		marginHorizontal: Spacing.screen,
		marginBottom: 12,
		backgroundColor: Colors.bgMuted,
		borderRadius: Radius.xl,
		padding: 20,
	},
	totalIconRow: { marginBottom: 8 },
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
	balanceLabel: { ...Typography.label, color: Colors.textSecondary, marginBottom: 8 },
	balanceAmount: { ...Typography.h1, fontSize: 28, marginBottom: 4 },
	pendingText: { ...Typography.bodyMd, color: Colors.textSecondary },
	actionMessage: { ...Typography.bodySm, color: Colors.success, marginHorizontal: Spacing.screen, marginBottom: 8 },

	settleBtn: {
		marginHorizontal: Spacing.screen,
		backgroundColor: Colors.brand,
		borderRadius: Radius.button,
		paddingVertical: 16,
		minHeight: 44,
		alignItems: "center",
		marginBottom: 20,
		justifyContent: "center",
	},
	settleBtnDone: { backgroundColor: Colors.success },
	settleBtnText: { ...Typography.h4, color: Colors.textOnDark, fontSize: 16 },

	section: { paddingHorizontal: Spacing.screen },
	sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
	sectionTitle: { ...Typography.h3, color: Colors.textPrimary },
	viewAllText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },

	expenseRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
		paddingVertical: 12,
		minHeight: 44,
		borderBottomWidth: 1,
		borderBottomColor: Colors.divider,
	},
	expenseIconWrap: {
		width: 42,
		height: 42,
		borderRadius: Radius.md,
		backgroundColor: Colors.bgMuted,
		alignItems: "center",
		justifyContent: "center",
	},
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
		borderRadius: Radius.input,
		paddingHorizontal: 14,
		paddingVertical: 12,
		...Typography.body,
		color: Colors.textPrimary,
	},
	inlineError: { ...Typography.caption, color: Colors.danger },
	addConfirmBtn: {
		backgroundColor: Colors.brand,
		borderRadius: Radius.button,
		paddingVertical: 14,
		minHeight: 44,
		alignItems: "center",
		justifyContent: "center",
	},
	addConfirmText: { ...Typography.h4, color: Colors.textOnDark },
	cancelText: { ...Typography.body, color: Colors.textSecondary, textAlign: "center" },
});
