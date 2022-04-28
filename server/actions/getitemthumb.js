
const filemanager = require('../filemanager');

exports.getitemthumb = ( ws,data ) => {
    if( !data.thumbname ){
        ws.send('ERR_THUMBGENERAL');
        return;
    }
    try{
        let imgdata = filemanager.loadImage( data.thumbname );
        ws.send( imgdata );
    }catch(err){
        ws.send('ERR_THUMBGENERAL')
        console.log(err);
    }
}