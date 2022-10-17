let API_KEY = 'pXUNQ12DS7SCs8p3RZB2';
let startDate;
let endDate;
let responseAsJSON;
let myChart;
const color1 = 'rgba(0,0,0,0.8)'
const color2 = 'rgba(0,0,0,0.2)'

// function getYesterdayDate() {
//     let date = new Date();
//     date.setDate(date.getDate() - 1);
//     let yesterday = date.toISOString();
//     return yesterday.split('T')[0];
// }
// function getLastMonthDate() {
//     let date = new Date();
//     date.setDate(date.getDate() - 30);
//     let lastMonth = date.toISOString();
//     return lastMonth.split('T')[0];
// }
function getDate(ofset) {
    let date = new Date();
    date.setDate(date.getDate() - ofset);
    let ofsetDate = date.toISOString();
    return ofsetDate.split('T')[0];
}

function setDateFilter() {
    document.getElementById('endDate').setAttribute('max', getDate(1))
    document.getElementById('endDate').setAttribute('value', getDate(1))
    document.getElementById('startDate').setAttribute('value', getDate(30))
}

function getData(ofset) {
    document.getElementById('startDate').setAttribute('value', getDate(ofset))
    document.getElementById('endDate').setAttribute('value', getDate(1))
    fetchData()
}

async function fetchData() {
    startDate = document.getElementById('startDate').value;
    endDate = document.getElementById('endDate').value;
    let url = `https://data.nasdaq.com/api/v3/datasets/BITFINEX/BTCUSD?start_date=${startDate}&end_date=${endDate}&api_key=${API_KEY}`;
    let response = await fetch(url);
    responseAsJSON = await response.json();
    render();
}



function render() {
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    let dataset = responseAsJSON.dataset.data;
    for (let i = 0; i < dataset.length; i++) {
        let data = dataset[i];
        myChart.data.labels.push(data[0]);
        myChart.data.datasets[0].data.push(data[3]);
        myChart.data.datasets[1].data.push(data[7]);

    }
    myChart.update();
}
//////////////////////Chart.js//////////////////////////



let data = {
    labels: [],
    datasets: [
        {
            label: 'Mittelwert',
            backgroundColor: color1,
            borderColor: color1,
            data: [],
            yAxisID: 'y',
            pointRadius: 0,
        }, {
            label: 'Volumen',
            backgroundColor: color2,
            borderColor: color2,
            data: [],
            yAxisID: 'y1',
            pointRadius: 0,
        }]

};

const config = {
    type: 'line',
    data: data,

    options: {
        interaction: {
            mode: 'index',
            intersect: false,
        },
        responsive: true,
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: 'Bitcoin Kurs'
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
                grid: {
                    display: true,
                },
            },
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    display: false,
                },
            },
        },
    }
}



function init() {
    setDateFilter();
    fetchData();
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}


