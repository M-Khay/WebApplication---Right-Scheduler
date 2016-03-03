<?php
session_start();
session_unset();

include_once 'mysql_connect.php';

$email = mysqli_real_escape_string($conn, $_POST['loginEmail']);
$password = mysqli_real_escape_string($conn, $_POST['loginPsw']);

$sql = "SELECT * FROM USERS WHERE email = '$email'";

$result = mysqli_query($conn, $sql);

$user = mysqli_fetch_array($result);

if($user['password'] == $password) {
	$_SESSION['user'] = $user['email'];
    header("Location: calendar.php");
    exit();
} else {
	?>
	<script>alert('wrong details');</script>
    <?php
}

?>
