
window.updateSession = (data) => {
    /*let menu        =   document.getElementById('userdiv'); 
    let nameText    =   document.getElementById('username_text');
    let menus       =   menu.children;
    if( menus.length < 4 ){
        return;
    }

    if( data.shoustore_username ){
        menus[0].style.visibility = 'hidden';
        menus[1].style.visibility = 'hidden';
        menus[2].style.display = '';
        menus[2].textContent = data.shoustore_username + '';
        nameText.textContent = data.shoustore_username + '';
    }else{
        menus[0].style.visibility = '';
        menus[1].style.visibility = '';
        menus[2].style.display = 'none';
        menus[1].onclick = onSignUp_clicked;
    }*/
}

window.startSessionTimer = (time) => {
    /*this.curSessionTime = time * 60;
    
    let timerDisplay = document.getElementById('sessiontimer_text'); 
    let min = 0;
    let sec = 0;

    this.sessionTimer = setInterval(() => {
        window.curSessionTime = window.curSessionTime - 1;
        min = Math.round( window.curSessionTime / 60 );
        sec = Math.round( window.curSessionTime % 60 );

        timerDisplay.textContent = 'Expired : ' + min + ':' + sec;

        if( window.curSessionTime == 0 ){
            /* 로그아웃 */
            //signout();
            /* 세션 타이머 종료 */
            //clearInterval(window.sessionTimer);
        //}
    //},1000);
}


window.onstorage = (event) => {
    if(!event.newValue){
        return;
    }
    if(event.key == 'shoustore_key'){
        localStorage.setItem('sessionStorage',JSON.stringify(sessionStorage));
        localStorage.removeItem('sessionStorage');  
    }else if(event.key == 'sessionStorage' && !sessionStorage.length){
        let data = JSON.parse(event.newValue);
        for(let key in data){
            sessionStorage.setItem(key,data[key]);
        }
    }
}

if( !sessionStorage.length ){
    localStorage.setItem('shoustore_key','TEMP_KEY');
    localStorage.removeItem('shoustore_key');
}

window.onload = function(){

    if( sessionStorage.shoustore_key == 'EXP_KEY' ){
        sessionStorage.clear();
    }

    if( sessionStorage.shoustore_expired ){
        window.startSessionTimer( parseInt( sessionStorage.shoustore_expired ) );
    }
    
    updateSession( sessionStorage );
}

function signout(){
    wsc_simplesend('ac=signout\n' + 'key=' + sessionStorage.getItem('shoustore_key'),(event) => {
        if( event.data == 'ERR_ALREADYLOGGEDOUT' ){
            document.showMessageBox( '로그아웃 알림','이미 로그아웃 되었습니다!','warning' );
            sessionStorage.clear();
            updateSession( sessionStorage );
            return;
        }
        if( event.data == 'DONE_DESTROYSESSION' ){
            /* 클라이언트 세션 정보 삭제 */
            sessionStorage.setItem('shoustore_key','EXP_KEY');
            document.showMessageBox( '로그아웃 알림','로그아웃 되었습니다!','info' ).then(() => {
                window.location.reload();
            });
        }
    });
}

function onSignOut_clicked(){
    signout();
}

function onUserBox_hovered(){
    let userbox =  document.getElementsByClassName('userbox');
    for(let i = 0; i < userbox.length; i++){
        userbox[i].style.display = 'block';
    }
}

function onSearchBox_entered( input ){
    if( checkNullOrEmpty( input ) ){
        return;
    }
    wsc_simplesend('ac=searchitem\n' + 'itemname=' + input,(event) => {
        window.location.href = './boardview.html?ac=searchlist';
        localStorage.setItem('boardview_searchitems',event.data);
    });
}