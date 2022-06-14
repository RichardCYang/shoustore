
const dbmng = require('../dbmanager');
const sessionmng = require('../sessionmanager');

exports.regitems = ( ws,data ) => {
    let sessionInfo = sessionmng.getSession( data.session );
    let username = sessionInfo != null ? sessionInfo.username : 'unknown';
    dbmng.addItem( data.name, data.category_name, data.price, data.stockcnt, "./users/" + username + "/" + data.thumbnailFile, data.itemdesc,(err) => {
        if ( err ) {
            console.log( err );
            return;
        }
        ws.send( 'DONE_REGITEMS' );
    })
}