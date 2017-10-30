$(document).ready(function(){
	/*提交的元素*/

	/*锁，避免多次运行*/
	var hover_lock=false;
	var delete_lock=false;
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
	/*鼠标移动到增加团队菜单颜色改变*/
	$(".create-team-card-add").hover(function () {
		$(".create-team-card-icon-name").css({color:"#3da8f5"});
    	$(".create-team-card-icon").css({background:"url(\"./images/personTeamManager/team_card_add_selected.png\") center center no-repeat","background-size":"100% 100%"})
	},function(){
        $(".create-team-card-icon-name").css({color:"#8a8a8a"});
        $(".create-team-card-icon").css({background: "url(\"./images/personTeamManager/team_card_add.png\") center center no-repeat","background-size":"100% 100%"})
	});


	$(".create-team-card-add").click(function () {
		createTeamCardDom();
    });
	function createTeamCardDom(){
		var $small_card="        <div class=\"create-team-card create-team-card-bg3\">\n" +
            "                        <div class=\"create-team-card-name\">团队名称</div>\n" +
            "                        <div class=\"create-team-card-change\"></div>\n" +
            "                    </div>";
		$(".create-team-card-add").before($small_card);
	}


    initLoginState=function initd(state,data){
        console.log(data);
        if(state){
            $(".person-info-name").html(data.username);
            $(".content-username").html(data.username);
            $.ajax({
                url:"./php/index.php",
                type:"post",
                data:{
                    class: "Team",
                    action: "getSelfTeam"
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    console.log(JSON_data);
                    if(JSON_data.state==="Success"){
                        var JSON_result=JSON_data.result;
						for(var i=0;i<JSON_result.length;i++){
                            var $small_card="        <div class=\"create-team-card create-team-card-bg"+((i%3)+1)+"\" id=\"team"+JSON_result[i].id+"\">\n" +
                                "                        <div class=\"create-team-card-name\">"+JSON_result[i].projectname+"</div>\n" +
                                "                        <div class=\"create-team-card-change\"></div>\n" +
                                "                    </div>";
                            $(".create-team-card-add").before($small_card);
                            (function (teamid) {
                                $("#team"+JSON_result[i].id).on("click",function () {
                                    window.location.href="teamManager.html?teamid="+teamid;
                                })
                            })(JSON_result[i].id);
						}
                    }
                },
                error:function () {
                    console.log("获取用户信息失败");
                }

            })
            $.ajax({
                url:"./php/index.php",
                type:"post",
                data:{
                    class: "Team",
                    action: "getJoinedTeam"
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    console.log(JSON_data);
                    if(JSON_data.state==="Success"){
                        var JSON_result=JSON_data.result;
                        for(var i=0;i<JSON_result.length;i++){
                            var $small_card="        <div class=\"create-team-card create-team-card-bg"+((i%3)+1)+"\" id=\"team"+JSON_result[i].id+"\">\n" +
                                "                        <div class=\"create-team-card-name\">"+JSON_result[i].projectname+"</div>\n" +
                                "                        <div class=\"create-team-card-delete\"></div>\n" +
                                "                    </div>";
                            $(".content-main-join-teams").append($small_card);
                            (function (teamid) {
                                $("#team"+JSON_result[i].id).on("click",function () {
                                    if(delete_lock){
                                        window.location.href="teamManager.html?teamid="+teamid;
                                    }
                                    else {
                                        delete_lock=true;
                                    }
                                });
                                $("#team"+JSON_result[i].id+" > .create-team-card-delete").on("click",function () {
                                    delete_lock=false;
                                    console.log("delete");
                                })
                            })(JSON_result[i].id);
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