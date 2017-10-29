$(document).ready(function(){
	$login_email=$("input[name='login_email']");
	$login_password=$("input[name='login_password1']");

	$("#login_sub").click(function(){
		if(ifBlank2())
		 if(ifEmail2())
		  if(pass())
		  {
		  	$.ajax({
		  		url:"./php/index.php",
		  		type:"post",
		  		data:
		  		{
		  			class:'User',
		  			action:"logIn",
		  			email:$login_email.val(),
		  			password:$.md5($login_password.val())
		  		},
		  		success:function($ans)
		  		{
		  			if($ans.indexOf('Connecting Error')!=-1)
		  				alert("连接失败");
		  			/*if($ans=='Have not registered')
		  				alert("账号不存在");*/
		  			if($ans.indexOf('Success')!=-1)
		  			{
		  				alert("登录成功");
		  				toindex();
		  				
		  			}
		  			if($ans.indexOf('Fail')!=-1)
		  				alert("账号错误或者密码错误");
		  		},
		  		error:function()
		  		{
		  			alert("出现错误,请稍后重试");
		  		}
		  	});
		  }
	});
	function ifBlank2()
	{
		
		if(!ifBlank_one($login_email,"Email不能为空")) return 0;
		if(!ifBlank_one($login_password,"密码不能为空")) return 0;
		//if(!ifBlank_one($pass2,"密码不能为空")) return 0;
		//if(!$check.is(':checked')){alert("未同意遵守服务协议!");return 0;}
		
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
	function ifEmail2()
	{
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		if(reg.test($login_email.val()))
			return 1;
		else 
			{
				alert("Email格式错误");
				return 0;
			}
	}
	function pass()
	{
		if($login_password.val().length<6){alert("密码长度至少为6位");return 0;}
			else return 1;
	}
	function toindex()
	{
		window.location.href="index.html";
	}
})