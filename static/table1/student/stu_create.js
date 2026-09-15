$(document).ready(function () {
    $("#stu_create").click(function () {
        studentCreate();
    })
    studentList();
})

function studentCreate() {
    let stu_id = $("#stu_id").val();
    let stu_name = $("#stu_name").val();
    let stu_roll = $("#stu_roll").val();
    let stu_stream = $("#stu_stream").val();
    let stu_city = $("#stu_city").val();

    let stuData = {
        stu_id,
        stu_name,
        stu_roll,
        stu_stream,
        stu_city
    };

    $.ajax({
        type: "POST",
        data: stuData,
        url: '/stu_create/',

        success: function (data) {
            console.log("stu:", data);
            if (data.status_code == 200) {
                alert("student table created successfully");
                window.location.href = '/student_list/';
            } else {
                alert("table not created");
            }
        }
    })
}

function studentList() {
    $.ajax({
        type: "GET",
        url: '/stu_list/',

        success: function (data) {
            if (data.status_code == 200) {
                let rows = " ";

                $.each(data.students, function (index, student) {
                    rows += `
                        <tr>
                            <td>${student.stu_id}</td>
                            <td>${student.stu_name}</td>
                            <td>${student.stu_roll}</td>
                            <td>${student.stu_stream}</td>
                            <td>${student.stu_city}</td>
                            <td><button class="btn btn-danger" onclick="stuDelete(${student.id})">delete</button></td>
                        </tr>
                    `;
                }),
                    $("#stuBody").html(rows);
            }
        }
    })
}

function stuDelete(id) {
    $.ajax({
        type: "POST",
        url: '/student_delete/',
        data: { id: id },
        success: function (data) {
            if (data.status_code == 200) {
                alert("deleted successfully");
                studentList();
            } else {
                alert("delete unsuccessful")
            }
        }
    })
}