
function findClientByID(request, response, next){
  const { clientID } = request.params;

  const client = clients.find(client => client.id === clientID);

  if(!client) return response.status(404).json({ error: 'Client not found!'});

  request.client = client;

  next();
}

module.exports = findClientByID;