export interface AccessToken {
    access_token: string;
    expires_at: Date;
    refresh_expires_at: Date;
    refresh_token: string;
} 
export interface AuthTokenRequest {
    access_token: string;
    expires_in: number;
    refresh_expires_in: number;
    refresh_token: string;
    received: Date;
} 