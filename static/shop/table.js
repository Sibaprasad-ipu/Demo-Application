$(document).ready(function () {
    shopList();
})

function shopList() {
    $.ajax({
        type: "GET",
        url: '/shop_list_view/',
        success: function (data) {
            console.log("table", data);
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
                            <td> <button class="btn btn-primary" type="button" onclick="shopEdit(${list.id})">edit</button></td>
                        </tr>
                    `;
                }),
                    $("#tableBody").html(rows);
            }
        }
    })
}