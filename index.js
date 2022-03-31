
const http = require('http');
const fs = require('fs');
const ws = require('ws');
const dbmng = require('./dbmanager');

const hostname = '127.0.0.1';
const port = 8090;

function loadResource( res,path ){
    console.log( path );
    try{
        let rawData;
        if( path == '/' ){
            path = '/index.html';
        }
        if( path.endsWith('.svg') ){
            res.writeHead(200,{'Content-Type':'image/svg+xml'});
        }
        rawData = fs.readFileSync('.' + path);
        res.end(rawData);
    }catch(err){
        console.log( err );
    }
}

dbmng.createTableNeeded();

const httpserver = http.createServer((req,res) => {
    if( req.method == 'GET' ){
        loadResource( res,req.url );
    }else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.write('This page not found 404 error');
        res.end();
    }
}).listen( port );

const webSocketServer = new ws.Server(
    {
        server: httpserver
    }
);

webSocketServer.on('connection',(ws,req) => {
    console.log('접속');
    ws.on('message',(msg)=>{
        if( msg.toString() === 'reqfavitem' ){
            let files = fs.readdirSync('./imgs');
            if( files ){
                for( let i = 0; i < files.length; i++ ){
                    let strbuff = fs.readFileSync('./imgs/' + files[i],'base64');
                    ws.send( strbuff );
                }
            }
        }
    });
});