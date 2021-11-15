var lineChart = $('#myChart3');
lineChart.height(150);
lineChart.width(150);
var myChart3 = new Chart(lineChart, {
	type: 'line',
  data: {
  labels: ["2017","2018","2019","2020","2021","2022"],
  datasets: [
    {
      label: 'School of Education',
      data: [321,291,234,215,267,290],
      borderColor: "#FFB6C1",
      backgroundColor: "#FFB6C1",
      yAxisID: 'y',
    },
    {
      label: 'Enginnering School',
      data: [490,351,422,395,367,390],
      borderColor: "#FFA07A",
      backgroundColor: "#FFA07A",
      yAxisID: 'y',
    },
    {
      label: 'Medical School',
      data: [289,351,322,295,287,320],
      borderColor: "#008B8B",
      backgroundColor: "#008B8B",
      yAxisID: 'y',
    }
    ]
	},
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: 'Enrollment Data - by Year',
        font:{
        	size: 16
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left'
      }

     }
  },
});