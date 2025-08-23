const addUserSignup = require('../controllers/signupControllers');
const express = require('express');
const router = express.Router();


router.post('/', addUserSignup);

router.get('/', (req, res) => {
    res.send("Signup route working!");
});


module.exports = router;