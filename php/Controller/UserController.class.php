<?php
class UserController extends Controller{
	/*获取当前用户具体信息
	 * checked
	 * Post参数: 无
	 * 
	 * 返回值:
	 *  'state':'Success'(获取成功)
	 *  'result':{}
	 * */
	function getSelfInfo(){
		$id=$_SESSION['user_id'];
		$user=new UserModel();
		$result=$user->getSelfInfo($id);
		$this->success();
		$this->set("result", $result);
	}

	/*  用户注册
	 *
	 * checked
	 * Post参数：
	 *  'verify' 验证码
	 *  'email' 邮箱
	 *  'password' 明文口令
	 * 
	 * 返回值：
	 *  'state':  'Success'(注册成功)/ 'Same Email'(Email被注册) /'Wrong Verify'(验证码错误)
	 * */
	function signUp(){
		$this->postCheck(array("verify","email","password"));
		if($_POST["verify"]!=$_SESSION['Verify_Code']){
			$this->set('state', 'Wrong Verify');
			exit(0);
		}
		$user=new UserModel();
		$password=$_POST['password'];
		$email=$_POST['email'];
		if($user->signUp($email, $password)){
			//注册成功
			$this->success();
			$id=$user->getId($email);
			$_SESSION['user_email']=$email;
			$_SESSION['user_id']=$id;
			$_SESSION['user_name']=$email;
		}
		else{
			//用户名重复
			$this->set('state','Same Email');
		}
	}
	/*  用户登录
	 *  checked
	 * Post参数:
	 *  'email' 邮箱
	 *  'password' md5密码
	 *  
	 *  返回值:
	 *  'state': 'Success'(登录成功) / 'Fail'(错误用户名或密码) / 'Logged'(已经登录)
	 *  
	 */
	function logIn(){
		if(isset($_SESSION['user_id'])){
			//已经登录
			$this->set('state', 'Logged');
			exit(0);
		}
		$this->postCheck(array('email','password'));
		$email=$_POST['email'];
		$password=$_POST['password'];
		$user=new UserModel();
		$result=$user->logIn($email, $password);
		if(!$result){
			$this->set('state','Fail');
			exit(0);
		}
		else{
			$this->success();
		}
	}
	/*  用户注销
	 *  checked
	 *  Post参数:无
	 *  
	 *  返回值:
	 *  'state':'Success'(注销成功) / 'Fail'(未登录)
	 */
	function logOut(){
		if(!isset($_SESSION['user_id'])){
			//未登录
			$this->set('state', 'Fail');
			exit(0);
		}
		unset($_SESSION['user_id']);
		unset($_SESSION['user_email']);
		unset($_SESSION['user_name']);
		session_unset();
		$this->success();
	}
	/*  获取已登录用户的信息
	 *  checked
	 *  Post参数:无
	 *  
	 *  返回值:
	 *  'state': 'Success'(查询成功) / 'Fail'(未登录)
	 *  'result': {'id':'','email':'','username':''}
	 */
	function logged(){
		if(!isset($_SESSION['user_id'])){
			//未登录
			$this->set('state', 'Fail');
			exit(0);
		}
		$result=array('id'=>$_SESSION['user_id'],'email'=>$_SESSION['user_email'],'username'=>$_SESSION['user_name']);
		$this->set('result', $result);
		$this->success();
	}
	/*  修改用户信息
	 *  checked
	 *  Post参数:
	 *   'username' 姓名
	 *   'date' 入学日期
	 *   'education' 学历
	 *   'school' 学校
	 *   'college' 学院
	 *   'phone' 电话
	 *   'email' 邮箱
	 *   'wechat' 微信
	 *   'qq' qq
	 *   'other' 特长
	 *   'experience' 经历
	 *   
	 *   返回值:
	 *   'state': 'Fail'(更新失败) / 'Success'(更新成功)
	 */
	function updateInfo(){
		$keys=array('username','date','education','school','college','phone','email','wechat',
				'qq','other','experience');
		$this->postCheck($keys);
		$info=array();
		for($i=0;$i<count($keys);$i++){
			$info[$keys[$i]]=$_POST[$keys[$i]];
		}
		//echo json_encode($info);
		$user=new UserModel();
		$id=$_SESSION['user_id'];
		if(!$user->updateInfo($id, $info)){
			//更新失败
			$this->set('state', 'Faail');
			exit(0);
		}
		$this->success();
		$_SESSION['user_email']=$info['email'];
		$_SESSION['user_name']=$info['username'];
	
	}
	/* 更改可公开消息
	 * checked
	 * Post参数: 
	 *  'name_v' 姓名公开
	 *  'college_v'学院
	 *  'phone_v'电话
	 *  'qq_v' qq
	 *  'wechat_v'微信
	 *  'state': 'hot'/'warm'
	 *  'visible'  gaiyixiazhushi
	 *  'protection'
	 * 
	 * 返回值:
	 *   'state':'Success'/'Fail'
	 */
	function visibleChange(){
		$keys=array('name_v','college_v','phone_v','qq_v','wechat_v','state','visible','protection');
		$this->postCheck($keys);
		$post=array();
		for($i=0;$i<count($keys);$i++){
			$post[$keys[$i]]=$_POST[$keys[$i]];
			if($post[$keys[$i]]!='yes' && $post[$keys[$i]]!='no'){
				if($keys[$i]!='state'){
					$this->set('state', 'Fail');
					exit(0);
				}
				else if($post[$keys[$i]]!='warm' && $post[$keys[$i]]!='hot'){
					$this->set('state', 'Fail');
					exit(0);
				}
			}
			if($keys[$i]=='state'){
				if($post[$keys[$i]]!='warm' && $post[$keys[$i]]!='hot'){
					$this->set('state', 'Fail');
					exit(0);
				}
			}
			
		}
		$user=new UserModel();
		$id=$_SESSION['user_id'];
		if(!$user->updateInfo($id,$post)){
			//更新失败
			$this->set('state','Fail');
			exit(0);
		}
		$this->success();
	}
	/* 获取用户收藏内容
	 *checked
	 * Post参数: 无
	 *
	 * 返回值:
	 *  'state':'Success'(获取成功)
	 *  'result':{'user':[]},{'team':[]}
	 * */
	function favorite(){
		$user=new UserModel();
		//$email=$_SESSION['user_email'];
		//$id=$user->getId($email);
		$id=$_SESSION['user_id'];
		$result=$user->favorite($id);
		$this->success();
		$this->set("result",$result);
	}
	/* 设置收藏
	 * checked
	 * Post参数:
	 *  'type':'team'/'user'
	 *  'id'
	 *  
	 * 返回值:
	 *  'state':'Fail'/'Success'
	 */
	function favoriteChange(){
		$this->postCheck(array('type','id'));
		$user=new UserModel();
		$userid=$_SESSION['user_id'];
		$type=$_POST['type'];
		$secondid=$_POST['id'];
		if(!$user->favoriteChange($userid, $type, $secondid)){
			$this->set('state', 'Fail');
			exit(0);
		}
		$this->success();
	}
	/*  查询用户群 加权并删除隐私
	 * 
	 *  Post参数: 
	 *  'key' 关键词搜索
	 * 
	 *  返回值:
	 *  'state':'Fail'/'Success'
	 *  
	 */
	function findPerson(){
		$key=null;
		if(isset($_POST['key'])){
			$key=$_POST['key'];
		}
		$user=new UserModel();
		$result=$user->findPerson($key);
		$this->success();
		$this->set('result', $result);
	}
}
?>