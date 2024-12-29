const express = require('express')
const { taskController } = require('../controllers')
const { SchemaAddBody, SchemaUpdateBody, SchemaIdParams } = require('../utils/validatorSchema')
const { handlerValidator } = require('../middlewares')

const router = express()

router.get('/', taskController.getAll)
router.post('/', handlerValidator(SchemaAddBody), taskController.addTask)
router.put('/:id', handlerValidator(SchemaIdParams, true), handlerValidator(SchemaUpdateBody), taskController.updateTask)
router.delete('/:id', handlerValidator(SchemaIdParams, true), taskController.removeTask)

module.exports = router;