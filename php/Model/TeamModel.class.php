<?php
class TeamModel extends Model{
	const table = "team";
	/*获取一个团队*/
	function getTeamInfo($id){
		$this->selectItem(self::table,"id", $id);
		return $this->_result[0];
	}
	/*通过userid获取创建的团队ID以及name checked*/
	function getSelfTeam($id){
		$this->selectItem(self::table, "leadernumber", $id);
		$res=$this->_result;
		$newres=array();
		for($i=0;$i<count($res);$i++){
			$newres[$i]['id']=$res[$i]['id'];
			$newres[$i]['projectname']=$res[$i]['projectname'];
		}
		return $newres;
	}
	/*获取用户加入的团队checked*/
	function getJoinedTeam($id){
		$columns=array("firstid","secondtype","relation");
		$values=array($id,"team","join");
		//echo json_encode($values);
		$this->selectItem2("relation", $columns, $values);
		$result=$this->_result;
		//echo json_encode($result);
		$teams=array();
		for($i=0;$i<count($result);$i++){
			$teams[$i]=$result[$i]['secondid'];
		}
		
		//$model = new UserModel();
		$result=array();
		$newres=array();
		for($i=0;$i<count($teams);$i++){
			$result[$i]=$this->getTeamInfo($teams[$i]);
			$newres[$i]['id']=$result[$i]['id'];
			$newres[$i]['projectname']=$result[$i]['projectname'];
		}
		return $newres;
	}
	/*通过teamid获取成员信息 checked*/
	function members($teamId){
		$columns=array("secondid","secondtype");
		$values=array($teamId,"team");
		$this->selectItem2("relation", $columns, $values);
		$result=$this->_result;
		$memberId=array();
		for($i=0;$result[$i]!=null;$i++){
			if($result[$i]["relation"] != 'favorite')
				array_push($memberId, $result[$i]['firstid']);
		}
		$memberInfo=array();
		for ($i=0;$i<count($memberId);$i++){
			$this->selectItem("user","id", $memberId[$i]);
			$memberInfo[$i]['id']=$this->_result[0]['id'];
			$memberInfo[$i]['username']=$this->_result[0]['username'];
			$memberInfo[$i]['email']=$this->_result[0]['email'];
			//array_push($memberInfo,$this->_result[0]);
		}
		return $memberInfo;
	}
	
	/*通过teamid获取任务信息*/
	function getTask($teamId){
		$this->selectItem("task","teamid", $teamId);
		return $this->_result;
	}

	/*为team建立新的task*/
	function setTask($info){
		$columns=array_keys($info);
		$values=array_values($info);
		return $this->insertItem("task", $columns, $values);
	}
	
	/*创建新的Team checked*/
	function setNewTeam($info){
		$columns=array_keys($info);
		$values=array_values($info);
		//echo json_encode($info);
		return $this->insertItem("team", $columns, $values);
	}
	/*获取团队群*/
	function findTeam($key,$selections,$page){
		$this->selectAll(self::table);
		$teams=$this->_result;
		$count=count($teams);
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
				$teams[$i][$columns[$j]]=$this->setValue($teams[$i]['projectname'],$keys[$j])*10;
				$teams[$i][$columns[$j]]=$this->setValue($teams[$i]['introduction'],$keys[$j])*5;
				$teams[$i][$columns[$j]]=$this->setValue($teams[$i]['requirement'],$keys[$j])*5;
			}
			//加权求和
			$teams[$i]['total']=0;
			if($search!=null){
				$teams[$i]['key']=$this->setValue($teams[$i]['projectname'],$search)*20;
				$teams[$i]['key']=$this->setValue($teams[$i]['introduction'],$search)*10;
				$teams[$i]['key']=$this->setValue($teams[$i]['requirement'],$search)*10;
				$teams[$i]['total']+=$teams[$i]['key'];
			}
			for($j=0;$j<count($selections);$j++){
				// 				echo $selections[$j].$teams[$i][$selections[$j]].'\n';
				$teams[$i]['total']+=$teams[$i][$selections[$j]];
			}
			$teams[$i]=$this->setNewArray($teams[$i], array("id","date","projectname","introduction","requirement","aim","phone","qq","weChat","link","email"));
		}
		/*排序*/
		array_multisort(array_column($teams,"total"),SORT_DESC,$teams);
		
		$result=array();
		$result['teams']=array_slice($teams,($page-1)*6,6,true);
		$result['cur_page']=$page;
		$result['total_page']=ceil(count($teams)/6);
		
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
}