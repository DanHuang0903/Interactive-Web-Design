	
	var vm = new Vue({
					el: "#app",
					data: {
						imageUrl: "",
						imageTitle: "",
						title: "",
						date: "",
						APOD: true,
						astroids: []
					},
					computed: {
						numAstroids: function(){
						return this.astroids.length;
					}
					},
					created: function (){
						this.fetchAstroids();
					},
					methods: {
						fetchAstroids: function(){
							var apiKey = 'aYKdbEeryeBw5nhmse0NJP5rPt3tzSlVavBfLOFE';
							var url_apod = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
							var url_neo = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
							axios.get(url_apod)
							 .then(function(response){
							 	console.log(response);
							 	vm.imageUrl = response.data.url;
							 	vm.imageTitle = response.data.title;
							 	vm.title = response.data.title;
							 	vm.date = response.data.date;
							 });

							 axios.get(url_neo)
							 .then(function(response2){
							 	console.log(response2);
							 	vm.astroids = response2.data.near_earth_objects.slice(0,20);
							 });
						},

						getApproachDate: function(a){
							if(a.close_approach_data.length != 0)
								return a.close_approach_data[0].close_approach_date;
							else
								return 'N/A'
						},

						remove: function(index){
							this.astroids.splice(index,1);
						},

						apod: function(){
							vm.APOD = true;
						},
						neo: function(){
							vm.APOD = false;
						}


					}
				});


		
		
