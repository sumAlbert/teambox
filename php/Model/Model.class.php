<?php
class Model extends Sql{
	public $_isLink;
	function __construct($hostName=HOSTNAME,$dbUser=DBUSER,$dbPassWord=DBPASSWORD,$dbName=DBNAME){
		if($this->connect($hostName, $dbUser, $dbPassWord, $dbName))
			$this->_isLink=true;
		else $this->_isLink=false;
		//echo '1'.$this->connect($hostName, $dbUser, $dbPassWord, $dbName).'<br>';//$this->_isLink;
	}
	function __destruct(){
		$this->disconnect();
	}
	
}
?>