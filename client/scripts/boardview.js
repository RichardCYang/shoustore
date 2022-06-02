
function genCard( imgcode ){
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
function pageToOpps(){
    /* Opps 를 띄울 DIV 동적 생성 */
    let oopsDiv = document.createElementWithAttrib('div',{'class':'oopsimg'});
    document.querySelector('main').innerHTML = '';
    document.querySelector('main').appendChild( oopsDiv );
}
function loadPage( input ){
    let data = JSON.parse( input );
    let frame = document.createElementWithAttrib('div',{'class':'mainarea'});
    let cards = document.createElementWithAttrib('div',{'class':'itemcontainer'});
    if( !data ){
        pageToOpps();
        return;
    }
    /* 아이템 개수 만큼 리스트 생성 */
    if( data.length > 0 ){
        /* 데이터 개수가 5개보다 적을 경우 그리드 첫 번째 줄을 채우지 못해 */
        /* 가운데 정렬이 제대로 안되므로, 비어있는 그리드 아이템을 더 채워 */
        /* 첫 번째 줄 아이템을 5개로 맞춤 */
        if( data.length < 5 ){
            let diff = 5 - data.length;
            for(let i = 0; i < diff; i++){
                data.push({'thumbnail':'NA'});
            }
        }
        /* 아이템 정보 리스트 출력 */
        data.forEach((item,idx) => {
            /* 이미지 데이터를 얻어오기 위해 웹소켓 재호출 */
            if( item.thumbnail ){
                wsc_simplesend('ac=getitemthumb\nthumbname=' + item.thumbnail,(event) => {
                    if( event.data === 'ERR_THUMBGENERAL' ){
                        let card = genCard( "" );
                        cards.appendChild( card );
                        return;
                    }
                    let card = genCard( event.data );
                    cards.appendChild( card );
                });
            }
        });
        frame.appendChild(cards);
        document.querySelector('main').innerHTML = '';
        document.querySelector('main').appendChild( frame );
    }else{
        /* 에러 메세지( Opps ) 출력 */
        pageToOpps();
    }
}
window.onload = () => {
    let params = parseGetParams( window.location.href );
    if( params ){
        if( params.ac === 'searchlist' ){
            let itemText = localStorage.getItem('boardview_searchitems');
            /* 페이지 생성 */
            loadPage( itemText );
            localStorage.removeItem('boardview_searchitems');
        }
        if( params.ac === 'catlist' ){
            wsc_simplesend('ac=getcatitems\ncat=' + params.cat,(event) => {
                /* 페이지 생성 */
                loadPage( event.data );
            });
        }
    }
}