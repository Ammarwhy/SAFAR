import React, { useRef, useState } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Modal,
	Platform,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors, Typography, Spacing, Radius, Shadow } from "../../../../constants/Theme";
import { MOCK_VIBE_MESSAGES } from "../../../../constants/mockData";

export default function VibeRoomScreen() {
	const router = useRouter();
	useLocalSearchParams<{ tripId: string }>();
	const [messages, setMessages] = useState(MOCK_VIBE_MESSAGES);
	const [input, setInput] = useState("");
	const [showError, setShowError] = useState(false);
	const scrollRef = useRef<ScrollView>(null);

	const sendMessage = () => {
		if (!input.trim()) return;
		const willFail = messages.length % 6 === 5;
		if (willFail) {
			setShowError(true);
			return;
		}
		setMessages((prev) => [
			...prev,
			{
				id: `msg${Date.now()}`,
				sender: "You",
				avatar: "",
				text: input.trim(),
				time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
				isMine: true,
				type: "text",
			},
		]);
		setInput("");
		setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
	};

	return (
		<SafeAreaView style={styles.safe}>
			<KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : undefined}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
						<Text style={styles.backText}>←</Text>
					</TouchableOpacity>
					<View style={styles.headerCenter}>
						<Text style={styles.headerSuper}>ACTIVE SESSION</Text>
						<Text style={styles.headerTitle}>Karakoram Vibe{"\n"}Room</Text>
					</View>
					<Image source={{ uri: "https://i.pravatar.cc/40?img=11" }} style={styles.headerAvatar} />
				</View>

				<View style={styles.membersRow}>
					{["3", "5", "8", "4"].map((img, i) => (
						<Image
							key={i}
							source={{ uri: `https://i.pravatar.cc/40?img=${img}` }}
							style={[styles.memberAvatar, { marginLeft: i > 0 ? -10 : 0 }]}
						/>
					))}
					<View style={styles.memberCount}>
						<Text style={styles.memberCountText}>+12</Text>
					</View>
				</View>

				<View style={styles.pinnedCard}>
					<View style={styles.pinnedHeader}>
						<Text style={styles.pinnedIcon}>📌</Text>
						<Text style={styles.pinnedLabel}>PINNED ITINERARY</Text>
					</View>
					<View style={styles.pinnedBody}>
						<View>
							<Text style={styles.pinnedTitle}>Karakoram Expedition</Text>
							<Text style={styles.pinnedMeta}>14 Days • High Altitude</Text>
						</View>
						<TouchableOpacity>
							<Text style={styles.viewMapText}>VIEW MAP</Text>
						</TouchableOpacity>
					</View>
				</View>

				<ScrollView
					ref={scrollRef}
					style={styles.messagesList}
					contentContainerStyle={styles.messagesContent}
					showsVerticalScrollIndicator={false}
				>
					<Text style={styles.dateDivider}>TODAY</Text>

					{messages.map((msg) => {
						if (msg.type === "poll") {
							return <PollBubble key={msg.id} msg={msg} />;
						}
						if (msg.type === "image") {
							return <ImageBubble key={msg.id} msg={msg} />;
						}
						return <TextBubble key={msg.id} msg={msg} />;
					})}
				</ScrollView>

				<View style={styles.inputBar}>
					<TouchableOpacity style={styles.attachBtn}>
						<Text style={styles.attachIcon}>⊕</Text>
					</TouchableOpacity>
					<TextInput
						style={styles.textInput}
						placeholder="Share a vibe or ask the group"
						placeholderTextColor={Colors.textMuted}
						value={input}
						onChangeText={setInput}
						multiline
					/>
					<TouchableOpacity style={styles.emojiBtn}>
						<Text>🙂</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
						<Text style={styles.sendIcon}>▶</Text>
					</TouchableOpacity>
				</View>

				<Modal visible={showError} transparent animationType="fade">
					<View style={styles.modalOverlay}>
						<View style={styles.errorModal}>
							<View style={styles.errorIconBox}>
								<Text style={styles.errorEmoji}>🚫</Text>
							</View>
							<Text style={styles.errorTitle}>Message could not be sent</Text>
							<Text style={styles.errorDesc}>
								Your connection was interrupted while uploading. Would you like to try again or dismiss this message?
							</Text>
							<TouchableOpacity style={styles.retryBtn} onPress={() => setShowError(false)}>
								<Text style={styles.retryText}>Retry</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowError(false)} style={styles.dismissBtn}>
								<Text style={styles.dismissText}>Dismiss</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

function TextBubble({ msg }: { msg: any }) {
	return (
		<View style={[bubbleStyles.row, msg.isMine && bubbleStyles.myRow]}>
			{!msg.isMine && <Image source={{ uri: msg.avatar }} style={bubbleStyles.avatar} />}
			<View style={{ maxWidth: "75%" }}>
				{!msg.isMine && <Text style={bubbleStyles.senderName}>{msg.sender}</Text>}
				<View style={[bubbleStyles.bubble, msg.isMine && bubbleStyles.myBubble]}>
					<Text style={[bubbleStyles.text, msg.isMine && bubbleStyles.myText]}>{msg.text}</Text>
				</View>
				<Text style={[bubbleStyles.time, msg.isMine && bubbleStyles.myTime]}>
					{msg.time} {msg.isMine && "✓✓"}
				</Text>
			</View>
		</View>
	);
}

function PollBubble({ msg }: { msg: any }) {
	const [voted, setVoted] = useState<number | null>(null);
	return (
		<View style={bubbleStyles.row}>
			<Image source={{ uri: msg.avatar }} style={bubbleStyles.avatar} />
			<View style={{ maxWidth: "80%" }}>
				<Text style={bubbleStyles.senderName}>{msg.sender}</Text>
				<View style={bubbleStyles.pollCard}>
					<View style={bubbleStyles.pollHeader}>
						<Text style={bubbleStyles.pollIcon}>📋</Text>
						<Text style={bubbleStyles.pollQuestion}>{msg.poll.question}</Text>
					</View>
					{msg.poll.options.map((opt: any, i: number) => (
						<TouchableOpacity
							key={i}
							style={[bubbleStyles.pollOption, voted === i && bubbleStyles.pollOptionSelected]}
							onPress={() => setVoted(i)}
						>
							<Text style={bubbleStyles.pollOptionLabel}>{opt.label}</Text>
							<Text style={bubbleStyles.pollOptionPct}>{opt.votes}%</Text>
						</TouchableOpacity>
					))}
					<TouchableOpacity style={bubbleStyles.voteBtn} onPress={() => setVoted(0)}>
						<Text style={bubbleStyles.voteBtnText}>VOTE</Text>
					</TouchableOpacity>
				</View>
				<Text style={bubbleStyles.time}>{msg.time}</Text>
			</View>
		</View>
	);
}

function ImageBubble({ msg }: { msg: any }) {
	return (
		<View style={bubbleStyles.row}>
			<Image source={{ uri: msg.avatar }} style={bubbleStyles.avatar} />
			<View style={{ maxWidth: "75%" }}>
				<Text style={bubbleStyles.senderName}>{msg.sender}</Text>
				<Image source={{ uri: msg.imageUrl }} style={bubbleStyles.sharedImage} />
				<View style={bubbleStyles.bubble}>
					<Text style={bubbleStyles.text}>{msg.text}</Text>
				</View>
				<Text style={bubbleStyles.time}>{msg.time}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: Colors.bg },
	flex: { flex: 1 },
	header: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingHorizontal: Spacing.screen,
		paddingTop: 10,
		paddingBottom: 8,
		backgroundColor: Colors.bg,
		gap: 10,
	},
	backBtn: { paddingTop: 4 },
	backText: { fontSize: 22, color: Colors.textPrimary },
	headerCenter: { flex: 1 },
	headerSuper: { ...Typography.label, color: Colors.textMuted, fontSize: 10, marginBottom: 2 },
	headerTitle: { ...Typography.h1, color: Colors.textPrimary, lineHeight: 30 },
	headerAvatar: { width: 36, height: 36, borderRadius: 18, marginTop: 4 },

	membersRow: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: Spacing.screen,
		marginBottom: 10,
	},
	memberAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: Colors.bg },
	memberCount: {
		backgroundColor: Colors.bgMuted,
		borderRadius: 12,
		paddingHorizontal: 8,
		paddingVertical: 3,
		marginLeft: 6,
	},
	memberCountText: { ...Typography.label, color: Colors.textSecondary, fontSize: 10 },

	pinnedCard: {
		marginHorizontal: Spacing.screen,
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.md,
		padding: 12,
		marginBottom: 4,
		...Shadow.sm,
	},
	pinnedHeader: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 6 },
	pinnedIcon: { fontSize: 12 },
	pinnedLabel: { ...Typography.label, color: Colors.textMuted, fontSize: 9 },
	pinnedBody: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
	pinnedTitle: { ...Typography.h4, color: Colors.textPrimary },
	pinnedMeta: { ...Typography.caption, color: Colors.textSecondary },
	viewMapText: { ...Typography.label, color: Colors.brand, fontSize: 10 },

	messagesList: { flex: 1 },
	messagesContent: { padding: Spacing.screen, gap: 12, paddingBottom: 8 },
	dateDivider: { ...Typography.label, color: Colors.textMuted, textAlign: "center", fontSize: 10, marginBottom: 8 },

	inputBar: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.bgCard,
		paddingHorizontal: 12,
		paddingVertical: 10,
		borderTopWidth: 1,
		borderTopColor: Colors.border,
		gap: 8,
	},
	attachBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
	attachIcon: { fontSize: 22, color: Colors.textSecondary },
	textInput: {
		flex: 1,
		...Typography.body,
		color: Colors.textPrimary,
		paddingVertical: 6,
		maxHeight: 80,
	},
	emojiBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
	sendBtn: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	sendIcon: { color: "#fff", fontSize: 14 },

	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.4)",
		alignItems: "center",
		justifyContent: "center",
		padding: 24,
	},
	errorModal: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.xl,
		padding: 28,
		alignItems: "center",
		width: "100%",
		...Shadow.lg,
	},
	errorIconBox: {
		width: 60,
		height: 60,
		borderRadius: 16,
		backgroundColor: Colors.dangerBg,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	errorEmoji: { fontSize: 26 },
	errorTitle: { ...Typography.h3, color: Colors.textPrimary, textAlign: "center", marginBottom: 8 },
	errorDesc: { ...Typography.body, color: Colors.textSecondary, textAlign: "center", marginBottom: 20 },
	retryBtn: {
		width: "100%",
		backgroundColor: Colors.brand,
		borderRadius: Radius.full,
		paddingVertical: 14,
		alignItems: "center",
		marginBottom: 12,
	},
	retryText: { ...Typography.h4, color: "#fff" },
	dismissBtn: { paddingVertical: 4 },
	dismissText: { ...Typography.h4, color: Colors.brand },
});

const bubbleStyles = StyleSheet.create({
	row: { flexDirection: "row", gap: 8, alignItems: "flex-end" },
	myRow: { flexDirection: "row-reverse" },
	avatar: { width: 32, height: 32, borderRadius: 16 },
	senderName: { ...Typography.label, color: Colors.textSecondary, fontSize: 10, marginBottom: 4 },
	bubble: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 12,
		...Shadow.sm,
	},
	myBubble: { backgroundColor: Colors.brand },
	text: { ...Typography.body, color: Colors.textPrimary },
	myText: { color: "#fff" },
	time: { ...Typography.caption, color: Colors.textMuted, marginTop: 4, fontSize: 11 },
	myTime: { textAlign: "right" },

	pollCard: {
		backgroundColor: Colors.bgCard,
		borderRadius: Radius.lg,
		padding: 14,
		...Shadow.sm,
	},
	pollHeader: { flexDirection: "row", gap: 8, alignItems: "center", marginBottom: 10 },
	pollIcon: { fontSize: 16 },
	pollQuestion: { ...Typography.h4, color: Colors.textPrimary },
	pollOption: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: Colors.bgMuted,
		borderRadius: Radius.md,
		padding: 10,
		marginBottom: 6,
	},
	pollOptionSelected: { backgroundColor: Colors.bgMuted, borderWidth: 1, borderColor: Colors.brand },
	pollOptionLabel: { ...Typography.bodyMd, color: Colors.textPrimary, flex: 1 },
	pollOptionPct: { ...Typography.h4, color: Colors.textSecondary },
	voteBtn: {
		backgroundColor: Colors.brand,
		borderRadius: Radius.md,
		paddingVertical: 10,
		alignItems: "center",
		marginTop: 4,
	},
	voteBtnText: { ...Typography.label, color: "#fff" },

	sharedImage: { width: 220, height: 140, borderRadius: Radius.md, marginBottom: 4 },
});
