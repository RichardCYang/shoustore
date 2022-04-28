const conlog = require('./server/consolelog');

conlog.coninfo('Server started...');
conlog.coninfo('Importing modules...');

const http = require('http');
const ws = require('ws');
const dbmng = require('./server/dbmanager');
const filemng = require('./server/filemanager');

conlog.confin('Importing modules');

const port = 8090;

conlog.coninfo('Initializing database...');

dbmng.createTableNeeded();
/* 카테고리 임시로 추가 (추후 관리자 페이지를 따로 만들어서 카테고리 추가/관리 예정) */
dbmng.addCategory("Food");
dbmng.addCategory("Electronics");
dbmng.addCategory("Clothes");
dbmng.addCategory("Cars");
dbmng.addCategory("Pets");
dbmng.addCategory("Sports");
dbmng.addCategory("Outdoor");
dbmng.addCategory("Furniture");
/* 상품 임시로 추가 */
dbmng.addItem('Classic Radio','Electronics',85000,1,'img1.jpg','An Old Classical Radio');
dbmng.addItem('Supermicro Server','Electronics',450000,1,'img3.jpg','Supermicro Server Computer');
dbmng.addItem('Red Necktie','Clothes',12000,1,'img11.jpg','A Simple Red Necktie');
dbmng.addItem('Office Chair','Furniture',125000,1,'img7.jpg','This is a chair whice usable in the office'); 

conlog.confin("Initializing database");

function parseWSData( data ){
    let lines = data.split("\n");
    let key = "";
    let value = "";
    let arr = [];
    lines.forEach((ln) => {
        key = ln.split("=")[0];
        value = ln.split("=")[1];
        arr[key] = value;
    });
    return arr;
}

conlog.coninfo('Starting HTTP Internal Server...');

const httpserver = http.createServer((req,res) => {
    if( req.method == 'GET' ){
        filemng.loadResource( res,req.url );
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('This page not found 404 error');
        res.end();
    }
}).listen( port );

conlog.confin('Starting HTTP Internal Server');

const webSocketServer = new ws.Server(
    {
        server: httpserver
    }
);

webSocketServer.on('connection',(ws,req) => {
    ws.on('message',(msg)=>{
        let data = parseWSData( msg.toString() );
        /* 인젝션 방지를 위한 입력 데이터 필터링( 정규식 ) */
        if( data.id ){
            if( data.id.search(/[!=<>?+-]/g) > -1 ){
                return;
            }
            if( data.id.search(/\b(union|select|from|where|or|and|null|is)\b/gi) > -1 ){
                return;
            }
        }
        try{
            let m = require('./server/actions/' + data.ac);
            m[ data.ac ]( ws,data );
        }catch(err){
            console.log(err);
        }
    });
});