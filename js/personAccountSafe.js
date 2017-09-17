$(document).ready(function(){
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