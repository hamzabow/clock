import { useState, useEffect } from 'react';

export interface TimeData {
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
}

export function useTime(): TimeData {
  const [time, setTime] = useState<TimeData>(getCurrentTime());

  function getCurrentTime(): TimeData {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
      date: now,
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
