const express = require('express');
const session = require('express-session')
const cors = require('cors');
const mongoose = require('mongoose');

const getQuestion = require('./src/get-question')

const app = express();
const DB_URI = 'mongodb+srv://valentin:YbBMvR7HqBtKUkso@letraschinas.9emdibw.mongodb.net/letraschinas?retryWrites=true&w=majority&appName=letraschinas'

app.use(express.json()) 
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true
}));
app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect(DB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => {
        app.listen(3000, () => {
            console.log('Server is running on http://localhost:3000');
        });
    
    })
    .catch((err) => `DB error\n: ${err}`)


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/question', async (req, res) => {
    if (req.session.score === undefined) {
        req.session.score = 0;
    }
    const question = await getQuestion()
    res.send(question)
    console.log(req.session.score)
});

app.post('/response', (req, res) => {
    if(req.body.good){
        req.session.score += 1
        console.log(req.session.score)
        res.send(200)
    }else{
        res.send(400)
    }
});

app.get('/results', (req,res) => {
    res.send(req.session.score)
    req.session.score = 0
});



