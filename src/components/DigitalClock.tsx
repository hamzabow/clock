import type { TimeData } from '../hooks/useTime';
import './DigitalClock.css';

interface DigitalClockProps {
  time: TimeData;
}

function DigitalClock({ time }: DigitalClockProps) {
  const hours = time.hours.toString().padStart(2, '0');
  const minutes = time.minutes.toString().padStart(2, '0');
  const seconds = time.seconds.toString().padStart(2, '0');

  return (
    <div className="digital-clock">
      <span className="digital-hours">{hours}</span>
      <span className="digital-separator">:</span>
      <span className="digital-minutes">{minutes}</span>
      <span className="digital-separator">:</span>
      <span className="digital-seconds">{seconds}</span>
    </div>
  );
}

export default DigitalClock;
