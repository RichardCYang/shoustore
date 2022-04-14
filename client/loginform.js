
window.onload = () => {
    let loginBtn = document.getElementById('loginButton');
    loginBtn.onclick = () => {
        let nicknameView = document.getElementById('nicknameInput');
        let passwdView = document.getElementById('passwdInput');

        if( nicknameView.value == undefined || nicknameView.value == null || nicknameView.value == "" ){
            window.parent.document.showMessageBox( "잘못된 입력","아이디(닉네임)은 필수 입력사항 입니다!","error" );
            return;
        }
        if( passwdView.value == undefined || passwdView.value == null || passwdView.value == "" ){
            window.parent.document.showMessageBox( "잘못된 입력","비밀번호는 필수 입력사항 입니다!","error" );
            return;
        }

        let websock = new WebSocket('ws://localhost:8090');

        websock.onopen = (event) => {
            websock.send('ac=signin\n' + 
                         'id=' + nicknameView.value + '\n' +
                         'pw=' + sha256(passwdView.value) );
        };

        websock.onmessage = (event) => {
            if( event.data === "ERR_NOMEMBER" ){
                window.parent.document.showMessageBox( "등록되지 않은 사용자","등록된 사용자가 아닙니다!","info" );
                websock.close();
            }
        }
    }

    let registBtn = document.getElementById('regButton');
    registBtn.onclick = () => {
        let nicknameView = document.getElementById('nicknameInput');        
        let passwdView = document.getElementById('passwdInput');
        let phoneNoView = document.getElementById('phoneNoInput');
        
        if( nicknameView.value == undefined || nicknameView.value == null || nicknameView.value == "" ){
            alert("아이디(닉네임)은 필수 입력사항 입니다!");
            return;
        }
        if( passwdView.value == undefined || passwdView.value == null || passwdView.value == "" ){
            alert("비밀번호는 필수 입력사항 입니다!");
            return;
        }
        if( phoneNoView.value == undefined || phoneNoView.value == null || phoneNoView.value == "" ){
            alert("전화번호는 필수 입력사항 입니다!");
            return;
        }

        let websock = new WebSocket('ws://localhost:8090');

        websock.onopen = (event) => {
            websock.send('ac=signup\n' + 
                         'id=' + nicknameView.value + '\n' +
                         'pw=' + sha256(passwdView.value) + '\n' +
                         'phone=' + phoneNoView );
        }

        websock.onmessage = (event) => {
            if( event.data === "ERR_ALREADYREGISTMEMBER" ){
                alert("이미 등록된 사용자입니다!");
                websock.close();
            }
        }

    }
}