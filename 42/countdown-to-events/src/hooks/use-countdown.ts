import { ONE_SECOND_IN_MS } from '@/constants/constants';
import { useEffect, useState } from 'react';

export function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime(); // Diferencia en milliseconds
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
      });
    }, ONE_SECOND_IN_MS);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
