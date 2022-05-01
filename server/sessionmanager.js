
const sessions = [];
const uuid = require('uuid');

exports.createSession = ( usernick ) => {
    let session = new Array;
    session.startTime = Date.now();
    session.expired = 30;
    session.id = uuid.v4();
    session.username = usernick;
    sessions.push( session );
    return session;
}

exports.getSession = ( id ) => {
    let curSession = null;
    sessions.forEach((session) => {
        if( session.id === id ){
            curSession = session;
        }
    });
    return curSession;
}

exports.destroySession = ( id ) => {
    sessions.forEach((session,idx) => {
        if( session.id === id ){
            sessions.splice(idx,1);
            return;
        }
    });
}