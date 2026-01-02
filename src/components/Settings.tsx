import { useState, useEffect, useRef } from 'react';
import type { ClockSettings, Theme } from '../utils/settings';
import { defaultSettings } from '../utils/settings';
import './Settings.css';

interface SettingsProps {
  settings: ClockSettings;
  onChange: (settings: ClockSettings) => void;
}

function Settings({ settings, onChange }: SettingsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
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
        setShowAdvanced(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = (key: 'showAnalog' | 'showDigital' | 'showDate') => {
    onChange({ ...settings, [key]: !settings[key] });
  };

  const handleScaleChange = (key: 'analogScale' | 'digitalScale' | 'dateScale', value: number) => {
    onChange({ ...settings, [key]: value });
  };

  const handleThemeChange = (theme: Theme) => {
    onChange({ ...settings, theme });
  };

  const handleReset = () => {
    onChange(defaultSettings);
    setShowAdvanced(false);
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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      </button>

      {isOpen && (
        <div className={`settings-popover ${showAdvanced ? 'expanded' : ''}`}>
          <div className="settings-section">
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

          <button
            className="advanced-toggle"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span>Advanced</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={showAdvanced ? 'rotated' : ''}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {showAdvanced && (
            <div className="settings-section advanced">
              <div className="settings-group">
                <label className="settings-label">
                  Analog Size
                  <span className="settings-value">{Math.round(settings.analogScale * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={settings.analogScale}
                  onChange={(e) => handleScaleChange('analogScale', parseFloat(e.target.value))}
                  className="settings-slider"
                />
              </div>

              <div className="settings-group">
                <label className="settings-label">
                  Digital Size
                  <span className="settings-value">{Math.round(settings.digitalScale * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={settings.digitalScale}
                  onChange={(e) => handleScaleChange('digitalScale', parseFloat(e.target.value))}
                  className="settings-slider"
                />
              </div>

              <div className="settings-group">
                <label className="settings-label">
                  Date Size
                  <span className="settings-value">{Math.round(settings.dateScale * 100)}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={settings.dateScale}
                  onChange={(e) => handleScaleChange('dateScale', parseFloat(e.target.value))}
                  className="settings-slider"
                />
              </div>

              <div className="settings-group">
                <label className="settings-label">Theme</label>
                <div className="theme-buttons">
                  <button
                    className={`theme-button ${settings.theme === 'auto' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('auto')}
                  >
                    Auto
                  </button>
                  <button
                    className={`theme-button ${settings.theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    Light
                  </button>
                  <button
                    className={`theme-button ${settings.theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    Dark
                  </button>
                </div>
              </div>

              <button className="reset-button" onClick={handleReset}>
                Reset to Defaults
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;
