$(document).ready(function(){
	var json_Info={
		switch_name:true,
		switch_school:true,
		switch_tel:true,
		switch_qq:true,
		switch_wechat:true,
		switch_hot:true,
		switch_stop:true,
		switch_save:true
	};//记录按钮的值
	/*锁，避免多次运行*/
	var hover_lock=false;
	var click_lock=false;
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
	/*按钮切换*/
	$(".switch-outter").click(function () {
		if(!click_lock){
			click_lock=true;
			var switch_item_name=$(this).attr('class').split(' ')[1];
            console.log(json_Info[switch_item_name]);
			if(json_Info[switch_item_name]){
                json_Info[switch_item_name]=false;
                $(this).children(".switch-inner").css({background:'#ddd'});
                $(this).children(".switch-inner").animate({
					right:'2em'
                },300,function () {
                    click_lock=false;
                });
			}
			else{
                json_Info[switch_item_name]=true;
                $(this).children(".switch-inner").css({background:'rgba(26, 188, 156, 1)'});
                $(this).children(".switch-inner").animate({
					right:'0em'
                },300,function () {
                    click_lock=false;
                });
			}
		}
    });
	/*表单提交*/
	// $(".content-part-item-submit-button").click(function(){
	// 	name=$(".input-name").val();
	// 	degree=$(".inpupt-degree").val();
	// 	school=$(".input-school").val();
	// 	campus=$(".input-campus").val();
	// 	tel=$(".input-tel").val();
	// 	qq=$(".input-qq").val();
	// 	wechat=$(".input-wechat").val();
	// 	email=$(".input-email").val();
	// 	specialty=$("#feature").val();
	// 	experience=$("#experience").val();
	// 	$.ajax({
	// 		type:"post",
	// 		url:"",
	// 		data:{
	// 			name:name,
	// 			degree:degree,
	// 			school:school,
	// 			campus:campus,
	// 			tel:tel,
	// 			qq:qq,
	// 			wechat:wechat,
	// 			email:email,
	// 			specialty:specialty,
	// 			experience:experience,
	// 			day:enter_day,
	// 			month:enter_month,
	// 			year:enter_year
	// 		},
	// 		success:function(data){
	// 			console.log("success");
	// 		},
	// 		error:function(){
	// 			console.log("error");
	// 		}
	// 	})
	// });
});