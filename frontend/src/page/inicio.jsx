import './inicio.css';
import background from '../assets/background.webp';
import titulo from '../assets/Titulo.png';
import { useState } from 'react';
import TodoList from '../componets/Todo'; // ← Importar TodoList

function Inicio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false); // ← Estado para TodoList
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
         

         <button 
         onClick={() => {}} 
         className="menu-item"
         >
          Frase del Día
         </button>

          <button 
            onClick={() => {setShowTodoList(true) }} 
            className="menu-item"   
          >
            Lista de Tareas
          </button>
          <button 
          onClick={() => {}} 
          className="menu-item"
          >
            Metas Semanales
          </button>
          <button 
          onClick={() => {}} 
          className="menu-item"
          >
            Baúl del Nakama
          </button>
          
    
        </nav>

        {/* Modal del TodoList */}
        {showTodoList && (
          <div className="todo-modal">
            <div className="todo-modal-content">
              <button 
                className="close-todo"
                onClick={() => setShowTodoList(false)}
              >
                ✕
              </button>
              <TodoList />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Inicio;
