$(document).ready(function () {
    $("#create").click(function () {
        createTable();
    })
})

function createTable() {

    let book_id = $("#book_id").val();
    let book_name = $("#book_name").val();
    let total_book = $("#total_book").val();
    let book_issue = $("#book_issue").val();
    let book_avl = Number(total_book) - Number(book_issue);
    $("#book_avl").val(book_avl);

    let bookData = {
        book_id,
        book_name,
        total_book,
        book_issue,
        book_avl
    }
    $.ajax({
        type: "POST",
        data: bookData,
        url: '/book_view/',

        success: function (data) {
            console.log("data", data);
            if (data.status_code == 200) {
                alert("book list created successfully");
                window.location.href = '/table/';
            } else {
                alert("book created unsuccessfully");
            }
        }
    })
}