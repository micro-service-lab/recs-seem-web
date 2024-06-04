export interface AuthJwt {
    accessToken: string;
    refreshToken: string;
    sessionId: string;
    expiresIn: number;
}