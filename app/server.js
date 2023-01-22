const express = require('express');
const path = "./public/"
const seed = require('./database/seeder');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path + '/html/index.html', { root: '.' });
});


app.use('/html', express.static('public/html'));

app.listen(3010, () => {
    console.log('Server is running on port 3010');
});

