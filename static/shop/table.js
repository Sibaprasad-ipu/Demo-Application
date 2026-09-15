$(document).ready(function () {
    shopList();
});

function shopList() {
    $.ajax({
        type: "GET",
        url: '/shop_list_view/',
        success: function (data) {
            if (data.status_code == 200) {
                let rows = "";
                $.each(data.lists, function (index, list) {
                    rows += `
                        <tr>
                            <td>${list.id}</td>
                            <td>${list.name}</td>
                            <td>${list.email}</td>
                            <td>${list.place}</td>
                            <td>${list.shirt}</td>
                            <td>${list.pant}</td>
                            <td>${list.dress}</td>
                            <td> <button class="btn btn-primary" type="button" onclick="shopEdit(${list.id})">edit</button>
                            <button class="btn btn-danger" type="button" onclick="shopDelete(${list.id})">delete</button></td>
                        </tr>
                    `;
                }),
                    $("#tableBody").html(rows);
            }
        }
    })
}
function shopEdit(id) {
    window.location.href = '/edit_shop/?id=' + id;
}
function shopDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/shop_delete/',

        success: function (data) {
            console.log("del", data);
            if (data.status_code == 200) {
                alert("delete successfully");
            } else {
                alert("not deleted");
            }
        }
    })
}