function checkLoggedIn(req, res, next) {
    const user = req.user;
    console.log('user', user);
    const loggedIn = true;
    if (!user) {
        return res.json({
            title: 'You must logged In!!'
        })
    }
    next()
};


module.exports = checkLoggedIn;