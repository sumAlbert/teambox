<?php

class Sql {
	protected $_dbLink;//sql链接对象
	protected $_result;//用于获取对sql进行select操作得到的结果
	
	/* 连接数据库  */
	function connect($hostName=HOSTNAME,$dbUser=DBUSER,$dbPassWord=DBPASSWORD,$dbName=DBNAME){
		//echo $hostName.$dbName.$dbPassWord.$dbName;
		$this->_dbLink=new mysqli($hostName,$dbUser,$dbPassWord,$dbName);
		if(mysqli_connect_errno())
			return 0;//连接失败
		else{
			$this->_dbLink->query("set names 'utf8'");
			return 1;
		}
	}
	
	/* 关闭数据库 */
	function  disconnect(){
		if($this->_dbLink==NULL) return 0;
		mysqli_close($this->_dbLink);
		return 1;
	}
	
	/* 获取查询的内容 */
	function getResult(){
		return $this->_result;
	}
	
	/*查询 表内 所有数据*/
	function selectAll($tableName){
		$this->_result=array();
		if($this->_dbLink==NULL) return 0;
		
		$select="select * from `$tableName`";
		$res=$this->_dbLink->query($select);
		
		if($res == false) return 0;//查询失败
		
		
		$i=0;
		while($row=$res->fetch_assoc()){
			$this->_result[$i]=$row;
			$i++;
		}
		return 1;
	}
	
	/*根据值查询内容*/
	function selectItem($tableName,$column,$value){
		$this->_result=array();
		if($this->_dbLink==NULL) return 0;
		if(is_string($value)) $value="'".$value."'";
		$select="select * from `$tableName` where `$column` = $value ";
		$res=$this->_dbLink->query($select);
		
		if($res == false) return 0;//查询失败
		
		$i=0;
		while($row=$res->fetch_assoc()){
			$this->_result[$i]=$row;
			$i++;
		}
		return 1;
		
	}
	
	/*根据多个条件and后查询内容*/
	function selectItem2($tableName,$columes,$values){
		$this->_result=array();
		if($this->_dbLink==NULL) return 0;
		$values=$this->cleanParas($values);
		$select="select * from `$tableName` where ";
		for($i=0;$i<count($columes);$i++){
			$select=$select."`$columes[$i]` = $values[$i] ";
			if($i!=count($columes)-1) $select=$select."and "; 
		}
		
		$res=$this->_dbLink->query($select);
		
		if($res == false) return 0;//查询失败
		
		$i=0;
		while($row=$res->fetch_assoc()){
			$this->_result[$i]=$row;
			$i++;
		}
		return 1;
	}
	/*插入内容*/
	function  insertItem($tableName,$columns,$values){
		if($this->_dbLink==NULL) return 0;
		$values=$this->cleanParas($values);
		$insert="insert into `$tableName` (";
		$len=count($columns);
		for ($i=0;$i<$len;$i++){
			$insert=$insert."$columns[$i]";
			if($i!=$len-1) $insert=$insert.",";
		}	
		$insert=$insert.") values(";
		for ($i=0;$i<$len;$i++){
			$insert=$insert."$values[$i]";
			if($i!=$len-1) $insert=$insert.",";
		}
		$insert=$insert.")";
		//echo $insert;
		$res=$this->_dbLink->query($insert);
		if($res == false) return 0;
		else return 1;
	}
	
	/*修改内容*/
	function updateItem($tableName,$columns,$values,$keyCol,$keyVal){
		if($this->_dbLink==NULL) return 0;
		$values=$this->cleanParas($values);
		$update="update `$tableName` set ";
		$len=count($columns);
		for($i=0;$i<$len;$i++){
			$update=$update."`$columns[$i]`=$values[$i]";
			if($i!=$len-1) $update=$update.",";
		}
		$update=$update." where `$keyCol`=$keyVal";
		
		$res=$this->_dbLink->query($update);
		if($res == false) return 0;
		else return 1;
	}
	
	/*删除内容*/
	function deleteItem($tableName,$column,$value){
		if($this->_dbLink==NULL) return 0;
		if(is_string($value)) $value="'".$value."'";
		$delete="delete from `$tableName` where `$column` = $value";
		$res=$this->_dbLink->query($delete);
		if($res == false) return 0;//查询失败
		else return 1;
	}
	/*删除内容2*/
	function deleteItems($tableName,$columns,$values){
		$values=$this->cleanParas($values);
		if($this->_dbLink==NULL) return 0;
		$count=count($columns);
		$delete="delete from `$tableName` where ";
		for($i=0;$i<$count;$i++){
			$delete=$delete."`$columns[$i]` = $values[$i]";
			if($count >1 && $i<$count-1){
				$delete=$delete.' and ';
			}
		}
		$res=$this->_dbLink->query($delete);
		if($res == false) return 0;
		else return 1;
	}
	/*为参数中的字符串加引号*/
	function cleanParas($para){
		$count=count($para);
		for($i=0;$i<$count;$i++){
			if(is_string($para[$i]))
				$para[$i]="'".$para[$i]."'";
		}
		return $para;
	}
}

?>