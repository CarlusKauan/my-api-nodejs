const express = require('express');
const cors = require('cors')
const routes = require('./router');
const mongoose = require('mongoose');

// conf inicial
require('dotenv').config()

// criando a app
const app = express();

app.use(cors())
app.use(express.json())

// use rotas
app.use('/pets',routes)

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
// Conexão com MongoDb
mongoose
    .connect(   
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.patyw.mongodb.net/myapinodejs?retryWrites=true&w=majority`
    )
    .then(() => {
        // rodando na porta 3000
        app.listen(3000, () => console.log("running.."));
    })
    .catch((err) => console.log(err))