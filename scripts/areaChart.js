var ctx = document.getElementById("areaChart");
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["M","T","W","R","F","S","S"],
    datasets: [
      {
        data: [21,13,17,15,16,14,18],
        backgroundColor: [
          '#D1E5FD'
        ],
        borderColor: '#D1E5FD'
      },
      {
        data: [25,17,23,20,19,23,21],
        backgroundColor: [
          '#67AAF9'
        ],
        borderColor: '#67AAF9'
      },
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    tooltip: {
      display: true
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        gridLines: {
          display:false,
          // offsetGridLines : true
        }
      }],
      yAxes: [{
        display: false
      }]
    }
  }
});
