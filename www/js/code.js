var qrcode;
$.ajax({
    type: "get",
    url: "http://www.javatribe.org:3000/qrcode",
    data: "",
    jsonpCallback: "onBack",
    dataType: "jsonp",
    success: function (response) {
        qrcode = new QRCode(document.getElementById("qrcode"), `http://www.javatribe.org01:3000/${response.ranstr}`);
    },
    error: function(){

    }
});
setInterval(()=>{
    $.ajax({
        type: "get",
        url: "http://www.javatribe.org:3000/qrcode",
        data: "",
        jsonpCallback: "onBack",
        dataType: "jsonp",
        success: function (response) {
            qrcode.clear()
            qrcode.makeCode(`http://www.javatribe.org:3000/${response.ranstr}`);
        },
        error: function (err) {

        }
    });
},5000)
