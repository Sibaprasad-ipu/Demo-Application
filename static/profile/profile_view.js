$(document).ready(function () {
    loadData();
    $("#profile_update").click(function () {
        updateList();
    })
})

function loadData() {
    $.ajax({
        type: "GET",
        url: '/plist_view/',

        success: function (data) {

            if (data.status_code == 200) {
                let rows = "";

                $.each(data.profiles, function (index, profile) {

                    rows += `
                        <tr>
                            <td>${profile.name}</td>
                            <td>${profile.email}</td>
                            <td>${profile.password}</td>
                            <td>${profile.fname}</td>
                            <td>${profile.lname}</td>
                            <td>${profile.pic}</td>
                            <td><button type="button"  class="btn btn-success" onclick="editList(${profile.id})">edit</button>
                                <button type="button"  class="btn btn-success" onclick="showData(${profile.id})">view</button>
                            </td>
                        </tr>

                    `;
                }),
                    $("#profileData").html(rows);

            }
        }
    })
}

function editList(id) {
    $.ajax({
        type: "POST",
        url: '/profiles_view/',
        data: { id: id },

        success: function (data) {
            if (data.status_code == 200) {
                console.log("data:", data);
                let pData = data.profiles;
                $("#p_id").val(pData.id)
                $("#e_name").val(pData.name);
                $("#e_email").val(pData.email);
                $("#e_password").val(pData.password);
                $("#e_fname").val(pData.fname);
                $("#e_lname").val(pData.lname);
                $("#e_pic").attr("src", pData.pic);
                $("#editAssetModal").modal("show");
            } else {
                alert("data not found");
            }
        }
    })
}

function updateList(id) {
    let u_id = $("#p_id").val();
    console.log("u_id", u_id);
    let u_name = $("#e_name").val();
    let u_email = $("#e_email").val();
    let u_password = $("#e_password").val();
    let u_fname = $("#e_fname").val();
    let u_lname = $("#e_lname").val();
    let u_pic = $("#e_pic")[0].files[0];

    let crData = new FormData();
    crData.append("u_id", u_id);
    crData.append("u_name", u_name);
    crData.append("u_email", u_email);
    crData.append('u_password', u_password);
    crData.append("u_fname", u_fname);
    crData.append("u_lname", u_lname);


    if (u_pic) {
        crData.append("u_pic", u_pic);
    }

    $.ajax({
        type: "POST",
        url: '/update_profile/',
        data: crData,
        processData: false,
        contentType: false,

        success: function (data) {
            console.log("updateDAta:", data);
            if (data.status_code == 200) {
                alert("data updated successfully.");
                $("#editAssetModal").modal("hide");
                loadData();
            } else {
                alert("data not updated");
            }
        }
    })
}

function showData(id) {
    window.location.href = '/profiles/?id=' + id;
}

