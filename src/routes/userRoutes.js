const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

router.post('/', userControllers.addUser);
router.get('/', userControllers.getAllUsers);   
router.delete('/:id', userControllers.deleteUser);
router.put('/:id', userControllers.editUser);



module.exports = router;
