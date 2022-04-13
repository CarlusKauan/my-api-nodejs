const express = require('express');
const routes = require('./router');

// criando a app
const app = express();

app.use(express.json())
app.use(routes)

// rodando na porta 3000
app.listen(3000, () => console.log("🚀"));

