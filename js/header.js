$(document).ready(function () {
    $.ajax({
        url:"./php/index.php",
        type: "post",
        data: {
            class:"User",
            action:"logged"
        },
        success:function (data) {
            var data_JSON=JSON.parse(data);
            if (data_JSON.state === "Success") {
                initLoginState(true,data_JSON.result);
                console.log("登陆成功");
            }
            else{
                console.log("未登录");
                initLoginState(false);
            }
        },
        error: function () {
            console.log("error");
        }
    })
});