let data = {
  fixedCost: 0, // Nominal
  variableCost: 0, // Nominal
  price: 0, // Nominal
  productionCapacity: 0, // Unit
  sells: [], // Unit
  sellsCopy: function () {
    let duplicate = [...this.sells];
    return duplicate;
  },
  sellPercentage: function (index) {
    return ((this.sells[index] / this.productionCapacity) * 100).toFixed(1);
  },
  isProfit: function (index) {
    return this.sellPercentage(index) >= this.bep() ? 'Laba' : 'Rugi';
  },
  bep: function () {
    return (this.fixedCost / (this.price - this.variableCost)).toFixed(0);
  },
  bepNominal: function () {
    return this.bep() * this.price;
  },
  phaseOutput: function () {
    let output = []
    this.sells.forEach((_item, index) => output.push(`Tahap ${index + 1}:`))
    return output;
  },
  variableCostArray: function () {
    let varCon = [];
    this.sells.forEach(sell => varCon.push((sell * this.variableCost) + Number(this.fixedCost)));
    return [
      {
        x: 0,
        y: this.fixedCost
      },
      {
        x: this.productionCapacity,
        y: Number(this.productionCapacity) * Number(this.variableCost) + Number(this.fixedCost)
      }
    ];
  },
  sellNominal: function () {
    let nom = [];
    this.sells.forEach(sell => nom.push(sell * this.price));
    return [
      {
        x: 0,
        y: 0
      },
      ...this.inBetweenSells(),
      {
        x: this.productionCapacity,
        y: this.productionCapacity * this.price
      }
    ];
  },
  fixedCostArray: function () {
    return [
      {
        x: 0,
        y: this.fixedCost
      },
      {
        x: this.productionCapacity,
        y: this.fixedCost
      }
    ];
  },
  inBetweenSells: function () {
    let result = [];
    this.sells.forEach((sell, index) => {
      let insert = {
        x: Number(sell),
        y: Number(sell) * Number(this.price),
      };
      result.push(insert);
    });
    return result;
  },
  emptySellsArray: function () {
    let result = [];
    this.sells.forEach(() => result.push(7));
    result = [0, ...result, 0];
    return result;
  },
  triangleOfUnprofit: function() {
    return [
      {x: 0, y: this.fixedCost},
      {x: this.bep(), y: this.bepNominal()},
      {x: 0, y: 0},
      {x: 0, y: this.fixedCost}
    ]
  },
  triangleOfProfit: function() {
    return [
      {x: this.bep(), y: this.bepNominal()},
      {x: this.productionCapacity, y: Number(this.productionCapacity) * Number(this.price)},
      {x: this.productionCapacity, y: (Number(this.productionCapacity) * Number(this.variableCost)) + Number(this.fixedCost)},
      {x: this.bep(), y: this.bepNominal()}
    ]
  }

}
let ctx = document.getElementById('myChart').getContext('2d');
let triangeRed = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
triangeRed.addColorStop(0.000, 'rgba(245, 101, 101, 0.5)');
triangeRed.addColorStop(1.000, 'rgba(246, 173, 85, 0.5)');

let triangleBlue = ctx.createLinearGradient(0.000, 150.000, 300.000, 150.000);
triangleBlue.addColorStop(0.000, 'rgba(104, 211, 145, 0.5)');
triangleBlue.addColorStop(1.000, 'rgba(66, 153, 225, 0.5)');


let chartData = {
  labels: data.phaseOutput(),
  datasets: [
    {
      label: 'Omset Penjualan',
      data: data.sellNominal(),
      borderWidth: 3,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(56, 178, 172, 1.000)',
      pointBackgroundColor: '#edf2f7',
      showLine: true,
      pointRadius: data.emptySellsArray(),
      pointHoverRadius: data.emptySellsArray(),
      pointHoverBorderWidth: 3
    },
    {
      label: 'Fixed Cost',
      data: data.fixedCostArray(),
      borderWidth: 3,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(237, 100, 166, 1.000)',
      showLine: true,
      pointRadius: 0,
    },
    {
      label: 'Bep',
      data:
        [
          {
            x: 0,
            y: data.bepNominal()
          },
          {
            x: data.bep(),
            y: data.bepNominal()
          },
          {
            x: data.bep(),
            y: 0
          },
        ],
      pointRadius: 5,
      showLine: true,
      tension: 0,
      pointBackgroundColor: ['rgba(0,0,0,0)', 'grey', 'rgba(0,0,0,0)'],
      backgroundColor: 'rgba(0,0,0,0)',
      borderDash: [10, 5],
      pointRadius: 0,
      borderColor: 'grey',
      pointBorderColor: 'transparent',
    },
    {
      label: 'Variable Cost',
      data: data.variableCostArray(),
      borderWidth: 3,
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(237, 137, 54, 1.000)',
      showLine: true,
      pointRadius: 0,
    },
    {
      label: 'Zona Rugi',
      data: data.triangleOfUnprofit(),
      showLine: true,
      tension: 0,
      pointRadius: 0,
      borderColor: 'rgba(237, 137, 54, 0)',
      backgroundColor: triangeRed
    },
    {
      label: 'Zona Untung',
      data: data.triangleOfProfit(),
      showLine: true,
      tension: 0,
      pointRadius: 0,
      borderColor: 'rgba(237, 137, 54, 0)',
      backgroundColor: triangleBlue,
      options: {
        tooltips: {
          enabled: false
        }
      }
    }
  ]
}

let chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    xAxes:
      [{ gridLines: { display: false } }],
    yAxes: [
      { ticks: { beginAtZero: true } },
      { gridLines: { display: false } }
    ]
  }
}



var myChart = new Chart(ctx, {
  type: 'scatter',
  data: chartData,
  options: chartOptions
});

const updateChart = function () {
  myChart.data.labels = data.phaseOutput();
  myChart.data.datasets[0].data = data.sellNominal();
  myChart.data.datasets[0].pointRadius = data.emptySellsArray();
  myChart.data.datasets[0].pointHoverRadius = data.emptySellsArray();
  myChart.data.datasets[1].data = data.fixedCostArray();
  myChart.data.datasets[2].data =
    [
      {
        x: 0,
        y: data.bepNominal()
      },
      {
        x: data.bep(),
        y: data.bepNominal()
      },
      {
        x: data.bep(),
        y: 0
      },
    ];
  myChart.data.datasets[3].data = data.variableCostArray();
  myChart.data.datasets[4].data = data.triangleOfUnprofit();
  myChart.data.datasets[5].data = data.triangleOfProfit();
  myChart.update();
}
