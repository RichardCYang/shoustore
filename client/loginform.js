
window.onload = () => {
    document.setOnClickByID('loginButton',() => {
        let nicknameView = document.getElementById('nicknameInput');
        let passwdView = document.getElementById('passwdInput');

        if( checkNullOrEmpty( nicknameView.value ) ){
            window.parent.document.showMessageBox( '잘못된 입력','아이디(닉네임)은 필수 입력사항 입니다!','error' );
            return;
        }
        if( checkNullOrEmpty( passwdView.value ) ){
            window.parent.document.showMessageBox( '잘못된 입력','비밀번호는 필수 입력사항 입니다!','error' );
            return;
        }
        if( nicknameView.value.search(/[!=<>?+-]/g) > -1 ){
            window.parent.document.showMessageBox( '보안 경고','아이디에 적절하지 않은 특수문자가 포함되었습니다!','warning' );
            nicknameView.value = '';
            return;
        }
        if( nicknameView.value.search(/\b(union|select|from|where|or|and|null|is)\b/gi) > -1 ){
            window.parent.document.showMessageBox( '보안 경고','아이디에 적절하지 않은 키워드가 포함되었습니다!','warning' );
            nicknameView.value = '';
            return;
        }

        let websock = new WebSocket('ws://localhost:8090');

        websock.onopen = (event) => {
            websock.send('ac=signin\n' + 
                         'id=' + nicknameView.value + '\n' +
                         'pw=' + sha256(passwdView.value) );
        };

        websock.onmessage = (event) => {
            if( event.data === 'ERR_NOMEMBER' ){
                window.parent.document.showMessageBox( '등록되지 않은 사용자','등록된 사용자가 아닙니다!','info' );
                websock.close();
                return;
            }
            if( event.data === 'OK_LOGIN' ){
                window.parent.document.showMessageBox( '로그인 알림','로그인 성공!','info' );
                return;
            }
        }
    });

    document.setOnClickByID('regButton',() => {
        /* 회원가입 버튼을 누르면 기존 로그인 팝업창에서 회원가입 팝업창으로 리다이렉트 */
        window.parent.mainPopup.changeLink('./regform.html');
    });

}