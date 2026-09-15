$(document).ready(function () {
    $("#create").click(function () {
        createTransaction();
    })
    $("#update").click(function () {
        updateTransction();
    })
    loadTransaction();
})

function createTransaction() {
    let name = $("#name").val();
    let ac_no = $("#ac_no").val();
    let credit = $("#credit").val();
    let debit = $("#debit").val();
    let balance = Number(credit) - Number(debit);
    $("#balance").val(balance);
    let mode = $("#mode").val();
    let time = $("#time").val();

    let transData = {
        name,
        ac_no,
        credit,
        debit,
        balance,
        mode,
        time
    };
    $.ajax({
        type: "POST",
        data: transData,
        url: '/create_transaction_view/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("save successfully");
                window.location.href = '/trans_list/';
            } else {
                alert("not save");
            }
        }
    })
}
function loadTransaction() {
    $.ajax({
        type: "GET",
        url: '/trans_list_view/',

        success: function (data) {
            if (data.status_code == 200) {
                let rows = ' ';
                $.each(data.trans, function (index, tran) {
                    rows += `
                        <tr>
                            <td>${tran.name}</td>
                            <td>${tran.ac_no}</td>
                            <td>${tran.credit}</td>
                            <td>${tran.debit}</td>
                            <td>${tran.balance}</td>
                            <td>${tran.mode}</td>
                            <td>${tran.time}</td>
                            <td><button class="btn btn-primary" type="button" onclick="editTransaction(${tran.id})">Edit</button>
                            <button class="btn btn-danger" type="button" onclick="deleteTransaction(${tran.id})">Delete</button></td>
                        </tr>
                    `;
                }),
                    $("#bankingBody").html(rows);
            }
        }
    })
}
function deleteTransaction(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/delete_transaction/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("deleted successfully");
                loadTransaction();
            } else {
                alert("not deleted");
            }
        }
    })
}

function editTransaction(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/edit_transaction/',

        success: function (data) {
            if (data.status_code == 200) {
                let trans = data.transaction;

                $("#b_id").val(trans.id);
                $("#name").val(trans.name);
                $("#ac_no").val(trans.ac_no);
                $("#credit").val(trans.credit);
                $("#debit").val(trans.debit);
                $("#balance").val(trans.balance);
                $("#mode").val(trans.mode);
                $("#time").val(trans.time);
                $("#bankingModal").modal("show");
            }
        }
    })
}

function updateTransction() {
    let id = $("#b_id").val();
    let name = $("#name").val();
    let ac_no = $("#ac_no").val();
    let credit = $("#credit").val();
    let debit = $("#debit").val();
    let balance = Number(credit) - Number(debit);
    $("#balance").val(balance);
    let mode = $("#mode").val();
    let time = $("#time").val();

    let updateData = {
        id,
        name,
        ac_no,
        credit,
        debit,
        balance,
        mode,
        time
    };
    $.ajax({
        type: "POST",
        data: updateData,
        url: '/trans_update/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("update  successfully");
                $("#bankingModal").modal("hide");
                window.location.href = '/trans_list/';
            } else {
                alert("not update");
            }
        }
    })
}
