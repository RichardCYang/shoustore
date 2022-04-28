
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
        websock.send('ac=getrecntcats');
    });
    websock.onReply((event) => {
        let items = JSON.parse(event.data);
        items.forEach((item) => {
            pushItemCard( item.rawthumbnail );
        });
    });
}

window.onload = () => {
    loadCategories();
}