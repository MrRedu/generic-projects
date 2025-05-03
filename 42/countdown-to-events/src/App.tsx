import { Events } from '@/components/commons/organisms/events';
import { EventModal } from '@/components/commons/organisms/event-modal';
import { AppLayout } from '@/components/commons/templates/app-layout';

export default function App() {
  return (
    <AppLayout>
      {/* Modal to add new event in the list */}
      <EventModal isEditing={false} />
      <Events />
    </AppLayout>
  );
}
