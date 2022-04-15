
const sqlite3 = require('sqlite3').verbose();
const shoustore_db = "./server/shoustore.db";

function showErr( err ){
    if( err ){
        console.log( err );
    }
}

async function selectSync( query ){
    return new Promise((res,rej) => {
        let db = new sqlite3.Database(shoustore_db,showErr);
        db.all(query,(err,rows) => {
            if( err ){
                db.close( showErr );
                return rej( err );
            }
            res(rows); 
            db.close( showErr );
        });
    });
}

exports.createTableNeeded = () => {
    let db = new sqlite3.Database(shoustore_db,showErr);
    /* 회원 테이블 생성 */
    db.run('CREATE TABLE IF NOT EXISTS shoustore_member( nickname TEXT PRIMARY KEY,password TEXT UNIQUE,phone TEXT UNIQUE,point INTEGER,memberlevel INTEGER DEFAULT 0,regdate INTEGER NOT NULL )',showErr);
    /* 판매 테이블 생성 */
    db.run('CREATE TABLE IF NOT EXISTS shoustore_sold( sellername TEXT PRIMARY KEY,selldate INTEGER NOT NULL,sellitem TEXT NOT NULL )',showErr);
    /* 구매 테이블 생성 */
    db.run('CREATE TABLE IF NOT EXISTS shoustore_bought( buyername TEXT PRIMARY KEY,buydate INTEGER NOT NULL,buyitem TEXT NOT NULL,buyamount INTEGER NOT NULL )',showErr);
    db.close(showErr);
}

exports.findMemberByID = async( nickname, phoneNo ) => {
    /* 회원 테이블 조회 */
    let query = 'SELECT nickname FROM shoustore_member WHERE nickname = "' + nickname + '"';
    /* 전화번호 인자값이 전달되었다면? */
    /* => 전화번호도 같이 조회 */
    if( phoneNo ){
        query = 'SELECT nickname,phone FROM shoustore_member WHERE nickname = "' + nickname + '" and phone = "' + phoneNo +'"';
    }
    return await selectSync(query);
}

exports.regMember = ( nickname, password, phoneNo,callback) => {
    /* 회원 테이블 입력 */
    let db = new sqlite3.Database(shoustore_db,showErr);
    let today = Date.now();

    let cb = showErr;
    if( callback ){
        cb = callback;
    }

    db.run('INSERT INTO shoustore_member (nickname, password, phone, regdate) VALUES ("' + nickname + '","' + password + '","' + phoneNo + '",' + today + ')',cb);
}