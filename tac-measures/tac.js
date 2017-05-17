Chart.elements.Rectangle.prototype.draw = function() {

    var ctx = this._chart.ctx;
    var vm = this._view;
    var left, right, top, bottom, signX, signY, borderSkipped, radius;
    var borderWidth = vm.borderWidth;
    // Set Radius Here
    // If radius is large enough to cause drawing errors a max radius is imposed
    var cornerRadius = 2;

    if (!vm.horizontal) {
        // bar
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top? 1: -1;
        borderSkipped = vm.borderSkipped || 'bottom';
    } else {
        // horizontal bar
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left? 1: -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
    }

    // Canvas doesn't allow us to stroke inside the width so we can
    // adjust the sizes to fit if we're setting a stroke on the line
    if (borderWidth) {
        // borderWidth shold be less than bar width and bar height.
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize? barSize: borderWidth;
        var halfStroke = borderWidth / 2;
        // Adjust borderWidth when bar top position is near vm.base(zero).
        var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
        var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
        var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
        var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
        // not become a vertical line?
        if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
        }
        // not become a horizontal line?
        if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
        }
    }

    ctx.beginPath();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = borderWidth;

    // Corner points, from bottom-left to bottom-right clockwise
    // | 1 2 |
    // | 0 3 |
    var corners = [
        [left, bottom],
        [left, top],
        [right, top],
        [right, bottom]
    ];

    // Find first (starting) corner with fallback to 'bottom'
    var borders = ['bottom', 'left', 'top', 'right'];
    var startCorner = borders.indexOf(borderSkipped, 0);
    if (startCorner === -1) {
        startCorner = 0;
    }

    function cornerAt(index) {
        return corners[(startCorner + index) % 4];
    }

    // Draw rectangle from 'startCorner'
    var corner = cornerAt(0);
    ctx.moveTo(corner[0], corner[1]);

    for (var i = 1; i < 4; i++) {
        corner = cornerAt(i);
        nextCornerId = i+1;
        if(nextCornerId == 4){
            nextCornerId = 0
        }

        nextCorner = cornerAt(nextCornerId);

        width = corners[2][0] - corners[1][0];
        height = corners[0][1] - corners[1][1];
        x = corners[1][0];
        y = corners[1][1];

        var radius = cornerRadius;

        // Fix radius being too large
        if(radius > height/2){
            radius = height/2;
        }if(radius > width/2){
            radius = width/2;
        }

        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);

    }

    ctx.fill();
    if (borderWidth) {
        ctx.stroke();
    }
};

var ctx = document.getElementById("SR-Volume-Sev1/2");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1", "M2", "M3", "M4", "M5", "M6"],
    datasets: [
      {
        type: 'line',
        data: [21,13,17,15,16,14],
        borderColor: '#FFBB41',
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [21,13,17,15,16,14],
        backgroundColor: [
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9'
        ]
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        barPercentage: 0.3,
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        gridLines : {
          drawBorder: false
        },
        ticks: {
          padding: 20,
          beginAtZero:true,
          maxTicksLimit: 3,
          max: 30,
          stepSize: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("SR-Volume-Sev3/4");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1", "M2", "M3", "M4", "M5", "M6"],
    datasets: [
      {
        type: 'line',
        data: [21,11,12,09,26,18],
        borderColor: '#FFBB41',
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [21,11,12,09,26,18],
        backgroundColor: [
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9'
        ]
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        barPercentage: 0.3,
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        gridLines : {
          drawBorder: false
        },
        ticks: {
          padding: 20,
          beginAtZero:true,
          maxTicksLimit: 3,
          max: 30,
          stepSize: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Top-Product-Family");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        label: 'N7700',
        data: [15,18,19,24,23],
        backgroundColor: [
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9'
        ]
      },
      {
        label: 'CAT3560E',
        data: [18,23,24,29,30],
        backgroundColor: [
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41'
        ]
      },
      {
        label: 'N1200',
        data: [21,17,12,11,10],
        backgroundColor: [
          '#37394C',
          '#37394C',
          '#37394C',
          '#37394C',
          '#37394C',
          '#37394C',
          '#37394C'
        ]
      },
      {
        label: 'ASR1000',
        data: [24,22,25,29,30],
        backgroundColor: [
          '#D1E5FD',
          '#D1E5FD',
          '#D1E5FD',
          '#D1E5FD',
          '#D1E5FD',
          '#D1E5FD',
          '#D1E5FD'
        ]
      },
      {
        label: 'N7700',
        data: [11,19,14,28,25],
        backgroundColor: [
          '#F4F1EA',
          '#F4F1EA',
          '#F4F1EA',
          '#F4F1EA',
          '#F4F1EA',
          '#F4F1EA',
          '#F4F1EA'
        ]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        stacked: true,
        barPercentage: 0.3,
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines : {
          drawBorder: false
},
        ticks: {
          padding: 20,
          beginAtZero:true,
          stepSize: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Case-Closure-Reason");
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["Reports", "Hardware Replacement (RMA/SVO)", "Software Configuration", "Hardware Replacement (RMA/SVO)" , "Customer Education"],
    datasets: [
      {
        data: [21,12,34,42,32],
        backgroundColor: [
          '#67AAF9',
          '#FFBB41',
          '#37394C',
          '#D1E5FD',
          '#F4F1EA'
        ]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  }
});

var ctx = document.getElementById("RMA-TO-SR-RATIO");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1", "M2", "M3", "M4", "M5", "M6"],
    datasets: [
      {
        type: 'line',
        data: [21,11,12,09,26,18],
        borderColor: '#FFBB41',
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [21,11,12,09,26,18],
        backgroundColor: [
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9'
        ]
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        barPercentage: 0.3,
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        gridLines : {
          drawBorder: false
        },
        ticks: {
          padding: 20,
          beginAtZero:true,
          maxTicksLimit: 3,
          max: 30,
          stepSize: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Requeue");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,7],
        backgroundColor: '#67AAF9'
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        barPercentage: 0.3,
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        gridLines : {
          drawBorder: false
        },
        ticks: {
          padding: 20,
          beginAtZero:true,
          maxTicksLimit: 3,
          stepSize: 5,
          max: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("No-Fault-Found");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        label: 'Total Cases',
        data: [88,90,89,87],
        backgroundColor: [
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41'
        ]
      },
      {
        label: 'NFF',
        data: [12,10,11,13],
        backgroundColor: [
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9',
          '#67AAF9'
        ]
      }
    ]
  },
  options: {
    scales: {
      xAxes: [{
        stacked: true,
        barPercentage: 0.3,
        gridLines: {
          display:false
        }
      }],
      yAxes: [{
        stacked: true,
        gridLines : {
          drawBorder: false
},
        ticks: {
          padding: 20,
          beginAtZero:true,
          max: 100
        }
      }]
    }
  }
});

var ctx = document.getElementById("Premium-Vs-Classic-(Q1)");
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Premium','Standard'],
    datasets: [{
      data: [20, 80],
      backgroundColor: [
        '#67AAF9',
        '#D1E5FD'
      ],
      borderWidth: 1,
      borderRadius: 1
    }]
  },
  options: {
    cutoutPercentage: 80,
    elements: {
      arc: {
        roundedCornersFor: 0
      }
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  }
});

var ctx = document.getElementById("Premium-Vs-Classic-(Q2)");
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Premium','Standard'],
    datasets: [{
      data: [30, 70],
      backgroundColor: [
        '#67AAF9',
        '#D1E5FD'
      ],
      borderWidth: 1,
      borderRadius: 1
    }]
  },
  options: {
    cutoutPercentage: 80,
    elements: {
      arc: {
        roundedCornersFor: 0
      }
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  }
});

var ctx = document.getElementById("Premium-Vs-Classic-(Q3)");
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Premium','Standard'],
    datasets: [{
      data: [25, 75],
      backgroundColor: [
        '#67AAF9',
        '#D1E5FD'
      ],
      borderWidth: 1,
      borderRadius: 1
    }]
  },
  options: {
    cutoutPercentage: 80,
    elements: {
      arc: {
        roundedCornersFor: 0
      }
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  }
});

var ctx = document.getElementById("Premium-Vs-Classic-(Q4)");
var myChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Premium','Standard'],
    datasets: [{
      data: [35, 65],
      backgroundColor: [
        '#67AAF9',
        '#D1E5FD'
      ],
      borderWidth: 1,
      borderRadius: 1
    }]
  },
  options: {
    cutoutPercentage: 80,
    elements: {
      arc: {
        roundedCornersFor: 0
      }
    },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  }
});
