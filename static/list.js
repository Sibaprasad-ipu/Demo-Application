$(document).ready(function () {

    $("#asset_edit").click(function () {
        assetEdit();
    })
    $("#asset_delete").click(function () {
        assetDelete();
    })
    $("#asset_update").click(function () {
        assetUpdate();
    })
    loadData();
})

function loadData() {
    $.ajax({
        type: "GET",
        url: '/table_view/',
        async: false,

        success: function (data) {
            console.log("data:", data);
            if (data.status_code == 200) {

                let rows = "";

                $.each(data.assets, function (index, asset) {

                    rows += `

                        <tr>
                            <td>${asset.sale_id}</td>
                            <td>${asset.allocation_id}</td>
                            <td>${asset.used_id}</td>
                            <td>${asset.avialable_id}</td>
                            <td>${asset.month_id}</td>
                            <td><button type="button" id="asset_edit" class="btn btn-sm btn-success" onclick="assetEdit(${asset.id})">edit</button>
                            <button type="button" id="asset_delete" class="btn btn-sm btn-danger" onclick="assetDelete(${asset.id})">delete</button></td>
                        </tr>
                    `;
                }),
                    $("#tableData").html(rows);
                new DataTable('#dataList', {});
            }
        },
        error: function (data) {
            alert(data.message);
        }
    })
};

function assetDelete(id) {
    $.ajax({
        type: "POST",
        url: "/asset_delete/",
        data: { id: id },
        async: false,

        success: function (data) {
            console.log("ddata:", data);
            if (data.status_code == 200) {
                loadData();
                alert("data delete successfully");

            } else {
                alert("Data not deleted");
            }
        }
    })
}

function assetEdit(id) {
    $.ajax({
        type: "POST",
        url: '/edit_asset/',
        data: { id: id },
        async: false,

        success: function (data) {
            console.log("edata:", data);
            if (data.status_code == 200) {
                let datas = data.editsData;

                $("#edit_id").val(datas.id);
                $("#edit_sale").val(datas.edit_sale);
                $("#edit_allocation").val(datas.edit_allocation);
                $("#edit_used").val(datas.edit_used);
                $("#edit_avialable").val(datas.edit_avialable);
                $("#editAssetModal").modal("show");
            } else {
                alert("data not found");
            }
        }
    })
}

function assetUpdate() {
    let edit_id = $("#edit_id").val();
    let edit_sale = $("#edit_sale").val();
    let edit_allocation = $("#edit_allocation").val();
    let edit_used = $("#edit_used").val();
    let edit_avialable = $("#edit_avialable").val();

    let editData = {
        edit_id,
        edit_sale,
        edit_allocation,
        edit_used,
        edit_avialable
    };
    $.ajax({
        type: "POST",
        url: '/asset_update/',
        data: editData,

        success: function (data) {
            console.log("uData:", data);
            if (data.status_code == 200) {
                alert("data update successfully");
                $("#editAssetModal").modal("hide");
                loadData();
            } else {
                alert("data not update");
            }
        }
    })
}
