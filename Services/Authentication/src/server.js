//user pool : User pool - 2p5ph6
//application: huddleup

import express from 'express';
import session from 'express-session';
import { Issuer, generators } from 'openid-client';

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve parent directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('hello');
console.log(process.env.AWS_COGNITO_CLIENT_ID); 

console.log('hello');
console.log(process.env.AWS_COGNITO_CLIENT_ID);
const app = express();


let client;
// Initialize OpenID Client
async function initializeClient() {
    const issuer = await Issuer.discover('https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_mSCjM2ORh');
    client = new issuer.Client({
        client_id: process.env.AWS_COGNITO_CLIENT_ID,
        client_secret: process.env.AWS_COGNITO_CLIENT_SECRET,
        redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net'],
        response_types: ['code']
    });
};
initializeClient().catch(console.error);

app.use(session({
    secret: process.env.AWS_COGNITO_CLIENT_SECRET,
    resave: false,
    saveUninitialized: false
}));

const checkAuth = (req, res, next) => {
    if (!req.session.userInfo) {
        req.isAuthenticated = false;
    } else {
        req.isAuthenticated = true;
    }
    next();
};

app.get('/', checkAuth, (req, res) => {
    res.render('home', {
        isAuthenticated: req.isAuthenticated,
        userInfo: req.session.userInfo
    });
});

app.get('/login', (req, res) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        scope: 'email openid phone',
        state: state,
        nonce: nonce,
    });

    res.redirect(authUrl);
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    //const logoutUrl = `https://ap-south-1mscjm2orh.auth.ap-south-1.amazoncognito.com/logout?client_id=1nb6u0fdsg3gpt05i1l2ok99j7&logout_uri=<logout uri>`;
    //res.redirect(logoutUrl);
    res.status(200).json({'message': 'logged out successfully'});
});

app.listen(3000, ()=>{console.log('server listening on 3000')});