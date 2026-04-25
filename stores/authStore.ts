type AuthState = {
	isAuthenticated: boolean;
	lastLoginAt: number | null;
};

const authState: AuthState = {
	isAuthenticated: false,
	lastLoginAt: null,
};

export function setAuthenticated(value: boolean) {
	authState.isAuthenticated = value;
	authState.lastLoginAt = value ? Date.now() : null;
}

export function clearAuthState() {
	authState.isAuthenticated = false;
	authState.lastLoginAt = null;
}

export function getAuthState() {
	return { ...authState };
}
