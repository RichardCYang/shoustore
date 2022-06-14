
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

REGITEMVIEW = [];
REGITEMVIEW.init = () => {
    initCatsCombo();
}