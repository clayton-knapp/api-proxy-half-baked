import React from 'react';

export default function PokemonList({ pokemonArr }) {
  // console.log(pokemonArr);
  return (
    <div className='pokemon-list' title='pokemon-list'>
      {
        pokemonArr.map((pokemon, i)=> 
          <div key={pokemon + i} className='pokemon-item' title='pokemon-item'>
            <h3>{pokemon.pokemon}</h3>
            {/* <h4>Type: {pokemon.type_1}</h4> */}
            <img src={pokemon.url_image}></img>
          </div>
        )
      }
    </div>
  );
}
