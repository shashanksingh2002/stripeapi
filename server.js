//Required files and libraries
require('dotenv').config();
const express = require('express');
const { connectToDb,getSubscription, getTransactionData } = require('./database/database');
const { userSignUp } = require('./routes/signup');
const { userLogin } = require('./routes/login');
const { checkoutStripe, refundStripe } = require('./src/stripe');
const app = express();

//port
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.static(__dirname+'/public'));

//Connect to database and start the server
connectToDb((err) => {
    if(!err){
        app.listen(port,() => {
            console.log('Server is Running Successfully at Port:',port);
        });
    }
    else{
        console.error(err);
    }
});

//routes
app.get('/',(req,res) => {
    res.sendFile(__dirname+'/public/login.html');
});

app.get('/signup',(req,res) => {
    res.sendFile(__dirname+'/public/signup.html');
});

app.get('/subscription', (req,res) => {
    res.sendFile(__dirname+'/public/subscription.html');
})
app.post('/api/signup', (req,res) => {
    userSignUp(req,res);
});

app.post('/api/login', (req,res) => {
    userLogin(req,res);
})

app.post('/api/subscription', (req,res) => {
    getSubscription(req,res);
});

app.post('/api/checkout', (req,res) => {
    checkoutStripe(req,res);
});

app.post('/api/transaction', (req,res) => {
    getTransactionData(res);
});

app.delete('/api/refund', (req,res) => {
    refundStripe(req,res);
});