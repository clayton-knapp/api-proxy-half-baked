import { fireEvent, render, screen } from '@testing-library/react';
import PokemonSearch from '../PokemonSearch';

test('if we click the button do we get pokemon', async () => {
  render(<PokemonSearch />);

  const getPokemonBtn = screen.getByText(/Get pokemon/i);

  fireEvent.click(getPokemonBtn);

  const pokemonListEl = screen.getByTitle('pokemon-list');

  await expect(pokemonListEl).toBeInTheDocument();
});
