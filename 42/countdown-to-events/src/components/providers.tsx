import { Toaster } from 'sonner';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};
