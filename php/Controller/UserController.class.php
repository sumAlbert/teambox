<?php
class UserController extends Controller{
	/*获取（一位）用户具体信息*/
	function getUserInfo(){
		$id=$_SESSION['id'];
		$user=new UserModel($HOSTNAME, $DBUSER, $DBPASSWORD, $DBNAME);
		$result=$user->getUserInfo($id);
		$this->set("state","success");
		$this->set("result", $result);
	}
}
?>