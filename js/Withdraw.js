
function makeWithdrawQRCode(data){
    var typeNumber = 20;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(data.data.invoice.request);

    qr.make();

    document.getElementById('withdrawQRcode').style.display = "block";
    document.getElementById('withdrawQRcode').innerHTML = qr.createImgTag(4);
    setTimeout(function() {
        checkWithdraw();
    }, 2000);
}

function withdraw() {

    if (gGameEngine.totalSats == 0) {
        alert("you have no sats");
        return;
    }

    document.getElementById('withdrawQRcode').style.display = "none";
    document.getElementById('withdraw').style.display = "block";
    createWithdrawLNURL();
}

function updateWithdrawUI(){
    gGameEngine.totalSats = 0;
    document.getElementById('satsLabel').innerHTML = gGameEngine.totalSats + " sats";
    document.getElementById('withdraw').style.display = "none";
}

function createWithdrawLNURL(){
     
}

function checkWithdraw() {
    
}

document.getElementById('withdrawButton').onclick = withdraw;