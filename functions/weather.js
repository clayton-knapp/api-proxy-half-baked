const fetch = require('node-fetch');

require('dotenv').config();

exports.handler = async (e) => {
  try {
    // grab the city, state, and country from the request's query parameters
    // here is an example from the netlify docs:
    // https://functions.netlify.com/playground/#hello%2C-%7Bname%7D 
    const { city, state, country } = e.queryStringParameters;
    // console.log(city, state, country);


    // tragicly, we cannot just pass the city name to this API. it wants a latitude and longitude for the weather
    // consult the weather docs to figure out how to use a city, state, and country to make a request and get the latitude and longitude
    // https://openweathermap.org/api/geocoding-api
    const responseGeocoding = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${process.env.WEATHER_API_KEY}`);
    // console.log('RESPONSE', response);

    const jsonGeocoding = await responseGeocoding.json();
    // console.log('JSON DATA', json);

    const lat = jsonGeocoding[0].lat;
    const lon = jsonGeocoding[0].lon;
    // console.log(lat, lon);

    
    // once you have gotten the lat/lon using the geocoding api, use the lat/lon to get the weather. Consult the docs below:
    // https://openweathermap.org/api/one-call-api
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts&units=imperial&appid=${process.env.WEATHER_API_KEY}`);

    const jsonWeather = await responseWeather.json();
    // console.log('JSON WEATHER__________________', jsonWeather.daily);


    return { 
      statusCode: 200, 
    // this is where you shoot data back to the user. right now it's sending an empty object--replace this with the weather data. remember, you do need to stringify it, otherwise netlify gets mad. ¯\_(ツ)_/¯
      body: JSON.stringify(jsonWeather.daily),
    };

  } catch (error) {
    // console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
