$(document).ready(function () {
    bookList();
})

function bookList() {
    $.ajax({
        type: "GET",
        url: '/table_view/',

        success: function (data) {
            console.log("table", data);
            if (data.status_code == 200) {
                let rows = " ";

                $.each(data.books, function (index, book) {
                    rows += `
                    <tr>
                        <td>${book.book_id}</td>
                        <td>${book.book_name}</td>
                        <td>${book.total_book}</td>
                        <td>${book.book_issue}</td>
                        <td>${book.book_avl}</td>
                        <td><button class="btn btn-success" onclick="bookDelete(${book.id})">delete</button></td>
                    </tr>

                    `;
                }),
                    $("#bookBody").html(rows);
            }
        }
    })
}

function bookDelete(id) {
    $.ajax({
        type: "POST",
        data: { id: id },
        url: '/book_delete/',

        success: function (data) {
            console.log("del", data);
            if (data.status_code == 200) {
                alert("book delete successfully");
                bookList();
            } else {
                alert("book not deleted.");
            }
        }
    })
}