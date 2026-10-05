# Kitty Timer

A charming cat-themed web timer application. 

## Features

- **Stopwatch Timer**: Start a timer to keep track of elapsed time
- **Countdown Timer**: Switch to Countdown mode, set a 5-90 minute duration (remembered
  between visits), and watch the countdown play out — a sleepy cat badge settles
  in and drifts off to sleep as time runs down, with a soft chime at zero
- **Self-Care Break Companion**: A gentle, dismissible nudge (stretch, drink
  water, rest your eyes...) appears when a countdown session finishes, and
  optionally every 20, 30, or 60 minutes while the page is open (off by default;
  the clock pauses while the tab is hidden) — toggle it off anytime in Settings
- **Purr Ambience**: An optional looping purr plays whenever it is switched on,
  with its own volume slider in Settings — off by default
- **Pause/Resume**: Click the gray cat to pause or resume the timer
- **Reset**: Click the black cat to reset and return to the timing interface
- **Sound Effects**: Enjoy cute sound effects during interactions

## Project Structure

```
kitty-timer/
├── index.html              # Main HTML file
├── favicon.ico             # Website favicon
├── asset/
│   ├── audio/              # Sound effects (button clicks, cat sounds, countdown chime, purr loop)
│   ├── font/               # Custom font (KgAdipose)
│   └── image/
│       ├── cat/            # Cat images (body, mouth, rope, hand)
│       └── text/english/   # Button images (start, pause, reset, resume)
├── css/
│   ├── media/              # Responsive styles for mobile devices
│   └── timer/
│       ├── animation/      # CSS animations for cat interactions
│       ├── other/          # Font and initial reset styles
│       └── style/          # Main UI styles (timerApp, timingUi, stopwatchUi,
│                            # theme, countdownCompanion, settingsPanel)
└── js/
    └── timer/
        ├── data/           # Application data (state, volume, time, countdown/purr prefs)
        ├── other/          # Enums and utility functions
        ├── struct/         # Time data structure
        ├── system/         # Audio, time, and save systems
        ├── timerApp.js     # Main application entry point
        ├── countdownCompanion.js # Sleepy buddy badge + self-care toast
        ├── settingsPanel.js# Break tips / purr ambience settings popover
        └── ui/             # UI components (timingUi, stopwatchUi)
```

## Usage

1. Open `index.html` in a web browser
2. Set your desired time on the timing screen (or switch to Countdown mode and pick a duration)
3. Click the start button to begin the stopwatch or countdown
4. Click the gray cat to pause/resume
5. Click the black cat to reset
6. Use the gear icon in the corner to turn self-care break tips (and how often they appear) or purr ambience on/off

## Technologies

- Pure HTML, CSS, and JavaScript
- No external frameworks or dependencies
