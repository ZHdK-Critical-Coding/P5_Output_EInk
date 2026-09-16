# WebSocket Display Sender

Dieses Projekt zeigt, wie man mit **p5.js** Inhalte eines Canvas an einen **WebSocket-Server** überträgt.  
Der Benutzer kann durch Mausklicks den Zähler erhöhen, und der aktuelle Frame wird als PNG-Bild an den Server gesendet.  

## Features

- Verbindung zu einem WebSocket-Server aufbauen
- Canvas mit p5.js rendern (400 × 300 Pixel)
- Senden von Frames als PNG-Binärdaten
- Interaktiver Zähler (erhöht sich bei Mausklick)
- Darstellung von Formen (Rahmen, Diagonalen, konzentrische Kreise)
- Statusmeldungen aus der WebSocket-Verbindung

## Voraussetzungen

- Node.js / Browser mit WebSocket-Unterstützung
- Ein laufender WebSocket-Server unter `ws://192.168.138.96:8765`

## Verwendung

- Starte den WebSocket-Server.
- Öffne die HTML-Seite mit dem eingebundenen Skript.
- Klicke mit der Maus in das Canvas:
  - Der Zähler in der Mitte erhöht sich.
  - Der aktuelle Frame wird als PNG an den Server geschickt.

## Beispiel-Animation

Die Demo zeigt:

- Einen Rahmen mit Diagonalen
- Vier konzentrische Kreise in Graustufen
- Einen Zähler in der Mitte (schwarz, groß dargestellt)

## Lizenz

MIT License