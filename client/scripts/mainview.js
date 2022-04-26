
function pushItemCard( imgcode ){
    let cards = document.getElementsByClassName('itemview');
    let i = 0;
    while( i < cards.length ){
        if( cards[i].children[0].src === '' ){
            cards[i].children[0].src = 'data:image/jpg;base64,' + imgcode;
            return;
        }
        i++;
    }
}
function loadCategories(){
    let websock = new WebSocketClient;
    websock.open();
    websock.onOpen((event) => {
        websock.send('ac=getcats');
    });
    websock.onReply((event) => {
        websock.close();

        let cats = JSON.parse( event.data );
        websock = new WebSocketClient;
        websock.callCnt = 0;
        websock.open();
        websock.onOpen((evnt) => {
            cats.forEach( row => {
                websock.send('ac=getcatitems\ncat=' + row.category_name);
            });
        });
        websock.onReply((evnt) => {
            websock.callCnt = websock.callCnt + 1;

            if( websock.callCnt === cats.length ){
                websock.callCnt = 0;
                websock.close();
                return;
            }

            let items = JSON.parse( evnt.data );
            if( items.length == 0 ){
                return;
            }

            /* 이미지 데이터를 얻어오기 위해 웹소켓 재호출 */
            if( items[0].thumbnail ){
                let thumbsock = new WebSocketClient;
                thumbsock.open(); 
                thumbsock.onOpen((evt) => {
                    thumbsock.send('ac=getitemthumb\nthumbname=' + items[0].thumbnail);
                });
                thumbsock.onReply((evt) => {
                    if( event.data === 'ERR_THUMBGENERAL' ){
                        thumbsock.close();
                        return;
                    }

                    pushItemCard( evt.data );
                })
            }
        });
    });
}

window.onload = () => {
    loadCategories();
}