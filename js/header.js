$(document).ready(function () {
    $.ajax({
        url:"./php/index.php",
        type: "post",
        data: {
            class:"User",
            action:"logged"
        },
        success:function (data) {
            console.log(data);
        }
    })
});