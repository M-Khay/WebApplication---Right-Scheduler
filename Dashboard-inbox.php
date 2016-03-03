<?php

session_start();

// If no current session user, logout
if (!isset($_SESSION['user'])) {
	header("Location: logout.php");
}

// Connect to MySql
include_once 'mysql_connect.php';

// Get user to view
$user = $_SESSION['user'];

mysqli_select_db($conn, "MESSAGES");

// Make select query
$sql = "SELECT * FROM $user WHERE recipient = '$user'";
$result = mysqli_query($conn, $sql);

if (isset($_POST['send_msg'])) {
	$sender = $user;
	$recipient = mysqli_real_escape_string($conn, $_POST['recipient']);
	$msg_text = mysqli_real_escape_string($conn, $_POST['msg_text']);
	$date = date("Y-m-d");

	// Check if recipient exists
	if(mysqli_num_rows(mysqli_query($conn, "SHOW TABLES LIKE '".$recipient."'"))<0) {
		?><script>alert("Recipient does not exist");</script><?php
	} else {
		$sql = "INSERT INTO $recipient (recipient, sender, msg_text, time_sent)
				VALUES ('$recipient', '$sender', '$msg_text', '$date')";
		$send_result = mysqli_query($conn, $sql);
		if ($send_result) {
			?><script>alert("Message sent!");</script><?php
		} else {
			?><script>alert("Message not sent!");</script><?php
		}
	}

}

?>

<!DOCTYPE html>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/Sceleton.css">
		<link rel="stylesheet" type="text/css" href="css/Dashboard-inbox.css">
		<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
		<meta charset="utf-8"/>
		<TITLE></TITLE>
		<script 
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script>
		$(document).on("click", 'ul li', function(){
    $('ul li').removeClass('active');
    $(this).addClass('active');
});
		</script>
	</head>

	<body>
	
	<div class="header">
	
	<div id="logo"> </div>
	
	<nav><ul>
			<a href="Dashboard.php"><li class="active" >Dashboard</li></a>
			<a href="Schedule.html" ><li >Schedule</li></a>
			<a href="SearchAvail.html"><li>Search Avail</li></a>
			<a href="Coworker.html"><"><li>Co-Worers</li></a>
			
			<a href="prof1.php"><img src="img/corner.jpg" > </img></a>
			
		</ul></nav>
	
	
	</div>
	
	<div class="sidebar">
		
	<nav><ul>
			<a href="#" ><li class="active" >Inbox</li></a>
			<a href="prof1.php" ><li >Profile</li></a>
			<a href="Availability.html" ><li>Avalability</li></a>
			<a href="Support.html" ><li>Support</li></a>
			<a href="logout.php" ><li>Logout</li></a>
			
		</ul></nav>
	
	
	</div>
	<div id = inbox>
<h2 style = "color:red"> Messages </h2> <br><br>
	<?php
	if (mysqli_num_rows($result) > 0) {
	    while($row = mysqli_fetch_assoc($result)) {
	        echo "<h3> Message from: " . $row["sender"]. " - sent on " . $row["time_sent"] . "</h3>";
	        echo "       " . $row["msg_text"] . "<br><br>";
	    }
	    echo "</p>";
	} else {
	    echo "<p> No messages</p>";
	}
	?>
	</div>
	<div id="send_msg">
	<form id="send_form" method="POST">
	<input type="text" name="recipient" placeholder="Send To"><br>
	<input type="text" name="msg_text" placeholder="Message">
	<input type="submit" name="send_msg">
	</form>
	</body>
</html>