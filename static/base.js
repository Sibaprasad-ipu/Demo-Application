$(document).ready(function () {
    $("#create_id").click(function () {
        createData();
    })
})

function createData() {
    let sale_id = $("#sale_id").val();
    let allocation_id = $("#allocation_id").val().trim();
    let used_id = $("#used_id").val().trim();
    let avl = Number(allocation_id) - Number(used_id);
    $("#avialable_id").val(avl);
    let month_id = $("#month_id").val();

    let chatData = {
        sale_id: sale_id,
        allocation_id: allocation_id,
        used_id: used_id,
        avialable_id: avl,
        month_id: month_id
    };
    $.ajax({
        type: "POST",
        data: chatData,
        url: '/base_view/',
        async: false,

        success: function (data) {
            if (data.status_code == 200) {
                window.location.href = "/table_views/";
                alert("created successfully");

            } else if (data.status_code == 400) {
                alert('sale id already exist');
            }
        },
        error: function (data) {
            alert("something went wrong");
        }
    })
}