$(document).ready(function () {
    loadData();
})

function loadData() {
    $.ajax({
        type: 'GET',
        url: '/line_view/',

        success: function (data) {
            if (data.status_code == 200) {
                console.log("ldata:", data);
                var lineData = data.lines;

                // let allocation = [];
                // let used = [];
                // let avl = [];

                // lineData.forEach(function (item) {
                //     allocation.push({
                //         x: item.month_id,
                //         y: item.allocation
                //     })
                //     used.push({
                //         x: item.month_id,
                //         y: item.used
                //     })
                //     avl.push({
                //         x: item.month_id,
                //         y: item.avl
                //     })
                // });
                let allocation = lineData.map(function (item) {
                    return item.allocation;
                })
                let used = lineData.map(function (item) {
                    return item.used;
                })
                let avialable = lineData.map(function (item) {
                    return item.avl;
                })
                let labels = lineData.map(function (item) {
                    if (item.month_id == 1) {
                        return "January";
                    }
                    if (item.month_id == 2) {
                        return "February";
                    }
                    if (item.month_id == 3) {
                        return "March";
                    }
                    if (item.month_id == 4) {
                        return "April";
                    }
                    if (item.month_id == 5) {
                        return "May";
                    }
                    if (item.month_id == 6) {
                        return "June";
                    }
                    if (item.month_id == 7) {
                        return "July";
                    }
                    if (item.month_id == 8) {
                        return "August";
                    }
                    if (item.month_id == 9) {
                        return "September";
                    }
                    if (item.month_id == 10) {
                        return "October";
                    }
                    if (item.month_id == 11) {
                        return "November";
                    }
                    if (item.month_id == 12) {
                        return "December";
                    }
                });

                let ctx = document.getElementById("iChat");

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'allocation',
                            data: allocation,
                            tension: 0.1
                        },
                        {
                            label: 'used',
                            data: used,
                            tension: 0.1
                        },
                        {
                            label: 'avialable',
                            data: avialable,
                            tension: 0.1
                        }
                        ]
                    }
                })


            }
        }
    })

}