
const http = require('http');
const fs = require('fs');
const ws = require('ws');
const dbmng = require('./server/dbmanager');

const hostname = '127.0.0.1';
const port = 8090;

dbmng.createTableNeeded();

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

function removeRootNodeDir( filelist,rootdir ){
    let newArr = [];
    for( let i = 0; i < filelist.length; i++ ){
        let pos = filelist[i].indexOf( rootdir );
        newArr.push( filelist[i].substr( pos + rootdir.length ) );
    }
    return newArr;
}

function readdirSyncRecursive( path ){
    let filesArr = [];
    try{
        let files = fs.readdirSync( path );
        for(let i = 0; i < files.length; i++){
            let lstat = fs.lstatSync( path + '/' + files[i]);
            if( lstat.isDirectory() ){
                let subfiles = readdirSyncRecursive( path + '/' + files[i] );
                filesArr = filesArr.concat( subfiles );
            }else{
                filesArr.push( path + '/' + files[i] );
            }
        }
    }catch(err){
        console.log(err);
    }
    return filesArr;
}

function getRealmPath( path ){
    let clientFiles = [];
    clientFiles = readdirSyncRecursive('./client');
    clientFiles = removeRootNodeDir(clientFiles,'client');

    if( clientFiles.includes(path) ){
        return './client';
    }else{
        return './server';
    }
}

function loadResource( res,path ){
    if( path == '/' ){
        path = '/index.html';
    }  
    try{
        let rawData;
        if( path.endsWith('.svg') ){
            res.writeHead(200,{'Content-Type':'image/svg+xml'});
        }
        if( path.endsWith('.css') ){
            res.writeHead(200,{'Content-Type':'text/css'});
        }
        rawData = fs.readFileSync(getRealmPath( path ) + path);
        res.end(rawData);
    }catch(err){
        console.log( err );
    }
}

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
        if( data.ac === 'signin' ){
            dbmng.findMemberByID( data.id ).then((rows) => {
                if( rows.length == 0 ){
                    ws.send('ERR_NOMEMBER');
                }else{
                    ws.send('OK_LOGIN');
                }
            }).catch((err) => {
                console.log(err);
            })
        }

        if( data.ac === 'signup' ){
            dbmng.findMemberByID( data.id, data.phone ).then((rows) => {
                /* 해당 유저가 이미 가입되어 있다면 */
                rows.forEach((row) => {
                    if( row.nickname === data.id  ){
                        ws.send("ERR_ALREADYREGMEMBER");
                        return;
                    }
                })
                /* 신규 유저라면 새로운 튜플을 데이터베이스에 추가 */
                dbmng.regMember( data.id,data.pw,data.phone,(err) => {
                    if( err ){
                        console.log( err );
                        return;
                    }
                    ws.send('DONE_REGMEMBER');
                });
            }).catch((err) => {
                console.log(err);
            });
        }
    });
});