 	//Disable the overview button when call function chart
	var data = [[['course 1',123,321],['course 2',273,143],['course 3',351,233],['course 4',221,309],['course 5',310,298]],[['course 1',109,391],['course 2',103,253],['course 3',151,433],['course 4',121,209],['course 5',110,398]],[['course 1',99,291],['course 2',143,353],['course 3',101,433],['course 4',221,309],['course 5',210,398]]]; 

	$("#btn_overview").attr("disabled",true);
  	$("#btn_program").attr("disabled",false);
  	$("#btn_dept").attr("disabled",false);

  	var width = 600, height = 400
  	//the center potion of grouping bubbles.
  	var center = {x:width/2.5, y:height/2.2 }
  		//x potions of each team.
  	var deptTitleX = {'Education':100, 'Enginnering':320, 'Medical':550};
  	var numberTitleX = {'Less than 450':100, ' Equal or more than 450':450};
  //	var courseTitleX = {'Course 1':0, 'Course 2':250, "Course 3": 450, "Course 4":0, "Course 5": 250};
  //	var courseTitleY = {'Course 1':50, 'Course 2':50, "Course 3": 50, "Course 4":250, "Course 5": 250};
  	var colorScale = ['#F1B82D','#000000', '#69901D']

	var xCenter = [110,380,600]
	var numNodes = 15;

	var svg = d3.select("#analytics")
				.append("svg")
				.attr("id","bubble_svg")
				.style("width","100%")
				.style("height",400);

	//Form the nodes data.
	var nodes = d3.range(numNodes).map(function(d,i) {
			  return {radius: (data[i%3][i%5][1]+data[i%3][i%5][2])/30,
			  		  category: i%3,
			  		  course:i%5}
			});





	function showTitle(){
		var deptData = d3.keys(deptTitleX);
		var depts = d3.select("#analytics")
					  .select('svg')
					  .selectAll('.depts')
					  .data(deptData);
			depts.enter()
				 .append('text')
				 .attr('class','depts')
				 .attr('x', function(d){return deptTitleX[d];})
				 .attr('y',50)
				 .attr('text-anchor', 'start')
				 .text(function(d){return d;});
	}

	//Hide the dept labels when call this function
	function hideTitle(){
		d3.select("#analytics").select('svg').selectAll(".depts").remove();
	}

		//Group the bubbles in depts when call this function			
  	function split(){
  		showTitle(); //show the labels
  		hideTitle2();
  		var simulation = d3.forceSimulation(nodes);
			 simulation.force("charge", d3.forceManyBody().strength(25))
			  .force("x", d3.forceX().x(function(d){
			  	return d.x + (xCenter[d.category] - d.x);
			  }))
			  .force("y", d3.forceY().y(function(d){
			  	return d.y + (height/2-200 - d.y);
			  }))
			  .force("collision", d3.forceCollide().radius(function(d) {
			    return d.radius;
			  }))
			  .on("tick", ticked);
		
}

	function showTitle2(){
		var numberData = d3.keys(numberTitleX);
		var numbers = d3.select("#analytics")
					  .select('svg')
					  .selectAll('.numbers')
					  .data(numberData);
			numbers.enter()
				 .append('text')
				 .attr('class','numbers')
				 .attr('x', function(d){return numberTitleX[d];})
				 .attr('y',50)
				 .attr('text-anchor', 'start')
				 .text(function(d){return d;});
	}

	//Hide the dept labels when call this function
	function hideTitle2(){
		d3.select("#analytics").select('svg').selectAll(".numbers").remove();
	}

		//Group the bubbles in depts when call this function			
  	function split2(){
  		showTitle2(); //show the labels
  		hideTitle();


  		var simulation = d3.forceSimulation(nodes);
			 simulation.force("charge", d3.forceManyBody().strength(25))
			  .force("x", d3.forceX().x(function(d){

			  	if(d.radius*30 <450)
			  		return d3.values(numberTitleX)[0] + 50;
			  	else
			  		return d3.values(numberTitleX)[1] + 100;
			  }))
			  .force("y", d3.forceY().y(function(d){
			  	return d.y + (height/2-200 - d.y);
			  }))
			  .force("collision", d3.forceCollide().radius(function(d) {
			    return d.radius;
			  }))
			  .on("tick", ticked);
		
}

	//Group the bubble to the center point.
	function go_center(){
		hideTitle();
		hideTitle2()
		var simulation = d3.forceSimulation(nodes);
		simulation.force("charge", d3.forceManyBody().strength(100))
				  .force("center", d3.forceCenter(width/1.5, height/2-200))
				  .force("collision", d3.forceCollide().radius(function(d){
								  	return d.radius;
								  }))
				  .on("tick",ticked);
	}

//Group the bubbles use negtive strength to make the bubble sparse
	function dismiss(){
		hideTitle();
		var simulation = d3.forceSimulation(nodes);
			 simulation.force("charge", d3.forceManyBody().strength(-15))
			 		   .force("center", d3.forceCenter(width/1.5, height/2-200))
			  		   .force("collision", d3.forceCollide().radius(function(d) {
			    return d.radius;
			  }))
			 		 .on("tick", ticked);

			 		 
	}


	// Create the bubbles based on nodes data.
		function ticked() {
				
		var u = d3.select("#analytics")
			  	.select("svg")
			    .selectAll("circle")
			    .data(nodes)
			  u.enter()
			    .append("circle")
			    .attr("r", function(d) {
			      return d.radius
			    })
			    .style("fill",function(d){
			    	return colorScale[d.category];
			    })
			    .style("z-index",-1)
			    .style("stroke", function(d){
			return d3.rgb(colorScale[d.category]).darker();
			  }).style("stroke-width",1)
			    .merge(u)
			    .attr('cx', function(d) {
			      return d.x;
			    })
			    .attr('cy', function(d) {
			      return d.y + 200;
			    })
			    .on("mouseover", showDetail)
			    .on("mouseout", hideDetail)
			  u.exit().remove()
}

	
	function showDetail(d,i){
	var details =[d3.keys(deptTitleX)[d.category], data[i%3][i%5][0], "Students: "+Math.round(d.radius*30)];

        d3.select(this)
		  .style("stroke","#333333")
		  .style("stroke-width",2);

        showTooltip(d.x+d.radius+10, d.y+150, details);

	}

	function hideDetail(){
		d3.select(this)
		  .style("stroke", function(d){
			return d3.rgb(colorScale[d.category]).darker();
		}).style("stroke-width",1);

		hideTooltip()
	}


		function showTooltip(x, y, details){
		var tooltip = d3.select("#bubble_svg").append("rect")
					.attr("class",'tooltips')
					.style("width","7em")
					.style("height","4em")
					.style("pointer-events","none")
					.style("text-align","center")
					.style("padding-top","0.5em")
					.style("padding-bottom","0.5em")
		            .attr("fill","#8F8884")
		            .attr("transform","translate("+x+","+y+")")
		            .attr("opacity",0);

		  var detail1 = d3.select("#bubble_svg").append("text")
		  				  .attr("id","text_content")
		  				  .attr("class","tooltips")
		  				  .attr("fill","#eee")
		  				  .attr("transform","translate("+(x+5)+","+(y+25)+")")
		  				  .attr("opacity",0)
		  				  .text(details[0]);
		   var detail2 = d3.select("#bubble_svg").append("text")
		  				  .attr("id","text_content")
		  				  .attr("class","tooltips")
		  				  .attr("fill","#eee")
		  				  .attr("transform","translate("+(x+5)+","+(y+40)+")")
		  				  .attr("opacity",0)
		  				  .text(details[1]);

		  	var detail3 = d3.select("#bubble_svg").append("text")
		  				  .attr("id","text_content")
		  				  .attr("class","tooltips")
		  				  .attr("fill","#eee")
		  				  .attr("transform","translate("+(x+5)+","+(y+55)+")")
		  				  .attr("opacity",0)
		  				  .text(details[2]);

		tooltip.transition()
			.duration(500)
		    .style("opacity", 1.0);

		detail1.transition()
			.duration(500)
		    .style("opacity", 1.0);
	   detail2.transition()
			.duration(500)
		    .style("opacity", 1.0);
		detail3.transition()
			.duration(500)
		    .style("opacity", 1.0);
	}

	function hideTooltip(){
		d3.select("#analytics").selectAll(".tooltips").remove();
	}




dismiss();
$("#btn_overview").click(function(){
	go_center();
	$(this).attr("disabled", true);
	$("#btn_dept").attr("disabled",false);
	$("#btn_number").attr("disabled",false);
	$("#group").text("Oveview");

});

$("#btn_number").click(function(){
	split2();
	$(this).attr("disabled", true);
	$("#btn_overview").attr("disabled",false);
	$("#btn_dept").attr("disabled",false);
	$("#group").text("By enrollment");
});

$("#btn_dept").click(function(){
	split();
	$(this).attr("disabled", true);
	$("#btn_overview").attr("disabled",false);
	$("#btn_number").attr("disabled",false);
	$("#group").text("By Department");
});




