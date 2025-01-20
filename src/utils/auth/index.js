export const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const currentTime = Date.now() / 1000;
        return token.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true;
    }
}