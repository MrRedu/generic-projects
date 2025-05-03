import { useEventsStore } from '@/stores/events/events.store';
import { EventsLayout } from '../templates/events-layout';
import { Event } from '../molecules/event';

export const Events = () => {
  const events = useEventsStore((state) => state.events);

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center w-full min-h-80 h-full">
        <p className="text-gray-500">No hay eventos agendados.</p>
      </div>
    );
  }

  return (
    <EventsLayout>
      {events.map((event) => (
        <Event key={event.id} {...event} />
      ))}
    </EventsLayout>
  );
};
