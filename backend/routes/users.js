const express = require('express');
const router = express.Router();
const controller = require('../controllers');

/* Show User */
router.get('/users/:id', controller.users.showUser);
/* Update User */
router.put('/users/:id', controller.users.updateUser);

module.exports = router;