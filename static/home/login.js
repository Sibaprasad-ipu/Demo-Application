$(document).ready(function () {
    generateCaptcha();
    $("#submit").click(function () {
        loginUser();
    })
    $("#refreshCaptcha").click(function () {
        generateCaptcha();
    })
    $(".togglePassword").on("click", function () {
        var passwordField = $($(this).attr("data-target"));

        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
        } else {
            passwordField.attr('type', 'password');
        }
        // $(this).toggleClass("bi-eye");
        // $(this).toggleClass("bi-eye-slash");
    })

})

function loginUser() {
    let username = $("#username").val().trim();
    let password = $("#password").val().trim();
    let captchaValue = $("#captchaText").data("captcha");
    let captchaInput = $("#captchaInput").val();

    if (captchaInput !== captchaValue) {
        alert("Invalid CAPTCHA");
        generateCaptcha();
        $("#captchaInput").val("");
        return;
    }

    let loginData = {
        username: username,
        password: password
    }
    $.ajax({
        type: "POST",
        data: loginData,
        url: '/login_view/',

        success: function (data) {
            console.log('data:', data);
            if (data.status_code == 200) {
                alert("login successfully");
                window.location.href = '/chat/';
            } else {
                alert("login unsuccessful")
            }
        }
    })
}
function captcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";
    for (i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captchaText;
}
function generateCaptcha() {
    let captchaValue = captcha();

    $("#captchaText").text(captchaValue);
    $("#captchaText").data("captcha", captchaValue);
}
