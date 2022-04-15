
window.onstorage = (event) => {
    let usermenu_1 = document.getElementById('userdiv_menu1');
    let usermenu_2 = document.getElementById('userdiv_menu2');

    if( event.storageArea.shoustore_key ){
        usermenu_2.innerHTML = event.storageArea.shoustore_username;
        usermenu_1.innerHTML = 'Sign out';
        usermenu_1.onclick = onSignOut_clicked;
    }else{
        usermenu_1.innerHTML = 'Sign in';
        usermenu_1.onclick = onSignIn_clicked;
    }
}

window.onload = function(){
    if( document.checkBrowser() == document.BROWSER_IE || document.checkBrowser() == document.BROWSER_IE11 ){
        alert("IE는 지원하지 않아요...");
        document.body.innerHTML = "";
        return;
    }
    window.mainPopup = new Popup;
}

function onSignOut_clicked(){
    let websock = new WebSocket("ws://localhost:8090");
    websock.onopen = (event) => {
        websock.send('ac=signout\n' + 'key=' + sessionStorage.getItem('shoustore_key'));
    };
    websock.onmessage = (event) => {
        if( event.data == 'DONE_DESTROYSESSION' ){
            /* 클라이언트 세션 정보 삭제 */
            sessionStorage.clear();
            window.location.reload();
            websock.close();
        }
    }
}

function onSignIn_clicked(){
    window.mainPopup.setUrl('./loginform.html');
    window.mainPopup.makePopup();
}

function onSignUp_clicked(){
    window.mainPopup.setUrl('./regform.html');
    window.mainPopup.makePopup();
}