
const sqlite3 = require('sqlite3').verbose();
const shoustore_db = "./server/shoustore.db";
const conlog = require('./consolelog');
const filemanager = require('./filemanager');

function showErr( err ){
    if( err ){
        if( err.toString().indexOf("constraint") > -1 ){
            if( err.toString().indexOf("UNIQUE") > -1 ){
                return;
            }
        }
        console.log( err );
    }
}

/* 동기적(Sync)으로 조회(Select) 쿼리를 처리하기 위한 함수 */
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
    /* 상품 테이블 생성 */
    db.run('CREATE TABLE IF NOT EXISTS shoustore_item( product_id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,itemdesc TEXT,stockcnt INTEGER DEFAULT 0,makername TEXT,category_name TEXT NOT NULL,price INTEGER DEFAULT 0,thumbnail TEXT )',showErr);
    /* 카테고리 테이블 생성*/
    db.run('CREATE TABLE IF NOT EXISTS shoustore_category( category_name TEXT PRIMARY KEY )',showErr);
    db.close(showErr);
}

exports.addCategory = ( category_name ) => { // 카테고리 추가
    let db = new sqlite3.Database(shoustore_db,showErr);
    db.run('INSERT INTO shoustore_category VALUES ("' + category_name + '")',showErr);
}

exports.addItem = ( name,category_name,price,stockcnt,thumbnail,itemdesc ) => { // 상품 추가
    let db = new sqlite3.Database(shoustore_db,showErr);
    let column = 'name,category_name';
    let value = '"' + name + '","' + category_name + '"';

    if( price ){
        column = column + ',price';
        value = value + ',' + price;
    }

    if( stockcnt ){
        column = column + ',stockcnt';
        value = value + ',' + stockcnt;
    }

    if( thumbnail ){
        column = column + ',thumbnail';
        value = value + ',"' + thumbnail + '"';
    }

    if( itemdesc ){
        column = column + ',itemdesc';
        value = value + ',"' + itemdesc + '"';
    }

    let query = 'INSERT INTO shoustore_item (' + column + ') VALUES(' + value + ')';
    db.run(query,showErr);
}

exports.findCategories = async() => { 
    /* 카테고리 테이블 조회 */
    let query = 'SELECT category_name FROM shoustore_category';
    return await selectSync( query );
}

exports.findItemsByCategory = async( category_name ) => {
    /* 특정 카테고리에 해당하는 테이블 조회 */
    let query = 'SELECT * FROM shoustore_item WHERE category_name = "' + category_name + '"';
    return await selectSync( query );
}

exports.findItemsByName = async( itemname ) => {
    /* 상품 이름으로 조회 */
    let query = 'SELECT * FROM shoustore_item WHERE LOWER(name) LIKE "%" || LOWER("' + itemname + '") || "%"';
    return await selectSync( query );
}

exports.findRecentlyItemFromCategories = async() => {
    /* 각각의 카테고리에서 가장 최신의 상품을 조회 */
    let cats = await this.findCategories();
    let items = [];
    for(let i = 0; i < cats.length; i++){
        let query = 'SELECT * FROM shoustore_item WHERE category_name = "' + cats[i].category_name + '"';
        let result = await selectSync( query );
        if( result.length > 0 ){
            /* 썸네일 정보를 같이 저장해서 전송 */
            if( result[0].thumbnail ){
                let imgdata = filemanager.loadImage( result[0].thumbnail );
                result[0].rawthumbnail = imgdata;
            }
            items.push( result[0] );
        }
    }
    return items;
}

exports.findMemberByID = async( nickname, phoneNo ) => {
    /* 회원 테이블 조회 */
    let query = 'SELECT * FROM shoustore_member WHERE nickname = "' + nickname + '"';
    /* 전화번호 인자값이 전달되었다면? */
    /* => 전화번호도 같이 조회 */
    if( phoneNo ){
        query = 'SELECT * FROM shoustore_member WHERE nickname = "' + nickname + '" and phone = "' + phoneNo +'"';
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