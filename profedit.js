var nam1 = "Sai Srinivas";
var id = "W1182111";
var email = "serla@scu.edu";
var usernam = email;
usernam = usernam.substring(0, usernam.indexOf('@'));
var position = "supervisor";
var mobile = "4086684755";
var addrs = "2147, Newhallst, SantaClara";
var code = "95050";
var pass = "xxxxxxxx";

function empProfile() {

    var img = document.createElement("img");
    img.src = "http://sharedseeker.com/file/profile_image/default_profile.jpg";
    var image = document.createElement('div');
    image.className = 'ProfImage';
    var imContainer = document.createElement('div');
    imContainer.className = 'totaldetails';


    image.appendChild(img);
    imContainer.appendChild(image);

    document.getElementById('background').appendChild(imContainer);


    document.getElementById("nam").innerHTML = nam1;
    document.getElementById("ID").innerHTML = id;
    document.getElementById("Usernam").innerHTML = usernam;
    document.getElementById("Mobile").innerHTML = mobile;
    document.getElementById("Email").innerHTML = email;
    document.getElementById("Position").innerHTML = position;


}


function loadDetails() {

    var img = document.createElement("img");
    img.src = "http://sharedseeker.com/file/profile_image/default_profile.jpg";
    var image = document.createElement('div');
    image.className = 'ProfImage';
    var imContainer = document.createElement('div');
    imContainer.className = 'totaldetails';


    image.appendChild(img);
    imContainer.appendChild(image);

    document.getElementById('background').appendChild(imContainer);

    document.getElementById("Fname").value = nam1;
    document.getElementById("Em").value = email;
    document.getElementById("Pword").value = pass;
    document.getElementById("Addr").value = addrs;
    document.getElementById("Pin").value = code;
    document.getElementById("Mobil").value = mobile;






}

function updateDetails() {


}