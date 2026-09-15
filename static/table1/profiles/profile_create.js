$(document).ready(function () {
    $("#p_create").click(function () {
        profileCreate();
    })
    profileData();
})
function profileCreate() {
    let name = $("#p_name").val();
    let email = $("#p_email").val();
    let phone = $("#p_phone").val();
    let city = $("#p_city").val();
    let state = $("#p_state").val();
    let country = $("#p_country").val();

    let profileData = {
        p_name: name,
        p_email: email,
        p_phone: phone,
        p_city: city,
        p_state: state,
        p_country: country
    };

    $.ajax({
        type: "POST",
        data: profileData,
        url: '/profile_create_view/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("created successfully");
                window.location.href = '/profile_creates/'
            } else {
                alert("not created");
            }
        }
    })
}

function profileData() {
    $.ajax({
        type: "GET",
        url: '/profile_list_views/',

        success: function (data) {
            if (data.status_code == 200) {
                let rows = " ";
                $.each(data.profiles, function (index, profile) {
                    rows += `
                        <tr>
                            <td>${profile.p_name}</td>
                            <td>${profile.p_email}</td>
                            <td>${profile.p_phone}</td>
                            <td>${profile.p_city}</td>
                            <td>${profile.p_state}</td>
                            <td>${profile.p_country}</td>
                            <td><button class="btn btn-success" onclick="profileEdit(${profile.id})">Edit</button>
                            <button class="btn btn-success" onclick="profileDelete(${profile.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                }),
                    $("#pbody").html(rows);
            }
        }
    })
}

function profileDelete(id) {
    $.ajax({
        type: 'POST',
        data: { id: id },
        url: '/profile_deletes/',
        success: function (data) {
            if (data.status_code == 200) {
                alert("deleted successfully");
                profileData();
            } else {
                alert("not deleted")
            }
        }
    })
}
function profileEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/profile_edits/',
        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {

                let pdata = data.profiles;

                $("#p_id").val(pdata.id);
                $("#e_name").val(pdata.p_name);
                $("#e_email").val(pdata.p_email);
                $("#e_phone").val(pdata.p_phone);
                $("#e_city").val(pdata.p_city);
                $("#e_state").val(pdata.p_state);
                $("#e_country").val(pdata.p_country);
                $("#profileModal").modal("show");
            }
        }
    })
}