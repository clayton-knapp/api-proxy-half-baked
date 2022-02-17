import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PokemonSearch from '../PokemonSearch';

test('if we click the button do we get pokemon', async () => {

  render(<PokemonSearch />);

  const getPokemonBtn = screen.getByText(/Get pokemon/i);
  expect(getPokemonBtn).toBeInTheDocument();

  fireEvent.click(getPokemonBtn);

  // await waitFor(()=> {
  //   const pokemonItemEl = screen.findByText(/butterfree/i);
  //   expect(pokemonItemEl).toBeInTheDocument();
  // });

  const pokemonItemEl = await screen.findByText(/butterfree/i);

  await expect(pokemonItemEl).toBeInTheDocument();
});


test('if we add char to input do we get charmeleon', async () => {

  render(<PokemonSearch />);

  const getPokemonBtn = await screen.getByText(/Get pokemon/i);
  // expect(getPokemonBtn).toBeInTheDocument();
  const inputEl = await screen.getByRole('textbox');
  expect(inputEl).toBeInTheDocument();

  fireEvent.change(inputEl, { target: { value: 'char' } });
  fireEvent.click(getPokemonBtn);

  // await waitFor(()=> {
  //   const pokemonItemEl = screen.findByText(/butterfree/i);
  //   expect(pokemonItemEl).toBeInTheDocument();
  // });

  const pokemonItemEl = await screen.findByText(/charmeleon/i);

  await expect(pokemonItemEl).toBeInTheDocument();
});
