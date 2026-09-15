$(document).ready(function () {
    loadPie();
})
function loadPie() {
    $.ajax({
        type: "GET",
        url: '/pie_view/',

        success: function (data) {
            if (data.status_code == 200) {
                let pieData = data.pie;

                let allocationP = 0;
                let usedP = 0;
                let avialableP = 0;

                pieData.forEach(function (item) {
                    allocationP += item.allocation_id,
                        usedP += item.used_id,
                        avialableP += item.avialable_id
                });

                let ctx = document.getElementById("pChat");

                new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['Allocation', 'Used', 'Avialable'],
                        datasets: [{
                            label: 'budget',
                            data: [allocationP, usedP, avialableP]
                        }]
                    }
                })
            }
        }
    })
}