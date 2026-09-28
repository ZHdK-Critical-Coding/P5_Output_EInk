const displayConnection = 'ws://192.168.138.96:8765' // Adresse des WebSocket-Servers
const display = {
  width: 400,   // Breite des Canvas
  height: 300   // Höhe des Canvas
}

let socket;                 // WebSocket-Objekt
let displayState = 'not ok' // Statusanzeige der Verbindung
let statusLabel             // HTML-Element für den Status (unter dem Canvas, wird nicht gesendet)
let count = 0               // Zähler, wird bei Mausklick erhöht

// Funktion zum Senden eines Frames über den WebSocket
function sendFrame () {
  canvas.toBlob(blob => { // Canvas in ein PNG-Blob konvertieren
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(blob); // Blob (Binärdaten) an den Server senden
    }
  }, "image/png");  
}

// Setup-Funktion (wird einmalig beim Start ausgeführt)
function setup() {
  createCanvas(display.width, display.height); // Canvas mit definierter Größe erstellen
  noSmooth();                                  // Kantenglättung deaktivieren
  pixelDensity(1);                             // Pixeldichte einstellen

  // WebSocket-Verbindung aufbauen
  socket = new WebSocket(displayConnection);

  // Event: Verbindung erfolgreich aufgebaut
  socket.onopen = () => {
    displayState = 'Connected to Display'
  };

  // Event: Nachricht vom Server empfangen
  socket.onmessage = (event) => {
    displayState = event.data // Server-Nachricht im Status anzeigen
  };

  // Event: Fehler in der Verbindung
  socket.onerror = () => {
    displayState = `WebSocket Error`
  };

  // Event: Verbindung geschlossen
  socket.onclose = () => {
    console.log("Connection closed");
  };

  // Statusanzeige als HTML-Text unter dem Canvas
  statusLabel = createP(displayState)
  statusLabel.style('margin', '10px')
}

// Draw-Funktion (wird kontinuierlich ausgeführt, ca. 60x pro Sekunde)
function draw() {
  background(255); // Hintergrund weiß setzen

  // Rahmen und Linien zeichnen
  noFill()
  strokeWeight(4)
  rect(2,2,width-4, height-4)     // Rahmen
  line(0,0,width,height)          // Diagonale 1
  line(0,height,width,0)          // Diagonale 2

  // Mehrere konzentrische Kreise zeichnen
  fill(200)
  circle(width * .5, height * .5, width)
  fill(160)
  circle(width * .5, height * .5, width * .75)
  fill(120)
  circle(width * .5, height * .5, width * .5)
  fill(80)
  circle(width * .5, height * .5, width * .25)

  // Zählerwert in der Mitte darstellen
  fill('black')
  textSize(100)
  textAlign(CENTER)
  text(count, width / 2, height / 2 + 35)

  // Verbindungsstatus anzeigen (ausserhalb des Canvas, damit er nicht auf dem Display landet)
  statusLabel.html(displayState)
}

// Event: Mausklick
function mousePressed() {
  count++ // Zähler erhöhen
  requestAnimationFrame(() => {sendFrame()})  // Nach Mausklick Frame an Server senden
}