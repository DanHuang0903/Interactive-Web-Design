 	//Disable the overview button when call function chart
 	$("#btn_overview").attr("disabled",true);
  	$("#btn_program").attr("disabled",false);
  	$("#btn_dept").attr("disabled",false);

  	var width = 700, height = 400
  	//the center potion of grouping bubbles.
  	var center = {x:width/1.8, y:height/2 }
  		//x potions of each team.
  	var deptTitleX = {'Education':50, 'Enginnering':250, 'Medical':450};
  	var programTitleX = {'Undergraduate':200, 'Graduate':450;

  	var colorScale = ['#F8971D','#FFD24F', '#6CB33F']
	var xCenter = [50,250,450]
	var numNodes = 15;

	var svg = d3.select("#analytics")
				.append("svg")
				.style("width","100%")
				.style("height",350);

	//Form the nodes data.
	var nodes = d3.range(numNodes).map(function(d,i) {
			  return {radius: Math.random() * 25,
			  		  category: i%3}
			});



	var tooltip = d3.select("#analytics")
					.append("div")
					.style("z-index","10")
					.attr("id","tooltip")
					.attr("class",'tooltips')
					.style("width","8em")
					.style("height","4em")
					.style("pointer-events","none")
					.style("position","absolute")
					.style("text-align","center")
					.style("padding-top","0.5em")
					.style("padding-bottom","0.5em")
					.style("font","1em sans-serif")
		            .style("background","lightsteelblue")
					.style("border-radius","0.4em");
	tooltip.style("opacity",0);



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
  		var simulation = d3.forceSimulation(nodes);
			 simulation.force("charge", d3.forceManyBody().strength(13))
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

	//Group the bubble to the center point.
	function go_center(){
		hideTitle();
		var simulation = d3.forceSimulation(nodes);
		simulation.force("charge", d3.forceManyBody().strength(50))
				  .force("center", d3.forceCenter(width/2.5, height/2-200))
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
			 		   .force("center", d3.forceCenter(width/2.5, height/2-200))
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

	function showDetail(d){
		

		var detail = '<span class="name">Department: </span><span class="value">' + deptTitleX[d] + '</span><br/>' +
                  '<span class="name">Team: </span><span class="value">' +
                  (d.category + 1) +
                  '</span><br/>' + 
				'<span class="name">Radius: </span><span class="value">' +
                  d3.format("d")(d.radius) +
                  '</span>';
        d3.select(this)
		  .style("stroke","#333333")
		  .style("stroke-width",2);

        showTooltip(detail,d.x+d.radius+20, d.y-350);

	}

	function hideDetail(){
		d3.select(this)
		  .style("stroke", function(d){
			return d3.rgb(colorScale[d.category]).darker();
		}).style("stroke-width",1);

		hideTooltip()
	}


		function showTooltip(content, x, y){
		tooltip.style("margin-left",x)
			   .style("margin-top",y)
			   .html(content);
		tooltip.transition()
			   .duration(500)
		       .style("opacity", 1.0);

	}

	function hideTooltip(){
		tooltip.transition()
			   .duration(500)
			   .style("opacity",0);
	}




dismiss();
$("#btn_overview").click(function(){
	go_center();
	$(this).attr("disabled", true);
	$("#btn_dept").attr("disabled",false);
	$("#btn_program").attr("disabled",false);
});
$("#btn_dept").click(function(){
	split();
	$(this).attr("disabled", true);
	$("#btn_overview").attr("disabled",false);
	$("#btn_program").attr("disabled",false);
});