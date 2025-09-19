export interface User {
  id: string;
  name: string;
  email: string;
  marketPreference?: 'india' | 'usa';
}

export interface AuthResponse {
  ok: boolean;
  user?: User;
  error?: string;
  redirectPath?: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (userData: SignUpData) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<AuthResponse>;
  resetPassword: (token: string, newPassword: string) => Promise<AuthResponse>;
  resendVerification: (email: string) => Promise<AuthResponse>;
  setMarketPreference: (market: 'india' | 'usa') => Promise<AuthResponse>;
}