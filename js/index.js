$(document).ready(function(){
	var picLen=2;//图片数量
	//初始化状态
	$(".carousel").eq(1).hide();
	$(".slipper").hide();
	$(".slipper_back").hide();
	var curPic=0;//指向当前图片
	var Interval=setInterval(changePic,5000);
	
	function changePic()//图片轮播效果
	{
		$(".slipper").attr('src',$(".carousel").eq(curPic).attr('src')).show();//更新滑块图片显示当前图片
		$(".carousel").eq(curPic).hide();//当前图片隐藏
		curPic=(curPic+1)%picLen;//指向下张图片
		
		$(".carousel").eq(curPic).show();//下张图片准备
		$(".slipper_back").attr('src',$(".carousel").eq(curPic).attr('src')).show();//更改背景滑块图片为下张图片
		
		//滑块移动+移动后恢复原位并隐藏
		$(".slipper").eq(0).animate({left:"100%"},800,function(){
			$(".slipper").eq(0).hide().css("left","0");
		});
		$(".slipper").eq(1).animate({top:"100%"},800,function(){
			$(".slipper").eq(1).hide().css("top","0");
		});
		$(".slipper").eq(2).animate({right:"100%"},800,function(){
			$(".slipper").eq(2).hide().css("right","0");
		});
		$(".slipper").eq(3).animate({bottom:"100%"},800,function(){
			$(".slipper").eq(3).hide().css("bottom","0");
		});
		//背景滑块移动+移动后恢复原位并隐藏
		$(".slipper_back").eq(0).animate({left:"0",top:"0"},800,function(){
			$(".slipper_back").eq(0).hide().css({"left":"-20%","top":"-20%"});
		});
		$(".slipper_back").eq(1).animate({right:"0",top:"0"},800,function(){
			$(".slipper_back").eq(1).hide().css({"right":"-20%","top":"-20%"});
		});
		$(".slipper_back").eq(2).animate({right:"0",bottom:"0"},800,function(){
			$(".slipper_back").eq(2).hide().css({"right":"-20%","bottom":"-20%"});
		});
		$(".slipper_back").eq(3).animate({left:"0",bottom:"0"},800,function(){
			$(".slipper_back").eq(3).hide().css({"left":"-20%","bottom":"-20%"});
		});
	}

	/* some function about responsive page*/
	$("#item_c_mob").click(function(){
		var $item_box_mob=$(".item_box_mob");
		if($item_box_mob.height()==0)
		{
			$item_box_mob.animate({height:'50px'},500);
		}
		else
		{
			$item_box_mob.animate({height:'0px'},500);
		}
	});

    initLoginState=function initd(state,data){
    	if(state){
            $("#username").html(data.username);
            $("#logout").html("注销");
		}
		else{
            $("#username").html("登录");
            $("#logout").html("注册");
		}
    };
});