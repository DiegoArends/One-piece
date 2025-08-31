// src/modules/todos/routes.js
const express = require('express');
const router = express.Router();

// Datos temporales (luego usaremos base de datos)
let todos = [
    { id: 1, title: 'Entrenar Haki de Armadura', completed: false, priority: 'high', createdAt: new Date() },
    { id: 2, title: 'Buscar el Road Poneglyph', completed: false, priority: 'high', createdAt: new Date() },
    { id: 3, title: 'Cocinar para la tripulación', completed: true, priority: 'medium', createdAt: new Date() }
];

let nextId = 4;

// ===== RUTAS DEL MÓDULO TODOS =====

// GET /api/todos - Obtener todas las tareas
router.get('/', (req, res) => {
    const { completed, priority } = req.query;
    
    let filteredTodos = todos;
    
    // Filtrar por completado si se especifica
    if (completed !== undefined) {
        filteredTodos = filteredTodos.filter(todo => 
            todo.completed === (completed === 'true')
        );
    }
    
    // Filtrar por prioridad si se especifica
    if (priority) {
        filteredTodos = filteredTodos.filter(todo => todo.priority === priority);
    }
    
    res.json({
        success: true,
        data: filteredTodos,
        count: filteredTodos.length,
        filters: { completed, priority }
    });
});

// POST /api/todos - Crear nueva tarea
router.post('/', (req, res) => {
    const { title, priority = 'medium' } = req.body;
    
    if (!title || title.trim() === '') {
        return res.status(400).json({
            success: false,
            error: 'El título es requerido'
        });
    }
    
    const newTodo = {
        id: nextId++,
        title: title.trim(),
        completed: false,
        priority: priority,
        createdAt: new Date()
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
        success: true,
        data: newTodo,
        message: 'Nueva aventura agregada a la lista!'
    });
});

// PUT /api/todos/:id - Actualizar tarea
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed, priority } = req.body;
    
    const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
    
    if (todoIndex === -1) {
        return res.status(404).json({
            success: false,
            error: 'Aventura no encontrada'
        });
    }
    
    // Actualizar campos
    if (title !== undefined && title.trim() !== '') {
        todos[todoIndex].title = title.trim();
    }
    if (completed !== undefined) {
        todos[todoIndex].completed = Boolean(completed);
    }
    if (priority !== undefined) {
        todos[todoIndex].priority = priority;
    }
    
    todos[todoIndex].updatedAt = new Date();
    
    res.json({
        success: true,
        data: todos[todoIndex],
        message: completed ? 'Aventura completada!' : 'Aventura actualizada!'
    });
});

// DELETE /api/todos/:id - Eliminar tarea
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
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
        message: 'Aventura eliminada del log de navegación'
    });
});

module.exports = router;