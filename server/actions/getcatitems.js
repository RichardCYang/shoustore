
const dbmng = require('../dbmanager');

exports.getcatitems = ( ws,data ) => {
    dbmng.findItemsByCategory( data.cat ).then((rows) => {
        ws.send( JSON.stringify(rows) );
    }).catch((err) => {
        console.log(err);
    });
}