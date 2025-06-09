import { useContext } from 'react';

import { Events } from '@/components/commons/organisms/events';
import { EventModal } from '@/components/commons/organisms/event-modal';
import { AppLayout } from '@/components/commons/templates/app-layout';

// import { useSupabase } from './hooks/use-supabase';
import { AuthContext } from './context/auth/auth';
import { Button } from '@/components/ui/button';

export default function App() {
  // const { data } = useSupabase();
  const { user, loginWithGoogle, logout } = useContext(AuthContext);

  return (
    <AppLayout>
      {/* Modal to add new event in the list */}
      <EventModal isEditing={false} />
      <Events />

      <Button onClick={loginWithGoogle}>Iniciar sesión con Google</Button>
      <Button onClick={logout}>Cerrar sesión</Button>
      <pre className="overflow-y-scroll">{JSON.stringify(user, null, 2)}</pre>
    </AppLayout>
  );
}
