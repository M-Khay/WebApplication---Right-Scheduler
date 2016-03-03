$(document).ready(function() {

    $('#getstarted').click(function() {

        $('#pop_background').fadeIn();
        $('#background').fadeIn();

        return false;
    });

    $('.close').click(function() {

        $('#pop_background').fadeOut();
        $('#login_popup').fadeOut();
        $('#background').fadeOut();

        document.getElementById("SignUpForm").reset();
        document.getElementById("loginform").reset();
        return false;
    });

    $('#pop_background').click(function() {

        $('#pop_background').fadeOut();
        $('#background').fadeOut();
        $('#login_popup').fadeOut();

        document.getElementById("SignUpForm").reset();
        document.getElementById("loginform").reset();
        return false;
    });


    $('#login').click(function() {

        $('#pop_background').fadeIn();
        $('#login_popup').fadeIn();
        return false;
    });
});

var email = "k@gmail.com";
var pswd = "i";
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function FormValidation() {
    var fname = document.getElementById("Fullname").value;

    pswd = document.getElementById("password").value;

    email = document.getElementById("email").value;
    var c_email = document.getElementById("c_email").value;
    var address = document.getElementById("address").value;
    var uzip = document.getElementById("zip").value;
    var phone = document.getElementById("phone").value;
    var mob = document.getElementById("mob").value;
    var captchatext = document.getElementById("captchatext").value;

    var pswd_len = pswd.length;
    var fname_len = fname.length;



    if (fname_len == 0) {
        alert("Enter Full Name");
        document.getElementById("Fullname").focus();
        return false;
    }
    if (pswd_len == 0 || pswd_len >= 15 || pswd_len < 8) {
        alert("Password Length is " + pswd_len + ". It should be between 8 to 15");
        document.getElementById("password").focus();
        return false;
    }

    if (email.match(mailformat)) {} else {
        //alert("You have entered an invalid email address!");
        document.getElementById("email").focus();
        //return true;
    }
    if (email != c_email) {
        alert("Email dont match");
        document.getElementById("c_email").value = "";
        document.getElementById("c_email").focus();
        return false;
    }




    var letters = /^[0-9a-zA-Z, ,',']+$/;

    if (address.match(letters)) {} else {
        alert('User address must have alphanumeric characters only');
        document.getElementById("address").focus();
        return false;
    }

    var numbers = /^[0-9]+$/;
    if (uzip.match(numbers)) {

    } else {
        alert('ZIP code must have numeric characters only');
        document.getElementById("zip").focus();
        return false;
    }

    if (phone.match(numbers)) {} else {
        alert('Phone Number must have numeric characters only');
        document.getElementById("phone").focus();
        return false;
    }

    var check = "W68HP";
    if (captchatext.match(check)) {
        alert('Succesfully Signed In');
        document.getElementById("LoginInput").value = email;
        document.getElementById("LoginPassword").focus();
        document.getElementById("login_popup").style.display = "inherit";
        document.getElementById("background").style.display = "none";
        $.post("php/register_user.php", {
            email: "John",
            password: "password",
            fullname: "Andrew",
            address: "address",
            zipcode: 19999,
            phone: 888888888,
            mobile: 388382
        });

        return true;


    } else {
        alert('Captcha not matched');
        document.getElementById("captchatext").value = "";
        document.getElementById("captchatext").focus();
        return false;
    }

}

function validateLogin() {

    var emailinp = document.getElementById("LoginInput").value;
    var pswdinp = document.getElementById("LoginPassword").value;

    if (emailinp.match(mailformat)) {} else {
        //alert("You have entered an invalid email address!");
        document.getElementById("LoginPassword").value = "";
        document.getElementById("LoginInput").focus();
        //return true;
    }

    if (emailinp != email || pswdinp != pswd) {
        alert("Email or password not correct");
        document.getElementById("LoginPassword").value = "";
        document.getElementById("LoginInput").focus();
        //return false;
    }
    if (emailinp == email && pswdinp == pswd) {
        alert("Login Succesful");
        window.open("Dashboard.html", "_self");
    }
}