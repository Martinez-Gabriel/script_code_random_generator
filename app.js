import express from 'express';
import BwipJs from 'bwip-js/node';
import { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Crear servidor WebSocket
const wss = new WebSocketServer({ noServer: true });
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Configurar WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado al WebSocket');

  // Enviar un QR inicial al cliente
  sendQRCode(ws, {
    dni: '00956938456',
    lastName: 'MARTINEZ',
    firstName: 'GABRIEL ALEJANDRO',
    gender: 'M',
    idNumber: '42675456',
    category: 'B',
    birthDate: '29/02/1991',
    issueDate: '29/02/2010'
  });

  // Simular cambios en el QR y enviarlos al cliente
  setInterval( async () => {
    const userData = await generateUserDni();
    sendQRCode(ws, userData);
  }, 20000);
});


function sendQRCode(ws, userData) {
  const text = `${userData.dni}@${userData.lastName}@${userData.firstName}@${userData.gender}@${userData.idNumber}@${userData.category}@${userData.birthDate}@${userData.issueDate}`;
  console.log(text);

  BwipJs.toBuffer({
    bcid: 'pdf417', 
    text: text, 
    scale: 10, 
    height: 15
  }, (err, png) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const message = {
      qrBase64: png.toString('base64'),
      userData: userData
    };
    
    ws.send(JSON.stringify(message));
  });
}

// Función para generar texto aleatorio
async function generateUserDni() {
  try{
    const response = await fetch('https://randomuser.me/api/');
    const data = await response.json();
    const user = data.results[0];
    const userData = {
      dni: '00956938456',
      lastName: user.name.last.toUpperCase(),
      firstName: user.name.first.toUpperCase(),
      gender: user.gender.charAt(0).toUpperCase(),
      idNumber: '42675456',
      category: 'B',
      birthDate: '29/02/1991',
      issueDate: '29/02/2010'
    };
    // console.log(userData);
    return userData;
  }
  catch(error){
    console.error(error);
    return error;
  }
}




const port = 3001;
app.server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});


app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});