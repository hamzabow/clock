import { useState, useEffect } from 'react'
import { useTime } from './hooks/useTime'
import MechanicalClock from './components/MechanicalClock'
import DigitalClock from './components/DigitalClock'
import DateDisplay from './components/DateDisplay'
import Settings from './components/Settings'
import { type ClockSettings, loadSettings, saveSettings } from './utils/settings'
import './App.css'

function App() {
  const time = useTime()
  const [settings, setSettings] = useState<ClockSettings>(loadSettings)

  // Save settings to localStorage whenever they change
  useEffect(() => {
    saveSettings(settings)
  }, [settings])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme)
  }, [settings.theme])

  const hasVisibleClock = settings.showAnalog || settings.showDigital

  return (
    <main className="app">
      <Settings settings={settings} onChange={setSettings} />

      <div className="clock-display">
        {settings.showAnalog && (
          <MechanicalClock time={time} scale={settings.analogScale} />
        )}
        {settings.showDigital && (
          <DigitalClock time={time} scale={settings.digitalScale} />
        )}
        {!hasVisibleClock && (
          <div className="no-clock-message">
            Enable a clock in settings
          </div>
        )}
        {settings.showDate && hasVisibleClock && (
          <DateDisplay time={time} scale={settings.dateScale} />
        )}
      </div>
    </main>
  )
}

export default App
