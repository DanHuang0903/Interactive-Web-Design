

function chart(reports_full){
  d3.select("#bar").selectAll('svg').remove();


  var reports_total = [80,499,322,221,142];
  var width = 600;
  var height = 300;
  var rectPadding = 5;


  var svg = d3.select("#bar")
              .append("svg")
              .attr("id","chartSvg")
              .attr("width",660)
              .attr("height",350);

 var defs = svg.append("defs");
  var filter = defs.append("filter")
    .attr("id", "drop-shadow")
    .attr("height", "105%");
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

  var padding = {left:80, right: 30, top:20, bottom:20};



   var xScale = d3.scaleBand()
        .domain(d3.range(reports_total.length))
        .range([0, width - padding.left - padding.right-20]);

  var yScale = d3.scaleLinear()
        .domain([0,d3.max(reports_total)])
        .range([height- padding.top - padding.bottom,0]);

  svg.append("rect")
      .attr("class","legend_in")
      .attr("width",20)
      .attr("height",16)
      .attr("fill","#00728F")
      .attr("transform", "translate(0,0)")
      .on("mouseover",mouseoverLabelIn)
      .on("mouseout",mouseoutLableIn);

  svg.append("text")
      .text("Graduate Students")
      .attr("class","legend_in")
      .style("fill","#5C6F7C")
      .style("font-size","1.1rem")
      .attr("transform", "translate(28,15)")
      .on("mouseover",mouseoverLabelIn)
      .on("mouseout",mouseoutLableIn);

  svg.append("rect")
      .attr("class","legend_out")
      .attr("width",20)
      .attr("height",16)
      .attr("fill","#6CB33F")
      .attr("transform", "translate(0,25)")
      .on("mouseover",mouseoverLabelOut)
      .on("mouseout",mouseoutLableOut);
  svg.append("text")
      .text("Undergraduate Students")
      .attr("class","legend_out")
      .style("fill","#5C6F7C")
      .style("font-size","1.1rem")
      .attr("transform", "translate(28,40)")
      .on("mouseover",mouseoverLabelOut)
      .on("mouseout",mouseoutLableOut);




var rects = svg.selectAll(".rect")
        .data(reports_full)
        .enter();



rects.append("rect")
        .attr("class","rects")
        .attr("id",function(d,i,j){
          return "rect"+i;
        })
        .attr("x", function(d,i){
          return xScale(i)*1.4;
        })
        .attr("y",function(d){
          var min = yScale.domain()[0];
          return yScale(min);
        })
        .style("filter","url(#drop-shadow)")
        .attr("transform", "translate(0,50)")
        .attr("width", xScale.bandwidth() - rectPadding -40)
        .attr("height", function(d){
          return 0;
        })
        .on("mouseover", mouseover)
        .on("mouseout",mouseout)
        .transition()
        .delay(function(d,i){
          return i*200+200;
        })
        .duration(700)
        .ease(d3.easeBounce)
        .attr("y", function(d){

          console.log(d[1]);
          return yScale(d[1]);
        })
        .attr("fill", "#00728F")
        .attr("height", function(d){
           return width - padding.left - padding.right - yScale(d[1])-170;

        });


        rects.append("rect")
            .attr("class","rects2")
            .attr("transform","translate("+(xScale.bandwidth() - rectPadding-30)+",50)")
            .attr("x", function(d,i){
              return xScale(i)*1.4;
            })
            .attr("y",function(d){
              var min = yScale.domain()[0];
              return yScale(min);
            })
            .style("filter","url(#drop-shadow)")
            .attr("width", xScale.bandwidth() - rectPadding-40)
            .attr("height", function(d){
              return 0;
            })
        .on("mouseover", mouseover)
        .on("mouseout",mouseout)
            .transition()
            .delay(function(d,i){
              return i*200+200;
            })
            .duration(700)
            .ease(d3.easeBounce)
            .attr("y", function(d){
              return yScale(d[2]);
            })
            .attr("fill", "#6CB33F")
            .attr("height", function(d,i,j){
              return width - padding.left - padding.right - yScale(d[2]) - 170;
            });



        var label_svg = d3.select("#bar").append("svg")
                          .attr("id","labelSvg")
                          .attr("width",660)
                          .attr("height",50);
        var legend = label_svg.selectAll(".legends")
            .data(reports_full)
            .enter();
      legend.append("text")
            .attr("class", "legends")
            .attr("id",function(d,i){
              return i;
            })
            .style("pointer-events", "stroke")
            .attr("text-anchor","start")
            .attr("transform", "translate(0,-100)")
            .attr("x",function(d,i){
              return xScale(i)*1.4+20;
            })
            .attr("y",function(d){
              return 0;
            })
            .attr("dy", function(){
              return xScale.bandwidth() + padding.right + rectPadding;
            })
            .attr("dx", function(d){
              return 5;
            })
            .text(function(d,i){
                return d[0];

            })
            .style("font-weight",400);




   var text = svg.selectAll(".texts")
            .data(reports_full)
            .enter();

            text.append("text")
            .attr("class", "texts")
            .attr("id",function(d,i){
              return "text"+i;
            })
            .attr("transform", "translate(-5,50)")
            .attr("x",function(d,i){
              return xScale(i)*1.4;
            })
            .attr("y", function(d){
              var min = yScale.domain()[0]
              return yScale(min);
            })
            .attr("dx", function(){
              return xScale.bandwidth() - 75;
            })
            .attr("dy", function(d){
              return -400;
            })
            .text(function(d){
              return d[1];
            })
            .attr("opacity",0)
            .transition()
            .delay(function(d,i){
              return i*200+200;
            })
            .duration(700)
            .ease(d3.easeBounce)
            .attr("opacity",1)
            .style("fill","#5C6F7C")
            .attr("dy", function(d){
              return yScale(d[1]) - 265;
            });


        text.append("text")
            .attr("class", "texts2")
            .attr("id",function(d,i){
              return "text" + i+ "2";
            })
            .attr("transform", "translate("+(xScale.bandwidth() - rectPadding-35)+",50)")
            .attr("x",function(d,i){
              return xScale(i)*1.4;
            })
            .attr("y", function(d){
              var min = yScale.domain()[0]
              return yScale(min);
            })
            .attr("dx", function(){
              return xScale.bandwidth() - 75;
            })
            .attr("dy", function(d){
              return -400;
            })
            .text(function(d){
              return d[2];
            })
            .attr("opacity",0)
            .transition()
            .delay(function(d,i){
              return i*200+200;
            })
            .duration(700)
            .ease(d3.easeBounce)
            .attr("opacity",1)
            .style("fill","#5C6F7C")
            .attr("dy", function(d){
              return yScale(d[2]) - 265;
            });

    function mouseoverLabelIn(){
         d3.select("#chartSvg").selectAll(".rects")
            .transition()
            .duration(500)
            .attr("fill","#F15D22");

          d3.select("#chartSvg").select(".legend_in")
            .attr("fill","#F15D22")
            .style("filter","url(#drop-shadow)");
      }

      function mouseoutLableIn(){
        d3.select("#chartSvg").selectAll(".rects")
          .transition()
          .duration(500)
          .attr("fill","#00728F");

        d3.select("#chartSvg").select(".legend_in")
          .attr("fill","#00728F")
          .style("filter","");
      }


      function mouseoverLabelOut(){
         d3.select("#chartSvg").selectAll(".rects2")
            .transition()
            .duration(500)
            .attr("fill","#F15D22");
          d3.select("#chartSvg").select(".legend_out")
            .attr("fill","#F15D22")
            .style("filter","url(#drop-shadow)");
      }

      function mouseoutLableOut(){
        d3.select("#chartSvg").selectAll(".rects2")
          .transition()
          .duration(500)
          .attr("fill","#6CB33F");
        d3.select("#chartSvg").select(".legend_out")
          .attr("fill","#6CB33F")
          .style("filter","");
      }


    function mouseover(d,i){

          d3.select(this)
            .attr("fill","#F15D22");
            if (this.className.animVal == "rects")
             { 
              $("#"+i).text("Graduate").css("font-size","1em").css("font-weight",400);
              $("#text"+i).css("font-weight","bold");
            }
            else
            {
              $("#"+i).text('Undergraduate').css("font-size","1em").css("font-weight",400);
             $("#text"+i+"2").css("font-weight","bold");}

        }


        function mouseout(d,i){
           
          d3.select(this)
            .transition()
            .duration(500)
            .attr("fill",function(){if(this.className.animVal == "rects") return "#00728F"; else return "#6CB33F";});



          $("#"+i).text("course "+(i+1));
          $("#"+i).css("font-weight",400);
          $("#"+i).css("text-shadow","");
           $("#text"+i).css("font-weight","");
          $("#text"+i+"2").css("font-weight","");

        }
}