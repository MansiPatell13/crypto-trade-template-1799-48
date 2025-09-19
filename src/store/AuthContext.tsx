import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthState, AuthContextType, User, SignUpData, AuthResponse } from '@/types/auth';
import { authService } from '@/services/auth/authService';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_SESSION'; payload: Session | null }
  | { type: 'SIGN_OUT' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'SET_SESSION':
      return {
        ...state,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        dispatch({ type: 'SET_SESSION', payload: session });
        
        if (session?.user) {
          // Defer user profile fetching to avoid blocking
          setTimeout(async () => {
            const user = await authService.getCurrentUser();
            dispatch({ type: 'SET_USER', payload: user });
          }, 0);
        } else {
          dispatch({ type: 'SET_USER', payload: null });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      dispatch({ type: 'SET_SESSION', payload: session });
      
      if (session?.user) {
        const user = await authService.getCurrentUser();
        dispatch({ type: 'SET_USER', payload: user });
      } else {
        dispatch({ type: 'SET_USER', payload: null });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await authService.signIn(email, password);
    
    if (!response.ok) {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
    
    return response;
  };

  const signUp = async (userData: SignUpData): Promise<AuthResponse> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const response = await authService.signUp(userData);
    
    if (!response.ok) {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
    
    return response;
  };

  const signOut = async (): Promise<void> => {
    await authService.signOut();
    dispatch({ type: 'SIGN_OUT' });
  };

  const setMarketPreference = async (market: 'india' | 'usa'): Promise<AuthResponse> => {
    const response = await authService.setMarketPreference(market);
    
    if (response.ok && response.user) {
      dispatch({ type: 'SET_USER', payload: response.user });
    }
    
    return response;
  };

  const value: AuthContextType = {
    ...state,
    signIn,
    signUp,
    signOut,
    sendResetEmail: authService.sendResetEmail,
    resetPassword: authService.resetPassword,
    resendVerification: authService.resendVerification,
    setMarketPreference,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};