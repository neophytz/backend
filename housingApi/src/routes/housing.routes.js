const express = require("express");
const housingRouter = express.Router();

const {get, create, getDelhi} = require('../controllers/housing.controller')

// naming conventions : /api/housing
housingRouter.get('/', get)

// making a new entry in the database : /api/housing
housingRouter.post('/', create)

housingRouter.get('/delhi' ,getDelhi)

module.exports = housingRouter;