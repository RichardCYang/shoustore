
const dbmng = require('../dbmanager');

exports.searchitem = ( ws,data ) => {
    dbmng.findItemsByName( data.itemname ).then((rows) => {
        ws.send( JSON.stringify( rows ) );
    }).catch((err) => {
        console.log( err );
    })
}