
var trainScheduleArray = ["42", "10:25", "11:23","42","12:25","13:23","42X", "14:25","15:23"];


var weatherObjectArray = [];


var tbodyTrain = document.getElementById("trainTable");
var tbodyWeather = document.getElementById("weatherTable");

function TrainTable(tableTbody) 
{
    
   var iterator = 0;
    
    for (var i = 0; i < 3; i++) 
    {
      
      var row = document.createElement("tr");
   
      for (var j = 0; j < 3; j++) 
      {
       
        var cell = document.createElement("td");
        var cellText = document.createTextNode(trainScheduleArray[iterator]);
        cell.appendChild(cellText);
        row.appendChild(cell);
        iterator++;
      }
   
      
      tableTbody.appendChild(row);
    }
   

}

  function createTable(){
    var trainTable = new TrainTable(tbodyTrain);
    

  }

  function setCaptionDestination(){
    var input = document.getElementById("åkerifrån").value;
    document.getElementById("captionDestination").innerHTML ="Åker ifrån: "+ input;

    var paragraph = document.getElementById('statusTrafik').innerHTML = "Inga problem i trafiken";
 
  }



//här börjar vädret -----------------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------



function Weather(time, wind, description, temp){
    this.time = new Date(time).getHours()+":00";
    this.wind = wind.toFixed() +"m/s";
    this.description = capitalizeFirstLetter(description);
    this.temp = temp.toFixed() + "°C";
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function createTablee(){
    var weatherTab = new WeatherTable(tbodyWeather);

  }


  function WeatherTable(tableTbody) 
  {
    
    
     
     for (var i = 0; i < 6; i++) 
     {
       
       var row = document.createElement("tr");
    
       for (var j = 0; j < 4; j++) 
       {
       
         var cell = document.createElement("td");

         if (j == 0) {
          var cellText = document.createTextNode(weatherObjectArray[i].time);
         }
         else if (j == 1) {
          var cellText = document.createTextNode(weatherObjectArray[i].description);
         } 

         else if (j == 2) {
          var cellText = document.createTextNode(weatherObjectArray[i].temp);
         } 
         else {
          var cellText = document.createTextNode(weatherObjectArray[i].wind);
         }
         
         cell.appendChild(cellText);
         row.appendChild(cell);
         
       }
    
       
       tableTbody.appendChild(row);
     }
    
 
   }


   function retrieveData(weatherList){

    

    for (let index = 0; index < 6; index++) {

        var vinden = weatherList.list[index].wind.speed;
        var tiden = weatherList.list[index].dt_txt;
        var tempen = weatherList.list[index].main.temp;
        var beskrivning = weatherList.list[index].weather[0].description;
      
      weatherObjectArray.push(new Weather(tiden, vinden, beskrivning, tempen));
      
    }

    createTablee();
}

 var ajax = new XMLHttpRequest();
 ajax.onreadystatechange = function () {
    if ( this .readyState === 4 ) {
      if ( this .status === 200 ){
        var response = JSON.parse( this .response);
        retrieveData(response);

      }
    }
 }

 
 var city = 'nynashamn' ;
 var apikey = '6a6bbbdef2248eab857aa22979426b7e';
 ajax.open( 'GET' , 'https://api.openweathermap.org/data/2.5/forecast?q=' + city +
 '&lang=se&units=metric&appid=' + apikey, true );
 ajax.send();


  
  