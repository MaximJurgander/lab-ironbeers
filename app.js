const { response } = require('express');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

hbs.registerPartials(path.join(__dirname, 'views/partials'));
// ...
app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:
// ...

// Add the route handlers here:
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  const beerData = punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render('beers', {beerData: beersFromApi})
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  const randomBeer = punkAPI
    .getRandom()
    .then(randFromAPI => {
      console.log(randFromAPI);
      res.render('random-beer', { randomBeer: randFromAPI })
    }).catch(error => console.log(error));
});

app.listen(5500, () => console.log('🏃‍ on port 5500'));
