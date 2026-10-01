import { useState, useEffect } from 'react';
import { data, useNavigate } from "react-router-dom";

import "./style.css";

function Inicio(){
    const navigate = useNavigate();
    const [Todoslospokes, setTodoslospokes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    
    let resultados =Todoslospokes;

    if (busqueda.length >= 3 && isNaN(busqueda)) {
    resultados = Todoslospokes.filter(pokemon =>
      pokemon.name.toLowerCase().includes(busqueda.toLowerCase())
    );
    }


    useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=1025`)
      .then(response => response.json())
      .then(responseData => setTodoslospokes(responseData.results))
      .catch(error => console.error("Error:", error));
    }, []); 
    console.log(Todoslospokes)

    if (Todoslospokes.length===0){
        return <p>Cargando...</p>
    }

    return(
        <>
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