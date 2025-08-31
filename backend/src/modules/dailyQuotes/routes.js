// src/modules/dailyQuotes/routes.js
const express = require('express');
const router = express.Router();

// Frases temporales de One Piece
const quotes = [
    { id: 1, text: "¡Voy a ser el Rey de los Piratas!", author: "Monkey D. Luffy", date: new Date() },
    { id: 2, text: "Un hombre muere cuando es olvidado", author: "Dr. Hiluluk", date: new Date() }
];

router.get('/', (req, res) => {
    res.json({
        success: true,
        data: quotes,
        message: 'Frases del día de One Piece'
    });
});

module.exports = router;