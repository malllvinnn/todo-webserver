const express = require('express')
const { userController } = require('../controllers')
const { SchemaCredentials } = require('../utils/credentialSchema')
const { handlerValidator } = require('../middlewares');

const router = express()

router.post('/register', handlerValidator(SchemaCredentials), userController.register)
router.post('/login', handlerValidator(SchemaCredentials), userController.login)

module.exports = router;