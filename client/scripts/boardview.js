
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
                /* 기존 웹소켓 연결 종료 */
                websock.close();
                /* 아이템 개수 만큼 리스트 생성 */
                if( data.length > 0 ){
                    console.log( data.length );
                    /* 아이템 정보 리스트 출력 */
                    let container = document.createElementWithAttrib('div',{'class':'itemlinecontainer'});
                    data.forEach((item,idx) => {
                        let line = document.createElementWithAttrib('div',{'class':'itemline'});
                        let thumbView = document.createElementWithAttrib('img',{'class':'thumbview'});
                        let infoBox = document.createElementWithAttrib('div',{'class':'infobox_item itemsubbox'});
                        let nameText = document.createElementWithAttrib('p',{'class':'itemtext_name'});
                        let descText = document.createElementWithAttrib('p',{'class':'itemtext_desc'});

                        nameText.innerHTML = item.name + '';
                        descText.innerHTML = item.itemdesc + '';
                        
                        /* 이미지 데이터를 얻어오기 위해 웹소켓 재호출 */
                        if( item.thumbnail ){
                            let thumbsock = new WebSocketClient;
                            thumbsock.open(); 
                            thumbsock.onOpen((event) => {
                                thumbsock.send('ac=getitemthumb\nthumbname=' + item.thumbnail);
                            });
                            thumbsock.onReply((event) => {
                                if( event.data === 'ERR_THUMBGENERAL' ){
                                    thumbsock.close();
                                    return;
                                }

                                thumbView.src = 'data:image/jpg;base64,' +  event.data;
                            })
                        }
                        infoBox.appendChild( nameText );
                        infoBox.appendChild( descText );
                        line.appendChild( thumbView );
                        line.appendChild( infoBox );
                        container.appendChild( line );
                        document.body.appendChild( container );
                    });
                }else{
                    /* 에러 메세지( Opps ) 출력 */
                    pageToOpps();
                }
            })
        }
    }
}