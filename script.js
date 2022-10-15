let API_KEY = 'pXUNQ12DS7SCs8p3RZB2';
let startDate;
let endDate;
let responseAsJSON;
let myChart;

function getYesterdayDate() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    let yesterday = date.toISOString();
    return yesterday.split('T')[0];
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
    renderHeadline();
    renderData();
}


function renderHeadline() {
    let table = document.getElementById('table');
    table.innerHTML = `
        <tr id="firstRow">
        </tr>
        `
    for (let i = 0; i < 8; i++) {
        document.getElementById('firstRow').innerHTML += `
        <th>
        ${responseAsJSON.dataset.column_names[i]}
        </th>        
        `;
    }
}

function renderData() {
    myChart.data.labels = [];
    myChart.data.datasets[0].data = [];
    let table = document.getElementById('table');
    let dataset = responseAsJSON.dataset.data;
    for (let i = 0; i < dataset.length; i++) {
        table.innerHTML += `<tr id="row${i}" ></tr>`
        let data = dataset[i];
        let index = i;
        for (let i = 0; i < data.length; i++) {
            let row = document.getElementById('row' + index);
            row.innerHTML += `
            <td>${data[i]}</td>
            `;

        }
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
            backgroundColor: 'red',
            borderColor: 'red',
            data: [],
            yAxisID: 'y',
        }, {
            label: 'Volumen',
            backgroundColor: 'blue',
            borderColor: 'blue',
            data: [],
            yAxisID: 'y1',
        }]

};

const config = {
    type: 'line',
    data: data,
    options: {
        responsive: true,
        stacked: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            title: {
                display: true,
                text: 'Bitcoin Kurs'
            }
        },
    }, scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
    },
};


function init() {
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}


