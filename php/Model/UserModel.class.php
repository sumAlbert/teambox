<?php
class UserModel extends Model{
	const table="user";
	/*checked*/
	function selectAllUsers(){
		$this->selectAll(self::table);
		$result=$this->_result;
		$final=array();
		$count=count($result);
		for($i=$j=0;$i<$count;$i++){
			if($result[$i]['visible']=='yes'){
				$final[$j]=$result[$i];
				$j++;
			}
		}
		return $final;
	}
	/*checked*/
	function selectUser($id){
		$this->selectItem(self::table, "id", $id);
		return $this->_result[0];
	}
	/*获取用户完整信息 checked */
	function getSelfInfo($id){
		$result=$this->selectUser($id);
		return $result;
	}
	/*获取（不含隐藏）用户信息 checked*/
	function getUserInfo($id){
		$result=$this->selectUser($id);
		
		if($result['name_v']!='yes') $result['username']='';
		if($result['college_v']!='yes') $result['college']='';
		if($result['phone_v']!='yes') $result['phone']='';
		if($result['qq_v']!='yes') $result['qq']='';
		if($result['weChat_v']!='yes') $result['weChat']='';
		return $result;
	}
	/*用户注册 checked*/
	function signUp($email,$password){
		$this->selectItem(self::table, "email", $email);
		if(!empty($this->_result)){
			return 0;
		}
		else{
			$columns=array("email","password");
			$values=array("$email","$password");
			$this->insertItem(self::table,$columns,$values);
			
			return 1; 
		}
	}
	/*用户登录 checked*/
	function logIn($email,$password){
		$this->selectItem(self::table, "email", $email);
		$this->_result=$this->_result[0];
		//echo json_decode('11');
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
		return $this->_result[0]['id'];
	}
	
	/*收藏夹 user_checked*/
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
		
		for($i=$j=0;$i<count($favor_user);$i++){
			$temp=$this->getUserInfo($favor_user[$i]);
			if($temp['visible']=='yes'){
				$result['user'][$j]=$temp;
				$j++;
			}		
		}
		for($i=0;$i<count($favor_team);$i++){
			$this->selectItem("team", 'id', $favor_team[$i]);
			$result['team'][$i]=$this->_result[0];
		}
		return $result;
	}
	/* 翻转收藏  checked*/
	function favoriteChange($userid,$type,$secondid){
		//检测secondid
		$this->selectItem($type,'id',$secondid);
		$result=$this->_result;
		if(empty($this->_result)) return 0;//secondid不存在
		
		
		$this->selectItem('relation','firstid',$userid);
		$result=$this->_result;
		if(empty($result)) {
			//添加 
			$result=$this->insertItem('relation',array("firstid","secondid","secondtype","relation"),
					array($userid,$secondid,"$type","favorite"));
			return $result;
		}
		$count=count($result);
		$flag=0;
		for($i=0;$i<$count;$i++){
			if($result[$i]['secondtype']==$type && $result[$i]['relation']='favorite' && $result[$i]['secondid']==$secondid){
				$flag=1;
				break;
			}
		}
		//echo $flag.'a';
		if($flag){
			//删除
			$result=$this->deleteItems('relation',array("firstid","secondid","secondtype","relation"),
					array($userid,$secondid,"$type","favorite"));
			
			return $result;
		}else{
			$result=$this->insertItem('relation',array("firstid","secondid","secondtype","relation"),
					array($userid,$secondid,"$type","favorite"));
			return $result;
		}
		
	}
	/*修改用户信息*/
	function updateInfo($id,$info){
		$columns=array_keys($info);
		$values=array_values($info);
		return $this->updateItem('user', $columns, $values, 'id', $id);
	}
	
	
	/*获取用户群 加权 隐藏信息 checked*/
	function findperson($search,$selections,$page,$user_id){
		$users=$this->selectAllUsers();
		$count=count($users);
		$columns=array('金融/经济','心理','教育','设计/美术','软件/计算机','机械','电子信息工程','航空/飞行器','体健',
				'微信/软文','PS/AI','视频制作','音频制作','PPT制作','英语','日语','法语','韩语',
				'Web前端','数据库','App开发','桌面应用开发','IOS应用开发','Java','PHP','C/C++',
				'语言表达','播音主持','撰文排版','LOL','守望先锋','狼人杀'
		);
		$keys=array('金融/经济','心理','教育','设计/美术','软件/计算机','机械','电子信息工程','航空/飞行器','体健',
				'微信/软文','PS/图像/AI/ps/Ps/Ai/ai','视频/AE/PR','音频/Audition','PPT','英语/English/english','日语','法语','韩语',
				'Web/web/前端','数据库','App/app','桌面/PC/pc','IOS/ios','java/Java/Android','php/PHP','C/C++',
				'语言/表达','播音/主持','撰文/排版/写作/文案','LOL/英雄联盟','守望先锋/OW','狼人/杀人'
		);
		
		for($i=0;$i<$count;$i++){
			//关键字加权
			
			for($j=0;$j<count($columns);$j++){
				$users[$i][$columns[$j]]=$this->setValue($users[$i]['experience'].$users[$i]['other'], $keys[$j]);
			}
			//隐藏信息
			if($users[$i]['name_v']!='yes') $users[$i]['username']='';
			if($users[$i]['college_v']!='yes') $users[$i]['college']='';
			if($users[$i]['phone_v']!='yes') $users[$i]['phone']='';
			if($users[$i]['qq_v']!='yes') $users[$i]['qq']='';
			if($users[$i]['weChat_v']!='yes') $users[$i]['weChat']='';
			//加权求和
			$users[$i]['total']=0;
			if($search!=null){
				$users[$i]['key']=$this->setValue($users[$i]['experience'].$users[$i]['other'], $search)*50;
				$users[$i]['total']+=$users[$i]['key'];
			}
			for($j=0;$j<count($selections);$j++){
// 				echo $selections[$j].$users[$i][$selections[$j]].'\n';
				$users[$i]['total']+=$users[$i][$selections[$j]];
			}
			/*设置收藏*/
			if($user_id<0) $users[$i]['favorite']='no';
			else{
				
				$this->selectItem2("relation",array("firstid","secondtype","secondid","relation"), array($user_id,"user",$users[$i]['id'],"favorite"));
				if($this->_result!=null) $users[$i]['favorite']='yes';
				else $users[$i]['favorite']='no';
			}
			$users[$i]=$this->setNewArray($users[$i], array("id","username","email","education","school","college","phone","qq","wechat","other","experience","total","favorite"));
		}
		
		/*排序*/
		array_multisort(array_column($users,"total"),SORT_DESC,$users);
		
		$result=array();
		
		$offset=($page-1)*6;
		
		for($i=$offset;$i<$page*6 && $i<count($users);$i++){
			$result['users'][$i-$offset]=$users[$i];	
		}
		$result['cur_page']=$page;
		$result['total_page']=ceil(count($users)/6);
		
	
		return $result;
		
	}
	/*为关键词加权*/
	private function setValue($str,$substr){
		$temp='';
		$sum=0;
		for($i=0;$i<strlen($substr);$i++)
		{
			if($substr[$i]!='/') $temp=$temp.$substr[$i];
			if($substr[$i]=='/' || $i== strlen($substr)-1 )
			{
				$sum+=substr_count($str, $temp);
				$temp='';
			}
		}
		return $sum;
	}
	/*更改密码*/
	function changePassWord($id,$oldPasswd,$newPasswd){
		$userInfo=$this->selectUser($id);
		if($oldPasswd != $userInfo["password"]){
			return -1;
		}
		return $this->updateItem(self::table,array("password"),array($newPasswd),"id",$id );
	}
	
	function acceptInvitation($teamId,$email){
		$userid=$this->getId($email);
		$this->selectItem2("relation",
				array("firstid","secondid","secondtype","relation"),
				array($userid,$teamId,"team","invite"));
		//echo json_encode($this->_result);
		if(empty($this->_result)) return 0;
		$relationId=$this->_result[0]['id'];
		return $this->updateItem("relation",
				array("relation"),
				array("join"),
				"id",$relationId);
	}
	
	function declineInvitation($teamId,$email){
		$userid=$this->getId($email);
		$this->selectItem2("relation",
				array("firstid","secondid","secondtype","relation"),
				array($userid,$teamId,"team","invite"));
		//echo json_encode($this->_result);
		if(empty($this->_result)) return 0;
		$relationId=$this->_result[0]['id'];
		return $this->deleteItem("relation", "id", $relationId);
	}
	function getInvitation($teamId,$email){
		
	}


}

?>