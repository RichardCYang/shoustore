
const sessions = [];
const uuid = require('uuid');

exports.createSession = ( usernick ) => {
    let session = new Array;
    session.startTime = Date.now();
    session.expired = 30;
    session.id = uuid.v4();
    sessions.push( session );
    return session;
}

exports.destroySession = ( usernick ) => {

}