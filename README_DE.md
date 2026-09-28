# P5.js: E-Ink

[English](readme.md)

Schickt die Zeichenfläche eines p5-Sketches als PNG über einen WebSocket an
einen Raspberry Pi, der sie auf einem Waveshare-4.2"-E-Ink-Display in vier
Graustufen zeigt. Jeder Mausklick erhöht einen Zähler und schickt einen
neuen Frame. Ein Ausgangspunkt für langsame, papierartige Anzeigen, die
sich nur ab und zu ändern.

## Installation

Voraussetzungen: ein Browser im selben Netzwerk wie der Pi (siehe Server).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

Lizenz: MIT

## Server

Braucht `screen-websocket` aus
[Servers_RaspberriPi](https://github.com/ZHdK-Critical-Coding/Servers_RaspberriPi),
auf einem Raspberry Pi mit einem Waveshare-4.2"-E-Paper-Display an SPI
(SPI in `sudo raspi-config` aktivieren), Port 8765. Zuerst mit
`python screen.py` im Ordner auf dem Pi starten (es gibt kein `run.sh`);
das Display zeigt seine Adresse. Er nimmt ein PNG an, skaliert es auf
400 × 300 und zeigt es in vier Graustufen; er schickt keine Antwort. Seine
Adresse oben in `sketch.js` bei `displayConnection` eintragen.

## Ausführen

1. Den Server auf dem Pi starten (siehe Server). Das Display zeigt seine Adresse.
2. Diese Adresse oben in `sketch.js` bei `displayConnection` eintragen,
   z. B. `ws://192.168.138.96:8765`.
3. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
4. In die Zeichenfläche klicken. Der Zähler steigt und der Frame wird
   gesendet. Ein E-Ink-Refresh dauert einige Sekunden.

## Coding-Hilfe

- **`sketch.js` → `displayConnection`, `display`**: Server-Adresse und
  Grösse der Zeichenfläche (400 × 300, die Grösse des Displays).
- **`setup()`**: erstellt die Zeichenfläche mit `pixelDensity(1)` und
  `noSmooth()` und öffnet den WebSocket. Verbindungsstatus und
  Server-Nachrichten landen in `displayState` und werden in einer
  Textzeile (`statusLabel`) unter der Zeichenfläche angezeigt.
- **`sendFrame()`**: kodiert die Zeichenfläche als PNG und schickt sie, wenn
  der Socket offen ist. Der Server skaliert sie aufs Display und wandelt sie
  in Graustufen um.
- **`draw()`**: Rahmen, Diagonalen, vier graue konzentrische Kreise und der
  Zähler in der Mitte, dazu wird die Statuszeile aktualisiert (ein
  HTML-Element, sie wird also nicht ans Display geschickt). Schwarz, Weiss
  und wenige Grautöne verwenden – das Display zeigt nur vier Stufen.
- **`mousePressed()`**: erhöht `count` und schickt den nächsten Frame.
  Frames werden nur hier gesendet, nicht in jedem Frame; `sendFrame()`
  anderswo aufrufen, um bei anderen Ereignissen zu aktualisieren.
