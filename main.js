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
   

   // const giphyData = await backgroundGiph();

    const current = weatherData.days[0];

    //dom stuff

    const temp = document.getElementById('temperature')

    const condition = document.getElementById('condition')

    const feelLike = document.getElementById('feels-like')

    const humidity = document.getElementById('humidity')

    const wind = document.getElementById('wind')
    
    temp.textContent = `${current.temp}°`;

    condition.textContent = `${current.description}`;

    feelLike.textContent = `${current.feelslike}°`;

    humidity.textContent = `${current.humidity}%`;

    wind.textContent = `${current.windspeed} mph`;

   
}

 const form = document.getElementById('weather-form')
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const location = document.getElementById("city").value
        updateDom(location);




    })
