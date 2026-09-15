$(document).ready(function () {
    $("#register").click(function () {
        registerShop();
    })
})
function registerShop() {
    let name = $("#name").val();
    let email = $("#email").val();
    let shirt = $("#shirt").val();
    let pant = $("#pant").val();
    let dress = $("#dress").val();
    let place = $("#place").val();

    let regdData = {
        name,
        email,
        shirt,
        pant,
        dress,
        place
    };
    $.ajax({
        type: "POST",
        data: regdData,
        url: '/shop_regd_views/',

        success: function (data) {
            console.log("shop", data);
            if (data.status_code == 200) {
                alert("register successfully");
            } else {
                alert("not registered");
            }
        }
    })
}