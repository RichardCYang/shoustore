
document.addStyleSheet('./main.css');

function loadFavorItems(){
    let itemList = document.getElementsByClassName('itemview');
    let websock = new WebSocket("ws://localhost:8090");
    let i = 0;

    websock.onmessage = function(event){
        if( i > 11 ){
            websock.close();
        }
        if( itemList ){
            if( itemList[i].children ){
                itemList[i].children[0].src = "data:image/png;base64, " + event.data.toString();
                i = i + 1;
            }
        }
    };

    websock.onopen = function(event){
        websock.send('reqfavitem');
    };
}

window.onload = function(){
    loadFavorItems();
}

function onSignIn_clicked(){
    let popup = new Popup;
    popup.makePopup();
}