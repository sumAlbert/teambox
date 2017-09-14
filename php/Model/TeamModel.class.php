<?php
class TeamModel extends Model{
	const table = "team";
	function selectTeam($id){
		$this->selectItem(self::table,"id", $id);
		return $this->_result;
	}
	/*通过teamid获取成员信息*/
	function members($teamId){
		$columns=array("secondid","secondtype");
		$values=array("$teamId","'team'");
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
			array_push($memberInfo,$this->_result[0]);
		}
		return $memberInfo;
	}
	/*通过teamid获取任务信息*/
	function getTask($teamId){
		$this->selectItem("task","teamid", $teamId);
		return $this->_result;
	}
<<<<<<< HEAD
	/*function setTask($teamId,$date,$starttime,$endtime,$taskname,$task,$importance){
		$columns=array("teamid","date","starttime","endtime","taskname","task","importance");
		$values=array("teamid","'date'","'");
=======
	/*为team建立新的task*/
	function setTask($teamId,$date,$starttime,$endtime,$taskname,$task,$importance){
		$columns=array("teamId","date","starttime","endtime","taskname","task","importance");
		$values=array("teamId","'date'","'");
>>>>>>> origin/master
		$this->insertItme("task", $columns, $values);
	}*/
}