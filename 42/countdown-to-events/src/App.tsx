// import { EventForm } from '@/components/commons/organisms/event-form';
import { Events } from '@/components/commons/organisms/events';
import { useEventsStore } from './stores/events/events.store';
import { Button } from './components/ui/button';
import { EventModal } from './components/commons/organisms/event-modal';

export default function App() {
  const resetEvents = useEventsStore((state) => state.resetEvents);

  return (
    <main className="flex flex-col gap-4 p-8">
      <EventModal isEditing={false} />
      <Events />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Button onClick={resetEvents} variant="destructive">
        Reset events
      </Button>
    </main>
  );
}
