$(document).ready(function(){
	/*标题栏右边的菜单*/
	$(".person-menu").hover(function(){
		if(!hover_lock)
		{	
			hover_lock=true;
			$(".person-menu-hidden").fadeIn(50);
			$(".person-menu-hidden").animate({height:'7em'},100,function(){
				hover_lock=false;
			});
		}
	},function(){
		$(".person-menu-hidden").animate({height:'0em'},200);
		$(".person-menu-hidden").fadeOut(100);
	});

    /*选中后的颜色*/
    $("input[type='password']").focus(function () {
        $(this).parent().css({"border": "#868686 1px solid"});
    });
    $("input[type='password']").blur(function () {
        $(this).parent().css({"border": "#c9c9c9 1px solid"});
    });
    $("#input-new-email").focus(function () {
        $(this).parent().css({"border": "#868686 1px solid"});
    });
    $("#input-new-email").blur(function () {
        $(this).parent().css({"border": "#c9c9c9 1px solid"});
    });

    initLoginState=function initd(state,data){
        console.log(data);
        if(state){
            $(".person-info-name").html(data.username);
            $(".content-username").html(data.username);
            $.ajax({
                url:"./php/index.php",
                type:"post",
                data:{
                    class: "User",
                    action: "getSelfInfo"
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    console.log(JSON_data);
                    if(JSON_data.state==="Success"){
                        var JSON_result=JSON_data.result;
                        $(".input-name").attr("placeholder",JSON_result.username);
						$(".input-email").attr("value",JSON_result.email);
                    }
                },
                error:function () {
                    console.log("获取用户信息失败");
                }

            })
        }
        else{
            alert("登陆失败，请重新登陆");
            window.location.href="index.html";
        }
    };
});