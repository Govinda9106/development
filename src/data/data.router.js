const express = require('express');
const router = express.Router();
const checkLoggedIn = require('../security/auth.js');


router.get('/secret', checkLoggedIn, (req, res)=>{
    res.send('Your secret value is 45!')
});

module.exports = router;