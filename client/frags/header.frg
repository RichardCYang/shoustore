<header>
    <div class="header_wrapper">
        <h1 class="unselectable clickable" onclick="hook_clicked('HOOK_CLICKED_GOHOME')">Share Houstore</h1>
        <div class="searchdiv">
            <input type="text" onkeydown="if( arguments[0].keyCode === 13 ){ onSearchBox_entered( this.value ); this.value = ''; }"/>
            <button></button>
        </div>
        <button class="usermenu clickable" onclick="hook_clicked('HOOK_CLICKED_USERMENU')"></button>
        <div class="usermenu_dropdown">
            <button onclick="hook_clicked('HOOK_CLICKED_SIGNIN')">로그인</button>
            <button onclick="hook_clicked('HOOK_CLICKED_SIGNUP')">회원가입</button>
        </div>
    </div>
</header>