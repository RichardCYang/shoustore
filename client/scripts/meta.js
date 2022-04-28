
document.addStyleSheet = ( link ) => {
    let linkTag = document.createElement('link');
    linkTag.setAttribute('rel','stylesheet');
    linkTag.setAttribute('href',link);
    linkTag.setAttribute('type','text/css');
    document.head.appendChild( linkTag );
}

document.showMessageBox = ( title,content,icon ) => {
    return swal( title,content,icon );
}

document.setOnClickByID = ( id,callback ) => {
    let element = document.getElementById( id );
    element.onclick = callback;
}

document.createElementWithAttrib = ( elementName,atts ) => {
    let keys = Object.keys( atts );
    let keyCnt = keys.length;

    let element = document.createElement( elementName );

    for( let i = 0; i < keyCnt; i++ ){
        element.setAttribute( keys[i],atts[ keys[i] ] );
    }

    return element;
}

document.clearBody = () => {
    document.body.textContent = '';
}

/* window metatables */
window.checkNullOrEmpty = (value) => {
    return value == undefined ? true : value == null ? true : value == "" ? true : false;
}

window.parseGetParams = (url) => {
    if( checkNullOrEmpty( url ) ){
        return;
    }

    let tokenRegex = url.split(/[\?&](.*?)=(.*?)&*/gi);
    let token = [];
    
    tokenRegex.forEach((block,idx) => {
        if( idx == 0 ){
            return;
        }
        if( block !== '' ){
            token.push( block );
        }
    });

    tokenRegex = [];

    token.forEach((item,idx) => {
        if( idx % 2 == 0 ){
            if( token[idx + 1] ){
                tokenRegex[item] = token[idx + 1];
            }
        }
    });

    return tokenRegex;
}