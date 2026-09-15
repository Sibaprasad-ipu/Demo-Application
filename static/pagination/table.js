
$(document).ready(function () {
    loadData();
    loadsData();
});

function loadData() {
    $.ajax({
        type: 'POST',
        url: '/table_data/',
        async: false,

        success: function (data) {
            console.log("tableData", data);

            let rows = "";

            $.each(data.tables, function (index, table) {
                rows += `

                <tr>
                    <td>${table.sale_id}</td>
                    <td>${table.allocation_id}</td>
                    <td>${table.used_id}</td>
                    <td>${table.avialable_id}</td>
                    <td>${table.month_id}</td>
                </tr>

                `;
            }),
                $("#tableBody").html(rows);
            var table = new DataTable('#tableData', {

            })
        },
    })

}


function loadsData() {
    $.ajax({
        type: 'POST',
        url: '/tables_data/',


        success: function (data) {
            console.log("tableData", data);

            let tData = data.ptables;

            $('#tableDatas').pagination({
                dataSource: tData,
                pageSize: 5,
                showSizeChanger: true,
                showNavigator: true,
                formatNavigator: '<%= rangeStart %>-<%= rangeEnd %> of <%= totalNumber %> items',
                position: 'top',
                showGoInput: true,
                showGoButton: true,
                formatGoInput: 'go to<%= input %> page',

                callback: function (data, pagination) {

                    let rows = "";

                    $.each(data, function (index, table) {
                        rows += `
                            <tr>
                                <td>${table.sale_id}</td>
                                <td>${table.allocation_id}</td>
                                <td>${table.used_id}</td>
                                <td>${table.avialable_id}</td>
                                <td>${table.month_id}</td>
                            </tr>
                        `;
                    });

                    $("#tablesBody").html(rows);
                }
            });
        },


    });
}
