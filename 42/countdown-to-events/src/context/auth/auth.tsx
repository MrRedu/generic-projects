import { type ReactNode, createContext, useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabase.config';

type User = {
  // id: string;
  email: string;
  avatar: string;
  name: string;
};

interface AuthContext {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContext>({
  user: null,
  loginWithGoogle: async () => {},
  logout: async () => {},
});

interface IAppProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<IAppProviderProps> = ({
  children,
}: IAppProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event);
        // console.log('✅', session);
        if (session)
          setUser({
            // id: session.user.user_metadata.id, // TODO: Buscar cuál es el id dentro de la session que se comparte entre proveedores, para asi poder vincular la data a ese ID e indiferentemente del lugar de dónde inició sesión, tenga la misma data
            email: session.user.user_metadata.email,
            avatar: session.user.user_metadata.avatar_url,
            name: session.user.user_metadata.name,
          });
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error)
        throw new Error('Ha ocurrido un error durante la autenticación');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
