const request = require('supertest');
const app = require('../src/app');
const { validate } = require('uuid');
const { AgeFromDate } = require('age-calculator');

const GenerateFakeClients = require('./GenerateFakeClients');

const generateFakeClients = new GenerateFakeClients;


describe('Clients', () => {
  it('should be able to create a new client', async () => {
    const client = generateFakeClients.execute();

    clientBirth = new Date(client.birth);

    const clientAge = new AgeFromDate(clientBirth);

    const clientResponse = await request(app)
    .post('/clients')
    .send(client);

    expect(clientResponse.status).toBe(201);
    expect(clientResponse.body).toMatchObject({
      ...client,
      birth: clientBirth.toISOString(),
      age: clientAge._age
    });
    expect(validate(clientResponse.body._id)).toBeTruthy();
  });

  it('should be able to consult a client by name', async () => {
    const client = generateFakeClients.execute();

    const createClient = await request(app)
    .post('/clients/')
    .send(client)
    .expect(201);

    const clientConsult = await request(app)
    .get(`/clients/name/?name=${createClient.body.name}`);

    expect(clientConsult.status).toBe(200);
    expect(clientConsult.body).toContainEqual(createClient.body);
  });

  it('should not be able to consult a client by a non existing name', async () => {
    const client = generateFakeClients.execute();

    await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsult = await request(app)
    .get(`/clients/name/?name=non-exixting-name`);

    expect(clientConsult.body.error).toBeTruthy();
  });

  it('should be able to consult a client by id', async () => {
    const client = generateFakeClients.execute();

    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsultById = await request(app)
    .get('/clients/')
    .set('id', createClient.body._id);

    expect(clientConsultById.status).toBe(200);
    expect(clientConsultById.body).toMatchObject(createClient.body);
  });

  it('should not be able to consult a client by a non existing id', async () => {
    const client = generateFakeClients.execute(); 

    await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsultById = await request(app)
    .get('/clients/')
    .set('id', 'non-existing-id');

    expect(clientConsultById.body.error).toBeTruthy();
  });

  it('should be able to delete a client', async () => {
    const client = generateFakeClients.execute();

    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    await request(app)
    .delete('/clients/')
    .set('id', createClient.body._id)
    .expect(204);

    const clientConsultById = await request(app)
    .get('/clients/')
    .set('id', createClient.body._id);

    expect(clientConsultById.body.error).toBeTruthy();
  });

  it('should not be able to delete a client by a non existing id', async () => {
    const client = generateFakeClients.execute();
    
    await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const deletedClient = await request(app)
    .delete('/clients/')
    .set('id', 'non-existing-id');

    expect(deletedClient.body.error).toBeTruthy();
  });

  it('should be able to update client name', async () => {
    const client = generateFakeClients.execute();

    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const newName = 'Novo nome';

    await request(app)
    .patch('/clients/')
    .set('id', createClient.body._id)
    .send({name: newName})
    .expect(200);

    const updatedClient = await request(app)
    .get('/clients/')
    .set('id', createClient.body._id);

    expect(updatedClient.body).toMatchObject({
      ...createClient.body,
      name: newName
    });
  });

});