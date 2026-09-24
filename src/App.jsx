import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom';

//Componentes
import Coleccion from "./Components/Coleccion"
import Favoritos from "./Components/Favoritos"
import Info from "./Components/Info"
import Inicio from "./Components/Inicio"
import Pokemon from "./Components/Pokemon"
import Usuario from "./Components/Usuario"

import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/info" element={<Info />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/coleccion">Coleccion</Link>
          <Link to="/favoritos">Favoritos</Link>
          <Link to="/info">Info</Link>
          <Link to="/usuario">Usuario</Link>
        </nav>
      </Router>
    </>
  )
}

export default App
