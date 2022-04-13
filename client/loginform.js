
window.onload = function(){
    let loginBtn = document.getElementById('loginButton');
    loginBtn.onclick = function(){
        let nicknameView = document.getElementById('nicknameInput');
        let passwdView = document.getElementById('passwdInput');

        if( nicknameView.value == undefined || nicknameView.value == null || nicknameView.value == "" ){
            alert("아이디(닉네임)은 필수 입력사항 입니다!");
            return;
        }
        if( passwdView.value == undefined || passwdView.value == null || passwdView.value == "" ){
            alert("비밀번호는 필수 입력사항 입니다!");
            return;
        }

        let websock = new WebSocket('ws://localhost:8090');

        websock.onopen = function(event){
            websock.send('ac=signin\n' + 
                         'id=' + nicknameView.value + '\n' +
                         'pw=' + sha256(passwdView.value) + ' \n' );
        };
    }
}