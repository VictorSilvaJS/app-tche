import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client';
import { setToken, clearToken, getToken } from './token';

interface Session { token: string }
interface AuthContextValue {
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) setSession({ token });
    })();
  }, []);

  async function login(email: string, password: string) {
    const res = await api.post('/auth/login', { email, password });
    await setToken(res.data.access_token);
    setSession({ token: res.data.access_token });
  }

  async function logout() {
    await clearToken();
    setSession(null);
  }

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
