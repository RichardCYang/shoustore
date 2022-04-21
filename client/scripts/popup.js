
document.addStyleSheet('./styles/popup.css');

class Popup {
    constructor(){
        this.url = "";
        this.embed = null;
    }

    setUrl( url ){
        this.url = url;
    }

    changeLink( link ){
        if( this.embed ){
            let parent = this.embed.parentNode;
            parent.removeChild( this.embed );
            this.embed = document.createElement('embed');
            this.embed.src = link;
            this.url = link;
            parent.appendChild( this.embed );
        }
    }

    makePopup( url ){
        let popupBack = document.createElementWithAttrib('div',{ 'class':'popupBack' });
        let popupWindow = document.createElementWithAttrib('div',{ 'class':'popupWindow' });
        let closeBtn = document.createElementWithAttrib('button',{ 'class':'popupClose' });
        this.embed = document.createElement('embed');

        closeBtn.onclick = (e) => {
            popupBack.remove();
            popupWindow.remove();
        }

        if( url ){
            this.url = url;
        }
    
        this.embed.src = this.url;

        popupWindow.appendChild( this.embed );
        popupWindow.appendChild( closeBtn );
        popupBack.appendChild( popupWindow );

        document.body.appendChild( popupBack );
    }
}