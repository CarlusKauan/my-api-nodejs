const express = require('express');
const routes = express.Router()

// banco fake
let pets = [];

// post {pet}
routes.post('/pets', (req, res) => {
    const { id, nome, dono, raca, idade } = req.body;
    const pet = { id, nome, dono, raca, idade };
    pets.push(pet);
    
    return res.status(201).json(pet);
});

// get {pets}
routes.get('/pets', (req, res) => { 
    const buscarPets = pets;
    
    return res.status(200).json(buscarPets);
});
// get {pets:id}
routes.get('/pets/:pets_id', (req, res) => { 
    const { pets_id } = req.params;
    const pet = pets.find((pet) => pet.id == pets_id);
    if(!pet) res.status(404).json('não achei patrão !')
    
    return res.status(200).json(pet);
});

// delete {pet}
routes.delete('/pets/:pets_id', (req, res) => {
    const { pets_id } = req.params;
    const FiltrarPets = pets.filter((pet) => pet.id != pets_id);
    pets = FiltrarPets;

    return res.status(204).json('foi deletado, meu nobre !');
});
// patch {pet:id}
routes.patch('/pets/:pets_id', (req, res) => {
    const { nome, dono, raca } = req.body;
    const { pets_id } = req.params;
    const pet = pets.find(pet => pet.id == pet.id);
    pet.id = pet.id;
    pet.nome = nome ? nome : pet.nome;
    pet.dono = dono ? dono : pet.dono;
    pet.raca = raca ? raca : pet.raca;

    return res.status(200).json(pet);
})

// exportando !
module.exports = routes