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
// Weather Api
async function weatherSearch(){
    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=EV4SF3F5XRZMUTM5P6NVBFQ87')
   const data = await response.json() 
   return data}


// Giphy Api 
async function backgroundGiph(){
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=Xq6ciydSRyvr2vF4Q8LRxootv3VjrW6R&s=king`)
    const data = await response.json();
   return data;
}

async function updateDom(){
    const weatherData = await weatherSearch();

   // const giphyData = await backgroundGiph();

    const current = weatherData.days[0];

    //dom stuff

    const temp = document.getElementById('temperature')

    const condition = document.getElementById('condition')

    const feelLike = document.getElementById('feels-like')

    const humidity = document.getElementById('humidity')

    const wind = document.getElementById('wind')
    
    temp.textContent.splice(0,2) = current.temp;

    condition.textContent = current.description;

    feelLike.textContent = current.feelslike;

    humidity.textContent = current.humidity;

    wind.textContent = current.windspeed;

   
}

 const form = document.getElementById('weather-form')
    form.addEventListener('Submit', updateDom)
updateDom();
