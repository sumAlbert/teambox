<?php
defined('ROOT') or define('ROOT', __DIR__.'/');
defined('APP_PATH') or define('APP_PATH', dirname($_SERVER['SCRIPT_FILENAME']).'/');
//defined('CONFIG_PATH') or define('CONFIG_PATH', APP_PATH.'config/');
//defined('RUNTIME_PATH') or define('RUNTIME_PATH', APP_PATH.'runtime/');
require APP_PATH."config.php";
require APP_PATH."Loader.class.php";
$_POST['class']="Test";
$loader=new Loader();
$class="Test"; //$_POST['class'];
$action="testMetho";//$_POST['action'];

$controllerName=$class."Controller";
$controller=new $controllerName($class,$action);

?>