
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
    return await selectSync('SELECT nickname FROM shoustore_member WHERE nickname = "' + nickname + '", phone = "' + phoneNo +'"');
}

exports.regMember = async ( nickname, password, phoneNo) => {
    /* 회원 테이블 입력 */
    const today = Date.now();
    return await selectSync('iNSERT INTO shoustore_member (nickname, password, phone, date) VALUES ("' + nickname + '","' + password + '","' + phoneNo + '",' + today + ')')
}