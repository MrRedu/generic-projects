import { type ReactNode } from 'react';
import { Header } from '@/components/commons/templates/header';
import { Providers } from '@/components/providers';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Providers>
        <Header />
        <main className="flex flex-col gap-4 p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </Providers>
    </>
  );
};
