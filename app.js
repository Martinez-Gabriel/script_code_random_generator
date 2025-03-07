import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { WebSocketServer } from 'ws';
import generateUserDni from './utils/generateUserDni.js';
import sendQRCode from './utils/sendQrCode.js';
import sendQRCodeWs from './utils/sendQrCodeWs.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));


app.get('/code', async (req, res) => {
  try {
      const userData = await generateUserDni();
      const code = await sendQRCode(userData);

      res.status(200).json({
          qrBase64: code.qrBase64,
          userData: code.userData
      });
  } catch (error) {
      console.error('Error generando el código:', error);
      res.status(500).json({ error: 'Error al generar el código' });
  }
});

// Crear servidor WebSocket
const wss = new WebSocketServer({ noServer: true });

app.get('/ws', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'ws.html'));
});


// Configurar WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado al WebSocket');

  sendQRCodeWs(ws, {
    dni: '00616938456',
    lastName: 'MARTINEZ',
    firstName: 'GABRIEL',
    gender: 'M',
    idNumber: '65625156',
    category: 'A',
    birthDate: '22/09/1991',
    issueDate: '10/02/2003'
  });

  setInterval( async () => {
    const userData = await generateUserDni();
    sendQRCodeWs(ws, userData);
  }, 500);
});


const port = 3001;
app.server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});