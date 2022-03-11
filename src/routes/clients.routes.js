const clientsRoutes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { AgeFromDate } = require('age-calculator');


const clients = [];

function findClientByID(request, response, next){
  const { clientID } = request.params;

  const client = clients.find(client => client.id === clientID);

  if(!client) return response.status(404).json({ error: 'Client not found!'});

  request.client = client;

  next();
}

clientsRoutes.post('/', (request, response) => {
  const { name, sex, birth, city } = request.body;

  clientBirth = new Date(birth);

  const clientAge = new AgeFromDate(clientBirth);

  const client = {
    name, 
    sex, 
    birth: clientBirth, 
    city,
    id: uuidv4(),
    age: clientAge._age
  }

  clients.push(client);

  return response.status(201).json(client);
})

clientsRoutes.get('/:name', (request, response) => {
  const { name } = request.params;

  const client = clients.find(client => client.name === name);

  if(!client) return response.status(404).json({ error: 'Client not found!'});

  return response.status(200).json(client);
})

clientsRoutes.get('/id/:clientID', findClientByID, (request, response) => {
  const { client } = request;
  return response.status(200).json(client);
});

clientsRoutes.delete('/id/:clientID', findClientByID, (request, response) => {
  const { client } = request;

  const clientIndex = clients.findIndex(item => item === client);

  clients.splice(clientIndex, 1);

  return response.status(204).send();
});

clientsRoutes.patch('/id/:clientID', findClientByID, (request, response) => {
  const { client } = request;
  const { name } = request.body;

  client.name = name;

  return response.status(200).send();
})

module.exports = clientsRoutes;