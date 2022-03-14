citiesRoutes = require('express').Router();

const CreateCityService = require('../service/CreateCity.Service');
const FindCityService = require('../service/FindCity.Service');

const createCityService = new CreateCityService;
const findCityService = new FindCityService;


citiesRoutes.post('/', async (request, response) => {
  const { name, state } = request.body; 

  const newCity = await createCityService.execute(name, state);

  return response.status(201).json(newCity);
});

citiesRoutes.get('/name', async (request, response) => {
  const { name } = request.query;

  const cityList = await findCityService.findByName(name);

  if(cityList.length === 0){
    return response.status(404).json({ error: 'City not found!'});
  } 

  return response.status(200).json(cityList);
});

citiesRoutes.get('/state/', async (request, response) => {
  const { name } = request.query;

  const cityList = await findCityService.findBySate(name);

  if(cityList.length === 0) {
    return response.status(404).json({ error: 'City not Found'});
  }

  return response.status(200).json(cityList);
})

module.exports = citiesRoutes;