<?php

function insert_user($email, $pass, $fullname, $zipcode, $phone, $mobile) {
	/*
	 * Called upon registering a user. Inserts the user into the USERS table
	 * and creates a table by their username in order to maintain their
	 * schedule.
	 */

	// Make a query to try to get that user from the table
    $sql = "SELECT * FROM USERS WHERE email = '$email'";
    $result = mysqli_query($conn, $sql);

    // If we get something returned, then that user exists already
	if (mysqli_num_rows($result) > 0) {	
		?><script>alert("user already exists!");</script><?php
		return;
	}

	// Insert user into USERS table
	$sql = "INSERT INTO USERS (email, password, fullname, address, zipcode, phone, mobile)
		    VALUES ('$email', '$pass', '$fullname', '$zipcode, $phone, $mobile');";
	
	// If we can insert the user into USERS
	if (mysqli_query($conn, $sql)) {
		// Create a schedule table for them
		$sql = "CREATE TABLE $email
			    (
		  		 starttime INT NOT NULL,
		         endtime INT NOT NULL,
		         name VARCHAR(20)
		        );";
		// If we can create the schedule table, we're done! Redirect to log in
		if (mysqli_query($conn, $sql)) {
	        header("Location: login.php");
	        exit();
		} else {
			echo "Failed to create schedule table for new user " . mysqli_error($conn);
			?><script>alert('Failed to create schedule table for new user');</script><?php
		}
	} else {
		echo "Failed to insert $fname $lname into USERS" . mysqli_error($conn);
		?><script>alert('Failed to register new user');</script><?php
	}
}

session_start();
session_unset();

if(isset($_SESSION['user']) != "") {
	header("Location: landing_page.php");
}

include_once 'mysql_connect.php';

$email = mysqli_real_escape_string($conn, $_POST['email']);
$full = mysqli_real_escape_string($conn, $_POST['fullname']);
$password = mysqli_real_escape_string($conn, $_POST['password']);
$address = mysqli_real_escape_string($conn, $_POST['address']);
$zipcode = mysqli_real_escape_string($conn, $_POST['zipcode']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$mobile = mysqli_real_escape_string($conn, $_POST['mobile']);

insert_user($email, $password, $fullname, $address, $zipcode, $phone, $mobile);


?>