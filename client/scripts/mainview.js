
function pushItemCard( imgcode ){
    let cards = document.getElementsByClassName('itemcontainer')[0];
    let card = genCard(imgcode);
    cards.appendChild(card);
}

function paddingItemCard( len ){
    let cards = document.getElementsByClassName('itemcontainer')[0];
    let diff = 10 - len;
    let emptyCard;

    for(let i = 0; i < diff; i++){
        emptyCard = genCard();
        cards.appendChild(emptyCard);
    }
}

function loadCategories(){
    wsc_simplesend('ac=getrecntcats',(event) => {
        let items = JSON.parse(event.data);
        items.forEach((item) => {
            pushItemCard( item.rawthumbnail );
        });
        paddingItemCard( items.length );
    });
}

function scrollBanner( scrollamount ){
    let banner = document.querySelector('.mainbanner_group');

    if( !banner ) return;

    banner.style.left = (scrollamount * banner.clientWidth * -1) + 'px';
}

function startBannerScrollTimer( timedelay ){
    setInterval(function(){
        /* 브라우저가 최소화 되거나, 페이지가 다른 탭으로 이동했을 때 */
        /* 브라우저가 인터벌 시간을 자동으로 1초로 최적화 시켜버리기 때문에 */
        /* 배너가 이상하게 떨리면서 이동하지 않는 버그가 발생 */
        /* 따라서 브라우저가 최소화 되거나 탭이 이동(Unfocused) 상태이면 */
        /* 타이머 내용을 실행시키지 않음으로써, 버그 방지 */
        if( document.hasFocus() ){
            window.curBannerIdx = window.curBannerIdx + 1;
        
            if( window.curBannerIdx > window.imgs.length - 1 ){
                window.curBannerIdx = 0;
            }

            scrollBanner(window.curBannerIdx);
        }
    },timedelay * 1000);
}

function initBannerImgs(){
    let banner = document.querySelector('.mainbanner_group');
    let bannerImg;

    banner.style.left = '0px';

    for(let i = 0; i < window.imgs.length; i++){
        bannerImg = document.createElement('img');
        bannerImg.setAttribute('class','mainbanner_content');
        bannerImg.className = 'mainbanner_content';
        bannerImg.src = window.imgs[i];
        banner.appendChild(bannerImg);
    }
}

function init_main(){
    loadCategories();
    /* 현재 메인에 표시되는 배너의 순서를 기억합니다 */
    window.curBannerIdx = 0;
    /* 여기에 사용할 배너 이미지 경로들을 추가하시면 됩니다. */
    window.imgs = [
        "./banners/1.jpg",
        "./banners/2.jpg",
        "./banners/3.jpg"
    ];
    initBannerImgs();
    /* 5초 간격으로 배너를 회전(Spin) 시키는 타이머(Timer) 실행 */
    startBannerScrollTimer(5);
}

window.onload = () => {
    init_main();
}

function onRegItem_clicked(){
    if( !sessionStorage.shoustore_key ){
        showMessageBox('로그인 안내','로그인이 필요한 서비스 입니다!','info');
        return;
    }
}