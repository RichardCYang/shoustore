
window.onload = () => {
    document.setOnClickByID('loginButton',() => {
        let nicknameView = document.getElementById('nicknameInput');
        let passwdView = document.getElementById('passwdInput');

        if( checkNullOrEmpty( nicknameView.value ) ){
            window.parent.document.showMessageBox( "잘못된 입력","아이디(닉네임)은 필수 입력사항 입니다!","error" );
            return;
        }
        if( checkNullOrEmpty( passwdView.value ) ){
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
    });

    document.setOnClickByID('regButton',() => {
        /* 회원가입 버튼을 누르면 기존 로그인 팝업창에서 회원가입 팝업창으로 리다이렉트 */
        window.parent.mainPopup.changeLink('./regform.html');
    });

    /*let regBtn = document.getElementById('regButton');
    regBtn.onclick = () => {
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

    }*/
}