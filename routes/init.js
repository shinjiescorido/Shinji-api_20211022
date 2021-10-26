const router = require('express').Router()
const controller = require('../controllers/init')


router.get('/', controller.get)
router.get('/populate', controller.populate)
router.post('/', controller.post)
router.put('/:id', controller.put)
router.delete('/:id', controller.trash)
module.exports = router