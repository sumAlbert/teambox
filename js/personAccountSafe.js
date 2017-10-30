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
                        if(JSON_result["name_v"]==="no"){
                        	json_Info.switch_name=false;
                            $(".switch_name").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_name").children(".switch-inner").animate({
                                right:'2em'
                            },300);
						}
                        if(JSON_result["phone_v"]==="no"){
                            json_Info.switch_qq=false;
                            $(".switch_tel").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_tel").children(".switch-inner").animate({
                                right:'2em'
                            },300);
                        }
                        if(JSON_result["college_v"]==="no"){
                            json_Info.switch_qq=false;
                            $(".switch_school").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_school").children(".switch-inner").animate({
                                right:'2em'
                            },300);
                        }
                        if(JSON_result["qq_v"]==="no"){
                            json_Info.switch_qq=false;
                            $(".switch_qq").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_qq").children(".switch-inner").animate({
                                right:'2em'
                            },300);
                        }
                        if(JSON_result["wechat_v"]==="no"){
                            json_Info.switch_qq=false;
                            $(".switch_wechat").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_wechat").children(".switch-inner").animate({
                                right:'2em'
                            },300);
                        }
                        if(JSON_result["state"]==="warm"){
                            json_Info.switch_hot=false;
                            $(".switch_hot").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_hot").children(".switch-inner").animate({
                                right:'2em'
                            },300);
                        }
                        if(JSON_result["visible"]==="no"){
                            json_Info.switch_stop=false;
                            $(".switch_stop").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_stop").children(".switch-inner").animate({
                                right:'2em'
                            },300);
                        }
                        if(JSON_result["protection"]==="no"){
                            json_Info.switch_save=false;
                            $(".switch_save").children(".switch-inner").css({background:'#ddd'});
                            $(".switch_save").children(".switch-inner").animate({
                                right:'2em'
                            },300);
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