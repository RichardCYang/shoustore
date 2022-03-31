
const sqlite3 = require('sqlite3').verbose();
const shoustore_db = "./shoustore.db";

function showErr( err ){
    if( err ){
        console.log( err );
    }
}

exports.createTableNeeded = function(){
    let db = new sqlite3.Database(shoustore_db,showErr);
    /* 회원 테이블 생성 */
    db.run('CREATE TABLE IF NOT EXISTS shoustore_member( nickname TEXT PRIMARY KEY,password TEXT UNIQUE,phone TEXT UNIQUE,point INTEGER,memberlevel INTEGER DEFAULT 0,regdate INTEGER NOT NULL )',showErr);
    db.close(showErr);
}