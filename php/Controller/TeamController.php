<?php
class TeamController extends Controller{
	function getTask(){
		$this->postCheck(array("teamid"));
		$teamid=$_POST['teamid'];
		$team=new TeamModel();
		$result=$team->getTask($teamid);
		$this->success();
		$this->set('result', $result);
	}
}
?>