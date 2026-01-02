# Mechanical Clock

A beautiful, responsive SVG-based mechanical clock built with React, TypeScript, and Vite. Features both analog and digital displays with customizable themes and sizes.

## Features

- **Analog Clock**: Realistic mechanical clock with smooth hand animations
- **Digital Clock**: Modern digital time display with blinking separator
- **Date Display**: Full date with weekday, month, day, and year
- **Customizable Settings**:
  - Toggle between analog, digital, and date displays
  - Individual size controls (50-300%) for each display element
  - Theme switcher (Auto, Light, Dark)
  - Settings persistence via localStorage
  - Reset to defaults option
- **Auto-hiding Settings**: Settings button appears on mouse movement and auto-hides after 2 seconds of inactivity
- **Fully Responsive**: Works seamlessly on all screen sizes
- **Theme Support**: Automatic theme detection with manual override options

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with theme support

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/mechanical-clock.git

# Navigate to project directory
cd mechanical-clock

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```bash
# Create a production build
npm run build

# Preview the production build
npm run preview
```

## Usage

1. Move your mouse to reveal the settings button in the top-right corner
2. Click the settings icon to open the settings panel
3. Toggle display options (Analog, Digital, Date)
4. Click "Advanced" to access:
   - Individual size sliders for each display element
   - Theme selection (Auto, Light, Dark)
   - Reset to defaults button

All settings are automatically saved to your browser's localStorage.

## Project Structure

```
src/
├── components/
│   ├── MechanicalClock.tsx    # Analog clock component
│   ├── DigitalClock.tsx        # Digital time display
│   ├── DateDisplay.tsx         # Date component
│   └── Settings.tsx            # Settings panel
├── hooks/
│   └── useTime.ts              # Custom hook for time management
├── utils/
│   └── settings.ts             # Settings types and localStorage utilities
└── App.tsx                     # Main application component
```

## License

MIT
