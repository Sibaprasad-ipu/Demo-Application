const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log("id", id);

$(document).ready(function () {
    $("#update").click(function () {
        updateShop();
    })
    loadData(id);
});

function loadData(id) {
    $.ajax({
        type: "POST",
        data: { 'id': id },
        url: '/edit_shop_view/',

        success: function (data) {
            console.log(data);
            if (data.status_code == 200) {
                let shop = data.shops;

                $("#edit_id").val(shop.id);
                $("#name").val(shop.name);
                $("#email").val(shop.email);
                $("#place").val(shop.place);
                $("#shirt").val(shop.shirt);
                $("#pant").val(shop.pant);
                $("#dress").val(shop.dress);
            }
        }
    })
}

function updateShop() {
    let id = $("#edit_id").val();
    let name = $("#name").val();
    let email = $("#email").val();
    let shirt = $("#shirt").val();
    let pant = $("#pant").val();
    let dress = $("#dress").val();
    let place = $("#place").val();

    let updateData = {
        id,
        name,
        email,
        shirt,
        pant,
        dress,
        place
    };
    $.ajax({
        type: "POST",
        data: updateData,
        url: '/shop_update/',

        success: function (data) {
            if (data.status_code == 200) {
                alert("update successfully");
            } else {
                alert("not updated");
            }
        }
    })
}