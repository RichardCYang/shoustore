
const dbmng = require('../dbmanager');
const sessionmng = require('../sessionmanager');

exports.signin = ( ws,data ) => {
    dbmng.findMemberByID( data.id ).then((rows) => {
        if( rows.length == 0 ){
            ws.send('ERR_NOMEMBER');
        }else{
            if( rows[0].password !== data.pw ){
                ws.send('ERR_MISMATCHPASSWD');
                return;
            }
            /* 새로운 세션 생성 */
            let session = sessionmng.createSession( data.id );
            /* 로그인 성공 시, 계정에 대한 세션 정보 전송 -> 클라이언트 */
            ws.send('session?id=' + session.id + '&expired=' + session.expired + '&username=' + session.username);
        }
    }).catch((err) => {
        console.log(err);
    })
}