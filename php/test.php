<?php
//header("Content-type: text/html; charset=ascii");
/*defined('ROOT') or define('ROOT', __DIR__.'/');
defined('APP_PATH') or define('APP_PATH', dirname($_SERVER['SCRIPT_FILENAME']).'/');
//defined('CONFIG_PATH') or define('CONFIG_PATH', APP_PATH.'config/');
//defined('RUNTIME_PATH') or define('RUNTIME_PATH', APP_PATH.'runtime/');
require APP_PATH."config.php";
require APP_PATH."Loader.class.php";

/*$mysqli=mysqli_connect(HOSTNAME,DBUSER,DBPASSWORD,DBNAME);
echo mysqli_connect_errno();
echo $mysqli->query("insert into `user` (email,password) values('aa','aa')");
$_POST['class']='User';//class name
$class=$_POST['class'];
$loader=new Loader($class);
$modelName=$class.'Model';

$model=new UserModel();
$result=$model->favorite(3);

echo json_encode($result);*/

defined('ROOT') or define('ROOT', __DIR__.'/');
defined('APP_PATH') or define('APP_PATH', dirname($_SERVER['SCRIPT_FILENAME']).'/');
//defined('CONFIG_PATH') or define('CONFIG_PATH', APP_PATH.'config/');
//defined('RUNTIME_PATH') or define('RUNTIME_PATH', APP_PATH.'runtime/');
require APP_PATH."config.php";
require APP_PATH."Loader.class.php";

$_POST['class']="Team";
$_POST['action']="getTask";
session_start();
$_SESSION['user_id']=33;
$_SESSION['user_email']='test6@test.com';
$_SESSION['user_name']='王海';
$_POST["teamid"]=83;
$_POST['email']="MzAzMzE2NzI3QHFxLmNvbQ==";
$_POST["userEmail"]='MzAzMzE2NzI3QHFxLmNvbQ==';
$_POST['selections']='["Web前端"]';
// $_POST["verify"]=123;
// $_SESSION['Verify_Code']=123;
// session_unset();
// $keys=array("projectname","introduction","requirement","date",
// 				"aim","phone","email","qq","weChat","link");
// $values=array("projectname","introduction","requirement","1998-01-02",
// 				"aim","1234567","email","1234","weChat","link");

// for($i=0;$i<count($keys);$i++){
// 	$_POST[$keys[$i]]=$values[$i];
// }
$loader=new Loader();
$class=$_POST['class'];
$action=$_POST['action'];
//echo "a";
 $controllerName=$class."Controller";
 $controller=new $controllerName($class,$action);


//echo $_SESSION['user_id'].' ';
// echo $_SESSION['user_email'].' ';
// echo $_SESSION['user_name'].' ';
// session_unset();



?>