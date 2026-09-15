$(document).ready(function () {
    $("#b_create").click(function () {
        biodataCreate();
    })
    $("#biodata_update").click(function () {
        biodataUpdate();
    })
    $("#login").click(function () {
        biodataLogin();
    })
    $("#refreshCaptcha").click(function () {
        generateCaptcha();
    })
    $(".togglePassword").on("click", function () {
        var passwordField = $($(this).attr("data-target"));

        if (passwordField.attr("type") == "password") {
            passwordField.attr("type", "text");
        } else {
            passwordField.attr("type", "password");
        }
    })
    generateCaptcha();
    loadBiodata();
})

function biodataCreate() {
    let b_name = $("#b_name").val();
    let b_age = $("#b_age").val();
    let b_city = $("#b_city").val();
    let b_pic = $("#b_pic")[0].files[0];
    let b_gender = $("#b_gender").val();
    let b_dob = $("#b_dob").val();

    let bioData = new FormData();

    bioData.append("b_name", b_name);
    bioData.append("b_age", b_age);
    bioData.append("b_city", b_city);
    bioData.append('b_gender', b_gender);
    bioData.append('b_dob', b_dob);

    if (b_pic) {
        bioData.append('b_pic', b_pic);
    }

    $.ajax({
        type: "POST",
        data: bioData,
        url: '/biodata_create_view/',
        processData: false,
        contentType: false,

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("create successfully");
                window.location.href = '/biodata_list/'
            } else {
                alert("not created");
            }
        }
    })
}
function loadBiodata() {
    $.ajax({
        type: "GET",
        url: '/biodata_list_view/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {

                let rows = " ";

                $.each(data.datas, function (index, data) {
                    rows += `
                        <tr>
                            <td>${data.b_name}</td>
                            <td>${data.b_age}</td>
                            <td>${data.b_gender}</td>
                            <td>${data.b_city}</td>
                            <td>${data.b_dob}</td>
                            <td>${data.b_pic}</td>
                            <td><button class="btn btn-info" onclick="biodataEdit(${data.id})">Edit</button>
                            <button class="btn btn-info" onclick="biodataDelete(${data.id})">Delete</button></td>
                        </tr>
                    `;
                }),
                    $("#bBody").html(rows);
            }
        }
    })
}
function biodataDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/biodata_delete/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("deleted")
                loadBiodata();
            } else {
                alert('not deleted');
            }
        }
    })
}

function biodataEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/biodata_edit/',

        success: function (data) {
            if (data.status_code == 200) {
                let edits = data.datas;

                $("#b_id").val(edits.id);
                $("#b_name").val(edits.b_name);
                $("#b_age").val(edits.b_age);
                $("#b_gender").val(edits.b_gender);
                $("#b_dob").val(edits.b_dob);
                $("#b_city").val(edits.b_city);
                $("#b_pic").attr("src", edits.b_pic);
                $("#biodataModal").modal("show");
            }
        }
    })
}
function biodataUpdate() {
    let b_id = $("#b_id").val();
    let b_name = $("#b_name").val();
    let b_age = $("#b_age").val();
    let b_gender = $("#b_gender").val();
    let b_city = $("#b_city").val();
    let b_dob = $("#b_dob").val();
    let b_pic = $("#b_pic")[0].files[0];

    let updateData = new FormData();

    updateData.append("b_id", b_id);
    updateData.append("b_name", b_name);
    updateData.append("b_age", b_age);
    updateData.append("b_city", b_city);
    updateData.append("b_gender", b_gender);
    updateData.append("b_dob", b_dob);
    if (b_pic) {
        updateData.append("b_pic", b_pic);
    }

    $.ajax({
        type: "POST",
        data: updateData,
        url: '/biodata_update/',
        processData: false,
        contentType: false,

        success: function (data) {
            if (data.status_code == 200) {
                alert("updated successfully");
                $("#biodataModal").modal("hide");
            } else {
                alert("not updated");
            }
        }
    })
}
function biodataLogin() {
    let name = $("#name").val();
    let password = $("#password").val().trim();

    let year = password.substring(0, 4);
    let month = password.substring(4, 6);
    let day = password.substring(6, 8);
    let pass = year + "-" + month + "-" + day;

    let captcha = $("#captchaText").data('captcha').trim();
    let captchaInput = $("#captchaInput").val().trim();

    if (captcha !== captchaInput) {
        alert("invalid captcha");
        $("#captchaInput").val("");
        return;
    }


    // if (password.type !== "date") {
    //     alert("password should be  yyyy-mm-dd format");
    //     return;
    // }


    let loginData = {
        name: name,
        password: pass,
    };
    $.ajax({
        type: "POST",
        data: loginData,
        url: '/biodata_login_validate/',

        success: function (data) {
            console.log("log", data);
            if (data.status_code == 200) {
                alert("login successfull");
                window.location.href = '/biodata_create/'

            } else if (data.status_code == 400) {
                alert(data.message);
            } else {
                alert("login unsuccessfull");
            }
        }
    })

}

function captcha() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
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