const express = require('express');
// banco fake
let pets = [];

// criando a app
const app = express();

app.use(express.json())

app.post('/pets', (req, res) => {
    const { id, nome, dono, raca } = req.body;
    const pet = { id, nome, dono, raca };
    pets.push(pet);
    
    return res.status(201).json(pet);
});

app.get('/pets', (req, res) => { 
    const buscarPets = pets;
    
    return res.status(200).json(buscarPets);
});

app.get('/pets/:pets_id', (req, res) => { 
    const { pets_id } = req.params;
    const pet = pets.find((pet) => pet.id == pets_id);
    if(!pet) res.status(404).json('não achei patrão !')
    
    return res.status(200).json(pet);
});

app.delete('/pets/:pets_id', (req, res) => {
    const { pets_id } = req.params;
    const FiltrarPets = pets.filter((pet) => pet.id != pets_id);
    pets = FiltrarPets;

    return res.status(204).json('foi deletado, meu nobre !');
});

app.patch('/pets/:pets_id', (req, res) => {
    const { nome, dono, raca } = req.body;
    const { pets_id } = req.params;
    const pet = pets.find(pet => pet.id == pet.id);
    pet.id = pet.id;
    pet.nome = nome ? nome : pet.nome;
    pet.dono = dono ? dono : pet.dono;
    pet.raca = raca ? raca : pet.raca;

    return res.status(200).json(pet);
})

// rodando na porta 3000
app.listen(3000, () => console.log("🚀"));

