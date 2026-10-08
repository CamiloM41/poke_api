import { useState, useEffect } from 'react';
import { data, useNavigate } from "react-router-dom";

import "./style.css";

function Inicio(){
    const navigate = useNavigate();
    const [Todoslospokes, setTodoslospokes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [tipopoke, setTipopoke] = useState('All')
    
    const tipos = [
        'All',
        'normal', 'fighting', 'flying', 'poison', 'ground', 'rock',
        'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric',
        'psychic', 'ice', 'dragon', 'dark', 'fairy', 'stellar', 'shadow', 'unknown'
    ]

    let resultados =Todoslospokes;

    if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = Todoslospokes.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    }

    useEffect(() => {
        const cargarPokemons = async () => {
        try {
            if (tipopoke === 'All') {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
            const responseData = await response.json()
            setTodoslospokes(responseData.results ?? [])
            return
            }

            const response = await fetch(`https://pokeapi.co/api/v2/type/${tipopoke}`)
            const responseData = await response.json()
            const mascotas = responseData.pokemon?.map((entry) => entry.pokemon) ?? []
            setTodoslospokes(mascotas)
        } catch (error) {
            console.error('Error:', error)
        }
        }

        cargarPokemons()
    }, [tipopoke])

    if (Todoslospokes.length===0){
        return <p>Cargando...</p>
    }

    return(
        <>
            <div className="c-filtro">
                {tipos.map((unTipo, index) => (
                <button type="button" key={index} onClick={() => setTipopoke(unTipo)}>
                    {unTipo}
                </button>
                ))}
            </div>

            <input
            type="text"
            placeholder="Buscar Pokémon"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="c-buscador"
            />

        {resultados.map((pokemon) => (
            <div className="c-lista-pokemon"
                onClick={() => navigate(`/pokemon/${pokemon.name}`)}
            >
                <p key ={pokemon.name}>{pokemon.name}</p>
                <p>{pokemon.url.split("/")[6]}</p>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split("/")[6]}.png`} 
                alt={`Pokémon ${pokemon.name}`} width='auto' height='60' loading='lazy'
                />
            </div>
        ))}
        </>
    )
}
export default Inicio;