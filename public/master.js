$(function() {
    $(".sigup-box").hide();
    $(".containersignup").hide();


    $(".login").click(function() {
        console.log("Presionaron login");
        $(".sigup-box").hide();
        $(".containersignup").hide();

        $(".login-box").show();
        $(".container").show();

        $(".signup").css("background", "none");
        $(".login").css("background", "#000000");
    });

    $(".signup").click(function() {
        console.log("Presionaron signup");
        $(".sigup-box").show();
        $(".containersignup").show();

        $(".login-box").hide();
        $(".container").hide();

        $(".login").css("background", "none");
        $(".signup").css("background", "#000000");
    });

    $('btnSignUp').click(function() {
        $('frmSignUp').submit();
    });
    $('btnLogIn').click(function() {
        $('frmLogIn').submit();
    });

});