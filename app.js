const express = require('express');
const passport = require('passport');
const helmet = require('helmet');
const path = require('path');
const cookieSession = require('cookie-session');
const dataRouter = require('./src/data/data.router.js');
const securityRouter = require('./src/security/security.router.js');

const app = express();
app.use(express.json());

app.use(helmet());

app.use(cookieSession({
	name: 'session',
	maxAge: 24*60*60*1000,
	keys: [ 'secret key' ]
}));


app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.use(passport.initialize());
app.use(passport.session());

app.use(securityRouter);
app.use(dataRouter);


module.exports = app;