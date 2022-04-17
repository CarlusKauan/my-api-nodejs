
const express = require('express');
const routes = express.Router()
const Pet = require('../models/Pet');

routes.post('/', async (req, res) => {
    
    // extraindo propriedades
    const { id, nome, dono, raca, idade } = req.body
    // object pet
    const pet = { id, nome, dono, raca, idade };
  
    // validação
    if(!id){
        res.status(422).json({message: 'O id é obrigatorio !'})
        return;
    }
    else if(!nome || !dono){
        res.status(422).json({message: 'Nome ou Dono é obrigatorio !'})
        return;
    }

    // create -> try -> catch
    try {
        // esperar a req terminar 
        await Pet.create(pet)

        res.status(201).json({message: 'Pet Inserido no sistema com Sucesso !'})

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

routes.get('/', async  (req, res) => {
    // req = enviando uma requisição, res = recebendo uma resposta
    try {
        // filtra = find()
        const pets = await Pet.find()

        res.status(200).json(pets)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

routes.get('/:id', async (req, res) => { 
    
    try {
        const id = req.params.id

        try {
            // filtrar um = findOne()
            const pet = await Pet.findOne({id: id})
            // validação
            if(!pet){
                res.status(422).json({message: 'Pet não encontrado !'})
                return;
            }

            return res.status(200).json(pet)

        } catch (error) {
            res.status(500).json({ error: error })
        }
        
    } catch (error) {
        res.status(404).json({message: 'não foi encontrado !'})
    }
});

routes.patch('/:id', async (req, res) => {
    
    const id = req.params.id

    const { nome, dono, raca, idade} = req.body;

    const pet = { nome, dono, raca, idade };

    try {
        const UpdatePet = await Pet.updateOne({id: id}, pet)

        if(UpdatePet.matchedCount === 0) {
            res.status(422).json({message: 'Pet não encontrado !'})
            return;
        }

        res.status(200).json(pet)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

routes.delete('/:id', async (req, res) => {
    
    const id = req.params.id
    
    const pet = await Pet.findOne({id: id})

    if(!pet){
        res.status(422).json({message: 'Pet não encontrado !'})
        return;
    }

    try {
        await Pet.deleteOne({id: id})
        
        res.status(200).json({message: 'Pet removido com sucesso !'})

    } catch (error) {
        res.status(500).json({error: error})
    }
});

// exportando !
module.exports = routes