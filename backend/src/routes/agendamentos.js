const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/agendamentosController');

router.get('/', ctrl.list);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

router.put('/finalizar/:id', ctrl.finalizar);
router.put('/cancelar/:id', ctrl.cancelar);

module.exports = router;
