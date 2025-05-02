import { useEventsStore } from '@/stores/events/events.store';
import { EventsLayout } from '../templates/events-layout';
import { Event } from '../molecules/event';

export const Events = () => {
  const events = useEventsStore((state) => state.events);

  return (
    <>
      <EventsLayout>
        {events.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            title={event.title}
            theme={event.theme}
            targetDate={event.targetDate}
            reminder={event.reminder}
          />
        ))}
      </EventsLayout>
    </>
  );
};
