const express = require('express');
const router = express.Router();
const usuariosControllers = require('../controllers/usuariosControllers');


router.post('/',usuariosControllers.criarUsuario);
router.post('/login',usuariosControllers.login);


module.exports = router;