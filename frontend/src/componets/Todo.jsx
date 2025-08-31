// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import './Todo.css';

const API_URL = 'http://localhost:4000/api/todos';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [loading, setLoading] = useState(false);

    // Cargar todos al iniciar el componente
    useEffect(() => {
        fetchTodos();
    }, []);

    // Obtener todos los todos del backend
    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await fetch(API_URL);
            const data = await response.json();
            
            if (data.success) {
                setTodos(data.data);
            } else {
                console.error('Error al cargar aventuras:', data.error);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
        } finally {
            setLoading(false);
        }
    };

    // Crear nuevo todo
    const createTodo = async (e) => {
        e.preventDefault();
        
        if (!newTodo.trim()) return;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTodo.trim() }),
            });

            const data = await response.json();
            
            if (data.success) {
                setTodos([...todos, data.data]);
                setNewTodo('');
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error al crear aventura:', error);
            alert('Error de conexión al crear aventura');
        }
    };

    // Actualizar todo (marcar como completado)
    const updateTodo = async (id, completed) => {
        try {
            const response = await fetch(`${API_URL}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, completed }),
            });

            const data = await response.json();
            
            if (data.success) {
                setTodos(todos.map(todo => 
                    todo.id === id ? data.data : todo
                ));
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error al actualizar aventura:', error);
        }
    };

    // Eliminar todo
    const deleteTodo = async (id) => {
        if (!window.confirm('¿Eliminar esta aventura del log?')) return;

        try {
            const response = await fetch(`${API_URL}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();
            
            if (data.success) {
                setTodos(todos.filter(todo => todo.id !== id));
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error al eliminar aventura:', error);
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h2>📜 Log de Aventuras Piratas</h2>
                <p>Registra las aventuras de tu tripulación</p>
            </div>

            {/* Formulario para crear nuevo todo */}
            <form onSubmit={createTodo} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Escribe tu próxima aventura..."
                    className="todo-input"
                />
                <button type="submit" className="todo-btn-add">
                    ⚓ Agregar Aventura
                </button>
            </form>

            {/* Lista de todos */}
            <div className="todo-list">
                {loading ? (
                    <div className="loading">🚢 Cargando aventuras...</div>
                ) : todos.length === 0 ? (
                    <div className="empty-state">
                        <p>🏴‍☠️ No hay aventuras registradas</p>
                        <p>¡Agrega tu primera aventura pirata!</p>
                    </div>
                ) : (
                    todos.map(todo => (
                        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                            <div className="todo-content">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={(e) => updateTodo(todo.id, e.target.checked)}
                                    className="todo-checkbox"
                                />
                                <span className="todo-text">{todo.title}</span>
                                {todo.completed && <span className="completed-badge">✅ Completada</span>}
                            </div>
                            <button
                                onClick={() => deleteTodo(todo.id)}
                                className="todo-btn-delete"
                            >
                                🗑️
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="todo-stats">
                <p>Total: {todos.length} aventuras</p>
                <p>Completadas: {todos.filter(t => t.completed).length}</p>
                <p>Pendientes: {todos.filter(t => !t.completed).length}</p>
            </div>
        </div>
    );
}

export default TodoList;