<?php

session_start();

if (!isset($_SESSION['user'])) {
	header("Location: logout.php");
}

// Connect to MySql
include_once 'mysql_connect.php';

// Get user to view
$user = $_SESSION['user'];

mysqli_select_db($conn, "USERS");

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
    }
} else {
    echo "No results";
}

?>

<!DOCTYPE html>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/Sceleton.css">
		<link rel="stylesheet" type="text/css" href="css/prof.css">
		<link href='http://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>
		<meta charset="utf-8"/>
		<TITLE></TITLE>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script	src = "js/profedit.js" ></script>
		
	</head>
	
	<div class="header">
	
	<div id="logo"> </div>
	
	<nav><ul>
			<a href="Dashboard.php"><li class="active" >Dashboard</li></a>
			<a href="Schedule.html" ><li >Schedule</li></a>
			<a href="SearchAvail.html"><li>Search Avail</li></a>
			<a href="Coworker.html"><li>Co-Worers</li></a>
			<a href="prof1.php"><img src="img/corner.jpg" > </img></a>
			
		</ul></nav>
	
	
	</div>
	
	<div class="sidebar">
		
	<nav><ul>
			<a href="Dashboard-inbox.php"><li  >Inbox</li></a>
			<a href="prof1.php"  ><li class  = active>Profile</li></a>
			<a href="Availability.html" ><li>Avalability</li></a>
			<a href="Support.html"  ><li>Support</li></a>
			<a href="logout.php" ><li>Logout</li></a>
			
		</ul></nav>
	
	
	</div>
	
	
<div id = background>

<div class = details>
<a id = oview href = "prof1.php">&nbsp &nbsp &nbsp &nbsp Overview  >>  &nbsp &nbsp &nbsp &nbsp </a>
<a id = edprof href = "profedit.php">&nbsp  &nbsp &nbsp Edit Profile >> &nbsp &nbsp &nbsp  </a>
</div>	
 
 <div id = aboutme>
 <p id = AboutMe >
 <b style="font-size:1.3vw"> About me  </b><br>
</p><br><br>

 <div id = detfont>
 <table style ="width:500px ; cellspacing : 10px; padding: 0%; padding-left : 10%">
 <tr>
    <td><b>Name:</b></td>
    <td><p id = "nam" style = "margin : 0;" ><?php echo $fullname?></p></td>		
 </tr>
  <tr>
    <td><b>ID:</b></td>
    <td><p id = "ID" style = "margin:0;"><?php echo $id?></p></td>		
  </tr>
  <tr>
    <td><b>Username:</b></td>
    <td><p id = "Usernam" style = "margin:0;"><?php echo $email?></p></td>		
 </tr>
 <tr>
    <td><b>Mobile:</b></td>
    <td><p id = "Mobile" style = "margin:0px;" ><?php echo $mobile?></p></td>		
 </tr>
 <tr>
    <td><b>Email:</b></td>
    <td><p id = "Email" style = "margin:0px;"><?php echo $email?></p></td>		
 </tr>
 <tr>
    <td><b>Position:</b></td>
    <td><p id = "Position" style = "margin:0px;"><?php echo $position?></p></td>		
 </tr>
 
</table>
</div>
 </div>
 <div id = responsibilities>
 
 <p id = resp >
 <b style="font-size:1.3vw"> Responsibilities  </b><br>
</p>
 </div>
 
 <div id = cont>
 <pre id = contdet>
           Contact  
</pre>		   
 </div>
 <div id = Namebanner>
 <pre id = Name>
                                 <?php echo $fullname ?>            
 </pre>
 </div>
 
 
 
</div>
	</body>
	
</html>