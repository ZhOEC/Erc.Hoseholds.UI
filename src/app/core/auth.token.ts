export interface AuthTokenRequest {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    received: Date;
} 