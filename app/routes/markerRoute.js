const express = require('express');

const router = express.Router();

const {markers, marker, updateMarker} = require('../database/model/marker');

router.get('/markers', (req, res) => {
    markers((result) => {
        res.status(200).send(result);
    });
});

router.get('/marker/:id', (req, res) => {
    marker(req.params.id, (result) => {
        if(result){
            res.status(200).send(result);
        }else{
            res.status(400).send('Marker not found!');
        }
    });
});

router.post('/marker/:id', (req, res) => {
    if(req.body.lon && req.body.lat){
        updateMarker(req.params.id, req.body.lon, req.body.lat, (result) => {
            if(result){
                res.status(200).send('Marker updated!');
            }else{
                res.status(400).send('Marker not found!');
            }
        });
    }else{
        res.status(400).send('Please fill all fields!');
    }
});

module.exports = router;
