/* var qrcode = new QRCode("test", {
    text: "http://www.runoob.com",
    width: 128,
    height: 128,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
}); */
var qrcode;
$.ajax({
    type: "get",
    url: "http://localhost:3000/qrcode",
    data: "",
    jsonpCallback: "onBack",
    dataType: "jsonp",
    success: function (response) {
        // console.log(response.ranNum);
        qrcode = new QRCode(document.getElementById("qrcode"), `http://192.168.199.101:3000/${response.ranNum}`);
    },
    error: function(){

    }
});
setInterval(()=>{
    $.ajax({
        type: "get",
        url: "http://localhost:3000/qrcode",
        data: "",
        jsonpCallback: "onBack",
        dataType: "jsonp",
        success: function (response) {
            // console.log(response.ranNum);
            qrcode.clear()
            qrcode.makeCode(`http://192.168.199.101:3000/${response.ranNum}`);
        },
        error: function (err) {

        }
    });
},5000)
