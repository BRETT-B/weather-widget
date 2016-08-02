var apiKey ='8b30917a94d3dc4e5edca61d84078199';
var canvas;
var context;
$(document).ready(function(){
	var canvas = document.getElementById('currentTemp');  //local variables to doc ready function and its children
	var context = canvas.getContext('2d');
	var currentTemp = 0;
	$('.weatherForm').submit(function(){
		// keep the form from submitting
		event.preventDefault();
		// get the user input
		var cityText = $(".city").val();
		// build the url from the user input and our api key
		var url = "http://api.openweathermap.org/data/2.5/forecast/city?q=" + cityText + "&units=imperial&APPID=" + apiKey;
		// go get JSON from the constructed url
		$.getJSON(url, function(weatherData){
			// set up a variable for the user's city's temp
			currentTemp = weatherData.list[0].main.temp;
			animate(0);
		}); //end of JSON function
	}); //end of weather form submission
	function animate(current){
		var deg = '\u00b0';
		var tempColor = '#FF0000'; //used on outside arc
		context.clearRect(0,0,300,300);
		// ==============================
		// 		TEMPERATURE TEXT
		// ==============================
		context.font="16px Arial";
		context.fillText((Math.floor(currentTemp)+deg+' F'),137,108);
		// ===============================
		// 			INSIDE ARC
		// ===============================		
		context.beginPath();
		context.lineWidth = 30;
		context.arc(155,100,45, Math.PI * 0, Math.PI * 2);
		context.strokeStyle = '#8ee9f2';
		context.stroke();
		// ===============================
		// 			OUTSIDE ARC
		// ===============================
		context.beginPath();
		context.strokeStyle = tempColor;
		context.lineWidth = 10; //sets line width on outside arc
		// Start at 12:00 (1.5) and draw to the API data for current temp
		context.arc(155, 100, 70, Math.PI * 1.5, (current/100) * (Math.PI * 2) + (Math.PI *1.5));
		context.stroke();
		current++;
		if(current < currentTemp){
			requestAnimationFrame(function(){
				animate(current);
			})
		}
	} //end of animate function
}); //end of doc ready function
