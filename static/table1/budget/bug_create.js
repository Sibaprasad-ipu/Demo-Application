$(document).ready(function () {
    $("#bug_create").click(function () {
        bugCreate();
    })
    $("#bug_update").click(function () {
        budgetUpdate();
    })
    budgetList();
})
function bugCreate() {
    let bug_id = $("#bug_id").val();
    let bug_allocation = $("#bug_allocation").val().trim();
    let bug_used = $("#bug_used").val().trim();
    let bug_avl = Number(bug_allocation) - Number(bug_used);
    $("#bug_avl").val(bug_avl);
    let bug_month = $("#bug_month").val();

    let budgetData = {
        bug_id,
        bug_allocation,
        bug_used,
        bug_avl,
        bug_month
    };
    $.ajax({
        type: "POST",
        data: budgetData,
        url: '/budget_create/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("budget created.");
                window.location.href = '/budget_list/';
            } else {
                alert("not created");
            }
        }
    })
}
function budgetList() {
    $.ajax({
        type: "GET",
        url: '/budget_list_view/',

        success: function (data) {
            if (data.status_code == 200) {
                let rows = " ";

                $.each(data.budgets, function (index, budget) {
                    rows += `
                        <tr>
                            <td>${budget.bug_id}</td>
                            <td>${budget.bug_allcation}</td>
                            <td>${budget.bug_used}</td>
                            <td>${budget.bug_avl}</td>
                            <td>${budget.bug_month}</td>
                            <td><button class="btn btn-danger" onclick="bugDelete(${budget.id})">delete</button>
                            <button class="btn btn-info" onclick="bugEdit(${budget.id})">edit</button></td>
                        </tr>
                    `;
                }),
                    $("#bugBody").html(rows);
            }
        }

    })
}
function bugDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/bug_delete/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("delete successful");
                budgetList();
            } else {
                alert("not deleted");
            }
        }
    })
}
function bugEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/bug_edit/',

        success: function (data) {
            if (data.status_code == 200) {

                let editData = data.budgets;

                $("#b_id").val(editData.id);
                $("#e_bug_id").val(editData.bug_id);
                $("#e_bug_allocation").val(editData.bug_allocation);
                $("#e_bug_used").val(editData.bug_used);
                $("#e_bug_avl").val(editData.bug_avl);
                $("#e_bug_month").val(editData.bug_month);
                $("#bugModal").modal("show");
            }
        }
    })
}
function budgetUpdate() {
    let b_id = $("#b_id").val();
    let bug_id = $("#e_bug_id").val();
    let bug_allocation = $("#e_bug_allocation").val();
    let bug_used = $("#e_bug_used").val();
    let bug_avl = Number(bug_allocation) - Number(bug_used);
    $("#e_bug_avl").val(bug_avl);
    let bug_month = $("#e_bug_month").val();

    let updateData = {
        b_id,
        bug_id,
        bug_allocation,
        bug_used,
        bug_avl,
        bug_month
    };
    $.ajax({
        type: "POST",
        data: updateData,
        url: '/bug_update/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("update successfully");
                $("#bugModal").modal("hide");
                budgetList();
            }
        }
    })
}

