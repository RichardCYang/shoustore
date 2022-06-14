
const fs = require('fs');
const SERVERPATH_IMAGES = './server/imgs/';
 
exports.loadImage = (imgname) => {
    let imgdata = fs.readFileSync( SERVERPATH_IMAGES + imgname,{encoding:'base64'} );
    return imgdata;
}

function removeRootNodeDir(filelist,rootdir){
    let newArr = [];
    for( let i = 0; i < filelist.length; i++ ){
        let pos = filelist[i].indexOf( rootdir );
        newArr.push( filelist[i].substr( pos + rootdir.length ) );
    }
    return newArr;
}

function readdirSyncRecursive(path){
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

function getRealmPath(path){
    let clientFiles = [];
    clientFiles = readdirSyncRecursive('./client');
    clientFiles = removeRootNodeDir(clientFiles,'client');

    if( clientFiles.includes(path) ){
        return './client';
    }else{
        return './server';
    }
}

exports.getBase64Image = (src, callback, outputFormat) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        let dataURL;
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };

    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }

};

exports.loadResource = (res,path) => {
    if( path == '/' ){
        path = '/index.html';
    }
    if( path.indexOf("?") > -1 ){
        path = path.split("?")[0];
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