
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
    if( document.checkBrowser() == document.BROWSER_IE || document.checkBrowser() == document.BROWSER_IE11 ){
        alert("IE는 지원하지 않아요...");
        document.body.innerHTML = "";
        return;
    }
    loadFavorItems();
    window.mainPopup = new Popup;
}

function onSignIn_clicked(){
    window.mainPopup.setUrl('./loginform.html');
    window.mainPopup.makePopup();
}

function onSignUp_clicked(){
    window.mainPopup.setUrl('./regform.html');
    window.mainPopup.makePopup();
}