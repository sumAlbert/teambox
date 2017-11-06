<?php
class TeamController extends Controller{
	/* 建立新的任务
	 * Post参数:
	 * teamId
	 * date
	 * starttime
	 * endtime
	 * taskname
	 * task
	 * importance
	 * 返回值：
	 * state
	 */
	function setTask(){
		$keys=array("teamId","date","starttime","endtime","taskname","task","importance");
		$this->postCheck($keys);
		$info=array();
		for($i=0;$i<count($keys);$i++){
			$info[$keys[$i]]=$_POST[$keys[$i]];
		}
		$team=new TeamModel();
		$result=$team->setTask($info);
		if(!$result){
			$this->set('state', 'Fail');
			exit(0);
		}
		$this->success();
	}
	/* 获取团队的任务
	 * Post参数:
	 * 'teamid'团队id
	 * 
	 * 返回值:
	 * 'state':'Success'/'Fail'
	 * 'result':[{},]
	 */
	function getTask(){
		$this->postCheck(array("teamid"));
		$teamid=$_POST['teamid'];
		$team=new TeamModel();
		$result=$team->getTask($teamid);
		if(empty($result)){
			$this->set('state', 'Fail');
			exit(0);
		}
		$this->success();
		$this->set('result', $result);
	}
	/* 获取用户创建的团队的ID以及name
	 * checked
	 * Post参数:
	 * 无
	 * 
	 * 返回值:
	 * 'state':'Success'/'Fail'
	 * 'result':[{'id':,'projectname':},]
	 */
	function getSelfTeam(){
		$id=$_SESSION['user_id'];
		$team=new TeamModel();
		$result=$team->getSelfTeam($id);
		$this->success();
		$this->set('result',$result);
	}
	/* 获取用户加入的团队ID以及name
	 * checked
	 * Post参数:
	 * 无
	 * 
	 * 返回值：
	 * 'state':'Success'
	 * 'result':[{'id':,'projectname':},]
	 */
	function getJoinedTeam(){
		$id=$_SESSION['user_id'];
		$team= new TeamModel();
		$result=$team->getJoinedTeam($id);
		$this->success();
		$this->set("result",$result);
	}
	/* 获取一个团队的信息
	 * checked
	 * Post参数:
	 * id(团队id)
	 * 
	 * 返回值:
	 * 'state':'Success'/'Fail'
	 * 'reault':{}
	 */
	function getTeamInfo(){
		$this->postCheck(array("id"));
		$id=$_POST['id'];
		$team=new TeamModel();
		$result=$team->getTeamInfo($id);
		if(empty($result)){
			$this->set('state', 'Fail');
			exit(0);
		}
		$this->success();
		$this->set('result',$result);
	}
	/* 获取团队的成员信息
	 * checked
	 * Post参数:
	 * id(团队id)
	 * 
	 * 返回值:
	 * 'state':'Success'/'Fail'
	 * 'result':[{'id':,'username':,'email':},]
	 * 
	 */
	function members(){
		$this->postCheck(array("id"));
		$id=$_POST['id'];
		$team=new TeamModel();
		$result=$team->members($id);
		$this->success();
		$this->set('result', $result);
	}
	/* 创建新的团队
	 * checked
	 * 
	 * Post参数:
	 * projectname 项目名
	 * introduction 介绍
	 * requirement 需求
	 * aim 目的
	 * phone 
	 * email 
	 * qq
	 * weChat
	 * link
	 * 
	 * 返回值:
	 * 'state'
	 * 
	 */
	function setNewTeam(){
		$this->success();
		$keys=array("projectname","introduction","requirement",
				"aim","phone","email","qq","weChat","link");
		$this->postCheck($keys);
		$info=array();
		for($i=0;$i<count($keys);$i++){
			$info[$keys[$i]]=$_POST[$keys[$i]];
		}
		$info["leadernumber"]=$_SESSION['user_id'];
		$team=new TeamModel();
		$result=$team->setNewTeam($info);
		if($result){
			$this->success();
			//$this->set(, $value)
		}else{
			$this->set("state", "Fail");
		}
		
	}
	/*  获取团队列表
	 *  checked
	 *  Post参数:
	 *  'key' 关键词搜索
	 *  'selections' json编码的数组
	 *  'page'
	 *  返回值:
	 *  'state':'Fail'/'Success'
	 *
	 */
	function findTeam(){
		$this->postCheck(array("selections","key","page"));
		$team=new TeamModel();
		$key=null;
		$key=$_POST['key'];
		$selections=json_decode($_POST['selections']);
		$page=$_POST['page'];
		if(!isset($_SESSION['user_id'])) $id=-1;
		else $id=$_SESSION['user_id'];
		$result=$team->findTeam($key,$selections,$page,$id);
		$this->success();
		$this->set('result', $result);
	}
	
	function inviteUser(){
		$this->postCheck("teamId","userEmail");
		$team=new TeamModel();
		$teamId=$_SESSION['teamId'];
		$userEmail=$_SERVER['userEmail'];
		$result=$team->inviteUser($teamId, $userEmail);
		if(!$result){
			$this->set("state", "Wrong Email");
		}else{
			if($result<0){
				$this->set("state", "Invited");
			}else{
				$this->success();
			}
		}
	}
	
	function sendEmail(){
		
	}
}
?>