
window.onload = () => {
    document.setOnClickByID('regButton',() => {
        let nicknameView =          document.getElementById('nicknameInput');        
        let passwdView =            document.getElementById('passwdInput');
        let confirmPasswdView =     document.getElementById('confirmPasswdInput');
        let phoneNoView =           document.getElementById('phoneNoInput');
        
        if( checkNullOrEmpty( nicknameView.value ) ){
            window.parent.document.showMessageBox( '잘못된 입력','아이디(닉네임)은 필수 입력사항 입니다!','error' );
            return;
        }
        if( checkNullOrEmpty( passwdView.value ) ){
            window.parent.document.showMessageBox( '잘못된 입력','비밀번호는 필수 입력사항 입니다!','error' );
            return;
        }
        if( checkNullOrEmpty( confirmPasswdView.value ) ){
            window.parent.document.showMessageBox( '잘못된 입력','비밀번호 재확인은 필수 입력사항 입니다!','error' );
            return;
        }
        if( checkNullOrEmpty( phoneNoView.value ) ){
            window.parent.document.showMessageBox( '잘못된 입력','전화번호는 필수 입력사항 입니다!','error' ); 
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
        /* 전화번호에 '-' 또는 '+' 문자가 포함되어있는지 확인 */
        /* 숫자형식 외의 서식은 모두 예외 처리 */
        if( phoneNoView.value.search(/[\D]/g) > -1 ){
            window.parent.document.showMessageBox( '잘못된 입력','전화번호에는 숫자형식만 입력 가능합니다!','error' );
            return;
        }
        /* 비밀번호 길이가 최소 기준(8자리)를 충족하는지 검사 */
        if( passwdView.value.length < 8 ){
            window.parent.document.showMessageBox( '보안 경고','비밀번호는 최소 8자리 이상 되어야 합니다!','warning' );
            return;
        }
        /* 연속된 비밀번호가 3자리 이상 존재하는지 검사 */
        for(let i = 0; i < passwdView.value.length; i++){
            if( i > 1 ){
                if( passwdView.value.charCodeAt(i - 1) === (passwdView.value.charCodeAt(i) - 1) ){
                    if( passwdView.value.charCodeAt(i - 2) === (passwdView.value.charCodeAt(i - 1) - 1) ){
                        window.parent.document.showMessageBox( '보안 경고','비밀번호에 3자리 이상 연속된 문자가 포함되어있습니다!','warning' );
                        return;
                    }
                }
                if( passwdView.value.charCodeAt(i - 1) === passwdView.value.charCodeAt(i) ){
                    if( passwdView.value.charCodeAt(i - 2) === passwdView.value.charCodeAt(i - 1) ){
                        window.parent.document.showMessageBox( '보안 경고','비밀번호에 3자리 이상 동일한 문자가 포함되어있습니다!','warning' );
                        return;
                    }
                }
            }
        }
        
        /* 비밀번호와 비밀번호 재확인이 일치하는지 검사 */
        if( passwdView.value !== confirmPasswdView.value ){
            window.parent.document.showMessageBox( '잘못된 입력','비밀번호가 일치하지 않습니다!','error' );
            return;
        }
    
        let websock = new WebSocket('ws://localhost:8090');
    
        websock.onopen = (event) => {
            websock.send('ac=signup\n' + 
                            'id=' + nicknameView.value + '\n' +
                            'pw=' + sha256(passwdView.value) + '\n' +
                            'phone=' + phoneNoView.value );
        }
    
        websock.onmessage = (event) => {
            if( event.data === "ERR_ALREADYREGMEMBER" ){
                window.parent.document.showMessageBox( '회원가입 실패','이미 존재하는 아이디 입니다!','error' );
                websock.close();
                return;
            }
            
            if( event.data === "DONE_REGMEMBER" ){
                window.parent.document.showMessageBox( '회원가입 성공','회원가입이 성공적으로 완료되었습니다!','info' );
                websock.close();
                return;
            }
        }
    })
}