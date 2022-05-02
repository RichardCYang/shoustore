
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
    wsc_simplesend('ac=getrecntcats',(event) => {
        let items = JSON.parse(event.data);
        items.forEach((item) => {
            pushItemCard( item.rawthumbnail );
        });
    });
}

window.onload = () => {
    loadCategories();
}

function onRegItem_clicked(){
    if( !sessionStorage.shoustore_key ){
        window.parent.document.showMessageBox('로그인 안내','로그인이 필요한 서비스 입니다!','info');
        return;
    }
    
    window.parent.mainView.src = './regitemview.html';
}