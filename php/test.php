<?php
$a=array('a'=>'a','b'=>'c','c'=>'b');
echo json_encode(array_keys($a)).'</br>';
echo json_encode(array_values($a));
?>