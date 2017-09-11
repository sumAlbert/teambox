<?php
class View{
	protected $result;
	function __construct(){
		$this->result=array();
	}
	function set($name,$value){
		$this->result[$name]=$value;
	}
	function send(){
		echo json_encode($this->result);
	}
}