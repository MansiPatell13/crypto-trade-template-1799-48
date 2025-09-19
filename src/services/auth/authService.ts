import { User, AuthResponse, SignUpData } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

class AuthService {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      if (data.user) {
        // Get user profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          name: profile?.name || data.user.email?.split('@')[0] || '',
          email: data.user.email || '',
          marketPreference: profile?.market_preference as 'india' | 'usa' || undefined,
        };

        return { ok: true, user };
      }

      return { ok: false, error: 'Unknown error occurred' };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async signUp(userData: SignUpData): Promise<AuthResponse> {
    try {
      const redirectUrl = `${window.location.origin}/auth/verify-email`;
      
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            name: userData.name,
          }
        }
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      if (data.user) {
        const user: User = {
          id: data.user.id,
          name: userData.name,
          email: userData.email,
        };

        return { 
          ok: true, 
          user, 
          redirectPath: '/auth/verify-email' 
        };
      }

      return { ok: false, error: 'Unknown error occurred' };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async signOut(): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { ok: false, error: error.message };
      }
      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async sendResetEmail(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async resendVerification(email: string): Promise<AuthResponse> {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify-email`
        }
      });

      if (error) {
        return { ok: false, error: error.message };
      }

      return { ok: true };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async setMarketPreference(market: 'india' | 'usa'): Promise<AuthResponse> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return { ok: false, error: 'No authenticated user' };
      }

      const { error } = await supabase
        .from('profiles')
        .update({ market_preference: market })
        .eq('user_id', user.id);

      if (error) {
        return { ok: false, error: error.message };
      }

      // Get updated profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const updatedUser: User = {
        id: user.id,
        name: profile?.name || user.email?.split('@')[0] || '',
        email: user.email || '',
        marketPreference: market,
      };

      return { ok: true, user: updatedUser };
    } catch (error) {
      return { ok: false, error: 'Network error occurred' };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return {
        id: user.id,
        name: profile?.name || user.email?.split('@')[0] || '',
        email: user.email || '',
        marketPreference: profile?.market_preference as 'india' | 'usa' || undefined,
      };
    } catch (error) {
      return null;
    }
  }
}

export const authService = new AuthService();