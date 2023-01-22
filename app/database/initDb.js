const MongoClient = require("mongodb").MongoClient;

const {url} = require('../conf/config.json');

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    console.log('Database created!');
    db.close();
});

MongoClient.connect(url, (err, db) => {
    if (err) throw err;
    const dbo = db.db('abeille');
    dbo.createCollection('user', (err, res) => {
        if (err){
            console.log('Collection already exists!');
        }
        console.log('Collection created!');
        dbo.createCollection('plant', (err, res) => {
            if (err){
                console.log('Collection already exists!');
            }
            console.log('Collection created!');
            db.close();
        });
    });
});