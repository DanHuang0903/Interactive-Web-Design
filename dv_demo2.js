function chart2(dataset){
	 d3.select("#distribution").selectAll('svg').remove();
	 var width = 700;
 	 var height = 330;
 	 var bar_color ={Graduate:"#F8971D", Undergraduate:"#6CB33F"};

     var svg = d3.select("#distribution")
     			   .append("svg")
     			   .attr("width", width)
     			   .attr("height",height)
     			   .attr("id","snake_svg");

     var defs = svg.append("defs");
 	var filter = defs.append("filter")
    .attr("id", "drop-shadow2")
    .attr("height", "125%");
    filter.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 5)
    .attr("result", "blur");

    filter.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 5)
    .attr("dy", 5)
    .attr("result", "offsetBlur");

 	 var feMerge = filter.append("feMerge");

	  feMerge.append("feMergeNode")
	    .attr("in", "offsetBlur")
	  feMerge.append("feMergeNode")
	    .attr("in", "SourceGraphic");
	 

	  var g =[svg.append("g").attr("transform","translate(250,40)")
	    ,svg.append("g").attr("transform","translate(650,100)")];

	   var bp=[ viz.bP()
      .data(dataset)
      .min(10)
      .pad(2)
      .height(height-50)
      .width(width/3)
      .barSize(45)
      .fill(d=>bar_color[d.primary])    
    ,viz.bP()
      .data(dataset)
      .value(d=>d[3])
      .min(10)
      .pad(1)
      .height(height-50)
      .width(width/3)
      .barSize(45)
      .fill(d=>bar_color[d.primary])
  ];

[0].forEach(function(i){
  g[i].call(bp[i])
 d3.selectAll(".subBars").style("filter","url(#drop-shadow2)");

  
  g[i].selectAll(".mainBars")
    .on("mouseover",mouseover)
    .on("mouseout",mouseout);

   


  g[i].selectAll(".mainBars").append("text").attr("class","label")
    .attr("x",d=>(d.part=="primary"? -105: 100))
    .attr("y",d=>(d.part=="primary"? +5: +4))
    .text(d=>d.key)
    .style("fill", "#5C6F7C")
    .style("font-size",d=>(d.part == "primary"? "1.2rem":"1rem"))
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
  
  g[i].selectAll(".mainBars").append("text").attr("class","perc")
    .attr("x",d=>(d.part=="primary"? -30: 40))
    .attr("y",d=>+6)
    .text(function(d){ return d3.format(".2%")(d.percent)})
    .style("fill", "#5C6F7C")
    .style("font-size",d=>(d.part == "primary"? "1.2rem":"1rem"))
    .attr("text-anchor",d=>(d.part=="primary"? "end": "start"));
});
function mouseover(d){
  [0].forEach(function(i){
    bp[i].mouseover(d);
    
    g[i].selectAll(".mainBars").select(".perc")
    .text(function(d){ return d3.format(".2%")(d.percent)});

  });

  d3.select(this)
  .selectAll("text")
  .style("fill","#00728F")
  .classed("shadow",true);




}
function mouseout(d){
  [0].forEach(function(i){
    bp[i].mouseout(d);
    
    g[i].selectAll(".mainBars").select(".perc")
    .text(function(d){ return d3.format(".2%")(d.percent)});

  });
  d3.select(this)
  .selectAll("text")
  .style("fill","#5C6F7C")
  .classed("shadow",false);
  d3.select(this).style("border","0px solid #F15D22");
}


d3.select(self.frameElement).style("height", "800px");
}