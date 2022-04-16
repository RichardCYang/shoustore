
/* document metatables */
document.BROWSER_UNKNOWN    = 0;
document.BROWSER_IE         = 1;
document.BROWSER_IE11       = 2
document.BROWSER_CHROME     = 4;
document.BROWSER_FIREFOX    = 8;
document.BROWSER_OPERA      = 16;

document.checkBrowser = function(){
    /* For IE10- */
    if( window.navigator.userAgent.indexOf("MSIE") > -1 ){
        return this.BROWSER_IE;
    }
    /* For IE11 */
    if( window.navigator.userAgent.indexOf("Trident") > -1 ){
        return this.BROWSER_IE11;
    }
    /* For Chrome */
    if( window.navigator.userAgent.indexOf("Chrome") > -1 ){
        return this.BROWSER_CHROME;
    }
    /* For Firefox */
    if( window.navigator.userAgent.indexOf("Firefox") > -1 ){
        return this.BROWSER_FIREFOX;
    }
    /* For Opera */
    if( window.navigator.userAgent.indexOf("Opera") > -1 ){
        return this.BROWSER_OPERA;
    }
    return this.BROWSER_UNKNOWN;
}

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

/* window metatables */
window.checkNullOrEmpty = (value) => {
    return value == undefined ? true : value == null ? true : value == "" ? true : false;
}