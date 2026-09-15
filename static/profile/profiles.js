const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

$(document).ready(function () {
    loadData();
})

function loadData() {
    $.ajax({
        type: "POST",
        data: { 'id': id },
        url: '/profiles_views/',
        success: function (data) {
            console.log("data:", data);
            if (data.status_code == 200) {

                var pData = data.profileData[0];
                console.log("pic:", pData.pic);
                $("#p_name").text(pData.name);
                $("#p_email").text(pData.email);
                $("#p_password").text(pData.password);
                $("#p_fname").text(pData.fname);
                $("#p_lname").text(pData.lname);
                $("#p_pic").attr("src", "/static/pic/" + pData.email + "/" + pData.pic);



            }
        }
    })
}