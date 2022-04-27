
const fs = require('fs');
const SERVERPATH_IMAGES = './server/imgs/';
 
exports.loadImage = (imgname) => {
    let imgdata = fs.readFileSync( SERVERPATH_IMAGES + imgname,{encoding:'base64'} );
    return imgdata;
}