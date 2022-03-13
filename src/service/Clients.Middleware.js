const FindClientService = require('./FindClient.Service');

const findClientService = new FindClientService;


async function findClientByIDMiddleware(request, response, next){
  const { id } = request.headers;

  const client = await findClientService.findById(id);

  if(!client) return response.status(404).json({ error: 'Client not found!'});

  request.client = client;

  next();
}

module.exports = findClientByIDMiddleware;