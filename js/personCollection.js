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
                        for(var i=0;i<JSON_result.user.length;i++){
                            console.log(i);
                        	if(JSON_result.user[i].name_v){
                        		var name=JSON_result.user[i].username||"";
							}else{
                        		var name="匿名";
							}
                            if(JSON_result.user[i].phone_v){
                                var phone=JSON_result.user[i].phone||"";
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
                                "\t\t\t\t\t\t\t<div class=\"person-gender\">"+(JSON_result.user[i].sex||"")+"</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"person-school\">"+(JSON_result.user[i].school||"")+"</div>\n" +
                                "\t\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special-name\">个人特长</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special\">"+(JSON_result.user[i].other||"")+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special-name\">个人经历</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-experience\">"+(JSON_result.user[i].experience||"")+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-special-name\">联系方式</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-email\">"+JSON_result.user[i].email+"</div>\n" +
                                "\t\t\t\t\t\t<div class=\"person-info-tel\">"+phone+"</div>\n" +
                                "\t\t\t\t\t</div>";
                            $("#content-main-person").append($small_member);
                        }
                        for(var i=0;i<JSON_result.team.length;i++){
                            console.log(i);
                            var $small_member="<div class=\"team-card\">\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-card-line\">\n" +
                                "\t\t\t\t\t\t\t\t<div class=\"team-name\">"+JSON_result.team[i].projectname+"</div>\n" +
                                "\t\t\t\t\t\t\t\t<div class=\"team-collection\"></div>\n" +
                                "\t\t\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-extra-info\">\n" +
                                "\t\t\t\t\t\t\t\t<div class=\"team-date\">"+JSON_result.team[i].date+"</div>\n" +
                                "\t\t\t\t\t\t\t\t<div class=\"team-aim\">"+JSON_result.team[i].aim+"</div>\n" +
                                "\t\t\t\t\t\t\t</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-special-name\">项目介绍</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-intro\">"+JSON_result.team[i].intrduction+"</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-special-name\">项目需求</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-need\">"+JSON_result.team[i].requirement+"</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-special-name\">联系方式</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-email\">"+JSON_result.team[i].email+"</div>\n" +
                                "\t\t\t\t\t\t\t<div class=\"team-info-tel\">"+JSON_result.team[i].phone+"</div>\n" +
                                "\t\t\t\t\t\t</div>";
                            $("#content-main-team").append($small_member);
                        }
                    }
                },
                error:function () {
                    console.log("获取用户信息失败");
                }
            });
        }
        else{
            alert("登陆失败，请重新登陆");
            window.location.href="index.html";
        }
    };
});