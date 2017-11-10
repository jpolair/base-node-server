const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    next();
    console.log(log)
    fs.appendFile('server.log', log + '\n' , (err) => {
        if (err) {
            console.log('error: ',err)
        }
    })
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'home Page',
        message: 'welcome to the home page'
    });
});

app.get('/about', (req, res)=> {
    res.render('about.hbs', {
        pageTitle: 'The About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send( {
        error: 455,
        message: 'grosse erreur'
    });
});

app.listen(3000, () => {
    console.log('le serveur est sur le port 3000');
});