
const dbmng = require('../dbmanager');

exports.signup = ( ws,data ) => {
    dbmng.findMemberByID( data.id, data.phone ).then((rows) => {
        /* 해당 유저가 이미 가입되어 있다면 */
        rows.forEach((row) => {
            if( row.nickname === data.id  ){
                ws.send("ERR_ALREADYREGMEMBER");
                return;
            }
        })
        /* 신규 유저라면 새로운 튜플을 데이터베이스에 추가 */
        dbmng.regMember( data.id,data.pw,data.phone,(err) => {
            if( err ){
                console.log( err );
                return;
            }
            ws.send('DONE_REGMEMBER');
        });
    }).catch((err) => {
        console.log(err);
    });
}