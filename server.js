'use strict';
const express = require('express');

// Constants
const PORT = process.env.PORT || 8080;

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello Load Otus!');
});

app.get('/secret', (req, res) => {
    res.send('Secrets');
  });

app.post('/', function (req, res) {
    res.send('POST request to the homepage');
  });

app.get('/random-number', function (req, res) {
    res.type('text/plain');
    var randomeNumber = Math.random();
    res.send(randomeNumber.toString());
});

// CONFIG
app.listen(PORT);
console.log(`Running on this port ${PORT}`);
