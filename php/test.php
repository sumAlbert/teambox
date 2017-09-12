<?php
echo isset($_POST['b']).'?'.isset($_POST['c']).'?';
if(!isset($_POST['b'])) echo 'no'; else echo'yes';
?>