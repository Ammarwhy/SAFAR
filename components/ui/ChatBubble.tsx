import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/constants/colors";

type ChatBubbleProps = {
	sender?: string;
	message: string;
	isMe?: boolean;
};

export default function ChatBubble({ sender, message, isMe = false }: ChatBubbleProps) {
	return (
		<View style={[styles.wrap, isMe ? styles.wrapMe : styles.wrapOther]}>
			{!isMe && sender ? <Text style={styles.sender}>{sender}</Text> : null}
			<View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleOther]}>
				<Text style={[styles.message, isMe ? styles.messageMe : styles.messageOther]}>{message}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		maxWidth: "85%",
		marginBottom: spacing.sm,
	},
	wrapMe: {
		alignSelf: "flex-end",
	},
	wrapOther: {
		alignSelf: "flex-start",
	},
	sender: {
		fontSize: 11,
		marginBottom: 4,
		color: colors.textMuted,
		marginLeft: 8,
	},
	bubble: {
		borderRadius: radius.md,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},
	bubbleMe: {
		backgroundColor: colors.primaryBlue,
	},
	bubbleOther: {
		backgroundColor: colors.cardWhite,
		borderWidth: 1,
		borderColor: colors.borderSoft,
	},
	message: {
		lineHeight: 20,
	},
	messageMe: {
		color: colors.cardWhite,
	},
	messageOther: {
		color: colors.textDark,
	},
});
