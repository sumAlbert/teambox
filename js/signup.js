$(document).ready(function(){
	var code="";
	//createCode();
	//$("#checkcode").hover(function(){alert(" ");});
	var $email=$("input[name='email']");
	var $pass1=$("input[name='password1']");
	var $pass2=$("input[name='password2']");
	//var $check=$("input[name='mustread']");
	$(".verify_box>img").click(function(){
		$(this).attr("src","veri_code.php?"+Math.random());
	});
	$("#register_sub").click(function(){
		//alert("a");			
		if(ifBlank())
		if(ifEmail())
		if(ifPass())
		{
			var inputCode = $("#verify").val();
			//alert(code);
			if(inputCode.length<=0)
			{
				alert("请输入验证码");
			}
			else
			{
				//转移至php
				//alert("b");
				$.ajax({
					url:"signup.php",
					type:"post",
					data:{
						email:$email.val(),
						password:$pass1.val(),
						verify:$("#verify").val()
					},
					success:function($ans)
					{
						if($ans.indexOf('succeed')!=-1)
						{
							alert("注册成功");
							//window.location.href="TeamBox.html";
							toindex();
							return 1;
						}
						if($ans.indexOf('Wrong Verify')!=-1)
						{
							alert("验证码错误");
							$(".verify_box>img").attr("src","veri_code.php?"+Math.random());
							return 1;
						}
						if($ans.indexOf('Already Registered')!=-1)
						{
							alert("邮箱已被注册");
							return 1;
						}
						if($ans.indexOf('Link Error')!=-1)
						{
							alert("出现连接错误");
							return 1;
						}
						if($ans.indexOf('fail')!=-1)
						{
							alert("Unknown Error");
							return 1;
						}
						
					},
					error:function()
					{
						alert("出现错误,请稍等");
					}
				});
				}
		}
	});
	function createCode()
	{
		var checkCode=document.getElementById("checkCode");
		var codeRange=new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
		var codeLength=6;
		code="";
		for (var i = codeLength; i > 0; i--)
		{
			var selectIndex=Math.floor(Math.random()*36);
			code+=codeRange[selectIndex];
		}
		if(checkCode)
		{
			checkCode.value=code;
			checkCode.className="code";
		}
	}
	function ifBlank()
	{
		
		if(!ifBlank_one($email,"Email不能为空")) return 0;
		if(!ifBlank_one($pass1,"密码不能为空")) return 0;
		if(!ifBlank_one($pass2,"密码不能为空")) return 0;
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
	function ifPass()
	{
		//var $pas1=$("#password1");
		//var $pas2=$("#password2");
		if($pass1.val()!=$pass2.val())
		{
			alert("两次密码不同");
			return 0;
		}
		if($pass1.val().length<6)
		{
			alert("密码最少6位");
			return 0;
		}
		return 1;
	}
		function toindex()
	{
		window.location.href="index.html";
	}
});
