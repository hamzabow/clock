import { useState } from 'react'
import { useTime } from './hooks/useTime'
import MechanicalClock from './components/MechanicalClock'
import DigitalClock from './components/DigitalClock'
import DateDisplay from './components/DateDisplay'
import Settings, { type ClockSettings } from './components/Settings'
import './App.css'

function App() {
  const time = useTime()
  const [settings, setSettings] = useState<ClockSettings>({
    showAnalog: true,
    showDigital: false,
    showDate: false,
  })

  const hasVisibleClock = settings.showAnalog || settings.showDigital

  return (
    <main className="app">
      <Settings settings={settings} onChange={setSettings} />

      <div className="clock-display">
        {settings.showAnalog && <MechanicalClock time={time} />}
        {settings.showDigital && <DigitalClock time={time} />}
        {!hasVisibleClock && (
          <div className="no-clock-message">
            Enable a clock in settings
          </div>
        )}
        {settings.showDate && hasVisibleClock && <DateDisplay time={time} />}
      </div>
    </main>
  )
}

export default App
