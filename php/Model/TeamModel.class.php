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
}