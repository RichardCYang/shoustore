
function loadFavorItems(){
    let itemList = document.getElementsByClassName('itemview');
    let websock = new WebSocket("ws://localhost:8090");
    let i = 0;

    websock.onmessage = (event) => {
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

    websock.onopen = (event) => {
        websock.send('reqfavitem');
    };
}

window.onload = function(){
    loadFavorItems();
}