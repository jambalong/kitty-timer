# Kitty Timer

A charming cat-themed web timer application. 

## Features

- **Stopwatch Timer**: Start a timer to keep track of elapsed time
- **Pause/Resume**: Click the gray cat to pause or resume the timer
- **Reset**: Click the black cat to reset and return to the timing interface
- **Sound Effects**: Enjoy cute sound effects during interactions

## Project Structure

```
kitty-timer/
├── index.html              # Main HTML file
├── favicon.ico             # Website favicon
├── asset/
│   ├── audio/              # Sound effects (button clicks, cat sounds)
│   ├── font/               # Custom font (KgAdipose)
│   └── image/
│       ├── cat/            # Cat images (body, mouth, rope, hand)
│       └── text/english/   # Button images (start, pause, reset, resume)
├── css/
│   ├── media/              # Responsive styles for mobile devices
│   └── timer/
│       ├── animation/      # CSS animations for cat interactions
│       ├── other/          # Font and initial reset styles
│       └── style/          # Main UI styles (timerApp, timingUi, stopwatchUi)
└── js/
    └── timer/
        ├── data/           # Application data (state, volume, time)
        ├── other/          # Enums and utility functions
        ├── struct/         # Time data structure
        ├── system/         # Audio, time, and save systems
        ├── timerApp.js     # Main application entry point
        └── ui/             # UI components (timingUi, stopwatchUi)
```

## Usage

1. Open `index.html` in a web browser
2. Set your desired time on the timing screen
3. Click the start button to begin the stopwatch
4. Click the gray cat to pause/resume
5. Click the black cat to reset

## Technologies

- Pure HTML, CSS, and JavaScript
- No external frameworks or dependencies
