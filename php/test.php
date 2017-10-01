<?php
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

$_POST['class']="User";
$_POST['action']="favoriteChange";
session_start();
$_SESSION['user_id']=3;
$_SESSION['user_email']='email';
$_SESSION['user_name']='useaaae';
// $_POST["verify"]=123;
// $_SESSION['Verify_Code']=123;
// session_unset();
$keys=array('type','id');
$values=array('user',7);

for($i=0;$i<count($keys);$i++){
	$_POST[$keys[$i]]=$values[$i];
}
$loader=new Loader();
$class=$_POST['class'];
$action=$_POST['action'];

$controllerName=$class."Controller";
$controller=new $controllerName($class,$action);

echo $_SESSION['user_id'].' ';
// echo $_SESSION['user_email'].' ';
// echo $_SESSION['user_name'].' ';
// session_unset();



?>