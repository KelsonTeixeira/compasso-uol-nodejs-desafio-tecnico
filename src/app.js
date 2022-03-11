const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const citiesRoutes = require('./routes/cities.routes');
const clientsRoutes = require('./routes/clients.routes');

app.use('/cities', citiesRoutes);

app.use('/clients', clientsRoutes);

module.exports = app;