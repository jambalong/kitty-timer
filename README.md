# Kitty Timer

A charming cat-themed web timer with a stopwatch, a countdown, and a few cozy
extras. Pure HTML, CSS, and JavaScript: just open `index.html`.

## Features

- **Stopwatch**: Count up and keep track of elapsed time.
- **Countdown**: Pick a duration from 5 to 90 minutes (your last choice is
  remembered). A sleepy cat badge settles in and drifts off as time runs down,
  and a soft chime plays at zero.
- **Break tips**: Gentle, dismissible suggestions (stretch, drink water, rest
  your eyes, breathe) shown when a countdown finishes, and optionally every 20,
  30, or 60 minutes while the page is open. The interval timer is off by default
  and pauses while the tab is hidden.
- **Purr ambience**: An optional looping purr with its own volume slider. It
  plays whenever it is switched on, and is off by default.
- **Pause/Resume**: Click the gray cat to pause or resume.
- **Reset**: Click the black cat to reset and return to the setup screen.
- **Sound effects**: Cute click and cat sounds on every interaction.
- **Light and dark themes**: Toggle with the moon/sun button.

## Project Structure

```
kitty-timer/
├── index.html                # Main HTML file
├── favicon.ico               # Website favicon
├── asset/
│   ├── audio/                # Sound effects, countdown chime, purr loop
│   ├── font/                 # Custom font (KgAdipose)
│   └── image/
│       ├── cat/              # Cat images (body, mouth, rope, hand)
│       └── text/english/     # Button images (start, pause, reset, resume)
├── css/
│   ├── media/                # Responsive styles for mobile devices
│   └── timer/
│       ├── animation/        # CSS animations for cat interactions
│       ├── other/            # Font and initial reset styles
│       └── style/            # UI styles (timerApp, timingUi, stopwatchUi, theme,
│                             #   countdownCompanion, settingsPanel)
└── js/
    └── timer/
        ├── data/             # Application data (state, volume, time, preferences)
        ├── other/            # Enums and utility functions
        ├── struct/           # Time data structure
        ├── system/           # Audio, time, and save systems
        ├── ui/               # UI components (timingUi, stopwatchUi)
        ├── countdownCompanion.js  # Sleepy cat badge and break-tip toast
        ├── settingsPanel.js       # Settings popover (break tips, purr)
        └── timerApp.js            # Main application entry point
```

## Usage

1. Open `index.html` in a web browser.
2. On the setup screen, choose **Stopwatch** or **Countdown** (and a duration).
3. Click **Start**.
4. Click the gray cat to pause or resume, and the black cat to reset.
5. Use the gear icon in the corner to adjust break tips and purr ambience.

## Technologies

- Pure HTML, CSS, and JavaScript
- No frameworks, build step, or dependencies
