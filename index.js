
const http = require('http');
const fs = require('fs');
const ws = require('ws');
const dbmng = require('./server/dbmanager');

const hostname = '127.0.0.1';
const port = 8090;

let clientFiles = [];

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

clientFiles = readdirSyncRecursive('./client');
clientFiles = removeRootNodeDir(clientFiles,'client');

function getRealmPath( path ){
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
        console.log( msg.toString() );
        if( msg.toString() === 'reqfavitem' ){
            let files = fs.readdirSync('./server/imgs');
            if( files ){
                for( let i = 0; i < files.length; i++ ){
                    let strbuff = fs.readFileSync('./server/imgs/' + files[i],'base64');
                    ws.send( strbuff );
                }
            }
        }
    });
});