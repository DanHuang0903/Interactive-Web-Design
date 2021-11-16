
var barChart = $('#myChart2');
barChart.height(150);
barChart.width(150);
var myChart2 = new Chart(barChart, {
  type: 'bar',
  data: {
  labels: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
  datasets: [{
      label: 'School of Education',
      data: [342,516,484,430,308],
      backgroundColor: "#FFB6C1",
      barPercentage: 0.8,
      stack: 'Stack 0'
    },
    {
      label: 'Enginnering School',
      data: [241,315,359,514,417],
      backgroundColor: "#FFA07A",
      barPercentage: 0.8,
      stack: 'Stack 0'
    },
    {
      label: 'Medical School',
      data: [291,511,424,401,198],
      backgroundColor: "#008B8B",
      barPercentage: 0.8,
      stack: 'Stack 0'
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Course Enrollment Data',
        font:{
          size: 16
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    animation:true,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  }
});




    