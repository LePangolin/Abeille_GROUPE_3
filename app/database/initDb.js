const MongoClient = require("mongodb").MongoClient;
const {url} = require('../conf/config.json');
const {tabPlante} = require('./plante.json');

MongoClient.connect(url, (err, db) => {
    if (err){
        console.log('Database already exists!');
        db.close();
        return;
    }
    console.log('Database created!');
    db.close();
});

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db('abeille');
    dbo.createCollection('user', (err, res) => {
        if (err){
            console.log('Collection already exists!');
        }else{
            console.log('Collection created!');
        }
        dbo.createCollection('plantes', (err, res) => {
            if (err){
                console.log('Collection already exists!');
            }else{
                console.log('Collection created!');
            }
            dbo.createCollection("plantesUser", (err, res) => {
                if (err){
                    console.log('Collection already exists!');
                }else{
                    console.log('Collection created!');
                }
                dbo.collection('plantes').insertMany(tabPlante, (err, res) => {
                    if (err){
                        console.log('Data already exists!');
                    }else{
                        console.log('Data inserted!');
                    }
                    db.close();
                });
            });
        });
    });
});


