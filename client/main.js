
document.addStyleSheet('./main.css');

function loadFavorItems(){
    var itemList = document.getElementsByClassName('itemview');
    var websock = new WebSocket("ws://localhost:8090");
    var i = 0;

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
    document.checkBrowser();
    loadFavorItems();
}

function onSignIn_clicked(){
    var popup = new Popup;
    popup.makePopup();
}