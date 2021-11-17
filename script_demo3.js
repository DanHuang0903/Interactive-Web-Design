// $('#test').click(function(){
// 	var apiKey = 'aYKdbEeryeBw5nhmse0NJP5rPt3tzSlVavBfLOFE';
// 	var url_apod = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;
// 	var url_neo = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=" + apiKey;
// 	$.get(url_apod, function(data, status){
// 		console.log(data);
// 	    $('#testImg img').attr('src', data.hdurl).attr('height','50%').attr('width','50%');
//   });

// })

var vm = new Vue({
				el: "#app",
				data: {
					imageUrl: "",
					imageTitle: "",
					title: "",
					date: "",
					type: "",
					APOD: true,
					astroids: []
				},
				computed: {
					numAstroids: function(){
					return this.astroids.length;
				},
					largestObject: function(){
						//get the objects that actually have diameter data
						var neosHavingData = this.astroids.filter(function(neo){
							return neo.estimated_diameter != null;
						});

						var simpleNeos = neosHavingData.map(function(neo){
							return {name:neo.name, diameter: Math.round(neo.estimated_diameter.feet.estimated_diameter_max)};
						});

						var sortedNoes = simpleNeos.sort(function(a,b){
							return a.diameter-b.diameter;
						});
						
						return sortedNoes[sortedNoes.length-1];
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
						 	vm.imageUrl = response.data.url;
						 	vm.imageTitle = response.data.title;
						 	vm.title = response.data.title;
						 	vm.date = response.data.date;
						 	if(response.data.media_type == 'video')
						 		vm.type = true;
						 	else
						 		vm.type = false;
						 });

						 axios.get(url_neo)
						 .then(function(response2){
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


	
	
