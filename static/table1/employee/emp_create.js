$(document).ready(function () {
    $("#emp_create").click(function () {
        empCreate();
    })
    $("#emp_update").click(function () {
        empUpdate();
    })
    employeeList();
})

function empCreate() {
    let emp_id = $("#emp_id").val();
    let emp_name = $("#emp_name").val();
    let emp_degn = $("#emp_degn").val();
    let emp_salary = $("#emp_salary").val();
    let emp_city = $("#emp_city").val();

    let empData = {
        emp_id,
        emp_name,
        emp_degn,
        emp_salary,
        emp_city
    };

    $.ajax({
        type: "POST",
        data: empData,
        url: '/emp_create/',

        success: function (data) {
            console.log("stu:", data);
            if (data.status_code == 200) {
                alert("Employee table created successfully");
                window.location.href = '/employee_list/';
            } else {
                alert("table not created");
            }
        }
    })
}
function employeeList() {
    $.ajax({
        type: "GET",
        url: '/emp_list/',

        success: function (data) {
            if (data.status_code == 200) {

                let rows = " ";

                $.each(data.emps, function (index, emp) {
                    rows += `
                        <tr>
                            <td>${emp.emp_id}</td>
                            <td>${emp.emp_name}</td>
                            <td>${emp.emp_degn}</td>
                            <td>${emp.emp_salary}</td>
                            <td>${emp.emp_city}</td>
                            <td><button class="btn btn-danger" onclick="empDelete(${emp.id})">delete</button>
                            <button class="btn btn-info" onclick="empEdit(${emp.id})">edit</button></td>
                        </tr>
                    `;
                }),
                    $("#empBody").html(rows);
            }
        }
    })
}

function empDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/emp_delete/',

        success: function (data) {
            if (data.status_code == 200) {
                alert('employee delete');
                employeeList();
            } else {
                alert("not deleted");
            }
        }
    })
}
function empEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/emp_edit/',

        success: function (data) {
            if (data.status_code == 200) {
                let editData = data.emps;
                $("#e_id").val(editData.id);
                $("#e_emp_id").val(editData.emp_id);
                $("#e_emp_name").val(editData.emp_name);
                $("#e_emp_degn").val(editData.emp_degn);
                $("#e_emp_salary").val(editData.emp_salary);
                $("#e_emp_city").val(editData.emp_city);
                $("#empModal").modal("show");
            }
        }
    })
}
function empUpdate() {
    let e_id = $("#e_id").val();
    let emp_id = $("#e_emp_id").val();
    let emp_name = $("#e_emp_name").val();
    let emp_degn = $("#e_emp_degn").val();
    let emp_salary = $("#e_emp_salary").val();
    let emp_city = $("#e_emp_city").val();

    let updateData = {
        e_id,
        emp_id,
        emp_name,
        emp_degn,
        emp_salary,
        emp_city
    };

    $.ajax({
        type: "POST",
        data: updateData,
        url: '/emp_update/',

        success: function (data) {
            console.log("update:", data);
            if (data.status_code == 200) {
                alert("update successfully");
                $("#empModal").modal("hide");
                employeeList();
            } else {
                alert("not updated");
            }
        }
    })
}
