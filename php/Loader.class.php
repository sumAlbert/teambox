<?php
class Loader{
	function __construct(){
		$this->loadBaseClass();
		$class=$_POST["class"];
		$this->loadClass($class);
	}
	function loadBaseClass(){
		$EXT='.class.php';
		require APP_PATH.'Model/Sql'.$EXT;
		require APP_PATH.'Model/Model'.$EXT;
		require APP_PATH.'View/View'.$EXT;
		require APP_PATH.'Controller/Controller'.$EXT;
	}
	function loadClass($class){
		$EXT='.class.php';
		$controller=APP_PATH.'Controller/'.$class.'Controller'.$EXT;
		$model=APP_PATH."Model/".$class.'Model'.$EXT;
		
		if(file_exists($controller) && file_exists($model)){
			require $controller;
			require $model;
		}else{
			//echo "{'state':'Wrong Class'}";
			$result=array();
			$result['state']='Wrong Class';
			echo json_encode($result);
			exit(0);
		}
	}
}
?>