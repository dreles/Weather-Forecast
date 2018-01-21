

let weather = [],
  tmpl = [],
  toggle,
  dayOTW = [
    "Moday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ],
  week,
  count,
  lat,
  lon,
  city,
  country,
  iconReq = "http://openweathermap.org/img/w/";
$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      let api =
        "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&appid=3acc16ffae9e45df92a064e41646355f";
      
      $.getJSON(api, function(data) {
        city = data.city.name;
        country = data.city.country;
        let place = city + "," + country;
        document.getElementById('header').innerHTML = place; 

        for (let i = 0; i < 33; i = i + 8) {
          tmpl.push(data.list[i].main.temp);
          weather.push(String(data.list[i].weather[0].main));
          
        }

        for (let i = 0; i < 5; i++) {
          if (i == 0) {
            count = dayOfTheWeek() - 1;
            week = "Today";
            count++;
          } else {
            if (count > 6) {
              count = 0;
            }
            week = dayOTW[count];
            count++;
          }
          

          let card = document.getElementById(i);
          //display day of the week 
          card.innerHTML = "<h5 class='text-center week'>" + week + "</h5>";
          //display Weather description
          card.innerHTML +=
            "<h1 class='text-center weather'>" + String(weather[i]) + "<h1>";
          //display Weather animation 
          card.innerHTML += returnIcon(String(weather[i]));
         if(i == 0){
          card.innerHTML += '</br><p class="text-center">Current Temp: '  + Math.round(tmpl[i]) + '° F</p>';
         }
          else{
            card.innerHTML += '</br><p class="text-center">Avg. Temp: '  + Math.round(tmpl[i]) + '° F</p>';
          }
        }
      });
    });
  } else {
    alert("COULD NOT FIND YOUR LOCATION");
  }
});

function returnIcon(weather) {
  switch (weather) {
    case "Clear":
      return '<div class="weather-display"><div class="icon sunny"><div class="sun"><div class="rays"></div></div></div></div>';
      break;
    case "Rain":
      return '<div class="weather-display""><div class="icon rainy"><div class="cloud"></div><div class="rain"></div></div></div>';
      break;
    case "Clouds":
      return '<div class="weather-display"><div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div></div>';
      break;
  }
}

function dayOfTheWeek() {
  var d = new Date();
  return d.getDay();
}