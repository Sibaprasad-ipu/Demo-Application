$(document).ready(function () {
    $("#submit").click(function () {
        createData();
    })
})

function createData() {
    let fname = $("#fname").val().trim();
    let lname = $("#lname").val().trim();
    let fullname = fname + " " + lname;
    $("#name").val(fullname);
    let email = $("#gmail").val();
    let password = $("#password").val();
    let pic = $("#attachment")[0].files[0];

    let crData = new FormData();
    crData.append("name", fullname);
    crData.append("email", email);
    crData.append('password', password);
    crData.append("fname", fname);
    crData.append("lname", lname);

    if (pic) {
        crData.append("pic", pic);
    }

    $.ajax({
        type: 'POST',
        url: '/profile_view/',
        data: crData,
        processData: false,
        contentType: false,

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 400) {
                alert(data.message);
                return;
            }

            if (data.status_code == 200) {
                window.location.href = '/profile_table/';
                alert("profile create successfully");
            } else {
                alert('profile create unsuccessfully');
            }
        },
        error: function (data) {
            alert("something went wrong");
        }
    })
}