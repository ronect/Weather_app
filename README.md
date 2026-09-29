# Weather App 🌦️

A weather application built with HTML, CSS, and JavaScript that allows users to search for a city and view current and upcoming weather information.

The application retrieves live weather data from the Visual Crossing Weather API and dynamically updates the page based on the returned weather conditions.

## Features

- Search weather by city
- Display current temperature
- Display current weather conditions
- Display humidity and pressure
- Display hourly weather for the next six hours
- Display weather for today, tomorrow, and the following day
- Dynamic weather icons based on current conditions
- Animated GIF backgrounds based on current weather
- Error handling for invalid locations
- Automatically updates the DOM with API data

## Built With

- HTML
- CSS
- JavaScript
- Visual Crossing Weather API
- GIPHY weather GIFs

## What I Practiced

This project helped me practice:

- Working with APIs
- Using `fetch()`
- Async/await
- Promises
- Error handling with `try...catch`
- JSON data
- DOM manipulation
- Dynamically creating HTML elements with JavaScript
- Working with dates and time
- Updating CSS styles with JavaScript
- Responsive layout using Flexbox and CSS Grid

## How It Works

When a user searches for a city, the application sends a request to the Visual Crossing Weather API.

The returned weather data is used to update the current weather, hourly forecast, upcoming forecast, weather icons, and animated background.

Weather conditions such as rain, snow, cloudy, clear day, and clear night are mapped to different images and GIF backgrounds.

## Running the Project

1. Clone the repository:

   ```bash
   git clone <repository-url>

2. Open the project folder.
3. Open index.html in your browser or run the project using a local development server such as VS Code Live Server.
Project Structure
weather-app/
├── Images/
│   ├── clear-day.png
│   ├── clear-night.png
│   ├── cloudy.png
│   ├── fog.png
│   ├── partly-cloudy-day.png
│   ├── partly-cloudy-night.png
│   ├── rain.png
│   ├── snow.png
│   └── wind.png
├── index.html
├── style.css
├── main.js
└── README.md

API
Weather data is provided by the Visual Crossing Weather API.
Animated weather backgrounds use GIFs from GIPHY.
Future Improvements
- Improve mobile responsiveness
- Add more weather background animations
- Add wind speed and other weather information
- Improve UI styling and readability
- Add loading feedback while weather data is being retrieved
- Hide the API key using a backend or serverless function
Author
Ronnie Ector
