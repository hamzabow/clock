export type Theme = 'auto' | 'light' | 'dark';

export interface ClockSettings {
  showAnalog: boolean;
  showDigital: boolean;
  showDate: boolean;
  analogScale: number;
  digitalScale: number;
  dateScale: number;
  theme: Theme;
}

const STORAGE_KEY = 'mechanical-clock-settings';

export const defaultSettings: ClockSettings = {
  showAnalog: true,
  showDigital: false,
  showDate: false,
  analogScale: 1,
  digitalScale: 1,
  dateScale: 1,
  theme: 'auto',
};

export function loadSettings(): ClockSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultSettings, ...parsed };
    }
  } catch {
    // Ignore parse errors
  }
  return defaultSettings;
}

export function saveSettings(settings: ClockSettings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Ignore storage errors
  }
}
