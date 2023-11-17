// App.test.js
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom'

beforeEach(() => {
  fetch.resetMocks();
});

test('fetches pokemons from API and displays them', async () => {
  const fakePokemons = [
    { id: 1, name: 'Bulbasaur', image: 'http://...' },
    { id: 2, name: 'Ivysaur', image: 'http://...' },
    // ...otros pokémons falsos...
  ];

  fetch.mockResponseOnce(JSON.stringify(fakePokemons));

  const { findAllByText } = render(<App />);

  await waitFor(async () => {
    const pokemonNames = await findAllByText(/bulbasaur|ivysaur/i);
    expect(pokemonNames.length).toBe(fakePokemons.length);
  });
});

