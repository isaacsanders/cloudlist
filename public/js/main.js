
$(document).ready(function() {

    $("#login").click(login);
    $("#signup").click(signup);
    $("#popupCover").click(togglePopup);

    function login() {
        $("#popup").html("<h1>Login</h1><div><label>Username: </label><input id='username' type='text'/></div>" +
            "<div><label>Password: </label><input id='password' type='password'/></div>");
        togglePopup();
    }

    function signup() {
        $("#popup").html("<h1>Signup</h1><div><label>Name: </label><input id='name' type='text'/></div>" +
            "<div><label>Email: </label><input id='email' type='email'/></div>" +
            "<div><label>Username: </label><input id='username' type='text'/></div>" +
            "<div><label>Password: </label><input id='password' type='password'/></div>" +
            "<div><label>Confirm Password: </label><input id='passwordConfirm' type='password'/></div>");
        togglePopup();
    }

    function togglePopup() {
        $("#popup, #popupCover").stop(true).fadeToggle(700);
    }
});