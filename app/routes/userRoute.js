const express = require('express');

const router = express.Router();

const {signUp, signIn} = require('../database/model/user');

router.post('/signUp', (req, res) => {
    if(req.body.username && req.body.password){
        signUp(req.body.username, req.body.password, (result) => {
            if(result){
                res.status(201).send('User created!');
                req.session.user = result;
            }else{
                res.status(400).send('User already exists!');
            }
        });
    }else{
        res.status(400).send('Please fill all fields!');
    }
});


router.post('/signIn', (req, res) => {
    if(req.body.username && req.body.password){
        signIn(req.body.username, req.body.password, (result) => {
            if(result){
                res.status(200).send('User found!');
                req.session.user = result;
            }else{
                res.status(400).send('User not found!');
            }
        });
    }else{
        res.status(400).send('Please fill all fields!');
    }
});

router.get('/signOut', (req, res) => {
    if(req.session.user){
        req.session.destroy();
        res.status(200).send('User disconnected!');
    }else{
        res.status(400).send('User not connected!');
    }
});



module.exports = router;