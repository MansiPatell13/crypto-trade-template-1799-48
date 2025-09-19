import { User, AuthResponse, SignUpData } from '@/types/auth';
import { DEMO_CREDENTIALS } from '@/constants/markets';
import { StorageService } from '@/services/storage/storageService';

class AuthService {
  private readonly STORAGE_KEY = 'bullseye_user';
  private currentUser: User | null = null;

  constructor() {
    this.initializeUser();
  }

  private initializeUser(): void {
    const userData = StorageService.getItem<User>(this.STORAGE_KEY);
    if (userData) {
      this.currentUser = userData;
    }
  }

  private setCurrentUser(user: User | null): void {
    this.currentUser = user;
    if (user) {
      StorageService.setItem(this.STORAGE_KEY, user);
    } else {
      StorageService.removeItem(this.STORAGE_KEY);
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    await this.delay(800);

    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      const user: User = {
        id: 'demo-user-id',
        name: 'Demo User',
        email: DEMO_CREDENTIALS.email,
        marketPreference: 'india'
      };

      this.setCurrentUser(user);
      return { ok: true, user };
    }

    return { 
      ok: false, 
      error: 'Invalid credentials. Use demo@bullseye.test / Demo@123' 
    };
  }

  async signUp(userData: SignUpData): Promise<AuthResponse> {
    await this.delay(800);

    const user: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
    };

    this.setCurrentUser(user);
    return { 
      ok: true, 
      user, 
      redirectPath: '/auth/market-selection' 
    };
  }

  async signOut(): Promise<AuthResponse> {
    await this.delay(300);
    this.setCurrentUser(null);
    return { ok: true };
  }

  async sendResetEmail(email: string): Promise<AuthResponse> {
    await this.delay(800);
    return { ok: true };
  }

  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    await this.delay(800);
    return { ok: true };
  }

  async resendVerification(email: string): Promise<AuthResponse> {
    await this.delay(800);
    return { ok: true };
  }

  async setMarketPreference(market: 'india' | 'usa'): Promise<AuthResponse> {
    await this.delay(500);

    if (this.currentUser) {
      const updatedUser = { ...this.currentUser, marketPreference: market };
      this.setCurrentUser(updatedUser);
      return { ok: true, user: updatedUser };
    }

    return { ok: false, error: 'No authenticated user' };
  }

  isSignedIn(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export const authService = new AuthService();