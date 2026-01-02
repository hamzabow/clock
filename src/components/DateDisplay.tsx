import type { TimeData } from '../hooks/useTime';
import './DateDisplay.css';

interface DateDisplayProps {
  time: TimeData;
  scale?: number;
}

function DateDisplay({ time, scale = 1 }: DateDisplayProps) {
  const formatted = time.date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const fontSize = `clamp(${0.85 * scale}rem, ${2.5 * scale}vw, ${1.1 * scale}rem)`;

  return (
    <div className="date-display" style={{ fontSize }}>
      {formatted}
    </div>
  );
}

export default DateDisplay;
