import { useState, useEffect, useRef } from 'react';
import './Settings.css';

export interface ClockSettings {
  showAnalog: boolean;
  showDigital: boolean;
  showDate: boolean;
}

interface SettingsProps {
  settings: ClockSettings;
  onChange: (settings: ClockSettings) => void;
}

function Settings({ settings, onChange }: SettingsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      setIsVisible(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (!isOpen) {
        timeoutRef.current = window.setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (key: keyof ClockSettings) => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div
      ref={popoverRef}
      className={`settings-container ${isVisible || isOpen ? 'visible' : ''}`}
    >
      <button
        className={`settings-button ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Settings"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {isOpen && (
        <div className="settings-popover">
          <label className="settings-option">
            <input
              type="checkbox"
              checked={settings.showAnalog}
              onChange={() => handleToggle('showAnalog')}
            />
            <span className="checkbox-custom" />
            <span>Analog</span>
          </label>

          <label className="settings-option">
            <input
              type="checkbox"
              checked={settings.showDigital}
              onChange={() => handleToggle('showDigital')}
            />
            <span className="checkbox-custom" />
            <span>Digital</span>
          </label>

          <label className="settings-option">
            <input
              type="checkbox"
              checked={settings.showDate}
              onChange={() => handleToggle('showDate')}
            />
            <span className="checkbox-custom" />
            <span>Date</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default Settings;
