const MongoClient = require("mongodb").MongoClient;
const {url} = require('../../conf/config.json');

function signUp(username, password, fn){
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db('abeille');
        dbo.collection('user').findOne({username : username}, (err, res) => {
            if (err) throw err;
            if(res){
                console.log('User already exists!');
                fn(null);
            }else{
                dbo.collection('user').insertOne({username: username, password: password, points: 0}, (err, res) => {
                    if (err) {
                        console.log('User already exists!');
                        fn(null);
                    }
                    else{
                        console.log('User created!');
                        fn(res);
                    }
                    db.close();
                });
            }
        });
    });
}

function signIn(username, password, fn){
    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        const dbo = db.db('abeille');
        dbo.collection('user').findOne({username : username, password : password}, (err, res) => {
            if (err) throw err;
            if(res){
                console.log('User found!');
                fn(res);
            }else{
                console.log('User not found!');
                fn(null);
            }
            db.close();
        });
    });
}

module.exports = {
    signUp,
    signIn
}