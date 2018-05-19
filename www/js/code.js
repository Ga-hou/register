var qrcode;
$.ajax({
    type: "get",
    url: "http://192.168.191.1:3000/qrcode",
    data: "",
    jsonpCallback: "onBack",
    dataType: "jsonp",
    success: function (response) {
        qrcode = new QRCode(document.getElementById("qrcode"), `http://192.168.191.101:3000/${response.ranstr}`);
    },
    error: function(){

    }
});
setInterval(()=>{
    $.ajax({
        type: "get",
        url: "http://192.168.191.1:3000/qrcode",
        data: "",
        jsonpCallback: "onBack",
        dataType: "jsonp",
        success: function (response) {
            qrcode.clear()
            qrcode.makeCode(`http://192.168.191.1:3000/${response.ranstr}`);
        },
        error: function (err) {

        }
    });
},5000)
