
const sessionmng = require('../sessionmanager');

exports.signout = ( ws,data ) => {
    /* 해당 키값이 존재하지 않는다면? 이미 세션이 로그아웃 상태 */
    let session = sessionmng.getSession( data.key );
    if( session == null ){
        ws.send('ERR_ALREADYLOGGEDOUT');
        return;
    }
    /* 해당 키값에 해당하는 세션 제거 */
    sessionmng.destroySession( data.key );
    ws.send('DONE_DESTROYSESSION');
}