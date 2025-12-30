import BwipJs from 'bwip-js/node';

function sendQRCodeWs(ws, userData) {
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

  export default sendQRCodeWs;