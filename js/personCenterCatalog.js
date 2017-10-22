$(document).ready(function () {
   $(".content-item").eq(0).click(function () {
       window.location.href="./personInfo.html";
   });
    $(".content-item").eq(1).click(function () {
        window.location.href="./personAccountPW.html";
    });
    $(".content-item").eq(2).click(function () {
        window.location.href="./personAccountSafe.html";
    });
    $(".content-item").eq(3).click(function () {
        window.location.href="./personTeamManager.html";
    });
    $(".content-item").eq(4).click(function () {
        window.location.href="./personCollection.html";
    });
});