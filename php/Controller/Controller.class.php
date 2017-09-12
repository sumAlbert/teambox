<?php
class Controller{
	protected $_controller;
	protected $_action;
	protected $_view;
	
	function __construct($controller,$action){
		$this->_controller=$controller;
		$this->_action=$action;
		$this->_view=new View();
		if(!method_exists($this,$action)){
			$this->set('state', 'Wrong Action');
			exit(1);
		}else $this->$action();
	}
	function postCheck($paraNames){
		$len=count($paraNames);
		for($i=0;$i<$len;$i++){
			if(!isset($_POST[$paraNames[$i]])){
				$this->set('state', 'Missing Argument');
				exit(1);
			}
		}
	}
	function set($name,$value){
		$this->_view->set($name,$value);
	}
	function success(){
		$this->set('state', 'success');
	}
	function __destruct(){
		$this->_view->send();
	}
	
}