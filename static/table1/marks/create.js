$(document).ready(function () {
    $("#r_create").click(function () {
        createMarks();
    })
    $("#r_update").click(function () {
        updateMarks();
    })
    loadMarks();
})
function createMarks() {
    let name = $("#r_name").val();
    let roll = $("#r_roll").val();
    let math = $("#r_math").val();
    let english = $("#r_english").val();
    let science = $("#r_science").val();
    let odia = $("#r_odia").val();
    let history = $("#r_history").val();
    let geography = $("#r_geography").val();
    let total = Number(math) + Number(english) + Number(science) + Number(odia) + Number(history) + Number(geography)
    $("#r_total").val(total);

    if (name == " ") {
        alert("user name required");
        return;
    }

    let marks = {
        name,
        roll,
        math,
        english,
        science,
        odia,
        history,
        geography,
        total
    };

    $.ajax({
        type: "POST",
        data: marks,
        url: '/create_marks_view/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("create successfully");
                window.location.href = '/marks_list/';
            } else {
                alert("not created");
            }
        }
    })
}

function loadMarks() {
    $.ajax({
        type: "GET",
        url: '/marks_list_view/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {

                let rows = " ";

                $.each(data.marks, function (index, mark) {

                    rows += `
                        <tr>
                            <td>${mark.r_name}</td>
                            <td>${mark.r_roll}</td>
                            <td>${mark.r_math}</td>
                            <td>${mark.r_english}</td>
                            <td>${mark.r_science}</td>
                            <td>${mark.r_odia}</td>
                            <td>${mark.r_history}</td>
                            <td>${mark.r_geography}</td>
                            <td>${mark.r_total}</td>
                            <td><button class="btn btn-primary" type="button" onclick="marksEdit(${mark.id})">edit</button>
                            <button class="btn btn-danger" type="button" onclick="marksDelete(${mark.id})">Delete</button></td>
                        </tr>
                    `;
                }),
                    $("#markBody").html(rows);
            }
        }
    })
}
function marksEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/marks_edit/',

        success: function (data) {
            if (data.status_code == 200) {
                console.log("edit", data);

                let marks = data.results;

                $("#r_id").val(marks.id);
                $("#r_name").val(marks.name);
                $("#r_roll").val(marks.roll);
                $("#r_math").val(marks.math);
                $("#r_science").val(marks.science);
                $("#r_english").val(marks.english);
                $("#r_odia").val(marks.odia);
                $("#r_history").val(marks.history);
                $("#r_geography").val(marks.geography);
                $("#r_total").val(marks.total);
                $("#marksModal").modal("show");
            }
        }
    })
}
function updateMarks() {
    let id = $("#r_id").val();
    let name = $("#r_name").val();
    let roll = $("#r_roll").val();
    let math = $("#r_math").val();
    let english = $("#r_english").val();
    let science = $("#r_science").val();
    let odia = $("#r_odia").val();
    let history = $("#r_history").val();
    let geography = $("#r_geography").val();
    let total = Number(math) + Number(english) + Number(science) + Number(odia) + Number(history) + Number(geography)
    $("#r_total").val(total);

    let updateMarks = {
        id,
        name,
        roll,
        math,
        english,
        science,
        odia,
        history,
        geography,
        total
    };

    $.ajax({
        type: "POST",
        data: updateMarks,
        url: '/update_marks/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("update successfully");
                $("#marksModal").modal("hide");
                window.location.href = "/marks_list/";
            } else {
                alert("not updated");
            }
        }
    })
}

