import React, { useState } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const fetchPokemon = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
      const { results } = response.data;
      setPokemonList(results.map(pokemon => pokemon.name));
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
    }
  };

  const searchPokemon = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      setSearchResult(response.data.name);
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      setSearchResult('Pokemon not found');
    }
  };

  return (
    <div>
      <h1>All Pokemon Names</h1>
      <button onClick={fetchPokemon}>Fetch Pokemon</button>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>{pokemon}</li>
        ))}
      </ul>
      <h2>Search Pokemon</h2>
      <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={searchPokemon}>Search</button>
      {searchResult && <p>Search Result: {searchResult}</p>}
    </div>
  );
};

export default PokemonList;
