import type { TimeData } from '../hooks/useTime';
import './DateDisplay.css';

interface DateDisplayProps {
  time: TimeData;
}

function DateDisplay({ time }: DateDisplayProps) {
  const formatted = time.date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <div className="date-display">{formatted}</div>;
}

export default DateDisplay;
