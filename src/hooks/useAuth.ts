import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const AUTH_KEY = 'pakfiler_auth';

export function useAuth() {
  const [authState, setAuthState, removeAuthState] = useLocalStorage<AuthState>(AUTH_KEY, {
    user: null,
    isAuthenticated: false,
  });

  const signIn = useCallback(
    (email: string, password: string, name?: string): { success: boolean; error?: string } => {
      // Basic validation
      if (!email || !email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Create user (mock authentication)
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name: name || email.split('@')[0],
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user,
        isAuthenticated: true,
      });

      return { success: true };
    },
    [setAuthState]
  );

  const signUp = useCallback(
    (email: string, password: string, name: string): { success: boolean; error?: string } => {
      // Basic validation
      if (!name || name.trim().length < 2) {
        return { success: false, error: 'Please enter your full name' };
      }
      if (!email || !email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address' };
      }
      if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // Create user
      const user: User = {
        id: `user_${Date.now()}`,
        email,
        name: name.trim(),
        createdAt: new Date().toISOString(),
      };

      setAuthState({
        user,
        isAuthenticated: true,
      });

      return { success: true };
    },
    [setAuthState]
  );

  const signOut = useCallback(() => {
    removeAuthState();
  }, [removeAuthState]);

  const updateProfile = useCallback(
    (updates: Partial<Pick<User, 'name' | 'email'>>) => {
      if (!authState.user) return;

      setAuthState({
        ...authState,
        user: {
          ...authState.user,
          ...updates,
        },
      });
    },
    [authState, setAuthState]
  );

  return useMemo(
    () => ({
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      signIn,
      signUp,
      signOut,
      updateProfile,
    }),
    [authState, signIn, signUp, signOut, updateProfile]
  );
}

export default useAuth;
