
document.addStyleSheet('./popup.css');
function Popup() {
    this.popupBack = null;
    this.loginPopup = null;
    this.closeBtn = null;
    this.embedPage = null;
}

Popup.prototype.makePopup = function(){
    this.popupBack = document.createElementWithAttrib('div',{ 'class':'popupBack' });
    this.loginPopup = document.createElementWithAttrib('div',{ 'class':'popupWindow' });
    this.closeBtn = document.createElementWithAttrib('button',{ 'class':'popupClose' });
    this.embedPage = document.createElement('embed');

    this.closeBtn.super = this;
    this.closeBtn.onclick = function(e){
        if( document.checkBrowser() == document.BROWSER_IE || document.checkBrowser() == document.BROWSER_IE11 ){
            this.super.popupBack.removeChild( this.super.loginPopup );
            document.body.removeChild( this.super.popupBack );
        }else{
            this.super.popupBack.remove();
            this.super.loginPopup.remove();
        }
    }
    
    this.embedPage.src = './loginform.html';

    this.loginPopup.appendChild( this.embedPage );
    this.loginPopup.appendChild( this.closeBtn );
    this.popupBack.appendChild( this.loginPopup );
    document.body.appendChild( this.popupBack );
}