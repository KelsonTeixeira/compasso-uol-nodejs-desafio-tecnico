const clientsRoutes = require('express').Router();

const CreateClientService = require('../service/CreateClient.Service');
const FindClientService = require('../service/FindClient.Service');
const DeleteClientService = require('../service/DeleteClient.Service');
const UpdateClientService = require('../service/UpdateClient.Service');

const findClientByIDMiddleware = require('../service/Clients.Middleware');

const createClientService = new CreateClientService;
const findClientService = new FindClientService;
const deleteClientService = new DeleteClientService;
const updateClientService = new UpdateClientService;
 
clientsRoutes.post('/', async (request, response) => {
  const { name, sex, birth, city } = request.body;
  
  const newClient = await createClientService.execute(name, sex, birth, city);

  return response.status(201).json(newClient);
});

clientsRoutes.get('/name/', async (request, response) => {
  const { name } = request.headers;

  const clientList = await findClientService.findByName(name);

  if(clientList.length === 0){
    return response.status(404).json({ error: 'Client not found!'});
  }

  return response.status(200).json(clientList);
});

clientsRoutes.get('/', findClientByIDMiddleware, (request, response) => {
  const { client } = request;
  return response.status(200).json(client);
});

clientsRoutes.delete('/', findClientByIDMiddleware, async (request, response) => {
  const { client } = request;

  await deleteClientService.execute(client._id);

  return response.status(204).send();
});

clientsRoutes.patch('/', findClientByIDMiddleware, async (request, response) => {
  const { client } = request;
  const { name } = request.body;

  await updateClientService.execute(client._id, name);

  return response.status(200).send();
})

module.exports = clientsRoutes;