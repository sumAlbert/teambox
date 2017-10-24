<?php
class TeamController extends Controller{
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
		$result=$team->getSelfteam($id);
		$this->success();
		$this->set('result',$result);
	}
	/* 获取一个团队的信息
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
	 * Post参数:
	 * id(团队id)
	 * 
	 * 返回值:
	 * 'state':'Success'/'Fail'
	 * 'result':[{'id':,'username',...},]
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
}
?>