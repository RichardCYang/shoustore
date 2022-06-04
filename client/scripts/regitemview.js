
function initCatsCombo(){
    let catSelection = document.getElementById('catSelect');
    wsc_simplesend('ac=getcats',(event) => {
        let cats = JSON.parse( event.data );
        cats.forEach( row => {
            let newOption = document.createElement('option');
            newOption.textContent = row.category_name + '';
            catSelection.appendChild(newOption);
            console.log("DEBUG");
        });
    });
}

window.onload = () => {
    document.setOnClickByID('regitemButton',() => {
        let name = document.getElementById('nicknameInput');
        let price = document.getElementById('priceInput');
        let stockcnt = document.getElementById('countInput');
        let category_name = document.getElementById('catSelect');
        let itemdesc = document.getElementById('itemdescView');
        let thumbnail = document.getElementById('thumbnailFile');

        thumbnail.src = window.URL.createObjectURL(files[0]);

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

        wsc_simplesend('ac=regitems\n' + 'name=' + name.value + '\n' +
                                         'category_name=' + category_name.value + '\n' +
                                         'price=' + price.value + '\n' +
                                         'stockcnt=' + stockcnt.value + '\n' +
                                         'itemdesc=' + itemdesc.value + '\n' +
                                         'thumbnail=' + thumbnail.src,(event) =>{
        
            if( event.data == "DONE_REGITEMS" ) {
                window.parent.document.showMessageBox( '상품등록 성공','상품등록에 성공하였습니다!','info' );
                location.href("../index.html");
            } 
                        
        }) 

    })
    initCatsCombo();
}