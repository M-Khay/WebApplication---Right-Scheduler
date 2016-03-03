<?php

$servername = 'localhost';
$username = 'andrew';
$password = 'pR4x8vHjcnJSEbX8';
$dbname = 'users_debug';

// Try to connect to MySql
$conn = mysqli_connect($servername, $username, $password);

if (mysqli_connect_errno()) {
  die("Failed to connect to mysql " . mysqli_error($conn));
}

mysqli_select_db ($conn, $dbname) or die("did not connect");

?>