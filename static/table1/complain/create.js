$(document).ready(function () {
    $("#c_create").click(function () {
        createComplain();
    })
    $("#c_update").click(function () {
        updateComplain();
    })
    loadComplain();
})
function createComplain() {
    let name = $("#name").val();
    let email = $("#email").val();
    let mob = $("#mob").val();
    let issue = $("#issue").val();
    let image = $("#image")[0].files[0];
    let city = $("#city").val();
    let date = $("#date").val();

    let complainData = new FormData();

    complainData.append("name", name);
    complainData.append("email", email);
    complainData.append("mob", mob);
    complainData.append("issue", issue);
    complainData.append("city", city);
    complainData.append("date", date);
    if (image) {
        complainData.append("image", image);
    }
    $.ajax({
        type: "POST",
        data: complainData,
        url: '/create_complain_view/',
        processData: false,
        contentType: false,


        success: function (data) {
            if (data.status_code == 200) {
                alert("complain rise successfully");
                window.location.href = '/complain_list/';
            } else {
                alert("not rise complain");
            }
        }
    })
}
function loadComplain() {
    $.ajax({
        type: "GET",
        url: '/complain_list_view/',

        success: function (data) {
            if (data.status_code == 200) {

                let rows = " ";

                $.each(data.complains, function (index, complain) {
                    rows += `
                        <tr>
                            <td>${complain.name}</td>
                            <td>${complain.email}</td>
                            <td>${complain.mob}</td>
                            <td>${complain.city}</td>
                            <td>${complain.issue}</td>
                            <td>${complain.time}</td>
                            <td>${complain.image}</td>
                            <td><button class="btn btn-primary" type="button" onclick="complainEdit(${complain.id})">Edit</button>
                            <button class="btn btn-danger" type="button" onclick="complainDelete(${complain.id})">Delete</button></td>

                        </tr>
                    `;
                }),
                    $("#complainBody").html(rows);
            }
        }
    })
}
function complainEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/complain_edit/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {

                let complain = data.complains;

                $("#c_id").val(complain.id);
                $("#name").val(complain.name);
                $("#email").val(complain.email);
                $("#mob").val(complain.mob);
                $("#city").val(complain.city);
                $("#time").val(complain.time);
                $("#issue").val(complain.issue);
                $("#image").attr("src", complain.image);
                $("#complainModal").modal("show");
            } else {
                alert("data not found");
            }
        }
    })
}
function complainDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/complain_delete/',

        success: function (data) {
            if (data.status_code == 200) {
                alert(data.message);
                loadComplain();
            } else {
                alert("not deleted");
            }
        }
    })
}
function updateComplain() {
    let id = $("#c_id").val();
    let name = $("#name").val();
    let email = $("#email").val();
    let mob = $("#mob").val();
    let issue = $("#issue").val();
    let image = $("#image")[0].files[0];
    let city = $("#city").val();
    let date = $("#date").val();

    let complainData = new FormData();
    complainData.append("id", id);
    complainData.append("name", name);
    complainData.append("email", email);
    complainData.append("mob", mob);
    complainData.append("issue", issue);
    complainData.append("city", city);
    complainData.append("date", date);
    if (image) {
        complainData.append("image", image);
    }
    $.ajax({
        type: "POST",
        data: complainData,
        url: '/update_complain/',
        processData: false,
        contentType: false,


        success: function (data) {
            if (data.status_code == 200) {
                alert("update successfully");
                window.location.href = '/complain_list/';
            } else {
                alert("not update complain");
            }
        }
    })

}