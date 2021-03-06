
class WebSocketClient {
    constructor(){
        this.port = 8090;
        this.sock = null;
    }

    onOpen( callback ){
        if( this.sock ){
            this.sock.onopen = callback;
        }
    }

    onReply( callback ){
        if( this.sock ){
            this.sock.onmessage = callback;
        }
    }

    send( data ){
        if( this.sock ){
            if( data ){
                this.sock.send( data );
            }
        }
    }

    close(){
        if( this.sock ){
            this.sock.close();
        }
    }

    open(){
        this.sock = new WebSocket("ws://localhost:" + this.port);
    }
}

function wsc_simplesend( data,onreply ){
    let websock = new WebSocketClient;
    websock.open();
    websock.onOpen((event) => {
        websock.send( data );
    })
    websock.onReply((event) => {
        websock.close();
        onreply(event);
    });
}