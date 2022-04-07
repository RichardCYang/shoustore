
document.addStyleSheet = function( link ){
    let linkTag = document.createElement('link');
    linkTag.setAttribute('rel','stylesheet');
    linkTag.setAttribute('href',link);
    linkTag.setAttribute('type','text/css');
    document.head.appendChild( linkTag );
}

document.createElementWithAttrib = function( elementName,atts ){
    let keys = Object.keys( atts );
    let keyCnt = keys.length;

    let element = document.createElement( elementName );

    for( let i = 0; i < keyCnt; i++ ){
        element.setAttribute( keys[i],atts[ keys[i] ] );
    }

    return element;
}