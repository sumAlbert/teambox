<?php
defined('ROOT') or define('ROOT', __DIR__.'/');
defined('APP_PATH') or define('APP_PATH', dirname($_SERVER['SCRIPT_FILENAME']).'/');
//defined('CONFIG_PATH') or define('CONFIG_PATH', APP_PATH.'config/');
//defined('RUNTIME_PATH') or define('RUNTIME_PATH', APP_PATH.'runtime/');
require APP_PATH."config.php";
require APP_PATH."Loader.class.php";

/*$mysqli=mysqli_connect(HOSTNAME,DBUSER,DBPASSWORD,DBNAME);
echo mysqli_connect_errno();
echo $mysqli->query("insert into `user` (email,password) values('aa','aa')");*/
$_POST['class']='User';//class name
$class=$_POST['class'];
$loader=new Loader($class);

$modelName=$class.'Model';

$model=new UserModel();
$result=$model->signUp("abca","aabc");

unset($model);
echo json_encode($result);

?>