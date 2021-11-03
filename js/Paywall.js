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
    
}

function checkPayment() {
     
}

createInvoice();