<?php
class UserModel extends Model{
	const table="user";
	function selectAllUsers(){
		$this->selectAll(self::table);
		return $this->_result;
	}
	
	function selectUser($id){
		$this->selectItem(self::table, "id", $id);
		return $this->_result[0];
	}
	/*获取（一位）用户信息*/
	function getUserInfo($id){
		return $this->selectUser($id);
	}
	/*用户注册*/
	function signUp($email,$password){
		$this->selectItem(self::table, "email", $email);
		if(!empty($this->_result)){
			return 0;
		}
		else{
			$columns=array("email","password");
			$values=array("'$email'","'$password'");
			$this->insertItme(self::table,$columns,$values);
			
			return 1; 
		}
	}
	/*用户登录*/
	function logIn($email,$password){
		$this->selectItem(self::table, "email", $email);
		if(empty($this->_result)){
			return 0;
		}
		else if($password!=$this->_result['password']){
			return 0;
		}
		$_SESSION['user_id']=$this->_result['id'];
		$_SESSION['user_email']=$email;
		$_SESSION['user_name']=$this->_result['username'];
		return 1;
		
	}
	/*获得用户ID*/
	function getId($email){
		//$email=$_SESSION['user_email'];
		$this->selectItem(self::table, "email", $email);
		return $this->_result['id'];
	}
	
	/*收藏夹*/
	function favorite($id){
		//$id=$this->getId();//获取用户id
		
		$this->selectItem('relation', 'firstid', "$id");//从关系表中寻找用户收藏
		$result=$this->_result;
		$favor_user=array();
		$favor_team=array();
		for($i=0;$result[$i]!=null;$i++){//筛选用户收藏
			if($result[$i]['relation'] != 'favorite') continue;
			if($result[$i]['secondtype'] == "user")
				array_push($favor_user,$result[$i]['secondid']);
			else
				array_push($favor_team,$result[$i]['secondid']);
		}
		$result=array();//存储最终结果
		$result['user']=array();
		$result['team']=array();  
		
		for($i=0;$i<count($favor_user);$i++){
			$this->selectItem("user", 'id', $favor_user[$i]);
			$result['user'][$i]=$this->_result[0];
		}
		for($i=0;$i<count($favor_team);$i++){
			$this->selectItem("team", 'id', $favor_team[$i]);
			$result['team'][$i]=$this->_result[0];
		}
		return $result;
	}
	
	/*修改用户信息*/
	function updateInfo($id,$info){
		$columns=array_keys($info);
		$values=array_values($info);
		return $this->updateItme('user', $columns, $values, 'id', $id);

	}
}

?>