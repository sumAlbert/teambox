<?php

// $file=($_FILES['file']);
// var_dump($file);
// move_uploaded_file($_FILES['file']['tmp_name'], $_FILES['file']['name']);
// echo $file['error'];
require 'smtp.class.php';
sendEmail("303316727@qq.com","3");
function sendEmail($email,$id){
	//$email_64=base64_encode($email);
	$mailtitle = 'TeamBox团队的邀请';//邮件主题
	$url= 'localhost'.'/requestLink.html?user='.base64_encode($email)."&id=$id";
	$mailcontent =//邮件内容
	"<img></img> <a>$url</a>";
	//$mailtitle = 'TeamBox用户的申请';//邮件主题
	//$mailcontent ='a';//邮件内容
	//******************** 配置信息 ********************************
	$smtpserver = "smtp.163.com";//SMTP服务器
	$smtpserverport =25;//SMTP服务器端口
	$smtpusermail = "15317315332@163.com";//SMTP服务器的用户邮箱
	$smtpemailto = $email;//发送给谁
	$smtpuser = "15317315332@163.com";//SMTP服务器的用户帐号
	$smtppass = "123aaaaaa";//SMTP服务器的用户密码
	$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件
	//************************ 配置信息 ****************************
	$smtp = new smtp($smtpserver,$smtpserverport,true,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.
	$smtp->debug = false;//是否显示发送的调试信息
	$state = $smtp->sendmail($smtpemailto, $smtpusermail, $mailtitle, $mailcontent, $mailtype);
	if($state=="")
		echo 'fail';
		else
		{
			//在此处更改 record
			echo "succeed";
	
		}
}
?>