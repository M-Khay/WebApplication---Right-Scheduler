<?php

session_start();

if (!isset($_SESSION['user'])) {
	header("Location: logout.php");
}

// Connect to MySql
include_once 'mysql_connect.php';

// Get user to view
$user = $_SESSION['user'];

// Make select query
$sql = "SELECT * FROM USERS WHERE email = '$user'";
$result = mysqli_query($conn, $sql);

// For all of the users that come back (only one should be returned if tables are being maintained properly)
if (mysqli_num_rows($result) > 0) {
    while($row = mysqli_fetch_assoc($result)) {
        $email = $row['email'];
        $fullname = $row['fullname'];
        $address = $row['address'];
        $zipcode = $row['zipcode'];
        $phone = $row['phone'];
        $mobile = $row['mobile'];
        $picture = $row['picture'];
        $id = $row['id'];
        $position = $row['position'];
        $password = $row['password'];
    }
} else {
    echo "No results";
}

if(isset($_POST['submit_edits'])) {
	$new_fullname = mysqli_real_escape_string($conn, $_POST['fullname']);
    $new_password = mysqli_real_escape_string($conn, $_POST['password']);
    $new_email = mysqli_real_escape_string($conn, $_POST['email']);
    $new_address = mysqli_real_escape_string($conn, $_POST['address']);
    $new_zipcode = mysqli_real_escape_string($conn, $_POST['zipcode']);
    $new_mobile = mysqli_real_escape_string($conn, $_POST['mobile']);

    if ($new_fullname == "") {
    	$new_fullname = $fullname;
    }
    if ($new_password == "") {
    	$new_password = $password;
    }
    if ($new_email == "") {
    	$new_email = $email;
    }
    if ($new_address == "") {
    	$new_address = $address;
    }
    if ($new_zipcode == "") {
    	$new_zipcode = $zipcode;
    }
    if ($new_mobile == "") {
    	$new_mobile = $mobile;
    }

    mysqli_select_db($conn, "USERS");
    $sql = "UPDATE USERS
    		SET email = '$new_email',
    			password = '$new_password',
    			fullname = '$new_fullname',
    			address = '$new_address',
    			zipcode = '$new_zipcode',
    			mobile = '$new_mobile'
    		WHERE email = '$user'";
    $result = mysqli_query($conn, $sql);
    if (!$result) {
    	$error = mysqli_error($conn);
    	?><script>alert("Failed to update table<?php echo $error?>")</script><?php
    } else {
    	header("Location: prof1.php");
    	exit();
    }
}

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title> Profile </title>
	    <link href = "css/prof.css" rel = "stylesheet" type = "text/css">
		<link rel="stylesheet" type="text/css" href="css/Sceleton.css">
		<link href = "css/profedit.css" rel = "stylesheet" type = "text/css">
		<script src = "js/profedit.js">
		
		</script>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script	src = "js/profedit.js" ></script>
		
		
		
	</head>

<div class="header">
	
	<div id="logo"> </div>
	
	<nav><ul>
			<a href="Dashboard.html"><li class="active" >Dashboard</li></a>
			<a href="Schedule.html" ><li >Schedule</li></a>
			<a href="SearchAvail.html"><li>Search Avail</li></a>
			<a href="Coworker.html"><li>Co-Workers</li></a>
			<a href="prof1.php"><img src="img/corner.jpg" > </img></a>
		</ul></nav>
	
	
	</div>
	
	<div class="sidebar">
		
	<nav><ul>
			<a href="Dashboard-inbox.php"><li  >Inbox</li></a>
			<a href="prof1.php"  ><li class = "active">Profile</li></a>
			<a href="Availability.html" ><li>Avalability</li></a>
			<a href="Support.html"  ><li>Support</li></a>
			<a href="Home Page.html" ><li>Logout</li></a>
			
		</ul></nav>
	
	
	</div>
<div id = background >

<div class = details>

<a id = oview href = "prof1.php">&nbsp &nbsp &nbsp &nbsp Overview  >>  &nbsp &nbsp &nbsp &nbsp</a>
<a id = edprof href = "profedit.php">&nbsp  &nbsp &nbsp Edit Profile >> &nbsp &nbsp &nbsp </a>
</div>	


<div id = Editbg>
 
<form id="EditForm" method="POST">
			<ul style="list-style-type:none">
			<li>
			<div id="UName"><p>Name</p>	</div>
			</li>
			<li>
			<div id="UserName"><input type = "text" id="Fname" name="fullname" placeholder= "<?php echo $fullname?>"  autocomplete="off" style="color:#888;" tabindex = 1 autofocus>	</div>
			</li>
			<li>
			<div id="Uline1"><p>________________________________________________________________________</p>	</div>
			</li>			
			<li>
			<div id="Pwd"><p>Password</p>	</div>
			</li>
			<li>
			<div id="Password"><input type = "password" id="Pword" name="password" placeholder = "Password" style="color:#888;" tabindex = 2 ></div>
			</li>
			<li>
			<div id="Uline2"><p>________________________________________________________________________</p>	</div>
			</li>
			<li>
			<div id="Eml"><p>Email</p></div>
			</li>
			<li>
			<div id="EmailAddress"><input type="text" id="Em" name="email" placeholder= "<?php echo $email?>" style="color:#888;" tabindex = 3 ></div>
			</li>
			<li>
			<div id="Uline3"><p>________________________________________________________________________</p>	</div>
			</li>
			<li>
			<div id="Addrs"><p>Address</p>	</div>
			</li>
			<li>
			<div id="Address"><input type = "text" id="Addr" name="address" placeholder = "<?php echo $address?>" style="color:#888;" tabindex = 5></div>
			</li>
			<li>
			<div id="Uline4"><p>________________________________________________________________________</p>	</div>
			</li>
			<li>
			<div id="Zcode"><p>Zip Code</p>	</div>
			</li>
			<li>
			<div id="Zipcode"><input type = "text" id="Pin" name="zipcode" placeholder = "<?php echo $zipcode?>" style="color:#888;" tabindex = 6></div>
			</li>
			<li>
			<div id="Uline5"><p>________________________________________________________________________</p>	</div>
			</li>
			<li>
			<div id="Mnum"><p>Mobile number</p>	</div>
			</li>
				
			<li>
			<div id="MobileNumber"><input type = "tel" id="Mobil" name="mobile" placeholder= "<?php echo $mobile?>" style="color:#888;" tabindex = 8></div>
			</li> 
			<li>
			<div id="Uline6"><p>________________________________________________________________________</p>	</div>
			</li>
			
			
			<li><div id="Btn"><input type = "submit" name ="submit_edits" id="submit"  value="submit" tabindex = 10></div></li>
			
			</ul>
			</form>
	
 
	</div>

 
 
 
 <div id = cont>
 <pre id = contdet>
           Contact  
</pre>		   
 </div>
 <div id = Namebanner>
 <pre id = Name>
                                 Edit Information           
 </pre>
 </div>
 
 
 
</div>
</body>	