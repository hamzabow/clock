import { useState, useEffect } from 'react';
import './MechanicalClock.css';

interface ClockTime {
  hours: number;
  minutes: number;
  seconds: number;
}

function MechanicalClock() {
  const [time, setTime] = useState<ClockTime>(getCurrentTime());

  function getCurrentTime(): ClockTime {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
      seconds: now.getSeconds(),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Calculate rotation angles
  const secondAngle = time.seconds * 6; // 360 / 60 = 6 degrees per second
  const minuteAngle = time.minutes * 6 + time.seconds * 0.1; // 6 degrees per minute + smooth movement
  const hourAngle = (time.hours % 12) * 30 + time.minutes * 0.5; // 30 degrees per hour + smooth movement

  return (
    <div className="clock-container">
      <svg
        viewBox="0 0 200 200"
        className="clock-svg"
        aria-label={`Clock showing ${time.hours}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}
      >
        {/* Clock face background */}
        <circle
          cx="100"
          cy="100"
          r="95"
          className="clock-face-outer"
        />
        <circle
          cx="100"
          cy="100"
          r="88"
          className="clock-face-inner"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x1 = 100 + 75 * Math.cos(angle);
          const y1 = 100 + 75 * Math.sin(angle);
          const x2 = 100 + 82 * Math.cos(angle);
          const y2 = 100 + 82 * Math.sin(angle);
          return (
            <line
              key={`hour-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="hour-marker"
            />
          );
        })}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => {
          if (i % 5 === 0) return null; // Skip hour positions
          const angle = (i * 6 - 90) * (Math.PI / 180);
          const x1 = 100 + 78 * Math.cos(angle);
          const y1 = 100 + 78 * Math.sin(angle);
          const x2 = 100 + 82 * Math.cos(angle);
          const y2 = 100 + 82 * Math.sin(angle);
          return (
            <line
              key={`minute-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="minute-marker"
            />
          );
        })}

        {/* Hour numbers */}
        {[...Array(12)].map((_, i) => {
          const num = i === 0 ? 12 : i;
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = 100 + 62 * Math.cos(angle);
          const y = 100 + 62 * Math.sin(angle);
          return (
            <text
              key={`num-${i}`}
              x={x}
              y={y}
              className="hour-number"
              dominantBaseline="central"
              textAnchor="middle"
            >
              {num}
            </text>
          );
        })}

        {/* Hour hand */}
        <g transform={`rotate(${hourAngle}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="55"
            className="hour-hand"
          />
          <polygon
            points="97,55 100,42 103,55"
            className="hour-hand-tip"
          />
        </g>

        {/* Minute hand */}
        <g transform={`rotate(${minuteAngle}, 100, 100)`}>
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="35"
            className="minute-hand"
          />
          <polygon
            points="98,35 100,25 102,35"
            className="minute-hand-tip"
          />
        </g>

        {/* Second hand */}
        <g transform={`rotate(${secondAngle}, 100, 100)`}>
          <line
            x1="100"
            y1="115"
            x2="100"
            y2="25"
            className="second-hand"
          />
          <circle
            cx="100"
            cy="25"
            r="3"
            className="second-hand-tip"
          />
        </g>

        {/* Center cap */}
        <circle
          cx="100"
          cy="100"
          r="6"
          className="center-cap"
        />
        <circle
          cx="100"
          cy="100"
          r="3"
          className="center-cap-inner"
        />

        {/* Decorative screws */}
        {[45, 135, 225, 315].map((angle) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const x = 100 + 85 * Math.cos(rad);
          const y = 100 + 85 * Math.sin(rad);
          return (
            <g key={`screw-${angle}`}>
              <circle cx={x} cy={y} r="3" className="screw" />
              <line
                x1={x - 2}
                y1={y}
                x2={x + 2}
                y2={y}
                className="screw-slot"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default MechanicalClock;
