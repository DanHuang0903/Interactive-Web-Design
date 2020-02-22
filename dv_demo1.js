//The buttons of controlling the bubble amount.
//Click different buttons to pass the corresponding number to the chart function
    $("#btn20").click(function(){
      $("#number").text("20 Bubbles");
      chart(20);
    });
    $("#btn50").click(function(){
      $("#number").text("50 Bubbles");
      chart(50);
    });
    $("#btn80").click(function(){
      $("#number").text("80 Bubbles");
      chart(80);
    });


//The main function of build the entire bubble chart
    function chart(num){

    //Disable the dismiss button when call function chart
    $("#btn_dismiss").attr("disabled",true);
    $("#btn_line").attr("disabled",false);
  $("#btn_center").attr("disabled",false);


    var width = 700, height = 400
    //the center potion of grouping bubbles.
    var center = {x:width/1.8, y:height/2 }
    //x potions of each team.
    var teamTitleX = {'Orange':50, 'Yellow':250, 'Green':450};
    

    
  var colorScale = ['#F8971D','#FFD24F', '#6CB33F']
  var xCenter = [50,250,450]
  var numNodes = num;

  //Form the nodes data.
  var nodes = d3.range(numNodes).map(function(d,i) {
        return {radius: Math.random() * 25,
              category: i%3}
      });

  var tooltip = d3.select("#content2")
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

  
  //Show the team labels when call this function
  function showTitle(){
    var teamData = d3.keys(teamTitleX);
    var teams = d3.select('svg').selectAll('.team')
            .data(teamData);
      teams.enter()
         .append('text')
         .attr('class','team')
         .attr('x', function(d){return teamTitleX[d];})
         .attr('y',50)
         .attr('text-anchor', 'start')
         .text(function(d){return d;});
          }

  //Hide the team labels when call this function
  function hideTitle(){
    d3.select('svg').selectAll(".team").remove();
  }


  //Group the bubbles in teams when call this function      
    function split(){
      showTitle(); //show the team labels
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

  //Group the bubble to the center point.
  function go_center(){
    hideTitle();
    var simulation = d3.forceSimulation(nodes);
    simulation.force("charge", d3.forceManyBody().strength(20))
          .force("center", d3.forceCenter(width/2.5, height/2-200))
          .force("collision", d3.forceCollide().radius(function(d){
                    return d.radius;
                  }))
          .on("tick",ticked);
  }


    


    // Create the bubbles based on nodes data.
    function ticked() {
        
        var u = d3.select("svg")
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
    

    var detail = '<span class="name">Color: </span><span class="value">' + colorScale[d.category] + '</span><br/>' +
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




//show the sparse bubble chart when call function chart()
dismiss();

//call different function to group bubbles in different ways when click on different buttons.
$("#btn_center").click(function(){
  go_center();
  $(this).attr("disabled", true);
  $("#btn_line").attr("disabled",false);
  $("#btn_dismiss").attr("disabled",false);
});
$("#btn_line").click(function(){
  split();
  $(this).attr("disabled", true);
  $("#btn_center").attr("disabled",false);
  $("#btn_dismiss").attr("disabled",false);
});
$("#btn_dismiss").click(function(){
  dismiss();
  $(this).attr("disabled", true);
  $("#btn_line").attr("disabled",false);
  $("#btn_center").attr("disabled",false);
});


}


chart(50);
$("#number").text("50 Bubbles");