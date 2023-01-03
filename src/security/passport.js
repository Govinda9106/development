const passport = require('passport');
const { JsonDB } = require('node-json-db')
const speakeasy = require('speakeasy');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const { Strategy } = require('passport-google-oauth20');


async function verifyCallBack(accessToken, refreshToken, profile, done) {
    //await addUser(profile)
    done(null,profile)
};


//To Save the user to cookie session
passport.serializeUser((user, done) => {
    console.log('User Serialize', user);
    done(null, user.id)
});

//To read the session serialize user
passport.deserializeUser((obj, done) => {
    done(null, obj)
});

passport.use(new Strategy({
    callbackURL: '/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}, verifyCallBack));


let db = new JsonDB(new Config('Database', true, false, '/'));

async function addUser(profile) {
    try {
        const secret = speakeasy.generateSecret().base32;
        db.push(`/user/${profile.id}`, {Id: profile.id, secret})
    } catch (e) {
        console.log(e);
    }
};

async function verifyUser(req, res){

    const { token, Id } = req.body;
    const { secret } = await db.getData('user/');
    const validateToken = speakeasy.totp.verify({
        secret, token, encoding: 'base32'
    });
    if(validateToken){
        return res.json({
            validateToken : true
        })
    }else{
        return res.json({
            validateToken: false
        })
    }
    
};

module.exports = {
    verifyUser
}