import { useState } from 'react';
import Spinner from './Spinner';
import YelpList from './YelpList';

export default function YelpSearch() {
  // you'll need to track your yelp search results, the loading state, and a form field for location with a default value.
  const [yelpResults, setYelpResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState('portland or');

  async function handleYelpSubmit(e) {
    e.preventDefault();
  
    // set the loading state to true
    setIsLoading(true);

    // use fetch to make a request to your netlify yelp function. Be sure to pass the search query as a query param in the URL
    // const response = await fetch(`/.netlify/functions/yelp`);
    const response = await fetch(`/.netlify/functions/yelp?search=${searchLocation}`);
    // console.log(response);
  
    // put the jsonified data in state and set the loading state to false
    const json = await response.json();
    // console.log(json);
    // console.log(json.businesses);

    setYelpResults(json.businesses); // does it need to be json.results?

    setIsLoading(false);

  }
  
  return (
    <section className='yelp'>
      {/* make the fetch on submit */}
      <form
        onSubmit={handleYelpSubmit}
      >
        Search yelp for a city
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <input
          onChange={(e)=>setSearchLocation(e.target.value)}
          placeholder='ex) portland or usa'
        ></input>
        <button>Search yelp</button>
      </form>
      {/* Make a BusinessesList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {
        (isLoading)
          ? <Spinner/>
          : <YelpList yelpResults={yelpResults}/>
      }
    </section>
  );
}
  
