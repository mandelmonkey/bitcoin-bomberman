
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
    const Http = new XMLHttpRequest();
    const url = 'https://api.zebedee.io/v0/withdrawal-requests';

    Http.open("POST", url);

    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.setRequestHeader("apikey", config.API_KEY);

    const payload = JSON.stringify({
        "expiresIn": 300,
        "amount": gGameEngine.totalSats * 1000,
        "description": "Bomberman withdraw",
        "internalId": "11af01d092444a317cb33faa6b8304b8",
        "callbackUrl": "https://your-website.com/callback"
    });

    Http.send(payload);

    Http.onreadystatechange = (e) => {

        if (Http.readyState === XMLHttpRequest.DONE) {
            
            const data = JSON.parse(Http.responseText);
        
            currentChargeID = data.data.id;

            makeWithdrawQRCode(data)
        }

    }
}

function checkWithdraw() {
    const Http = new XMLHttpRequest();
    const url = 'https://api.zebedee.io/v0/withdrawal-requests/' + currentChargeID;

    Http.open("GET", url);

    Http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    Http.setRequestHeader("apikey", config.API_KEY);

    Http.send();

    Http.onreadystatechange = (e) => {

        if (Http.readyState === XMLHttpRequest.DONE) {
 
            const data = JSON.parse(Http.responseText);

            const status = data.data.status;
            if (status === "pending") {
                setTimeout(function() {
                    checkWithdraw();
                }, 2000);
            } else if (status === "completed") {
              updateWithdrawUI();
            }
        }
    }


}

document.getElementById('withdrawButton').onclick = withdraw;