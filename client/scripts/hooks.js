
function clearContent(){
    var content = document.querySelector('main');
    var footer = document.querySelector('footer');
    if( content ){
        document.body.removeChild( content );
    }
    if( footer ){
        document.body.removeChild( footer );
    }
}

function toggleHeaderUserMenu( isShown ){
    let menu = document.querySelector('.usermenu_dropdown');
    if( !menu ) return;
    menu.style.display = isShown ? 'block' : 'none';
}

function hook_entered( data,input ){
    if( data == 'HOOK_ENTERED_SEARCHBOX' ){
        if( checkNullOrEmpty( input ) ){
            return;
        }
        wsc_simplesend('ac=searchitem\n' + 'itemname=' + input,(event) => {
            clearContent();
            window.getParam = './boardview.html?ac=searchlist';
            window.loadPage('body','./frags/board.frg');
            window.loadPage('body','./frags/footer.frg');
            if( BOARDVIEW ){
                BOARDVIEW.init();
            }
            localStorage.setItem('boardview_searchitems',event.data);
        });
    }
}

function hook_clicked( data ){
    if( data == 'HOOK_CLICKED_SIGNIN' ){
        clearContent();
        window.loadPage('body','./frags/login.frg');
        window.loadPage('body','./frags/footer.frg');
        hook_clicked('HOOK_CLICKED_USERMENU');
        return;
    }

    if( data == 'HOOK_CLICKED_SIGNUP' ){
        clearContent();
        window.loadPage('body','./frags/register.frg');
        window.loadPage('body','./frags/footer.frg');
        hook_clicked('HOOK_CLICKED_USERMENU');
        return;
    }

    if( data == 'HOOK_CLICKED_GOHOME' ){
        clearContent();
        window.loadPage('body','./frags/index.frg');
        window.loadPage('body','./frags/footer.frg');
        
        if( init_main ){
            init_main();
        }
        return;
    }

    if( data == 'HOOK_CLICKED_USERMENU' ){
        this.isShown = !this.isShown;
        toggleHeaderUserMenu( this.isShown );
        return;
    }

    if( data == 'HOOK_CLICKED_REGISTER' ){
        let nickname = document.querySelector('.nicknameInput');
        let passwd = document.querySelector('.passwdInput');
        let confirmpw = document.querySelector('.confirmPasswdInput');
        let phoneno = document.querySelector('.phoneNoInput');

        if( !nickname ) return;
        if( !passwd ) return;
        if( !confirmpw ) return;
        if( !phoneno ) return;

        window.register( nickname.value, passwd.value, confirmpw.value, phoneno.value );
        return;
    }
}