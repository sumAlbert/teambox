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
});