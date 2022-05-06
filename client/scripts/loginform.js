
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

        wsc_simplesend('ac=signin\n' + 'id=' + nicknameView.value + '\n' + 'pw=' + sha256(passwdView.value),(event) => {
            if( event.data === 'ERR_NOMEMBER' ){
                window.parent.document.showMessageBox( '등록되지 않은 사용자','등록된 사용자가 아닙니다!','info' );
                return;
            }
            if( event.data === 'ERR_MISMATCHPASSWD' ){
                window.parent.document.showMessageBox( '비밀번호 오류','비밀번호가 일치하지 않습니다!','error');
                return;
            }
            /* 로그인이 성공하였을 때, 새로 발급된 세션 값을 받아옴 */
            if( event.data.indexOf("session?") > -1 ){
                /* 로그인 성공 시, 성공 메세지 띄우기 */
                window.parent.document.showMessageBox( '로그인 알림','로그인 성공!','info' );
                /* 세션 정보를 얻어왔을 때 */
                /* 세션 값에서 만료시간과 고윳값을 파싱 */
                let parseData = event.data.split("?")[1];
                parseData = parseData.split("&");
                
                let id = parseData[0].split(/id=(.*?)/g)[2];
                let expired = parseData[1].split(/expired=(.*?)/g)[2];
                let username = parseData[2].split(/username=(.*?)/g)[2];

                sessionStorage.setItem('shoustore_key',id);
                sessionStorage.setItem('shoustore_expired',expired);
                sessionStorage.setItem('shoustore_username',username);

                window.parent.updateSession( sessionStorage );

                window.parent.reload();
                
                /* 로그인 팝업창 닫기 */
                window.parent.document.getElementsByClassName('popupClose')[0].click();
            }
        });
    });

    document.setOnClickByID('regButton',() => {
        /* 회원가입 버튼을 누르면 기존 로그인 팝업창에서 회원가입 팝업창으로 리다이렉트 */
        window.parent.mainPopup.changeLink('./regform.html');
    });

}