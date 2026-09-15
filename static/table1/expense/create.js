$(document).ready(function () {
    $("#e_create").click(function () {
        createExpense();
    })
    $("#e_update").click(function () {
        updateExpense();
    })
    loadExpense();
})
function createExpense() {
    let month = $("#month").val();
    console.log("month", month);
    let allocate = $("#allocate").val();
    let grocery = $("#grocery").val();
    let bill = $("#bill").val();
    let travel = $("#travel").val();
    let food = $("#food").val();
    let shopping = $("#shopping").val();
    let total = Number(grocery) + Number(bill) + Number(travel) + Number(food) + Number(shopping);
    $("#total").val(total);
    let avl = Number(allocate) - Number(total);
    $("#avl").val(avl);

    let expenseData = {
        month,
        allocate,
        grocery,
        bill,
        travel,
        food,
        shopping,
        total,
        avl
    };

    $.ajax({
        type: "POST",
        data: expenseData,
        url: '/create_expense/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("created successfully");
                window.location.href = '/expense_list/';
            } else {
                alert('not created');
            }
        }
    })
}
function loadExpense() {
    $.ajax({
        type: "POST",
        url: '/expense_list_view/',

        success: function (data) {
            if (data.status_code == 200) {

                let rows = " ";

                $.each(data.expenses, function (index, expense) {
                    rows += `
                        <tr>
                            <td>${expense.e_month}</td>
                            <td>${expense.allocate}</td>
                            <td>${expense.grocery}</td>
                            <td>${expense.bill}</td>
                            <td>${expense.shopping}</td>
                            <td>${expense.food}</td>
                            <td>${expense.travel}</td>
                            <td>${expense.total}</td>
                            <td>${expense.avl}</td>
                            <td><button type="button"  class="btn btn-sm btn-success" onclick="expenseEdit(${expense.id})">edit</button>
                            <button type="button" class="btn btn-sm btn-danger" onclick="expenseDelete(${expense.id})">delete</button></td>
                        </tr>
                    `;
                }),
                    $("#expenseBody").html(rows);
            }
        }
    })
}

function expenseEdit(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/expense_edit/',

        success: function (data) {
            if (data.status_code == 200) {

                let expense = data.expenses;

                $("#ex_id").val(expense.id);
                $("#month").val(expense.month);
                $("#allocate").val(expense.allocate);
                $("#grocery").val(expense.grocery);
                $("#travel").val(expense.travel);
                $("#food").val(expense.food);
                $("#shopping").val(expense.shopping);
                $("#bill").val(expense.bill);
                $("#total").val(expense.total);
                $("#avl").val(expense.avl);
                $("#expenseModal").modal("show");
            }
        }
    })
}
function expenseDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/expense_delete/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("deleted successfully");
                loadExpense();
            } else {
                alert("not deleted");
            }
        }
    })
}
function updateExpense() {
    let id = $("#ex_id").val();
    let month = $("#month").val();
    let allocate = $("#allocate").val();
    let grocery = $("#grocery").val();
    let bill = $("#bill").val();
    let travel = $("#travel").val();
    let food = $("#food").val();
    let shopping = $("#shopping").val();
    let total = $("#total").val();
    let avl = $("#avl").val();

    let updateData = {
        id,
        month,
        allocate,
        grocery,
        bill,
        travel,
        food,
        shopping,
        total,
        avl
    };

    $.ajax({
        type: "POST",
        data: updateData,
        url: '/update_expense/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("update successfully");
                $("#expenseModal").modal("hide");
                loadExpense();
            } else {
                alert('not updated');
            }
        }
    })
}

