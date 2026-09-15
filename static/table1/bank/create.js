$(document).ready(function () {
    $("#b_create").click(function () {
        createAccount();
    })
    $("#b_update").click(function () {
        updateDetails();
    })
    $("#login").click(function () {
        bankLogin();
    })
    $("#refreshCaptcha").click(function () {
        generateCaptcha();
    })
    generateCaptcha();
    loadDetails();
    $(".togglePassword").on("click", function () {
        var passwordField = $($(this).attr("data-target"));

        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
        } else {
            passwordField.attr("type", "password");
        }
    })
})
function createAccount() {
    let user = $("#user").val();
    let email = $("#email").val();
    let user_id = $("#user_id").val();
    let ac_no = $("#ac_no").val();
    let ph_no = $("#phone").val();
    let home = $("#home").val();
    let ac_type = $("#ac_type").val();
    let pics = $("#pics")[0].files[0];

    let accData = new FormData();

    accData.append('user', user);
    accData.append('email', email);
    accData.append('user_id', user_id);
    accData.append('ac_no', ac_no);
    accData.append('ph_no', ph_no);
    accData.append('home', home);
    accData.append('ac_type', ac_type);

    if (pics) {
        accData.append('pics', pics);
    }

    $.ajax({
        type: "POST",
        data: accData,
        url: '/account_create_view/',
        contentType: false,
        processData: false,

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("account create successfully");
                window.location.href = '/bank_list/';
            } else {
                alert("account not created");
            }
        }
    })
}
function loadDetails() {
    $.ajax({
        type: "GET",
        url: '/bank_list_view/',

        success: function (data) {
            console.log("data", data);
            let rows = " ";

            $.each(data.banks, function (index, bank) {
                rows += `
                    <tr>
                        <td>${bank.user}</td>
                        <td>${bank.email}</td>
                        <td>${bank.user_id}</td>
                        <td>${bank.ac_no}</td>
                        <td>${bank.phone_no}</td>
                        <td>${bank.home}</td>
                        <td>${bank.ac_type}</td>
                        <td>${bank.pics}</td>
                        <td><button class="btn btn-secondary" type="button" onclick="bankEdit(${bank.id})">Edit </button>
                        <button class="btn btn-danger" type="button" onclick="bankDelete(${bank.id})">Delete </button></td>
                    </tr>
                `;
            }),
                $("#bankBody").html(rows);
        }
    })
}
function bankEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/bank_edit/',

        success: function (data) {
            console.log("id", data);
            if (data.status_code == 200) {
                let bank = data.banks;

                $("#b_id").val(bank.id);
                $("#user").val(bank.user);
                $("#email").val(bank.email);
                $("#user_id").val(bank.user_id);
                $("#ac_no").val(bank.ac_no);
                $("#phone").val(bank.phone_no);
                $("#ac_type").val(bank.ac_type);
                $("#home").val(bank.home);
                $("#pics").attr("src", bank.pics);
                $("#bankModal").modal("show");
            } else {
                alert("user id not found");
            }
        }
    })
}

function updateDetails() {
    let id = $("#b_id").val();
    let user = $("#user").val();
    let email = $("#email").val();
    let user_id = $("#user_id").val();
    let ac_no = $("#ac_no").val();
    let ph_no = $("#phone").val();
    let home = $("#home").val();
    let ac_type = $("#ac_type").val();
    let pics = $("#pics")[0].files[0];

    let accData = new FormData();
    accData.append('id', id);
    accData.append('user', user);
    accData.append('email', email);
    accData.append('user_id', user_id);
    accData.append('ac_no', ac_no);
    accData.append('ph_no', ph_no);
    accData.append('home', home);
    accData.append('ac_type', ac_type);

    if (pics) {
        accData.append('pics', pics);
    }

    $.ajax({
        type: "POST",
        data: accData,
        url: '/account_update/',
        contentType: false,
        processData: false,

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("account update successfully");
                window.location.href = '/bank_list/';
            } else {
                alert("account not updated");
            }
        }
    })
}

function bankDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/bank_delete/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("deleted successfully");
                loadDetails();
            } else {
                alert("not deleted");
            }
        }
    })
}

function captcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstouvwxyz1234567890"
    let captchaText = " ";

    for (i = 0; i < 6; i++) {
        captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captchaText;
}

function generateCaptcha() {
    let captchaValue = captcha();
    $("#captchaText").text(captchaValue);
    $("#captchaText").data('captcha', captchaValue);

}
function bankLogin() {
    let user_id = $("#name").val();
    let password = $("#password").val();
    let captchaText = $("#captchaText").data('captcha').trim();
    let captchaInput = $("#captchaInput").val().trim();

    if (captchaText !== captchaInput) {
        alert("invalid captcha");
        generateCaptcha();
        $("#captchaInput").val("");
        return;
    }
    let loginData = {
        user_id,
        password,
    };
    $.ajax({
        type: "POST",
        data: loginData,
        url: '/bank_login_validate/',

        success: function (data) {
            console.log("log", data);
            if (data.status_code == 200) {
                alert('login successfull');
                window.location.href = '/account_create/';
            } else {
                alert("login unsuccessful");
            }
        }
    })
}

