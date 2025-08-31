// src/index.js
const express = require('express');
const cors = require('cors');

console.log('Iniciando servidor One Piece...');

const app = express();
const PORT = 4000;

// Middlewares básicos
app.use(cors());
app.use(express.json());

// Datos temporales para todos
let todos = [
    { id: 1, title: 'Entrenar Haki de Armadura', completed: false, createdAt: new Date() },
    { id: 2, title: 'Buscar el Road Poneglyph', completed: false, createdAt: new Date() },
    { id: 3, title: 'Cocinar para la tripulación', completed: true, createdAt: new Date() }
];

let nextId = 4;

// ===== RUTAS =====

// Ruta principal
app.get('/', (req, res) => {
    res.json({
        message: 'One Piece Backend Online! 🏴‍☠️',
        status: 'ok',
        endpoints: {
            'GET /api/todos': 'Ver todas las aventuras',
            'POST /api/todos': 'Crear nueva aventura'
        }
    });
});

// GET /api/todos - Obtener todas las tareas
app.get('/api/todos', (req, res) => {
    res.json({
        success: true,
        data: todos,
        count: todos.length,
        message: 'Lista de aventuras piratas cargada'
    });
});

// POST /api/todos - Crear nueva tarea
app.post('/api/todos', (req, res) => {
    const { title } = req.body;
    
    if (!title || title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El título de la aventura es requerido'
        });
    }
    
    const newTodo = {
        id: nextId++,
        title: title.trim(),
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
        success: true,
        data: newTodo,
        message: '¡Nueva aventura agregada al log!'
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚢 Servidor navegando en http://localhost:4000`);
});

// PUT - Actualizar tarea (agregar después de la ruta POST)
app.put('/api/todos/update', (req, res) => {
    const { id, title, completed } = req.body;
    
    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'ID es requerido'
        });
    }
    
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    
    if (todoIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Aventura no encontrada en el log'
        });
    }
    
    if (title !== undefined && title.trim() !== '') {
        todos[todoIndex].title = title.trim();
    }
    if (completed !== undefined) {
        todos[todoIndex].completed = Boolean(completed);
    }
    
    todos[todoIndex].updatedAt = new Date();
    
    res.json({
        success: true,
        data: todos[todoIndex],
        message: completed ? '¡Aventura completada!' : 'Aventura actualizada'
    });
});

// DELETE - Eliminar tarea (agregar después de PUT)
app.delete('/api/todos/delete', (req, res) => {
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).json({
            success: false,
            error: 'ID es requerido'
        });
    }
    
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    
    if (todoIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Aventura no encontrada'
        });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    
    res.json({
        success: true,
        data: deletedTodo,
        message: 'Aventura eliminada del log'
    });
});