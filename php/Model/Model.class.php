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
	/* 返回选中列的二维数组*/
	function setNewArrays($old,$columns){
		$newArray=array();
		$count=count($old);
		$count_col=count($columns);
		for($i=0;$i<$count;$i++){
			for($j=0;$j<$count_col;$j++){
				$newArray[$i][$columns[$j]]=$old[$i][$columns[$j]];
			}
		}
		return $newArray;
	}
	/* 返回选中列的一位数组*/
	function setNewArray($old,$columns){
		$newArray=array();
		$count=count($columns);
		for($i=0;$i<$count;$i++){
			$newArray[$columns[$i]]=$old[$columns[$i]];
		}
		return $newArray;
	}
}
?>