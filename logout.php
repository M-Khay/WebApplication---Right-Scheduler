<?php

session_start();
session_unset();

$_POST = array();

header("Location: index.php");

?>