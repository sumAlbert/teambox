<?php
class Model extends Sql{
	public $_isLink;
	function __construct($hostName,$dbUser,$dbPassWord,$dbName){
		if($this->connect($hostName, $dbUser, $dbPassWord, $dbName))
			$this->_isLink=true;
		else $this->_isLink=false;
	}
	function __destruct(){
		$this->disconnect();
	}
	
}
?>