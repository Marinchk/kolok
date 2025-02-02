const express = require('express');
const router = express.Router();

let products = [];


let lastId = 0;

router.post('/', (req, res) => {
    const { name, price, deadline } = req.body;
    if (!name || !price || !deadline) {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    const product = { id: ++lastId, name, price, deadline };
    products.push(product);
    res.status(201).json(product);
});

router.get('/', (req, res) => res.json(products));

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, deadline } = req.body;
    const product = products.find(p => p.id === parseInt(id));
    if (!product) return res.status(404).json({ message: 'Продукт не найден' });
    product.name = name;
    product.price = price;
    product.deadline = deadline;
    res.json(product);
});

router.delete('/:id', (req, res) => {
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.json({ message: 'Продукт удален' });
});

router.get('/sort', (req, res) => {
    const { type, order } = req.query;
    if (type === 'price') {
        products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (type === 'days') {
        products.sort((a, b) => order === 'asc' ? a.days - b.days : b.days - a.days);
    }
    res.json(products);
});

router.get('/sum/:id', (req, res) => {
    const { id } = req.params;
    const deadlineInput = parseInt(id);

    if (isNaN(deadlineInput)) {
        return res.status(400).json({ message: 'Введите корректное количество дней' });
    }


    const total = products
        .filter(p => p.deadline <= deadlineInput)
        .reduce((sum, p) => sum + p.price, 0);

    res.json({ total });
});

module.exports = { router, products }
