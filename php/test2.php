<?php

// $file=($_FILES['file']);
// var_dump($file);
// move_uploaded_file($_FILES['file']['tmp_name'], $_FILES['file']['name']);
// echo $file['error'];
$a=array("a","b","c","d","e","f","g");
var_dump($a);
$b=array_slice($a,3,3,true);
var_dump($b);
var_dump(arrayChange($b));
function arrayChange($old){
	$newArray=array();
	$i=0;
	foreach ($old as $key => $value){
		array_push($newArray, $value);
	}
	return $newArray;
}
?>