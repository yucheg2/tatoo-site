const ACCESSTOKEN_KEY = "jwt_access";
const EXPIRES_KEY = "expires";
const REFRESH_KEY = "jwt_refresh";
const USERID_KEY = "user_local_id";

export function setTokens({ userId, refreshToken, expiresIn = 3600, accessToken }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(USERID_KEY, userId);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(ACCESSTOKEN_KEY, accessToken);
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY);
}

export function getAccessTokent() {
    return localStorage.getItem(ACCESSTOKEN_KEY);
}

export function getExpires() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function deleteTokens() {
    localStorage.removeItem(USERID_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    localStorage.removeItem(ACCESSTOKEN_KEY);
}

export const localStorageService = {
    setTokens,
    getUserId,
    getExpires,
    getRefreshToken,
    getAccessTokent,
    deleteTokens
};
