const express = require('express');
const router = express.Router();
const controller = require('../controllers')

/* create a garden */
router.post('/create', controller.gardens.createGarden);

/* get all gardens */
router.get('/all', controller.gardens.getGardens);

/* get a single garden */
router.get('/show/:id', controller.gardens.showGarden);

/* remove a garden */
router.delete('/:id', controller.gardens.destroyGarden);

/* edit a garden */
router.put('/:id', controller.gardens.editGarden)

module.exports = router;