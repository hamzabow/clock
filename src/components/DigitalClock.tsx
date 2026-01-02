import type { TimeData } from '../hooks/useTime';
import './DigitalClock.css';

interface DigitalClockProps {
  time: TimeData;
  scale?: number;
}

function DigitalClock({ time, scale = 1 }: DigitalClockProps) {
  const hours = time.hours.toString().padStart(2, '0');
  const minutes = time.minutes.toString().padStart(2, '0');
  const seconds = time.seconds.toString().padStart(2, '0');

  const fontSize = `clamp(${2 * scale}rem, ${8 * scale}vw, ${4 * scale}rem)`;

  return (
    <div className="digital-clock" style={{ fontSize }}>
      <span className="digital-hours">{hours}</span>
      <span className="digital-separator">:</span>
      <span className="digital-minutes">{minutes}</span>
      <span className="digital-separator">:</span>
      <span className="digital-seconds">{seconds}</span>
    </div>
  );
}

export default DigitalClock;
