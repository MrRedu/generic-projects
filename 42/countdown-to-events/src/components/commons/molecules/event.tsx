import { Button } from '@/components/ui/button';
import { EVENTS_TYPE } from '@/constants/constants';
import { useCountdown } from '@/hooks/use-countdown';
import { Pencil, Trash2 } from 'lucide-react';
import type { Event as EventType } from '@/stores/types/events.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEventsStore } from '@/stores/events/events.store';

interface EventProps extends EventType {}

export const Event = ({
  id,
  title,
  description,
  theme,
  targetDate,
  reminder,
}: EventProps) => {
  const removeEvent = useEventsStore((state) => state.removeEvent);
  const timeLeft = useCountdown(new Date(targetDate));
  const eventType = EVENTS_TYPE[theme as keyof typeof EVENTS_TYPE];

  return (
    <Card className="gap-4 text-center">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <Badge variant="outline">{eventType}</Badge>
      </CardHeader>
      <CardContent>
        <p className="font-bold">
          {`${timeLeft.days} días, ${timeLeft.hours} horas y ${timeLeft.minutes} minutos`}
        </p>
        <p className="text-gray-600 text-sm italic">
          {new Date(targetDate).toLocaleDateString()}
        </p>
        {reminder && <code>{JSON.stringify(reminder, undefined, 2)}</code>}
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 mt-auto">
        <Button
          variant="outline"
          size="icon"
          className="hover:text-red-600"
          onClick={() => removeEvent(id)}
        >
          <Trash2 />
        </Button>
        <Button variant="outline" size="icon">
          <Pencil />
        </Button>
      </CardFooter>
    </Card>
  );
};
