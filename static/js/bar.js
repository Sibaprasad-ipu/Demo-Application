$(document).ready(function () {
    loadBar();
})

function loadBar() {
    $.ajax({
        type: 'GET',
        url: '/bar_view/',

        success: function (data) {
            if (data.status_code == 200) {
                console.log("bar:", data);

                let barData = data.bar;

                // let allocationB = [];
                // let usedB = [];
                // let avialableB = [];

                // barData.forEach(function (item) {
                //     allocationB.push({
                //         x: item.month_id,
                //         y: item.allocation
                //     });
                //     usedB.push({
                //         x: item.month_id,
                //         y: item.used
                //     });
                //     avialableB.push({
                //         x: item.month_id,
                //         y: item.avialable
                //     });
                // });
                let allocationB = barData.map(function (item) {
                    return item.allocation;
                })
                let usedB = barData.map(function (item) {
                    return item.used;
                })

                let avialableB = barData.map(function (item) {
                    return item.avialable;
                })


                let labels = barData.map(function (item) {
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
                        return "Sept";
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
                let ctx = document.getElementById("bChat");

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'allocation',
                            data: allocationB,
                            backgroundColor: 'purple'
                        },
                        {
                            label: 'used',
                            data: usedB,
                            backgroundColor: 'red'
                        },
                        {
                            label: 'avialable',
                            data: avialableB,
                            backgroundColor: 'green'
                        }
                        ]
                    }
                })
            }
        }

    })
}
