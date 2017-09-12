<?php
class UserController extends Controller{
	/*获取（一位）用户具体信息*/
	function getUserInfo(){
		$id=$_SESSION['id'];
		$user=new UserModel();
		$result=$user->getUserInfo($id);
		$this->success();
		$this->set("result", $result);
	}
	function favorite(){
		$user=new UserModel();
		$result=$user->favorite();
		$this->success();
		$this->set("result",$result);
	}
	function login(){
		
	}
}
?>