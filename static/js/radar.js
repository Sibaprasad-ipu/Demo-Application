$(document).ready(function () {
    loadRadar();
})

function loadRadar() {
    $.ajax({
        type: "GET",
        url: '/radar_view/',

        success: function (data) {
            console.log("radar:", data);
            if (data.status_code == 200) {
                let radarData = data.radar;

                let labels = radarData.map(function (item) {
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

                let allocation = radarData.map(function (item) {
                    return item.Allocation;
                });
                let used = radarData.map(function (item) {
                    return item.Used;
                });
                let avialable = radarData.map(function (item) {
                    return item.Avialable;
                });

                let ctx = document.getElementById('rChat');

                new Chart(ctx, {
                    type: "radar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'allocation',
                            data: allocation,
                        },
                        {
                            label: 'used',
                            data: used
                        },
                        {
                            label: 'avialable',
                            data: avialable
                        }
                        ]
                    }
                })

            }
        }
    })
}