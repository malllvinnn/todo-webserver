const express = require('express')
const { taskController } = require('../controllers')
const { SchemaAddBody, SchemaUpdateBody, SchemaIdParams } = require('../utils/validatorSchema')
const { handlerValidator, withJWTToken } = require('../middlewares')
const config = require('../config')

const router = express()

router.get('/', withJWTToken(config.tokenSecret()), taskController.getAll)
router.post('/', handlerValidator(SchemaAddBody), withJWTToken(config.tokenSecret()), taskController.addTask)
router.put('/:id', handlerValidator(SchemaIdParams, true), handlerValidator(SchemaUpdateBody), withJWTToken(config.tokenSecret()), taskController.updateTask)
router.delete('/:id', handlerValidator(SchemaIdParams, true), withJWTToken(config.tokenSecret()), taskController.removeTask)

module.exports = router;