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

var ctx = document.getElementById("RMA-Volume-Premium");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1","M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11","M12"],
    datasets: [
      {
        type: 'line',
        data: [3,4,8,19,22,3,4,22,12,14,15,1],
        borderColor: '#FFBB41',
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [3,4,8,19,22,3,4,22,12,14,15,1],
        backgroundColor: '#67AAF9',
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

var ctx = document.getElementById("RMA-Volume-Standard");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1","M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11","M12"],
    datasets: [
      {
        type: 'line',
        data: [38,34,48,29,22,23,34,22,32,18,13,19],
        borderColor: '#FFBB41',
        borderDash: [10,10],
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [38,34,48,29,22,23,34,22,32,18,13,19],
        backgroundColor: '#67AAF9',
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
          maxTicksLimit: 3
        }
      }]
    }
  }
});

var ctx = document.getElementById("Top-PID");
var myChart = new Chart(ctx, {
  type: 'pie',
  data: {
    labels: ["IEP-4610-HW-K9-NFR", "IEP-4610-HW-K9-NFR", "IEP-4610-HW-K9-NFR", "CTS-EX90-K9" , "FS3500-K9"],
    datasets: [
      {
        data: [15,23,42,8,12],
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

var ctx = document.getElementById("Service-Delivery-Performance-Premium");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1","M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11","M12"],
    datasets: [
      {
        yAxisID: "y-axis-1",
        type: 'line',
        data: [80,83,89,98,95,94,99,93,78,85,83,93],
        borderColor: '#FFBB41',
        borderDash: [10,10],
        backgroundColor: 'transparent'
      },
      {
        yAxisID: "y-axis-0",
        type: 'bar',
        data: [3,4,8,19,22,3,4,22,12,14,15,1],
        backgroundColor: '#67AAF9',
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
      yAxes: [
        {
          position: "left",
          "id": "y-axis-0",
          gridLines : {
            drawBorder: false
          },
          ticks: {
            padding: 20,
          }
        },
        {
          position: "right",
          "id": "y-axis-1",
          gridLines : {
            drawBorder: false
          },
          ticks: {
            padding: 20,
          }
        }
      ]
    }
  }
});

var ctx = document.getElementById("Service-Delivery-Performance-Standard");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1","M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11","M12"],
    datasets: [
      {
        yAxisID: "y-axis-1",
        type: 'line',
        data: [84,88,79,78,55,64,89,83,88,87,82,91],
        borderColor: '#FFBB41',
        backgroundColor: 'transparent'
      },
      {
        yAxisID: "y-axis-0",
        type: 'bar',
        data: [38,34,48,29,22,23,34,22,32,18,13,19],
        backgroundColor: '#67AAF9',
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
      yAxes: [
        {
          position: "left",
          "id": "y-axis-0",
          gridLines : {
            drawBorder: false
          },
          ticks: {
            padding: 20,
          }
        },
        {
          position: "right",
          "id": "y-axis-1",
          gridLines : {
            drawBorder: false
          },
          ticks: {
            padding: 20,
          }
        }
      ]
    }
  }
});

var ctx = document.getElementById("Qty-Threshold-Breach/part-per-RMA");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1","M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11","M12"],
    datasets: [
      {
        yAxisID: "y-axis-1",
        type: 'line',
        data: [80,83,89,98,95,94,99,93,78,85,83,93],
        borderColor: '#FFBB41',
        backgroundColor: 'transparent'
      },
      {
        yAxisID: "y-axis-0",
        type: 'bar',
        data: [3,4,8,19,22,3,4,22,12,14,15,1],
        backgroundColor: '#67AAF9',
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
      yAxes: [
        {
          position: "left",
          "id": "y-axis-0",
          gridLines : {
            drawBorder: false
          },
          ticks: {
            padding: 20,
          }
        },
        {
          position: "right",
          "id": "y-axis-1",
          gridLines : {
            drawBorder: false
          },
          ticks: {
            padding: 20,
          }
        }
      ]
    }
  }
});


var ctx = document.getElementById("Backlog");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "M1","M2","M3","M4","M5","M6", "M7","M8","M9","M10","M11","M12"],
    datasets: [
      {
        type: 'line',
        data: [38,34,48,29,22,23,34,22,32,18,13,19],
        borderColor: '#FFBB41',
        borderDash: [10,10],
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [38,34,48,29,22,23,34,22,32,18,13,19],
        backgroundColor: '#67AAF9',
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
          maxTicksLimit: 3
        }
      }]
    }
  }
});



var ctx = document.getElementById("Total-Value-Recovery-Rate");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "15","30","45","60","75","90", "105","120"],
    datasets: [
      {
        type: 'line',
        data: [38,34,48,29,22,23,34,22],
        borderColor: '#FFBB41',
        borderDash: [10,10],
        backgroundColor: 'transparent'
      },
      {
        type: 'bar',
        data: [38,34,48,29,22,23,34,22],
        backgroundColor: '#67AAF9',
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
          maxTicksLimit: 3
        }
      }]
    }
  }
});
