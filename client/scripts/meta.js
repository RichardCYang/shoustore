
document.addStyleSheet = ( link ) => {
    let linkTag = document.createElement('link');
    linkTag.setAttribute('rel','stylesheet');
    linkTag.setAttribute('href',link);
    linkTag.setAttribute('type','text/css');
    document.head.appendChild( linkTag );
}

document.setOnClickByID = ( id,callback ) => {
    let element = document.getElementById( id );
    element.onclick = callback;
}

document.createElementWithAttrib = ( elementName,atts ) => {
    let keys = Object.keys( atts );
    let keyCnt = keys.length;

    let element = document.createElement( elementName );

    for( let i = 0; i < keyCnt; i++ ){
        element.setAttribute( keys[i],atts[ keys[i] ] );
    }

    return element;
}

document.clearBody = () => {
    document.body.textContent = '';
}

/* window metatables */
window.showMessageBox = ( title,content,icon ) => {
    return swal( title,content,icon );
}

window.checkNullOrEmpty = (value) => {
    return value == undefined ? true : value == null ? true : value == "" ? true : false;
}

window.parseGetParams = (url) => {
    if( checkNullOrEmpty( url ) ){
        return;
    }

    let tokenRegex = url.split(/[\?&](.*?)=(.*?)&*/gi);
    let token = [];
    
    tokenRegex.forEach((block,idx) => {
        if( idx == 0 ){
            return;
        }
        if( block !== '' ){
            token.push( block );
        }
    });

    tokenRegex = [];

    token.forEach((item,idx) => {
        if( idx % 2 == 0 ){
            if( token[idx + 1] ){
                tokenRegex[item] = token[idx + 1];
            }
        }
    });

    return tokenRegex;
}

window.genCard = ( imgcode ) => {
    let card;
    let thumbnail;
    card = document.createElementWithAttrib('div',{'class':'itemview'});
    thumbnail = document.createElement('img');

    if( imgcode ){
        thumbnail.src = 'data:image/jpg;base64,' + imgcode;
    }
    
    card.appendChild(thumbnail);
    return card;
}

window.loadPage = function( target,srcpath ){
    var elem = document.querySelector( target );
    /* Loading Page from the Server with AJAX */
    var xhr = new XMLHttpRequest;
    xhr.open('GET',srcpath,false);
    xhr.send();

    /* Parsing DOMTree from result data */
    if( xhr.responseText ){
        var domparser = new DOMParser;
        var dom = domparser.parseFromString(xhr.responseText,'text/html');
        elem.appendChild(dom.body.children[0]);
    }    
}

/* 주요 기능 함수들 */
window.register = ( nickname,passwd,confirmpasswd,phoneno ) => {
    if( checkNullOrEmpty( nickname) ){
        showMessageBox( '잘못된 입력','아이디(닉네임)은 필수 입력사항 입니다!','error' );
        return;
    }
    if( checkNullOrEmpty( passwd ) ){
        showMessageBox( '잘못된 입력','비밀번호는 필수 입력사항 입니다!','error' );
        return;
    }
    if( checkNullOrEmpty( confirmpasswd ) ){
        showMessageBox( '잘못된 입력','비밀번호 재확인은 필수 입력사항 입니다!','error' );
        return;
    }
    if( checkNullOrEmpty( phoneno ) ){
        showMessageBox( '잘못된 입력','전화번호는 필수 입력사항 입니다!','error' ); 
        return;
    }
    if( nickname.search(/[!=<>?+-]/g) > -1 ){
        showMessageBox( '보안 경고','아이디에 적절하지 않은 특수문자가 포함되었습니다!','warning' );
        return;
    }
    if( nickname.search(/\b(union|select|from|where|or|and|null|is)\b/gi) > -1 ){
        showMessageBox( '보안 경고','아이디에 적절하지 않은 키워드가 포함되었습니다!','warning' );
        return;
    }
    /* 전화번호에 '-' 또는 '+' 문자가 포함되어있는지 확인 */
    /* 숫자형식 외의 서식은 모두 예외 처리 */
    if( phoneno.search(/[\D]/g) > -1 ){
        showMessageBox( '잘못된 입력','전화번호에는 숫자형식만 입력 가능합니다!','error' );
        return;
    }
    /* 비밀번호 길이가 최소 기준(8자리)를 충족하는지 검사 */
    if( passwd.length < 8 ){
        showMessageBox( '보안 경고','비밀번호는 최소 8자리 이상 되어야 합니다!','warning' );
        return;
    }
    /* 연속된 비밀번호가 3자리 이상 존재하는지 검사 */
    for(let i = 0; i < passwd.length ; i++){
        if( i > 1 ){
            if( passwd.charCodeAt(i - 1) === (passwd.charCodeAt(i) - 1) ){
                if( passwd.charCodeAt(i - 2) === (passwd.charCodeAt(i - 1) - 1) ){
                    showMessageBox( '보안 경고','비밀번호에 3자리 이상 연속된 문자가 포함되어있습니다!','warning' );
                    return;
                }
            }
            if( passwd.charCodeAt(i - 1) === passwd.charCodeAt(i) ){
                if( passwd.charCodeAt(i - 2) === passwd.charCodeAt(i - 1) ){
                    showMessageBox( '보안 경고','비밀번호에 3자리 이상 동일한 문자가 포함되어있습니다!','warning' );
                    return;
                }
            }
        }
    }
    
    /* 비밀번호와 비밀번호 재확인이 일치하는지 검사 */
    if( passwd !== confirmpasswd ){
        showMessageBox( '잘못된 입력','비밀번호가 일치하지 않습니다!','error' );
        return;
    }

    wsc_simplesend('ac=signup\n' + 'id=' + nickname + '\n' + 'pw=' + sha256(passwd) + '\n' + 'phone=' + phoneno,(event) => {
        if( event.data === "ERR_ALREADYREGMEMBER" ){
            showMessageBox( '회원가입 실패','이미 존재하는 아이디 입니다!','error' );
            return;
        }
        
        if( event.data === "DONE_REGMEMBER" ){
            showMessageBox( '회원가입 성공','회원가입이 성공적으로 완료되었습니다!','info' );
            return;
        }
    })
}
