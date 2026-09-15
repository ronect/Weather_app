/*function weatherSearch(){
    fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=EV4SF3F5XRZMUTM5P6NVBFQ87')
    .then((response)=>{
        return response.json()

    }).then
    ((data)=>{
        console.log(data)
    })
}*/
// Dom 
function today(){const weekdays = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const date = new Date();
const today = weekdays[date.getDay()]
return today}
function currentHour(){
    const hour = new Date();
    const current = hour.getHours();
    return current;
}
function weatherIcon(icon){
     switch(icon){
        case ('clear-day'):
            return 'Images/sun.png'
        case ('snow'):
            return 'Images/snowing.png'
        case ('rain'): 
        return 'Images/rain.png'
        case ('fog'):
            return 'Images/fog.png'
        case ('wind'):
            return 'Images/fog.png'
        case ('cloudy'):
            return 'Images/cloudy-day.png'
         case ('clear-night'):
            return 'Images/moon.png'
         case ('partly-cloudy-day'):
            return 'Images/sun_cloudy.png'
         case ('partly-cloudy-night'):
            return 'Images/cloudy-moon.png'
           default:
            return 'Images/weather-news.png'
    
     }}
     function gethourlyIcon(data,hourIndex){
        if(hourIndex >= 24){
        hourIndex -=  24;
        icon = data.days[1].hours[hourIndex].icon;
    }
      else {icon = data.days[0].hours[hourIndex].icon;}
     }
function getHourlyTemp(data, hourIndex) {
    if(hourIndex >= 24){
        hourIndex -=  24;
        return data.days[1].hours[hourIndex].temp;
    }
  return data.days[0].hours[hourIndex].temp;}

function upcomingHours(data){
  let timer = currentHour();
  let setTime
  let temp 
  let icon
  let src

for (let i = 0; i < 6; i++) {
  let ampm;

  if (timer % 24 >= 12) {
    ampm = "pm";
  } else {
    ampm = "am";
  }

  let hour = timer % 12;

  hour = hour ? hour : 12;
temp = getHourlyTemp(data,timer)
icon = gethourlyIcon(data,timer)
src = weatherIcon(icon)
   setTime = (hour + ampm)
upcomingHoursDom(setTime,temp,icon)
  timer++;
}}

function upcomingHoursDom(hour,temperature,src){
    const hourlyList = document.getElementById("hourly-list")
    const li = document.createElement('li')
    const time = document.createElement("p")
    time.classList.add("time")
    const imgContainer = document.createElement("div")
    imgContainer.classList.add("img-container")
   const img = document.createElement("img")
   const temp = document.createElement("p")
   temp.classList.add("description")
   li.append(time,imgContainer,temp)
   imgContainer.appendChild(img)
   hourlyList.appendChild(li)
img.src = src;
   time.textContent = hour;
   temp.textContent = temperature;
}


// Weather Api
async function weatherSearch(location){
    try{
   const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=EV4SF3F5XRZMUTM5P6NVBFQ87`)
   const data = await response.json() 
   console.log('this is th eweather api data : ')
   console.log(data)
   return data}
   catch(e){
    console.log(e)
   }
}

// Giphy Api 
async function backgroundGiph(){
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Xq6ciydSRyvr2vF4Q8LRxootv3VjrW6R&s=${encodeURIComponent("black storm cloud")}`)
    const data = await response.json();
    console.log(data);
    const imgUrl = data.data.images.original.url
    document.getElementById("weather-icon").src = imgUrl;
}

async function updateDom(location){
    const weatherData = await weatherSearch(location);
   upcomingHours(weatherData)

   // const giphyData = await backgroundGiph();

    const current = weatherData.currentConditions;
    
    const upcoming = weatherData.days

    //dom stuff

     const day = document.getElementById('Today')

    const temp = document.getElementById('temperature')

    const pressure = document.getElementById('pressure')

    const humidity = document.getElementById('humidity')

    const condition = document.getElementById('condition')

    

    //upcoming div dom stuff 

    const todayTemp = document.getElementById("today-temp")
    
    const tomorrowTemp = document.getElementById("tomorrow-temp")
    
    const afTomorrowTemp = document.getElementById("af-tomorrow-temp")
    
    temp.textContent = `${Math.floor(current.temp)}°`;

    pressure.textContent = `${current.pressure}`;

    condition.textContent = `${current.conditions}`;

    humidity.textContent = `${current.humidity}%`;

    day.textContent = today();

   todayTemp.textContent = `${upcoming[0].temp}°`;

   tomorrowTemp.textContent = `${upcoming[1].temp}°`;

   afTomorrowTemp.textContent = `${upcoming[2].temp}°`
}


 const form = document.getElementById('weather-form')
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const location = document.getElementById("city").value
        updateDom(location)
        document.getElementById("location").textContent= location.charAt(0).toUpperCase() + location.slice(1);




    })
