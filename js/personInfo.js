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
			$(".person-menu-hidden").animate({height:'5em'},100,function(){
				hover_lock=false;
			});
		}
	},function(){
		$(".person-menu-hidden").animate({height:'0em'},200);
		$(".person-menu-hidden").fadeOut(100);
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
	})
	/*选择年份*/
	$(".data-list-item-year").click(function(){
		$(".data-show-info-year").html($(this).html());
		enter_year=$(this).html();
	})
	/*选择月份*/
	$(".data-list-item-month").click(function(){
		$(".data-show-info-month").html($(this).html());
		enter_month=$(this).html();
	})
	/*选择日期*/
	$(".data-list-item-day").click(function(){
		$(".data-show-info-day").html($(this).html());
		enter_day=$(this).html();
	})
	/*表单提交*/
	$(".content-part-item-submit-button").click(function(){
		name=$(".input-name").val();
		degree=$(".inpupt-degree").val();
		school=$(".input-school").val();
		campus=$(".input-campus").val();
		tel=$(".input-tel").val();
		qq=$(".input-qq").val();
		wechat=$(".input-wechat").val();
		email=$(".input-email").val();
		specialty=$("#experience").val();
		experience=$("#experience").val();
		$.ajax({
			type:"post",
			url:"",
			data:{
				name:name,
				degree:degree,
				school:school,
				campus:campus,
				tel:tel,
				qq:qq,
				wechat:wechat,
				email:email,
				specialty:specialty,
				experience:experience,
				day:enter_day,
				month:enter_month,
				year:enter_year
			},
			success:function(data){
				console.log("success");
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
});