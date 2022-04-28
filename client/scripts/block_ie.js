
window.onload = function(){
    /* For IE10- */
    if( window.navigator.userAgent.indexOf("MSIE") > -1 ){
        alert('IE는 지원하지 않아요!')
        document.body.textContent = '';
    }
    /* For IE11 */
    if( window.navigator.userAgent.indexOf("Trident") > -1 ){
        alert('IE는 지원하지 않아요!')
        document.body.textContent = '';
    }
}