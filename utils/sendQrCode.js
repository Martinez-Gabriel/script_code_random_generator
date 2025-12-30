import BwipJs from 'bwip-js/node';

async function sendQRCode(userData) {
    const text = `${userData.dni}@${userData.lastName}@${userData.firstName}@${userData.gender}@${userData.idNumber}@${userData.category}@${userData.birthDate}@${userData.issueDate}`;
    console.log(text);

    const png = await new Promise((res, rej) => {
        BwipJs.toBuffer({
            bcid: 'pdf417', 
            text: text, 
            scale: 10, 
            height: 15
        }, (err, png) => {
            if (err) {
                rej(err); 
                return;
            }
            res(png);
        });
    });

    const message = {
        qrBase64: png.toString('base64'),
        userData: userData
    };

    return message;
}

export default sendQRCode;
