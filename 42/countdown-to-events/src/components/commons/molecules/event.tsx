import { useCountdown } from '@/hooks/use-countdown';
import type { Event as EventType } from '@/stores/types/events.types';

interface EventProps extends EventType {}

export const Event = ({ title, theme, targetDate }: EventProps) => {
  const timeLeft = useCountdown(new Date(targetDate));

  return (
    <div className={`bg-${theme} p-4 rounded-lg shadow`}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">
        Target Date: {new Date(targetDate).toLocaleDateString()}
      </p>
      <span>{`${timeLeft.days} días, ${timeLeft.hours} horas y ${timeLeft.minutes} minutos`}</span>
    </div>
  );
};
