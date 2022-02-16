import { useState } from 'react';
import Spinner from './Spinner';
import WeatherList from './WeatherList';

export default function WeatherSearch() {
  // you'll need to track your weather search results, the loading state, and a form field for location with a default value.
  const [weatherResults, setWeatherResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('portland');
  const [state, setState] = useState('or');
  const [country, setCountry] = useState('usa');
  
  async function handleWeatherSubmit(e) {
    e.preventDefault();
      
    // set the loading state to true
    setIsLoading(true);

    // use fetch to make a request to your netlify weather function. Be sure to pass the location as a query param in the URL
    // const response = await fetch(`/.netlify/functions/weather`);
    const response = await fetch(`/.netlify/functions/weather?city=${city}&state=${state}&country=${country}`);
    // console.log(response);
      
    // put the jsonified data in state
    const json = await response.json(); //DONT FORGET AWAIT HERE!
    // console.log(json);

    setWeatherResults(json);
    // console.log(weatherResults);
    
    //set the loading state to false
    setIsLoading(false);
  }
      
  return (
    <section className='weather'>
      {/* make the fetch on submit */}
      <form
        onSubmit={handleWeatherSubmit}
      >
            Search weather for a city
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <input placeholder='ex) portland'
          onChange={(e)=> setCity(e.target.value)}
        ></input>
        <input placeholder='ex) or'
          onChange={(e)=> setState(e.target.value)}
        ></input>
        <input placeholder='ex) usa'
          onChange={(e)=> setCountry(e.target.value)}
        ></input>
        <button>Get forecast</button>
      </form>
      {/* Make a ForecastList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {
        isLoading
          ? <Spinner/>
          : <WeatherList weatherResults={weatherResults}/>
      }
    </section>
  );

}
