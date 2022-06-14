//import regitem from '../../server/actions/regitems';
import fm from '../../server/filemanager';

function initCatsCombo(){
    let catSelection = document.getElementById('catSelect');
    wsc_simplesend('ac=getcats',(event) => {
        let cats = JSON.parse( event.data );
        cats.forEach( row => {
            let newOption = document.createElement('option');
            newOption.textContent = row.category_name + '';
            catSelection.appendChild(newOption);
        });
    });
}

window.onclick = regitem;

function regitem() {
    console.log("상품 등록 버튼 누름");
    let name = document.getElementById('nicknameInput');
    let price = document.getElementById('priceInput');
    let stockcnt = document.getElementById('countInput');
    let category_name = document.getElementById('catsInput');
    let itemdesc = document.getElementById('itemdescView');
    let thumbnail = document.getElementById('thumbnailFile');

    let toDB_thumbnail = fm.getBase64Image(thumbnail.src);

    if( checkNullOrEmpty( name.value ) ){
        window.parent.document.showMessageBox( '잘못된 입력','상품명을 입력해주세요!','error' )
        return;
    }
    if( checkNullOrEmpty( price.value ) ){
        window.parent.document.showMessageBox( '잘못된 입력','가격을 입력해주세요!','error' )
        return;
    }
    if( checkNullOrEmpty( stockcnt.value ) ){
        window.parent.document.showMessageBox( '잘못된 입력','재고를 입력해주세요!','error' )
        return;
    }
    if( checkNullOrEmpty( category_name.value ) ){
        window.parent.document.showMessageBox( '잘못된 입력','카테고리를 입력해주세요!','error' )
        return;
    }

    console.log("regitemview.js -> regitems.js")

    /*
    regitem.regitems('name=' + name.value + '\n' +
    'category_name=' + category_name.value + '\n' +
    'price=' + price.value + '\n' +
    'stockcnt=' + stockcnt.value + '\n' +
    'itemdesc=' + itemdesc.value + '\n' +
    'thumbnail=' + toDB_thumbnail, (event) => {

        if( event.data == "DONE_REGITEMS" ) {
            window.parent.document.showMessageBox( '상품등록 성공','상품등록에 성공하였습니다!','info' );
            window.location.href("../index.html");
        }; 

    })
    */

    wsc_simplesend('ac=regitems\n' + 'name=' + name.value + '\n' +
    'category_name=' + category_name.value + '\n' +
    'price=' + price.value + '\n' +
    'stockcnt=' + stockcnt.value + '\n' +
    'itemdesc=' + itemdesc.value + '\n' +
    'thumbnail=' + toDB_thumbnail,(event) =>{

        if( event.data == "DONE_REGITEMS" ) {
        window.parent.document.showMessageBox( '상품등록 성공','상품등록에 성공하였습니다!','info' );
        window.location.href("../index.html");
        } 

    })
}


REGITEMVIEW = [];
REGITEMVIEW.init = () => {
    initCatsCombo();
}