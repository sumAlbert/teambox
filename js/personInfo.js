$(document).ready(function(){
	/*提交的元素*/
	var enter_year;//入学年份
	var enter_month;//入学月份
	var enter_day;//入学日期
	var name;//姓名
	var degree;//学历
	var school;//学校
	var campus;//学院
	var tel;//手机号
	var qq;//QQ号码
	var email;//电子邮件
	var wechat;//微信
	var specialty;//特长
	var experience;//经历
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
	/*选中后的颜色*/
	$("input[type='text']").focus(function () {
		$(this).parent().css({"border": "#868686 1px solid"});
    });
    $("input[type='text']").blur(function () {
        $(this).parent().css({"border": "#c9c9c9 1px solid"});
    });
    $("textarea").focus(function () {
        $(this).parent().css({"border": "#868686 1px solid"});
    });
    $("textarea").blur(function () {
        $(this).parent().css({"border": "#c9c9c9 1px solid"});
    });
	/*入学日期*/
	$(".data-box").hover(function(){
		if(!hover_lock){
			hover_lock=true;
			if(typeof(enter_year)!="undefined"&&typeof(enter_month)!="undefined"){
				if($(this).children(".data-show").children().eq(0).attr("class")=="data-show-info data-show-info-day"){
					var sumDate=getDate(enter_year,enter_month);
					switch(sumDate){
						case 28:
							$(".day-31").hide();
							$(".day-30").hide();
							$(".day-29").hide();
							break;
						case 29:
							$(".day-31").hide();
							$(".day-30").hide();
							$(".day-29").show();
							break;
						case 30:
							$(".day-31").hide();
							$(".day-30").show();
							$(".day-29").show();
							break;
						default:
							$(".day-31").show();
							$(".day-30").show();
							$(".day-29").show();
							break;
					}
				}
			}
			$(this).children(".data-list").fadeIn(0);
			$(this).children(".data-list").animate({height:'8em'},100,function(){
				hover_lock=false;
			});
		}
	},function(){
		$(this).children(".data-list").animate({height:'0em'},100);
		$(this).children(".data-list").fadeOut(0);		
	});
	/*选择年份*/
	$(".data-list-item-year").click(function(){
		$(".data-show-info-year").html($(this).html());
		enter_year=$(this).html();
	});
	/*选择月份*/
	$(".data-list-item-month").click(function(){
		$(".data-show-info-month").html($(this).html());
		enter_month=$(this).html();
	});
	/*选择日期*/
	$(".data-list-item-day").click(function(){
		$(".data-show-info-day").html($(this).html());
		enter_day=$(this).html();
	});
	/*表单提交*/
	$(".content-part-item-submit-button").click(function(){
		name=$(".input-name").val();
		degree=$(".input-degree").val();
		school=$(".input-school").val();
		campus=$(".input-campus").val();
		tel=$(".input-tel").val();
		qq=$(".input-qq").val();
		wechat=$(".input-wechat").val();
		email=$(".input-email").val();
		specialty=$("#feature").val();
		experience=$("#experience").val();
		$.ajax({
			type:"post",
			url:"./php/index.php",
			data:{
                class: "User",
                action: "updateInfo",
                username:name,
                date:enter_year+"-"+enter_month+"-"+enter_day,
                education:degree,
                school:school,
                college:campus,
                phone:tel,
				qq:qq,
				wechat:wechat,
                email:email,
                other:specialty,
                experience:experience
			},
			success:function(data){
				console.log(data);
				var JSON_data=JSON.parse(data);
				if(JSON_data.state==="Success"){
					alert("修改成功");
				}
			},
			error:function(){
				console.log("error");
			}
		})
	});
	/*判断是否为闰年*/
	function isLeapYear(year){
		if(year%4==0){
			if(year%100==0){
				if(year%400==0){
					return true;
				}
				else{
					return false;
				}
			}
			else{
				return true;
			}
		}
		else{
			return false;
		}
	}
	/*获取日期数*/
	function getDate(year,month){
		switch(year){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			default:
				if(month==2){
					if(isLeapYear(year)){
						return 29;
					}
					else{
						return 28;
					}
				}
				else{
					return 30;
				}
		}
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
                    class: "User",
                    action: "getSelfInfo"
                },
                success: function (data) {
                    var JSON_data=JSON.parse(data);
                    console.log(JSON_data);
                    if(JSON_data.state==="Success"){
                        var JSON_result=JSON_data.result;
                        $(".input-name").attr("value",JSON_result.username);
                        if(JSON_result.date){
                            $(".data-show-info-year").html(JSON_result.date.split("-")[0]);
                            $(".data-show-info-month").html(JSON_result.date.split("-")[1]);
                            $(".data-show-info-day").html(JSON_result.date.split("-")[2]);
                            enter_year=JSON_result.date.split("-")[0];
                            enter_month=JSON_result.date.split("-")[1];
                            enter_day=JSON_result.date.split("-")[2];
                        }
                        $(".input-degree").attr("value",JSON_result.education||"");
                        $(".input-school").attr("value",JSON_result.school||"");
                        $(".input-campus").attr("value",JSON_result.college||"");
                        $(".input-tel").attr("value",JSON_result.phone||"");
                        $(".input-email").attr("value",JSON_result.email||"");
                        $(".input-qq").attr("value",JSON_result.qq||"");
                        $(".input-wechat").attr("value",JSON_result.wechat||"");
                        $("#feature").html(JSON_result.other);
                        specialty=JSON_result.other;
                        $("#experience").html(JSON_result.experience);
                        experience=JSON_result.experience;
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