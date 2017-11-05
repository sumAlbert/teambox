$(document).ready(function(){
	var $aim=$("input[name='aim']");
	var $name=$("#projectName");
	var $phone=$("input[name='tel']");
	var $email=$("input[name='email']");
	$(".checkbox_box").click(function(){
		$(this).toggleClass("checkbox_box_check");
		$(this).toggleClass("checkbox_box_uncheck");
	});
	$(".submit").click(function(event){
		if(ifBlank())
			if(ifPhone())
				if(ifEmail())
				{
						var $aimString='';
						console.log("success");
						if($("#aim1").parent().attr("class")=="checkbox_box checkbox_box_check")
							$aimString+='比赛/';
						if($("#aim2").parent().attr("class")=="checkbox_box checkbox_box_check")
							$aimString+='创业/';
						if($("#aim3").parent().attr("class")=="checkbox_box checkbox_box_check")
							$aimString+='兴趣';

						//alert($aimString);
						$.ajax({
							url:"./php/index.php",
							type:"post",
							data:{
                                class:"Team",
                                action:"setNewTeam",
                                projectname:$name.val(),
                                introduction:$("textarea[name='introduce']").val(),
                                requirement:$("textarea[name='requirement']").val(),
                                phone:$phone.val(),
                                email:$email.val(),
                                qq:$("input[name='qq']").val(),
                                weChat:$("input[name='weChat']").val(),
                                link:$("input[name='linkIntro']").val(),
                                aim:$aimString,
								},
							success:function(data){
								window.location.href="./personTeamManager.html";
							}
						});
				}
	});
	function ifBlank()
	{
		if(!ifBlank_one($name,"团队名称不能为空")) return 0;
		if(!ifBlank_one($phone,"电话号码不能为空")) return 0;
		if(!ifBlank_one($email,"电子邮箱不能为空")) return 0;
		if(!ifchecked()) return 0;
		return 1;
	}
	function ifBlank_one($input,$string)
	{
		if($input.val()=='')
		{
			alert($string);
			return 0;
		}
		return 1;
	}
	function ifchecked()
	{

		$aim=$("input[name='aim']:checked");
		if($aim.length>0) return 1;
		alert("请选择项目目的");
		return 0;
	}
	function ifPhone()
	{
		var exp=/^1[34578]\d{9}$/;
		if(!(exp.test($phone.val())))
		{
			alert("电话格式错误");
			return 0;
		}
		return 1;
	}
	function ifEmail()
	{
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		if(reg.test($email.val()))
			return 1;
		else
			{
				alert("Email格式错误");
				return 0;
			}
	}
})
