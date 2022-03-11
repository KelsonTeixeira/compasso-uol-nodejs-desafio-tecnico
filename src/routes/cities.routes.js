citiesRoutes = require('express').Router();

const cities = [];

citiesRoutes.post('/', (request, response) => {
  const { name, state } = request.body; 

  cityObject = {
    name,
    state
  }

  cities.push(cityObject);

  return response.status(201).json(cityObject);
});

citiesRoutes.get('/:name', (request, response) => {
  const { name } = request.params;

  const city = cities.find(city => city.name === name);

  if(!city) return response.status(404).json({ error: 'City not found!'});

  return response.status(200).json(city);
});

citiesRoutes.get('/state/:stateName', (request, response) => {
  const { stateName } = request.params;

  const city = cities.find(city => city.state === stateName);

  if(!city) return response.status(404).json({ error: 'City not Found'});

  return response.status(200).json(city);
})

module.exports = citiesRoutes;