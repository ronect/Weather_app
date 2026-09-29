// DOM Elements

const hourlyList = document.getElementById("hourly-list");
const weatherMain = document.querySelector(".weather-container");
const form = document.getElementById("weather-form");

// Date / Time

function today() {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date();
  const today = weekdays[date.getDay()];

  return today;
}

function currentHour(data) {
  const current = data.currentConditions.datetime;

  return Number(current.slice(0, 2));
}

// Weather Icons / Backgrounds

function weatherIcon(icon) {
  switch (icon) {
    case "clear-day":
      return {
        image: "Images/clear-day.png",
        url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXc4bGR5Yzk5Z3BxaTRhNWJqN2s0MzN4ZjlvcHExNDhwb2VqcDgzZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0Styincf6K2tvfjb5Q/giphy.gif",
      };

    case "snow":
      return {
        image: "Images/snow.png",
        url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWluZW00cDdiaDhvZ2lhc2NsYjQ5ZDFqa2hhZTE1a3NrbnJ6cXc5eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Jobh7TG1ZkrdpCUEGM/giphy.gif",
      };

    case "rain":
      return {
        image: "Images/rain.png",
        url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2tnaWpyeXZ6b2ZmNGhocDJ3dmtjdGZnZ3FocXRub29lNGk5aTZkeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/exfSTanP4prYQ/giphy.gif",
      };

    case "fog":
      return {
        image: "Images/fog.png",
        url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExczdwNGttYThjazF0cW1yd3p2dmszYmUwd2ppeDRua3N1NDVxbmd1dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/RI42LtoMA5mxi/giphy.gif",
      };

    case "wind":
      return {
        image: "Images/wind.png",
        url: "",
      };

    case "cloudy":
      return {
        image: "Images/cloudy.png",
        url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGt4MHBhMHprOGl0Z3Fxbmo0cm5pMGdiaXJlMmk2NWltOXV5b3NvbyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/gk3s6G7AdUNkey0YpE/giphy.gif",
      };

    case "clear-night":
      return {
        image: "Images/clear-night.png",
        url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3djJvMXhwNXVnYXYxYmd6Z2g2aXF1Nno1eXg5M3VuMzljbXVicXMweSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/TkUEFLPcR5V4Y/giphy.gif",
      };

    case "partly-cloudy-day":
      return {
        image: "Images/partly-cloudy-day.png",
        url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHR6dmY2M2ViNTYxZ2wwNGw2dmxrbHpjaDRrbmVoZTFiZXB3dGY4YyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/PIh4laWJlz9bq/giphy.gif",
      };

    case "partly-cloudy-night":
      return {
        image: "Images/partly-cloudy-night.png",
        url: "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3dWR2anpueGk1M3g0MWI5NGtpZWxkZ3pmdjVicW10MWR2am5uNGZ2OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTiTnzlDKzOoIN9br2/giphy.gif",
      };

    default:
      return {
        image: "Images/weather-news.png",
        url: "",
      };
  }
}

// Hourly Weather

function getHourlyIcon(data, hourIndex) {
  if (hourIndex >= 24) {
    hourIndex -= 24;
    return data.days[1].hours[hourIndex].icon;
  }

  return data.days[0].hours[hourIndex].icon;
}

function getHourlyTemp(data, hourIndex) {
  if (hourIndex >= 24) {
    hourIndex -= 24;
    return data.days[1].hours[hourIndex].temp;
  }

  return data.days[0].hours[hourIndex].temp;
}

function upcomingHours(data) {
  let timer = currentHour(data);

  for (let i = 0; i < 6; i++) {
    let ampm;

    if (timer % 24 >= 12) {
      ampm = "pm";
    } else {
      ampm = "am";
    }

    let hour = timer % 12;

    hour = hour ? hour : 12;

    const temp = getHourlyTemp(data, timer);
    const icon = getHourlyIcon(data, timer);
    const src = weatherIcon(icon).image;
    const setTime = hour + ampm;

    upcomingHoursDom(setTime, temp, src);

    timer++;
  }
}

function upcomingHoursDom(hour, temperature, src) {
  const li = document.createElement("li");

  const time = document.createElement("p");
  time.classList.add("time");

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  const img = document.createElement("img");

  const temp = document.createElement("p");
  temp.classList.add("description");

  li.append(time, imgContainer, temp);
  imgContainer.appendChild(img);
  hourlyList.appendChild(li);

  img.src = src;
  time.textContent = hour;
  temp.textContent = temperature;
}

// Weather API

async function weatherSearch(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=EV4SF3F5XRZMUTM5P6NVBFQ87`,
    );

    if (!response.ok) {
      throw new Error("Location not found");
    }

    const data = await response.json();

    console.log("This is the weather API data:");
    console.log(data);

    weatherMain.classList.remove("hidden");
    document.getElementById("error-message").textContent = "";

    return data;
  } catch (e) {
    document.getElementById("error-message").textContent =
      "No location found";

    weatherMain.classList.add("hidden");

    console.log(e);
  }
}

// Update DOM

async function updateDom(location) {
  const weatherData = await weatherSearch(location);

  if (!weatherData) {
    return;
  }

  hourlyList.replaceChildren();
  upcomingHours(weatherData);

  const current = weatherData.currentConditions;
  const upcoming = weatherData.days;
  const weather = weatherIcon(current.icon);

  // Current Weather DOM

  const day = document.getElementById("today");
  const temp = document.getElementById("temperature");
  const pressure = document.getElementById("pressure");
  const humidity = document.getElementById("humidity");
  const condition = document.getElementById("condition");

  // Upcoming Weather DOM

  const todayTemp = document.getElementById("today-temp");
  const tomorrowTemp = document.getElementById("tomorrow-temp");
  const afTomorrowTemp = document.getElementById("af-tomorrow-temp");

  // Current Weather

  temp.textContent = `${Math.floor(current.temp)}°`;
  pressure.textContent = current.pressure;
  condition.textContent = current.conditions;
  humidity.textContent = `${current.humidity}%`;
  day.textContent = today();

  document.querySelector('header').style.backgroundImage = `url(${weather.url})`;
document.querySelector('header').style.color = 'white'
  // Upcoming Weather

  todayTemp.textContent = `${upcoming[0].temp}°`;
  tomorrowTemp.textContent = `${upcoming[1].temp}°`;
  afTomorrowTemp.textContent = `${upcoming[2].temp}°`;

  document.getElementById("today-img").src =
    weatherIcon(upcoming[0].icon).image;

  document.getElementById("tomorrow-img").src =
    weatherIcon(upcoming[1].icon).image;

  document.getElementById("day-after-tomorrow-img").src =
    weatherIcon(upcoming[2].icon).image;
}

// Form

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = document.getElementById("city").value;

  updateDom(location);

  document.getElementById("location").textContent =
    location.charAt(0).toUpperCase() + location.slice(1);
});