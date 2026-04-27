const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";
const DEFAULT_MODEL = "claude-3-5-sonnet-20241022";

export type ClaudeRole = "user" | "assistant";

export type ClaudeMessage = {
	role: ClaudeRole;
	content: string;
};

export type ClaudeCodeFixInput = {
	code: string;
	instruction?: string;
	fileName?: string;
	language?: string;
	context?: string;
	model?: string;
	maxTokens?: number;
};

type AnthropicTextBlock = {
	type: "text";
	text: string;
};

type AnthropicMessageResponse = {
	content?: AnthropicTextBlock[];
	error?: {
		message?: string;
	};
};

function getAnthropicApiKey() {
	return process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY?.trim() ?? "";
}

function getModel(model?: string) {
	return model?.trim() || process.env.EXPO_PUBLIC_CLAUDE_MODEL?.trim() || DEFAULT_MODEL;
}

function buildCodeFixPrompt({ code, instruction, fileName, language, context }: ClaudeCodeFixInput) {
	const parts = [
		"You are a senior engineer. Fix the code below.",
		"Return only the corrected code unless a short explanation is necessary.",
		instruction ? `Instruction: ${instruction}` : null,
		fileName ? `File: ${fileName}` : null,
		language ? `Language: ${language}` : null,
		context ? `Context: ${context}` : null,
		"",
		"Code:",
		code,
	];

	return parts.filter(Boolean).join("\n");
}

export function hasClaudeApiKey() {
	return getAnthropicApiKey().length > 0;
}

export async function askClaude(prompt: string, options?: { model?: string; maxTokens?: number }) {
	const apiKey = getAnthropicApiKey();

	if (!apiKey) {
		throw new Error("Missing Claude API key. Add EXPO_PUBLIC_ANTHROPIC_API_KEY to your .env file.");
	}

	const response = await fetch(ANTHROPIC_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": apiKey,
			"anthropic-version": ANTHROPIC_VERSION,
		},
		body: JSON.stringify({
			model: getModel(options?.model),
			max_tokens: options?.maxTokens ?? 1024,
			messages: [{ role: "user", content: prompt }],
		}),
	});

	const data = (await response.json()) as AnthropicMessageResponse;

	if (!response.ok) {
		throw new Error(data.error?.message ?? `Claude request failed with status ${response.status}`);
	}

	return data.content?.map((block) => block.text).join("") ?? "";
}

export async function askClaudeToFixCode(input: ClaudeCodeFixInput) {
	return askClaude(buildCodeFixPrompt(input), {
		model: input.model,
		maxTokens: input.maxTokens,
	});
}