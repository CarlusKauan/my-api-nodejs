
const express = require('express');
const routes = express.Router()
const Pet = require('../models/Pet');

const PetController = require('./controllers/PetController'); 

routes.post('/', PetController.store)

routes.get('/', PetController.index)

routes.get('/:id', PetController.show);

routes.patch('/:id', PetController.update);

routes.delete('/:id', PetController.destroy);

// exportando !
module.exports = routes