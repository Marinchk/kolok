const express = require('express');
const bodyParser = require('body-parser');
const { router: productsRouter } = require('./products');  // Исправленный импорт
const emailService = require('./emailService');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/products', productsRouter);

app.post('/send-email', emailService.sendEmail);

app.listen(port, () => {
    console.log(`server is runnig http://localhost:${port}`);
});
