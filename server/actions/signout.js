
const sessionmng = require('../sessionmanager');

exports.signout = ( ws,data ) => {
    /* 해당 키값에 해당하는 세션 제거 */
    sessionmng.destroySession( data.key );
    ws.send('DONE_DESTROYSESSION');
}