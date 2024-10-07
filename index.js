const express = require('express');
const app = express();
const path = require('path');
const fetch = require('node-fetch');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const key = '6e366b3ae34dc6bdd56794422668a907';
let city = 'Tartu';

app.get('/', function (req, res) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let description = data.weather[0].description
            let city = data.name
            let temp = Math.round(parseFloat(data.main.temp)-273.15)
            res.render('index', {
                description: description,
                city: city,
                temp: temp
            });
        })
  
});

app.listen(3000);