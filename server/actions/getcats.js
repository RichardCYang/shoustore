
const dbmng = require('../dbmanager');

exports.getcats = ( ws,data ) => {
    /* 카테고리 정보 조회 */
    dbmng.findCategories().then((rows) => {
        ws.send( JSON.stringify( rows ) );
    }).catch((err) => {
        console.log(err);
    });
}