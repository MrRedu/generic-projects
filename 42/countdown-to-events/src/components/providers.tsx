import type { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { ThemeProvider } from './theme-provider';
import AuthProvider from '@/context/auth/auth';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </ThemeProvider>
  );
};
