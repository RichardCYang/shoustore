
function pageToOpps(){
    /* 기존 화면 전부 지움 */
    document.clearBody();
    /* Opps 를 띄울 DIV 동적 생성 */
    let oopsDiv = document.createElementWithAttrib('div',{'class':'oopsimg'});
    document.body.appendChild( oopsDiv );
}
window.onload = () => {
    let params = parseGetParams( window.location.href );
    if( params ){
        if( params.cat ){
            let websock = new WebSocketClient;
            websock.open();
            websock.onOpen((event) => {
                websock.send('ac=getcatitems\ncat=' + params.cat);
            });
            websock.onReply((event) => {
                let data = JSON.parse( event.data );
                if( data.length > 0 ){
                    /* 아이템 정보 리스트 출력 */
                }else{
                    /* 에러 메세지( Opps ) 출력 */
                    pageToOpps();
                }
                websock.close();
            })
        }
    }
}