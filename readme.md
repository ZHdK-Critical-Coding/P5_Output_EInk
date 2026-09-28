# P5.js: E-Ink

[Deutsch](README_DE.md)

Sends the canvas of a p5 sketch as a PNG over a WebSocket to a Raspberry
Pi, which shows it on a Waveshare 4.2" e-ink display in four grey levels.
Each mouse click raises a counter and sends a new frame. A starting point
for slow, paper-like displays that only update now and then.

## Installation

Requirements: a browser on the same network as the Pi (see Server).

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used).

License: MIT

## Server

Needs `screen-websocket` from
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
running on a Raspberry Pi with a Waveshare 4.2" e-paper display on SPI
(enable SPI in `sudo raspi-config`), port 8765. Start it first with
`python screen.py` in the folder on the Pi (there is no `run.sh`); the
display shows its address. It takes a PNG, resizes it to 400 × 300 and
shows it in four grey levels; it sends no answer. Put its address in
`displayConnection` at the top of `sketch.js`.

## How to Run

1. Start the server on the Pi (see Server). The display shows its address.
2. Enter that address in `displayConnection` at the top of `sketch.js`,
   e.g. `ws://192.168.138.96:8765`.
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
4. Click into the canvas. The counter goes up and the frame is sent. An
   e-ink refresh takes a few seconds.

## Coding Help

- **`sketch.js` → `displayConnection`, `display`**: server address and
  canvas size (400 × 300, the size of the display).
- **`setup()`**: creates the canvas with `pixelDensity(1)` and
  `noSmooth()` and opens the WebSocket. Connection state and server
  messages are stored in `displayState` and shown in a text line
  (`statusLabel`) below the canvas.
- **`sendFrame()`**: encodes the canvas as PNG and sends it if the socket
  is open. The server resizes it to the display and converts it to grey
  levels.
- **`draw()`**: frame, diagonals, four grey concentric circles and the
  counter in the middle, plus an update of the status line (an HTML
  element, so it is not sent to the display). Use black, white and a few
  greys — the display shows only four levels.
- **`mousePressed()`**: raises `count` and sends the next frame. Frames
  are only sent here, not every frame; call `sendFrame()` elsewhere to
  update on other events.
