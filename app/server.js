const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');


const userRoute = require('./routes/userRoute');



const path = "./public/"
const app = express();

app.set("trust proxy", 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret : 'abeille',
    resave : false,
    saveUninitialized : true,
    cookie : {
        secure : true,
        maxAge : 60000
    }
    }
))

app.get('/', (req, res) => {
    res.sendFile(path + '/html/index.html', { root: '.' });
});


app.use('/html', express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/assets', express.static('public/assets'));


app.use('/api', userRoute);

app.listen(3010, () => {
    console.log('Server is running on port 3010');
});

