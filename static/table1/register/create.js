$(document).ready(function () {
    $("#register").click(function () {
        register();
    })
    $("#update").click(function () {
        updateRegister();
    })
    $("#login").click(function () {
        loginRegister();
    })
    $("#refreshCaptcha").click(function () {
        generateCaptcha();
    })
    $(".togglePassword").on("click", function () {
        var passwordField = $($(this).attr("data-target"));

        if (passwordField.attr("type") === "password") {
            passwordField.attr("type", "text");
        } else {
            passwordField.attr("type", "password");
        }

    })
    generateCaptcha();
    loadRegister();
})
function register() {
    let name = $("#name").val();
    let email = $("#email").val();
    let gender = $("#gender").val();
    let dob = $("#dob").val();
    let mob_no = $("#mob_no").val();
    let city = $("#city").val();
    let dist = $("#dist").val();
    let state = $("#state").val();
    let country = $("#country").val();
    let pic = $("#pic")[0].files[0];

    if (name == "" || name == undefined) {
        alert("enter name");
        return;
    }
    if (email == "" || email == undefined) {
        alert("enter email");
        return;
    }
    if (gender == "" || gender == undefined) {
        alert("enter gender");
        return;
    }
    if (dob == "" || dob == undefined) {
        alert("enter dob");
        return;
    }
    if (mob_no == "" || mob_no == undefined) {
        alert("enter contact no.");
        return;
    }
    if (country == "" || country == undefined) {
        alert("enter country name");
        return;
    }

    let registerData = new FormData();

    registerData.append('name', name);
    registerData.append('email', email);
    registerData.append('gender', gender);
    registerData.append('dob', dob);
    registerData.append('mob_no', mob_no);
    registerData.append('city', city);
    registerData.append('dist', dist);
    registerData.append('state', state);
    registerData.append('country', country);

    if (pic) {
        registerData.append('pic', pic);
    }


    $.ajax({
        type: "POST",
        data: registerData,
        url: '/register_view/',
        processData: false,
        contentType: false,

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 409) {
                alert("email already exists");
                return;
            }
            if (data.status_code == 200) {
                alert("Register Successfully");
                window.location.href = '/register_list/';
            } else {
                alert("not registered");
            }
        }
    })
}

function loadRegister() {
    $.ajax({
        type: "GET",
        url: '/register_list_view/',

        success: function (data) {
            console.log("list", data);
            if (data.status_code == 200) {
                let rows = " ";

                $.each(data.registers, function (index, register) {
                    rows += `
                
                        <tr>
                            <td>${register.name}</td>
                            <td>${register.email}</td>
                            <td>${register.gender}</td>
                            <td>${register.dob}</td>
                            <td>${register.mob_no}</td>
                            <td>${register.city}</td>
                            <td>${register.dist}</td>
                            <td>${register.state}</td>
                            <td>${register.country}</td>
                            <td>${register.pic}</td>
                            <td><button class="btn btn-success" type="button" onclick="registerEdit(${register.id})">Edit</button>
                            <button class="btn btn-danger" type="button" onclick="registerDelete(${register.id})">Delete</button></td>
                        </tr>
                    `;
                }),
                    $("#registerBody").html(rows);
            }
        }

    })
}

function registerEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/register_edit/',

        success: function (data) {
            if (data.status_code == 200) {
                let register = data.registers;

                $("#r_id").val(register.id);
                $("#name").val(register.name);
                $("#email").val(register.email);
                $("#gender").val(register.gender);
                $("#dob").val(register.dob);
                $("#mob_no").val(register.mob_no);
                $("#city").val(register.city);
                $("#dist").val(register.dist);
                $("#state").val(register.state);
                $("#country").val(register.country);
                $("#pic").attr("src", register.pic);
                $("#registerModal").modal("show");

            }
        }
    })
}

function registerDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/register_delete/',

        success: function (data) {
            console.log("del", data);
            if (data.status_code == 200) {
                alert("data deleted successfully");
                loadRegister();
            } else {
                alert("not deleted");
            }
        }
    })
}
function updateRegister() {
    let id = $("#r_id").val();
    let name = $("#name").val();
    let email = $("#email").val();
    let gender = $("#gender").val();
    let dob = $("#dob").val();
    let mob_no = $("#mob_no").val();
    let city = $("#city").val();
    let dist = $("#dist").val();
    let state = $("#state").val();
    let country = $("#country").val();
    let pic = $("#pic")[0].files[0];

    let updateData = new FormData();
    updateData.append('id', id);
    updateData.append('name', name);
    updateData.append('email', email);
    updateData.append('gender', gender);
    updateData.append('dob', dob);
    updateData.append('mob_no', mob_no);
    updateData.append('city', city);
    updateData.append('dist', dist);
    updateData.append('state', state);
    updateData.append('country', country);

    if (pic) {
        updateData.append('pic', pic);
    }


    $.ajax({
        type: "POST",
        data: updateData,
        url: '/register_update_view/',
        processData: false,
        contentType: false,

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("Register updated Successfully");
                $("#registerModal").modal("hide");
            } else {
                alert(" register not updated");
            }
        }
    })
}

function loginRegister() {
    let name = $("#name").val().trim();
    let password = $("#password").val().trim();
    let captcha = $("#captchaText").data("captcha").trim();
    console.log("captcha", captcha);
    let captchaInput = $("#captchaInput").val().trim();
    console.log("cap", captchaInput);

    if (captcha !== captchaInput) {
        alert("captcha mismatch");
        generateCaptcha();
        $("#captchaInput").val("");
        return;
    }

    let loginData = {
        name: name,
        password: password
    }
    $.ajax({
        type: "POST",
        data: loginData,
        url: '/register_login_validate/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("login successful");
                window.location.href = '/register/'
            } else {
                alert("login unsuccessful");
            }
        }
    })
}

function captcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    let captchaText = " ";
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
