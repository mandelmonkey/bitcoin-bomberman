function createInvoiceQRCode(data){
    
    var typeNumber = 20;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);

    qr.addData(data.data.invoice.request);
    qr.make();
    
    document.getElementById('qrcode').innerHTML = qr.createImgTag(4);
    
    setTimeout(function() {
        checkPayment();
    }, 2000);

}

function startGame(){
    gGameEngine.totalSats = 0;
    document.getElementById('satsLabel').innerHTML = gGameEngine.totalSats + " sats";
    document.getElementById('paywall').remove();
}

function createInvoice() {
     
    const Http = new XMLHttpRequest();
    const url = 'https://api.zebedee.io/v0/charges';

    Http.open("POST", url);

    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.setRequestHeader("apikey", config.API_KEY);

    const payload = JSON.stringify({
        "expiresIn": 300,
        "amount": config.FEE * 1000,
        "description": "EasySats - Bomberman Paywall",
        "internalId": "11af01d092444a317cb33faa6b8304b8",
        "callbackUrl": "https://your-website.com/callback"
    })
    Http.send(payload);

    Http.onreadystatechange = (e) => {

        if (Http.readyState === XMLHttpRequest.DONE) { 
            console.log(Http.responseText)
            const data = JSON.parse(Http.responseText);
            currentChargeID = data.data.id;
            createInvoiceQRCode(data);
        }

    }
}

function checkPayment() {
    const Http = new XMLHttpRequest();
    const url = 'https://api.zebedee.io/v0/charges/' + currentChargeID;

    Http.open("GET", url);

    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.setRequestHeader("apikey", config.API_KEY);

    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === XMLHttpRequest.DONE) { 
            console.log(Http.responseText);
            const data = JSON.parse(Http.responseText);
            const status = data.data.status;

            if (status === "pending") {

                setTimeout(function() {
                    checkPayment();
                }, 2000);

            } else if (status === "completed") {

               startGame();
            
            }
        }
    }

}

createInvoice();