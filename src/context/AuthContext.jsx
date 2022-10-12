import { createContext, useContext, useEffect, useCallback, useState, useMemo } from 'react';
import { Buffer } from 'buffer';
import * as usersApi from '../api/users';
import * as api from '../api';
import config from '../config.json';

const JWT_TOKEN_KEY = config.token_key; 
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

/* Roles
 * 0: stakeholder
 * 1: directie
 * 2: manager
 * 3: coordinator
 */

export const useSession = () => {
    const { loading, token, user, ready, error, hasRole } = useAuth();
    return {
        loading,
        token,
        user,
        ready,
        error,
        isAuthed: Boolean(token),
        hasRole
    };
}

function parseJWT(token) {
	if (!token) return {};
	const base64Url = token.split('.')[1];
	const payload = Buffer.from(base64Url, 'base64');
	const jsonPayload = payload.toString('ascii');
	return JSON.parse(jsonPayload);
}

function parseExp(exp) {
	if (!exp) return null;
	if (typeof exp !== 'number') exp = Number(exp);
	if (isNaN(exp)) return null;
	return new Date(exp * 1000);
}

export const useLogin = () => {
	const { login } = useAuth();
	return login;
};

export const useLogout = () => {
	const { logout } = useAuth();
	return logout;
};

export const AuthProvider = ({
	children,
}) => {
	const [ready, setReady] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [token, setToken] = useState(localStorage.getItem(JWT_TOKEN_KEY));
	const [user, setUser] = useState(null);

	const setSession = useCallback(async (token, user) => {
		const { exp } = parseJWT(token);
		const expiry = parseExp(exp);
		const stillValid = expiry >= new Date();

		if (stillValid) {
			localStorage.setItem(JWT_TOKEN_KEY, token);
		} else {
			localStorage.removeItem(JWT_TOKEN_KEY);
			token = null;
		}

		api.setAuthToken(token);
		setToken(token);
		setReady(token && stillValid);

		if (!user && stillValid) {
			user = await usersApi.getCurrentUser();
		  }
		  setUser(user);
	}, []);

	useEffect(() => {
		setSession(token)
	}, [token, setSession]);

	const login = useCallback(async (username, password) => {
		try {
			setLoading(true);
			setError('');
			const { token, user } = await usersApi.login(username, password);
			setSession(token, user);
			return true;
		} catch (error) {
			console.error(error);
			setError('Login failed, try again');
			return false;
		} finally {
			setLoading(false);
		}
	}, [setSession]);

	const logout = useCallback(() => {
		setSession(null);
		setUser(null);
	}, [setSession]);

	const hasRole = useCallback((...roles) => {
		if (!user) return false;
		return roles.includes(user.rol);
	}, [user])

	const value = useMemo(() => ({
		token,
		user,
		ready,
		error,
		loading,
		login,
		logout,
		hasRole,
	}), [token, user, error, loading, ready, login, logout, hasRole]);
		
	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};