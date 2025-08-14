import './inicio.css';
import background from '../assets/background.webp';
import titulo from '../assets/Titulo.png';
import { useState } from 'react';

function Inicio() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="layout">

      <div className="container">
        <img src={background} alt="background" className="background" />
        <a href="#inicio" className="titulo">
          <img src={titulo} alt="titulo" className="titulo" />
        </a>
        <button
          type="button"
          className="pergamino-toggle"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="menu-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
        </button>

        <nav id="menu-nav" className={`floating-menu ${menuOpen ? 'is-open' : ''}`} aria-label="Menú principal">
          <a href="#Frase del Día" className="menu-item">Frase del Día</a>
          <a href="#Lista de Tareas" className="menu-item">Lista de Tareas</a>
          <a href="#Metas Semanales" className="menu-item">Metas Semanales</a>
          <a href="#Baúl del Nakama" className="menu-item">Baúl del Nakama</a>
        </nav>
      </div>
    </div>
  );
}

export default Inicio;
