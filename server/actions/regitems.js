
const dbmng = require('../dbmanager');

exports.regitems = ( ws,data ) => {
    console.log("regitems.js -> db.js additem")
    dbmng.addItem( data.name, data.category_name, data.price, data.stockcnt, data.thumbnail, data.itemdesc,(err) => {
        if ( err ) {
            console.log( err );
            return;
        }
        ws.send( 'DONE_REGITEMS' );
    })
}