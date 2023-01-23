const MongoClient = require("mongodb").MongoClient;
const {url} = require('../../conf/config.json');

function markers(fn){
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db('abeille');
        dbo.collection('plantes').find({}).toArray((err, res) => {
            if (err) throw err;
            let tab = [];
            res.forEach((element) => {
                if(element.lon && element.lat){
                    tab.push(element);
                }
            });
            fn(tab);
        });
    });
}

function marker(id, fn){
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db('abeille');
        dbo.collection('plantes').findOne({idPlante : parseInt(id)},(err, res) => {
            if (err) throw err;
            if(!res){
                fn(null);
            }else{
                if(res.lon && res.lat){
                    fn(res);
                }else{
                    fn(null);
                }
            }
        });
    });
}

function updateMarker(id, lon, lat, fn){
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db('abeille');
        dbo.collection('plantes').updateOne({id : id}, {
            $set : {
                lon : lon,
                lat : lat
            }
        }, (err, res) => {
            if (err) throw err;
            fn(res);
        });
    });
}


module.exports = {
    markers,
    marker,
    updateMarker
}