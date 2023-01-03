const express = require('express');
const router = express.Router();
const { verifyUser } = require('./passport.js');
const passport = require('passport');



router.get('/auth/google', passport.authenticate('google', {
    scope: ['email']
}));


router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true
}));


router.get('/failure', (req, res) => {
    res.json({
        error: 'Failed to Authenticate'
    })
});

router.get('/auth/logout', (req, res) => {
    req.logOut();
    return res.redirect('/');
});

router.post('/auth/verify', verifyUser);

module.exports = router