var qrcode;
$.ajax({
    type: "get",
    url: "http://119.23.231.123:3000/qrcode",
    data: "",
    jsonpCallback: "onBack",
    dataType: "jsonp",
    success: function (response) {
        qrcode = new QRCode(document.getElementById("qrcode"), `http://119.23.231.12301:3000/${response.ranstr}`);
    },
    error: function(){

    }
});
setInterval(()=>{
    $.ajax({
        type: "get",
        url: "http://119.23.231.123:3000/qrcode",
        data: "",
        jsonpCallback: "onBack",
        dataType: "jsonp",
        success: function (response) {
            qrcode.clear()
            qrcode.makeCode(`http://119.23.231.123:3000/${response.ranstr}`);
        },
        error: function (err) {

        }
    });
},5000)
