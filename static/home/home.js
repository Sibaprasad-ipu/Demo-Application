$(document).ready(function () {
    $("#create").click(function () {
        createData();
    })
})

function createData() {
    let f_name = $("#f_name").val().trim();
    let l_name = $("#l_name").val().trim();
    let fullname = f_name + " " + l_name;
    $("#full_name").val(fullname);
    let password = $("#password").val();

    let sendData = {
        f_name: f_name,
        l_name: l_name,
        full_name: fullname,
        password: password
    };

    $.ajax({
        type: "POST",
        data: sendData,
        url: '/home_view/',

        success: function (data) {
            if (data.status_code == 400) {
                alert(data.message);
                return;
            }
            if (data.status_code == 200) {
                alert("create successfully");
            } else {
                alert("create unsuccessfully");
            }
        }
    })
}