
$(document).ready(function(){
			
	$("#btn1").prop("disabled",true);
	$("#btn2").prop("disabled",true);

	$("#start1").click(function(){
	start();
	
	$("#restart").click(function(){
		location.reload(true);
		start();
		
	});	

});
});


	
function start(){
	$("#start1").text("RESTART");
	$("#start1").attr("id", "restart");
	$("#btn1").prop("disabled",false);
	$("#btn2").prop("disabled",false);

}

		

			var flag = 0;
			var turn = 0;
			var log = [];
			var rounds = 5;
			var counter = rounds;
			
			$("#btn1").text("Get Number!");
			$("#btn2").text("Get Number!");
			$("#count").text(counter);
			$("#winner").text("");
			$("#total1").text(0);
			$("#total2").text(0);
			$("#point1").text("Round 0:");
			$("#point2").text("Round 0:");
			$("#count").text(rounds);
			$("#count_label").html('<span id="count">5</span> rounds left.');
			$("#game_over").text("");

			// $("#btn1").click(function(){
			// 	clicked(this);
			// });

			// $("#btn2").click(function(){
			// 	clicked(this);
			// });

		  	

			function clicked(btn){
				
				btn.innerHTML = "Wait";
				btn.disabled = true;
				
				changeBtn(btn);
				flag ++;
				turn += flag%2;
				rollDice(btn);
				
				if(flag%2==0){
					if (turn == rounds){
						gameOver();
						$("#count_label").text(" ");
					}
					else{
						counter--;
						$("#count").text(counter);
					}
				}

			}


			function changeBtn(btn){
				if(btn.id == "btn1"){
					$("#btn2").text("Get Number!");
					$("#btn2").prop('disabled', false);
				}
				else
				{
					$("#btn1").text("Get Number!");
					$("#btn1").prop('disabled', false);
				}
			}

			function rollDice(btn){
				var point = Math.floor((Math.random()*10)+1);
				btn.id == "btn1"? $("#point1").text("Round " + turn + ": " + point) : $("#point2").text("Round " + turn + ": " + point);
				btn.id == "btn1"? $("#total1").text(parseInt($("#total1").text()) + point) : $("#total2").text(parseInt($("#total2").text()) + point);

		

				if(flag%2 == 0){

					var win = result();
					var turn_log = {}
					turn_log['turn'] = turn;
					turn_log['winner'] = win;
					if(win == "Deuce")
					{
						turn_log['total'] = " -- ";
						$("#winner").text("Deuce in Round" + turn);
					}
					else{
						turn_log['total'] = win=="Player 1"? $("#total1").text() : $("#total2").text();
						$("#winner").text(win + " Gets a Larger Number in Round " + turn);
					}
					log.push(turn_log);

					console.log(log);
					
				}
				else{
					$("#winner").text("");
				}
			}

			function result(){
				if(parseInt($("#total1").text()) == parseInt($("#total2").text()) )
					return "Deuce";
				else{
					parseInt($("#total1").text()) > parseInt($("#total2").text()) ? winner =  "Player 1" : winner =  "Player 2";
					return winner;
				}
			}

			function gameOver(){
				btn1.innerHTML = "Game Over";
				btn1.disabled = true;
				btn2.innerHTML = "Game Over";
				btn2.disabled = true;

				$("#total1").css('font-size','1.5em');
				$("#total2").css('font-size','1.5em');
				$("#total1").addClass('wobble');
				$("#total2").addClass('wobble');
				$("#restart").attr("id","start1");
				var win = result();
				if(win == "Deuce")
					$("#game_over").append('<div class="mask flex-center"><div class="container"><div class="row justify-content-md-center"><div class="col-md-12"><h1 class="animated jackInTheBox display-3"> DEUCE!!</h1></div></div></div></div>');
				else{
					if(win=="Player 1")
					 $("#game_over").append('<div class="mask flex-center"><div class="container"><div class="row justify-content-md-center"><div class="col-md-6"><h1 class="animated tada display-3"> WIN!!</h1></div><div class="col-md-6"><h1 class="animated hinge display-3"> LOST...</h1></div></div></div></div>');
					else
						$("#game_over").append('<div class="mask flex-center"><div class="container"><div class="row justify-content-md-center"><div class="col-md-6"><h1 class="animated hinge display-3"> LOST...</h1></div><div class="col-md-6"><h1 class="animated tada display-3"> WIN!!</h1></div></div></div></div>');
				}
				log.forEach(function(i){
					$("#table").append('<tr><th>' + i['turn'] + '</th> <th>' +i['winner']+ '</th> <th>' + i['total'] + '</th></tr>');
				});
			}

