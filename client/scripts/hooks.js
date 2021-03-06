
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

function hook_changed( data,target ){
    if( data == 'HOOK_CHANGED_THUMBUPLOAD' ){
        if( target ){
            let files = target.files;
            if( FileReader && files ){
                let imgreader = new FileReader;
                imgreader.onload = () => {
                    let thumbView = document.querySelector('.thumbnailView');
                    if( thumbView ){
                        thumbView.src = imgreader.result;
                    }
                }
                imgreader.readAsDataURL(files[0]);
            }
        }
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

    if( data == 'HOOK_CLICKED_GOTOREG' ){
        clearContent();
        window.loadPage('body','./frags/register.frg');
        window.loadPage('body','./frags/footer.frg');
        return;
    }

    if( data == 'HOOK_CLICKED_GOTOREGITEM' ){
        if( !sessionStorage.shoustore_key ){
            showMessageBox('????????? ??????','???????????? ????????? ????????? ?????????!','info');
            return;
        }
        clearContent();
        window.loadPage('body','./frags/regitem.frg');
        window.loadPage('body','./frags/footer.frg');
        if( REGITEMVIEW ){
            REGITEMVIEW.init();
        }
        return;
    }

    if( data == 'HOOK_CLICKED_USERMENU' ){
        this.isShown = !this.isShown;
        toggleHeaderUserMenu( this.isShown );
        return;
    }

    if( data == 'HOOK_CLICKED_LOGIN' ){
        let nickname = document.querySelector('.nicknameInput');
        let passwd = document.querySelector('.passwdInput');

        if( !nickname ) return;
        if( !passwd ) return;

        window.login( nickname.value, passwd.value );
        return;
    }

    if( data == 'HOOK_CLICKED_REGITEM' ){
        let name = document.querySelector('.nicknameInput');
        let price = document.querySelector('.priceInput');
        let stockcnt = document.querySelector('.countInput');
        let category_name = document.querySelector('.catsInput');
        let itemdesc = document.querySelector('.itemdescView');
        let thumbnail = document.querySelector('.thumbnailView');
        let thumbnailFile = document.querySelector('.thumbnailFile');

        if( !name ) return;
        if( !price ) return;
        if( !stockcnt ) return;
        if( !category_name ) return;
        if( !itemdesc ) return;
        if( !thumbnail ) return;
        if( !thumbnailFile ) return;
        if( !thumbnailFile.files ) return;

        window.registerItem( name.value, price.value, stockcnt.value, category_name.value, itemdesc.value, thumbnail.src, thumbnailFile.files[0].name );
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