var express = require('express');
var http = require('http');

var app = express();

const PORT = 5001;

app.get("/", (req, res) => res.send('hello'))

app.listen(PORT)