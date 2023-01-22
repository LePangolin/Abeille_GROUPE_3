const express = require('express');
const path = "./public/"
const seed = require('./database/seeder');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path + '/html/index.html', { root: '.' });
});


app.use('/html', express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/assets', express.static('public/assets'));

app.listen(3010, () => {
    console.log('Server is running on port 3010');
});

