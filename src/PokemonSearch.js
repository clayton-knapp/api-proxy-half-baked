import { useState } from 'react';
import PokemonList from './PokemonList';
import Spinner from './Spinner';

export default function PokemonSearch() {
  // you'll need to track your pokemon search results, the loading state, and one form field: name. For this form field, set a real initial values (like 'pikachu') so the form populates with a default value.
  const [pokemonArr, setPokemonArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState('');

  
  async function handlePokemonSubmit(e) {
    e.preventDefault();
      
    // set the loading state to true
    setIsLoading(true);

    // use fetch to make a request to your netlify pokemon function. Be sure to pass the pokemon name as a query param in the URL
    // const endpointURL = `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${searchName}`;

    //added http://localhost:8888 to get test to work
    const response = await fetch(`http://localhost:8888/.netlify/functions/pokemon?search=${searchName}`);
    // console.log('response', response);


    const json = await response.json();
    // console.log('json', json);
    // console.log('json.results', json.results);

    // put the jsonified data in state and set the loading state to false
    setPokemonArr(json.results);

    setIsLoading(false);
  }
      
  return (
    <section className='pokemon'>
      {/* make the fetch on submit */}
      <form
        onSubmit={handlePokemonSubmit}
      >
            Search pokemon
        {/* add inputs/labels for city name, state, and country, using all the things we need with react forms. Don't forget to use the value property to sync these up with the default values in react state */}
        <input placeholder='ex) pikachu'
          onChange={(e)=> setSearchName(e.target.value)}
        ></input>
        <button>Get pokemon</button>
      </form>
      {/* Make a PokemonList component to import and use here. Use a ternery to display a loading spinner (make a <Spinner /> component for this) if the data is still loading. */}
      {/* <PokemonList pokemonArr={pokemonArr} /> */}
      {
        isLoading
          ? <Spinner/>
          : <PokemonList pokemonArr={pokemonArr} />
      }
    </section>
  );

}
