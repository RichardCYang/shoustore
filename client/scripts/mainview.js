
function genCard( imgcode ){
    let card;
    let thumbnail;
    card = document.createElementWithAttrib('div',{'class':'itemview'});
    thumbnail = document.createElement('img');

    if( imgcode ){
        thumbnail.src = 'data:image/jpg;base64,' + imgcode;
    }
    
    card.appendChild(thumbnail);
    return card;
}

function pushItemCard( imgcode ){
    let cards = document.getElementsByClassName('itemcontainer')[0];
    let card = genCard(imgcode);
    cards.appendChild(card);
}

function paddingItemCard( len ){
    let cards = document.getElementsByClassName('itemcontainer')[0];
    let diff = 10 - len;
    let emptyCard;

    for(let i = 0; i < diff; i++){
        emptyCard = genCard();
        cards.appendChild(emptyCard);
    }
}

function loadCategories(){
    wsc_simplesend('ac=getrecntcats',(event) => {
        let items = JSON.parse(event.data);
        items.forEach((item) => {
            pushItemCard( item.rawthumbnail );
        });
        paddingItemCard( items.length );
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