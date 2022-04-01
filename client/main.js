
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

function onSignIn_clicked(){
    let popupBack = document.createElement('div');
    let loginPopup = document.createElement('div');
    let embedPage = document.createElement('embed');
    popupBack.setAttribute('class','popupBack');
    loginPopup.setAttribute('class','popupWindow');
    
    embedPage.src = './loginform.html';

    loginPopup.appendChild( embedPage );
    popupBack.appendChild( loginPopup );
    document.body.appendChild( popupBack );
}