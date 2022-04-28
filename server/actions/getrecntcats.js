
const dbmng = require('../dbmanager');

exports.getrecntcats = ( ws,data ) => {
    dbmng.findRecentlyItemFromCategories().then((rows) => {
        ws.send( JSON.stringify(rows) );
    }).catch((err) => {
        console.log(err);
    });
}