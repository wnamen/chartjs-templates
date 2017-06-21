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

var ctx = document.getElementById("Bookings-Products-Total");
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
          stepSize:5,
          max: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Bookings-by-Architecture");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        label: 'Collaboration',
        type: 'bar',
        data: [8,11,9,3],
        backgroundColor: '#67AAF9'
      },
      {
        label: 'Data Center',
        type: 'bar',
        data: [9,10,7,11],
        backgroundColor: '#FFBB41'
      },
      {
        label: 'Enterprise Networking',
        type: 'bar',
        data: [11,10,21,15],
        backgroundColor: '#37394C'
      },
      {
        label: 'Security',
        type: 'bar',
        data: [14,15,10,18],
        backgroundColor: '#D1E5FD'
      },
      {
        label: 'Other',
        type: 'bar',
        data: [17,13,18,19],
        backgroundColor: '#F4F1EA'
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
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
          stepSize: 10
        }
      }]
    }
  }
});

var ctx = document.getElementById("Bookings-Services-Total");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,9],
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
          stepSize:5,
          max: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Bookings-Services-TS");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,10],
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
          stepSize:5,
          max: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Booking-by-TS-Offers");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        label: 'Cloud Managed Services',
        type: 'bar',
        data: [4,10,8,11],
        backgroundColor: '#67AAF9'
      },
      {
        label: 'Network Support',
        type: 'bar',
        data: [9,10,7,11],
        backgroundColor: '#FFBB41'
      },
      {
        label: 'Product Offer Support',
        type: 'bar',
        data: [11,10,21,15],
        backgroundColor: '#37394C'
      },
      {
        label: 'SCV Offer Support',
        type: 'bar',
        data: [14,15,10,18],
        backgroundColor: '#D1E5FD'
      },
      {
        label: 'Solution Support',
        type: 'bar',
        data: [17,13,18,19],
        backgroundColor: '#F4F1EA'
      }
    ]
  },
  options: {
    elements: {
      point: {
        radius: 0
      }
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
          stepSize: 10
        }
      }]
    }
  }
});

var ctx = document.getElementById("Bookings-Services-AS");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,12],
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
          stepSize:5,
          max: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Bookings-Services-CMS");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,14],
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
          stepSize:5,
          max: 15
        }
      }]
    }
  }
});

var ctx = document.getElementById("Multiyear-Bookings");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        label: 'Bookings',
        data: [4,10,8,14],
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
        label: 'Multiyear Bookings',
        data: [11,10,21,15],
        backgroundColor: [
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41',
          '#FFBB41'
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

var ctx = document.getElementById("Revenue");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [17,13,18,19],
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
          stepSize:5
        }
      }]
    }
  }
});

var ctx = document.getElementById("Discounts-Services");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,15],
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
          stepSize:5
        }
      }]
    }
  }
});

var ctx = document.getElementById("IB-Yield");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [11,10,21,15],
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
          stepSize:5
        }
      }]
    }
  }
});

var ctx = document.getElementById("Profitability-of-Customer");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [ "Q1","Q2", "Q3", "Q4"],
    datasets: [
      {
        type: 'bar',
        data: [4,10,8,15],
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
          stepSize:5
        }
      }]
    }
  }
});
