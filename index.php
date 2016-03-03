<?php

function insert_user($email, $pass, $fullname, $address, $zipcode, $phone, $mobile, $conn) {
	/*
	 * Called upon registering a user. Inserts the user into the USERS table
	 * and creates a table by their username in order to maintain their
	 * schedule.
	 */
	include_once 'mysql_connect.php';

    mysqli_select_db($conn, "USERS");
    // If we get something returned, then that user exists already
	if(mysqli_num_rows(mysqli_query($conn, "SHOW TABLES LIKE '" . $email . "'")) > 0) { 
		?><script>alert("user already exists!");</script><?php
		return;
	}

	// Insert user into USERS table
	$sql = "INSERT INTO USERS (email, password, fullname, address, zipcode, phone, mobile)
		    VALUES ('$email', '$pass', '$fullname', '$address', '$zipcode', '$phone', '$mobile');";
	
	// If we can insert the user into USERS
	if (mysqli_query($conn, $sql)) {
		// Create user table in messages database
		mysqli_select_db($conn, "SCHEDULES");
		// Create a schedule table for them
		$sql = "CREATE TABLE $email
			    (
		  		 starttime INT NOT NULL,
		         endtime INT NOT NULL,
		         name VARCHAR(20)
		        );";
		// If we can create the schedule table, we're done! Redirect to log in
		if (mysqli_query($conn, $sql)) {
			mysqli_select_db($conn, "MESSAGES");
			// Create a message table for them
			$sql = "CREATE TABLE $email
			    (
		  		 recipient VARCHAR(20) NOT NULL,
		         sender VARCHAR(20) NOT NULL,
		         msg_text VARCHAR(5000) NOT NULL,
		         time_sent DATE NOT NULL
		        );";
		    if (mysqli_query($conn, $sql)) {
		    	// Send them the intro message
		    	$timestamp = time();
		    	$today = date("Y-m-d");
		    	$sql = "INSERT INTO $email (recipient, sender, msg_text, time_sent)
		    		    VALUES ('$email', 'auto-sender', 'Welcome to iCalendar!', '$today')";
		    	mysqli_query($conn, $sql);
	        	header("Location: index.php");
	        	exit();
			}
		} else {
			echo "Failed to create schedule table for new user " . mysqli_error($conn);
			?><script>alert('Failed to create schedule table for new user');</script><?php
		}
	} else {
		echo "Failed to insert $fullname into USERS" . mysqli_error($conn);
		?><script>alert('Failed to register new user');</script><?php
	}
}

session_start();
session_unset();

if(isset($_SESSION['user']) != "") {
	header("Location: landing_page.php");
}

include_once 'php/mysql_connect.php';

if(isset($_POST['submit_button'])) {
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
	$password = mysqli_real_escape_string($conn, $_POST['password']);
	$address = mysqli_real_escape_string($conn, $_POST['address']);
	$zipcode = mysqli_real_escape_string($conn, $_POST['zipcode']);
	$phone = mysqli_real_escape_string($conn, $_POST['phone']);
	$mobile = mysqli_real_escape_string($conn, $_POST['mobile']);

	insert_user($email, $password, $fullname, $address, $zipcode, $phone, $mobile, $conn);
}

if(isset($_POST['login_button'])) {
    $email = mysqli_real_escape_string($conn, $_POST['loginEmail']);
    $password = mysqli_real_escape_string($conn, $_POST['loginPsw']);
    mysqli_select_db($conn, "USERS");
    $sql = "SELECT * FROM USERS WHERE email = '$email'";

    $result = mysqli_query($conn, $sql);

    $user = mysqli_fetch_array($result);

    if($user['password'] == $password) {
    	$_SESSION['user'] = $user['email'];
        header("Location: Dashboard.html");
        exit();
    } else {
    	?>
    	<script>alert('Invalid login');</script>
        <?php
    }
}
?>

<!DOCTYPE html>
<html lang ="en">
<head>
<title> i Calendar</title>
<meta charset="UTF-8">
<meta name="I Calendar" content="HomePage">
<link rel="stylesheet" href="Homepage.css" type="text/css" />
<link rel="stylesheet" href="styles.css" type="text/css" />
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
<script src="js/pop_up.js"></script>
</head>
<body>
<div id="bcg">
</div>
<div class="First">
	<div class="conatiner">
		<img src="img/12.gif" alt="LOGO">
		
		<div id="bar">
			<a href="">
			<div class="square"	id="login">
					LOGIN
			</div></a>
			<a href=""><div class="square" id="getstarted">
					GET STARTED
			</div></a>
		</div>
		
		<div id="mainText">
		<h1 class="large">Incredibly Easy to Use Scheduling Web Application</h1>		
		<p class="medium">iCalendar will save your 80% time on workforce managment and Scheduling</p>
		</div>
	</div>
</div>

<div id ="pop_background">


	</div>

			
			
<div id="background" onload="document.registration.Fullname.focus()">
			<span class="close">&times;</span>
			
			<div id="SignUp"><img src="images/SignUp.png"></div>
			
			<div id="wrap">
			
			<form id="SignUpForm" method="POST">
			<ul>
			<li>
			<div id="User"><img src="images/User.png"></div>
			<div id="UserName">
			<input type = "text" name="fullname" id="Fullname" placeholder= "Full Name"  autocomplete="off" style="color:#888;" tabindex = 1 autofocus>
			</div>
			</li>	
			
			<li>
			<div id="Key"><img src="images/Key.png"></div>
			<div id="Password"><input type = "password" name="password" id="password" placeholder = "Password" style="color:#888;" tabindex = 2 ></div>
			</li>
			
			<li>
			<div id="Email"><img src="images/Email.png"></div>
			<div id="EmailAddress"><input type="text" name="email"id="email" placeholder= "EmailAddress" style="color:#888;" tabindex = 3 ></div>
			</li>
			
			<li>
			<div id="Confirmemail"><img src="images/ConfirmEmail.png"></div>
			<div id="ConfirmEmail"><input type = "text" id="c_email" placeholder= "Confirm email" equalTo='#email' style="color:#888;" tabindex = 4 ></div>
			</li>
			
			
			<li>
			<div id="Location"><img src="images/Location.png"></div>
			<div id="Address"><input type = "text" name="address" id="address" placeholder = "Address" style="color:#888;" tabindex = 5 ></div>
			</li>
			
			<li>
			<div id="MailBox"><img src="images/MailBox.png"></div>
			<div id="Zipcode"><input type = "text" name="zipcode" id="zip" placeholder = "Zipcode" style="color:#888;" tabindex = 6 ></div>
			</li>
			
			<li>
			<div id="Phone"><img src="images/Phone.png"></div>
			<div id="PhoneNumber"><input type = "text" name="phone" id="phone" placeholder = "PhoneNumber" style="color:#888;" tabindex = 7 ></div>
			</li>
			
			<li>
			<div id="mobile"><img src="images/mobile.png"></div>
			<div id="MobileNumber"><input type = "tel" id="mob" name="mobile" placeholder= "mobile number" style="color:#888;" tabindex = 8></div>
			</li>
			
			<li>
			<div id="captcha"><img src="images/captcha.gif"></div>
			<div id="Bar"><input id="captchatext" style = "width:100px; height:20px;" type = "text" tabindex = 9></div>
			
			</li>

			<li><div id="Btn"><input type = "submit" name="submit_button" id="submit_button"  value="submit" tabindex = 10></div></li>
			
			<li> <p id="errormessage"> </p></li>
			</ul>
			</form>
			</div>
		
	</div>
		
 <div id="login_popup">
		<span class="close">&times;</span>
		
		<form id="loginform" method="POST">
		
		<h1>Sign in</h1> 
		<input id="LoginInput" type="text" name="loginEmail" align= "middle" autocomplete="off" placeholder="Email ID" required autofocus>
		<br>
		<input id="LoginPassword" type="password" name="loginPsw" autocomplete="off" placeholder="Password" required>
		<br>
		<button type="submit" name="login_button">Sign In</button>
		</form>
	
	
</div>




<div class="Second">
<div class=conatiner>
		
		<div id="SecondTxt">
		<h1 class="large">Make work simple and easy.</h1>
		<p class="medium">Designed to bring some sanity into a project manager's crazy life,<br>
our team calendar feature makes online project planning effortless.</p>
		
		</div>
		
		<div id="SecondImg">
		<img src="img/Todo.png" alt="TODO PIC">
		
		</div>
		

</div>
</div>

<div class="Third">
	<div id="ThirdImg">
		<img src="img/CalendarPic.png" alt="Calendar PIC">
		
	</div>
	
		<div id="ThirdContainer">
		<h1 class="large">		Plan.<br>
								Tweak.<br>
								Repeat.<br>

		</h1>
		<p>Simply click to modify<br> availability	</p>
		<p>See who's available and <br>who's booked	</p>
		
		<p>Filter your calendar <br> by projects	</p>
		<p>Set Public holidays	</p>
		
		
		<p>Share your calendar </p>
		<p>See availability of your <br>co-workers/employees</p>
		</div>
		
</div>

<div class="Fourth">
<div class=conatiner>
		
		<div id="FourthTxt">
		<h1 class="large">Less planning. More life.</h1>
		<p class="medium">Teamweek budgets your project manager’s hours, saving<br> you in costly overtime billing. Work smarter and enjoy<br> some me time.</p>
		
		</div>
		
		<div id="FourthImg">
		<img src="img/FourthPic.gif" alt="Fourth PIC">
		
		</div>
		

</div>



	

</div>


</body>
</html>