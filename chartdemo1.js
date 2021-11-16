
var ctx = $('#myChart1');
ctx.height(150);
ctx.width(150);
var myChart1 = new Chart(ctx, {
    type: 'polarArea',
    data: {
      labels: ["Course 1", "Course 2", "Course 3", "Course 4", "Course 5"],
      datasets: [
        {
          label: 'Enrollment',
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#FF8C00", "#DB7093"],
          data: [342,516,484,430,308]
        }
      ]
     },
    options: {
    	plugins: {
    		legend: {
    			position: 'right',
    			labels: {
    				boxHeight: 30,
    				padding: 30,
    				font: {
    					size:14
    				}
    			}
    		},
	        title: {
	        display: true,
	        text: 'Course Enrollment Data - Schoole of Education',
	        font:{
        	size: 16
        	}
	      },
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
    	responsive: true,
    	maintainAspectRatio: false
    }
});

