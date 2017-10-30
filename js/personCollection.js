$(document).ready(function(){
	/*提交的元素*/

	/*锁，避免多次运行*/
	var hover_lock=false;
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

    initLoginState=function initd(state,data){
        console.log(data);
        if(state){
            $(".person-info-name").html(data.username);
            $.ajax({
                url:"./php/index.php",
                type:"post",
                data:{
                    class: "User",
                    action: "favorite",
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    console.log(JSON_data);
                    if(JSON_data.state==="Success"){
                        var JSON_result=JSON_data.result;
                        console.log(JSON_result);
                        for(var i=0;i<JSON_result.length;i++){
                        	if(JSON_result.name_v){
                        		var name=JSON_result.username||"";
							}else{
                        		var name="匿名";
							}
                            if(JSON_phone._v){
                                var phone=JSON_result.phone||"";
                            }else{
                                var phone="";
                            }
                            var $small_member="<div class=\"person-card\">\n" +
                                "\t\t\t\t\t\t<div class=\"person-card-line\">\n" +
                                "\t\t\t\t\t\t\t<div class=\"person-name\">"+name+"</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"person-hot\"></div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"person-collection\"></div>\n" +
                                "\t\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-extra-info\">\n" +
                                "\t\t\t\t\t\t\t<div class=\"person-gender\">"+(JSON_result.sex||"")+"</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"person-school\">"+(JSON_result.school||"")+"</div>\n" +
                                "\t\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special-name\">个人特长</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special\">"+(JSON_result.other||"")+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special-name\">个人经历</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-experience\">"+(JSON_result.experience||"")+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special-name\">联系方式</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-email\">"+JSON_result.email+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-tel\">"+phone+"</div>\n" +
                                "\t\t\t\t\t</div>";
                            $("#content-main-person").append($small_member);
                        }
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