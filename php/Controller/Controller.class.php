<?php
class Controller{
	protected $_controller;
	protected $_action;
	protected $_view;
	
	function __construct($controller,$action){
		session_start();
		$this->_controller=$controller;
		$this->_action=$action;
		$this->_view=new View();
		
		$user=new UserModel();
		if(!$user->_isLink){
			$this->set('state', 'Connecting Error');
			exit(0);
		}
		if(!method_exists($this,$action)){
			$this->set('state', 'Wrong Action');
			exit(0);
		}else $this->$action();
	}
	function postCheck($paraNames){
		$len=count($paraNames);
		for($i=0;$i<$len;$i++){
			if(!isset($_POST[$paraNames[$i]])){
				$this->set('state', 'Missing Argument');
				exit(0);
			}
		}
	}
	function set($name,$value){
		$this->_view->set($name,$value);
	}
	function success(){
		$this->set('state', 'Success');
	}
	function __destruct(){
		$this->_view->send();
	}
	
}