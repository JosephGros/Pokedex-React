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
    toArray.push(result, ...pokemonData);
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
    <div className='flex flex-col justify-center'>
      <input ref={inputRef} defaultValue={"pikachu"} className='rounded-md bg-gray-300 text-gray-950 m-2 p-2' placeholder='Search Pokémon'></input>
        <button onClick={() => handleClick()} className='bg-red-200 text-gray-950 px-2 rounded-md m-2 p-2'>Get Pokémon</button>
        {pokemonData.map((pokemon: any) => (
        <div key={pokemon.id} className='flex flex-col justify-center w-52 h-52 bg-red-950 text-gray-950 m-2 p-2 rounded-md border-4 border-amber-300'>
          <div className='flex justify-center bg-gray-300 w-40 rounded-md self-center m-2 border-2 border-amber-300'>
            <img src={pokemon.sprites.front_default}></img>
          </div>
          <p className='self-center text-red-50'>Name: {pokemon.name}</p>
        </div>
        ))}
    </div>
    </>
  )
}

export default App
