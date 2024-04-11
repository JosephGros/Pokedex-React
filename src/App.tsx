import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const getPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    const result = await response.json();
    console.log(result);
    const toArray : any = [];
    toArray.push(result);
    setPokemonData(toArray);
  }

  const handleClick = () => {
    setPokemon(inputRef.current!.value);
  }

  useEffect(() => {
    getPokemon();
  },[pokemon])

  return (
    <>
      <input ref={inputRef} defaultValue={"pikachu"}></input>
      <button onClick={() => handleClick()} className=''>Get Pokémon</button>
      {pokemonData.map((pokemon: any) => (
      <div key={pokemon.id} className='w-96'>
        <img src={pokemon.sprites.front_default}></img>
        <p>Name: {pokemon.name}</p>
      </div>
      ))}
    </>
  )
}

export default App
