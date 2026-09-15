

$(document).ready(function () {

    loadData();
    loadChat();
    loadChatr();
    loadChats();
})

function loadData() {
    $.ajax({
        type: "GET",
        url: "/list_view/",
        async: false,

        success: function (data) {

            if (data.status_code == 200) {

                var datas = data.lists;

                console.log("data:", datas);

                let ctx = document.getElementById("chartDemo");

                let allocationData = [];
                let usedData = [];
                let availableData = [];

                datas.forEach(function (item) {
                    allocationData.push({
                        x: item.month_id,
                        y: item.allocation
                    });

                    usedData.push({
                        x: item.month_id,
                        y: item.used
                    });

                    availableData.push({
                        x: item.month_id,
                        y: item.avialable
                    });
                });
                let labels = datas.map(function (item) {

                    if (item.month_id == 1) {
                        return "January";
                    }

                    if (item.month_id == 2) {
                        return "February";
                    }

                    if (item.month_id == 3) {
                        return "March";
                    }
                    if (item.status_code == 4) {
                        return "April";
                    }
                    if (item.status_code == 5) {
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


                    return item.month_id;
                })


                new Chart(ctx, {
                    type: "bar",

                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: "Allocation",
                                data: allocationData,
                                backgroundColor: 'grey'
                            },
                            {
                                label: "Used",
                                data: usedData,
                                backgroundColor: 'red'
                            },
                            {
                                label: "Available",
                                data: availableData,
                                backgroundColor: 'green'
                            }
                        ]
                    },

                });
            }
        }
    });
}



function loadChat() {
    $.ajax({
        type: "GET",
        url: '/pchat_view/',

        success: function (data) {
            if (data.status_code == 200) {

                var pData = data.budgets;
                console.log("budgets:", pData);
                let allocation = 0;
                let used = 0;
                let avialable = 0;

                pData.forEach(function (item) {
                    allocation += item.allocation_id,
                        used += item.used_id,
                        avialable += item.avialable_id

                })

                let cty = document.getElementById("chatP");

                new Chart(cty, {
                    type: 'pie',
                    data: {
                        labels: ['Allocation', 'Used', 'Avialable'],
                        datasets: [{
                            labels: 'Budget',
                            data: [allocation, used, avialable],
                        }]
                    }
                })
            }
        }
    })
}


function loadChatr() {

    $.ajax({
        type: 'GET',
        url: '/line_view/',

        success: function (data) {
            if (data.status_code == 200) {

                var lineData = data.lines;
                console.log("lineData:", lineData);

                let allocation = lineData.map(function (item) {
                    return item.allocation;
                })
                let used = lineData.map(function (item) {
                    return item.used;
                })
                let avl = lineData.map(function (item) {
                    return item.avl;
                })
                let labels = lineData.map(function (item) {
                    if (item.month_id == 1) {
                        return "january";
                    }
                    if (item.month_id == 2) {
                        return "february";
                    }
                    if (item.month_id == 3) {
                        return "march";
                    }
                    if (item.month_id == 4) {
                        return "april";
                    }
                    if (item.month_id == 5) {
                        return "may";
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


                })

                let ctz = document.getElementById("chatR");
                new Chart(ctz, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'expenditure',
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
                            data: avl,
                            tension: 0.1
                        }
                        ]
                    },

                })

            }
        }
    })
}

function loadChats() {
    $.ajax({
        type: "GET",
        url: '/statter_view/',

        success: function (data) {
            if (data.status_code == 200) {
                console.log("Data:", data);
                let staData = data.statData;

                let labels = staData.map(function (item) {
                    if (item.month_id == 1) {
                        return "january";
                    }
                    if (item.month_id == 2) {
                        return "february";
                    }
                    if (item.month_id == 3) {
                        return "march";
                    }
                    if (item.month_id == 4) {
                        return "april";
                    }
                    if (item.month_id == 5) {
                        return "may";
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

                let allocation = staData.map(function (item) {
                    return item.allocation;
                })
                let used = staData.map(function (item) {
                    return item.used;
                })
                let avialable = staData.map(function (item) {
                    return item.avialable;
                })

                let cta = document.getElementById('sChat');

                new Chart(cta, {
                    type: 'radar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "allocation",
                            data: allocation
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

