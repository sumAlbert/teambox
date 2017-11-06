$(document).ready(function () {
    console.log(window.location.search.split("&")[0].substr(6));
    console.log(window.location.search.split("&")[1].substr(3));
    initLoginState=function () {
        $.ajax({
            url:"./php/index.php",
            type:"post",
            data:{
                class: "Team",
                action: "getInvitation",
                teamId: window.location.search.split("&")[1].substr(3)
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                console.log(JSON_data);
                if(JSON_data.state==="Success"){
                    $(".team-name").html(JSON_data.result.team||"XXX");
                    $(".request-name").html(JSON_data.result.user||"XX");
                }
            },
            error:function () {
                console.log("获取信息失败");
            }
        })
    };

    $(".agree-button").click(function () {
        $.ajax({
            url:"./php/index.php",
            type:"post",
            data:{
                class: "User",
                action: "acceptInvitation",
                email: window.location.search.split("&")[0].substr(6),
                teamId:window.location.search.split("&")[1].substr(3)
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                console.log(JSON_data);
                if(JSON_data.state==="Success"){
                    window.location.href="index.html";
                }
            },
            error:function () {
                console.log("获取用户信息失败");
            }
        });
    });

    $(".disagree-button").click(function () {
        $.ajax({
            url:"./php/index.php",
            type:"post",
            data:{
                class: "User",
                action: "declineInvitation",
                email: window.location.search.split("&")[0].substr(6),
                teamId:window.location.search.split("&")[1].substr(3)
            },
            success: function (data) {
                var JSON_data=JSON.parse(data);
                console.log(JSON_data);
                if(JSON_data.state==="Success"){
                    window.location.href="index.html";
                }
            },
            error:function () {
                console.log("获取用户信息失败");
            }
        });
    });
});