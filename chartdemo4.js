var radarChart = $('#myChart4');
radarChart.height(150);
radarChart.width(150);

var myChart4 = new Chart(radarChart,{
	type: 'radar',
  data: {
  labels: [
    'Statistics',
    'Programming',
    'Big Data',
    'Media',
    'Mathematics',
    'Pedagogy',
    'Data Visulization'
  ],
  datasets: [{
    label: 'School of Education',
    data: [75, 29, 90, 81, 46, 95, 54],
    fill: true,
    backgroundColor: 'rgba(255, 99, 132, 0.8)',
    borderColor: 'rgb(255, 99, 132, 0.8)',
    pointBackgroundColor: 'rgb(255, 99, 132)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
    label: 'Enginnering School',
    data: [68, 98, 90, 49, 86, 7, 82],
    fill: true,
    backgroundColor: 'rgba(54, 162, 235, 0.8)',
    borderColor: 'rgb(54, 162, 235, 0.8)',
    pointBackgroundColor: 'rgb(54, 162, 235)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
},
  options: {
  	maintainAspectRatio: false,
  	responsive: true,
    elements: {
      line: {
        borderWidth: 3
      }
    },
    scales: {
            r: {
                ticks: {
                	z: 10,
                	showLabelBackdrop: false,
                	font: {
                		weight: 500,

                	}
                }
            }
        },
    plugins: {
    	legend: {
			position: 'bottom',
			labels: {
				boxHeight: 20,
				boxWidth: 20,
				padding: 20,
				font: {
					size:12
				}
			}
		}
    }
  }
});