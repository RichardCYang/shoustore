
window.updateSession = (data) => {
    let menu = document.getElementById('userdiv'); 
    let menus = menu.children;
    if( menus.length < 4 ){
        return;
    }

    if( data.shoustore_username ){
        menus[0].style.visibility = 'hidden';
        menus[1].style.visibility = 'hidden';
        menus[2].style.display = '';
        menus[2].innerHTML = data.shoustore_username + '';
    }else{
        menus[0].style.visibility = '';
        menus[1].style.visibility = '';
        menus[2].style.display = 'none';
        menus[1].onclick = onSignUp_clicked;
    }
}

window.startSessionTimer = (time) => {
    this.curSessionTime = time * 60;
    
    let userdiv = document.getElementById('userdiv'); 
    let min = 0;
    let sec = 0;

    userdiv.appendChild( timerDisplay );

    this.sessionTimer = setInterval(() => {
        window.curSessionTime = window.curSessionTime - 1;
        min = Math.round( window.curSessionTime / 60 );
        sec = Math.round( window.curSessionTime % 60 );

        if( window.curSessionTime == 0 ){
            /* 로그아웃 */
            signout();
            /* 세션 타이머 종료 */
            clearInterval(window.sessionTimer);
        }
    },1000);
}

function loadCategories(){
    let catroot = document.getElementById('categories');
    let main = document.getElementById('mainContainer');
    let websock = new WebSocketClient;
    websock.open();
    websock.onOpen((event) => {
        websock.send('ac=getcats');
    });
    websock.onReply((event) => {
        let cats = JSON.parse( event.data );
        cats.forEach( row => {
            let btn = document.createElementWithAttrib('button',{'class':'unselectable'});
            btn.innerHTML = row.category_name + '';
            btn.onclick = () => {
                main.src = './boardview.html?cat=' + row.category_name;
            }
            catroot.appendChild(btn);
        });
        websock.close();
    });
}

window.onload = function(){
    if( document.checkBrowser() == document.BROWSER_IE || document.checkBrowser() == document.BROWSER_IE11 ){
        alert("IE는 지원하지 않아요...");
        document.body.innerHTML = "";
        return;
    }
    window.mainPopup = new Popup;

    updateSession( localStorage );
    loadCategories();
}

function signout(){
    let websock = new WebSocket("ws://localhost:8090");
    websock.onopen = (event) => {
        websock.send('ac=signout\n' + 'key=' + localStorage.getItem('shoustore_key'));
    };
    websock.onmessage = (event) => {
        if( event.data == 'DONE_DESTROYSESSION' ){
            /* 클라이언트 세션 정보 삭제 */
            localStorage.clear();
            document.showMessageBox( '로그아웃 알림','로그아웃 되었습니다!','info' ).then(() => {
                window.location.reload();
            });
            websock.close();
        }
    }
}

function onSignOut_clicked(){
    signout();
}

function onSignIn_clicked(){
    window.mainPopup.setUrl('./loginform.html');
    window.mainPopup.makePopup();
}

function onSignUp_clicked(){
    window.mainPopup.setUrl('./regform.html');
    window.mainPopup.makePopup();
}

function onGoHome_clicked(){
    let main = document.getElementById('mainContainer');
    main.src = './mainview.html';
}

function onUserBox_hovered(){
    let userbox =  document.getElementsByClassName('userbox');
    for(let i = 0; i < userbox.length; i++){
        userbox[i].style.display = 'block';
    }
}