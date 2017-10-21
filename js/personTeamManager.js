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
            "                        <div class=\"create-team-card-name\">团队名称三</div>\n" +
            "                        <div class=\"create-team-card-change\"></div>\n" +
            "                    </div>";
		$(".content-main-create-teams").append($small_card);
	}
});