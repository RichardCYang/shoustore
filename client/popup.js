
document.addStyleSheet('./popup.css');

class Popup {
    constructor(){
        
    }

    makePopup(){
        let popupBack = document.createElementWithAttrib('div',{ 'class':'popupBack' });
        let loginPopup = document.createElementWithAttrib('div',{ 'class':'popupWindow' });
        let closeBtn = document.createElementWithAttrib('button',{ 'class':'popupClose' });
        let embedPage = document.createElement('embed');

        closeBtn.onclick = function(e){
            popupBack.remove();
            loginPopup.remove();
        }
        
        embedPage.src = './loginform.html';

        loginPopup.appendChild( embedPage );
        loginPopup.appendChild( closeBtn );
        popupBack.appendChild( loginPopup );
        document.body.appendChild( popupBack );
    }
}