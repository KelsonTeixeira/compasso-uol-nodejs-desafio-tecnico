const request = require('supertest');
const app = require('../src/app');
const { validate } = require('uuid');
const { AgeFromDate } = require('age-calculator');

describe('Clients', () => {
  it('should be able to create a new client', async () => {
    const client ={
      name: 'Kelson André Venâncio Teixeira',
      sex: 'male',
      birth: '1997-04-09',
      city: 'Brasília'
    }

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
    expect(validate(clientResponse.body.id)).toBeTruthy();
  });

  it('should be able to consult a client by name', async () => {
    const client ={
      name: 'Virgínia Lopes Teixeira',
      sex: 'female',
      birth: '1995-07-27',
      city: 'Brasília'
    }
    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsult = await request(app)
    .get(`/clients/${createClient.body.name}`);

    expect(clientConsult.status).toBe(200);
    expect(clientConsult.body).toMatchObject(createClient.body);
  });

  it('should not be able to consult a client by a non existing name', async () => {
    const client ={
      name: 'Virgínia Lopes Teixeira',
      sex: 'female',
      birth: '1995-07-27',
      city: 'Brasília'
    }
    await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsult = await request(app)
    .get('/clients/non-existing-name');

    expect(clientConsult.body.error).toBeTruthy();
  });

  it('should be able to consult a client by id', async () => {
    const client ={
      name: 'Joaquim Teixeira',
      sex: 'male',
      birth: '1965-06-05',
      city: 'Brasília'
    }
    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsultById = await request(app)
    .get(`/clients/id/${createClient.body.id}`);

    expect(clientConsultById.status).toBe(200);
    expect(clientConsultById.body).toMatchObject(createClient.body);
  });

  it('should not be able to consult a client by a non existing id', async () => {
    const client ={
      name: 'Joaquim Teixeira',
      sex: 'male',
      birth: '1965-06-05',
      city: 'Brasília'
    }
    await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const clientConsultById = await request(app)
    .get('/clients/id/no-existing-id');

    expect(clientConsultById.body.error).toBeTruthy();
  });

  it('should be able to delete a client', async () => {
    const client ={
      name: 'Geni da Silva',
      sex: 'female',
      birth: '1972-08-10',
      city: 'Brasília'
    }
    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    await request(app)
    .delete(`/clients/id/${createClient.body.id}`)
    .expect(204);

    const clientConsultById = await request(app)
    .get(`/clients/id/${createClient.body.id}`);

    expect(clientConsultById.body.error).toBeTruthy();
  });

  it('should not be able to delete a client by a non existing id', async () => {
    const client = {
      name: 'Geni da Silva',
      sex: 'female',
      birth: '1972-08-10',
      city: 'Brasília'
    }
    await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const deletedClient = await request(app)
    .delete('/clients/id/non-existing-id');

    expect(deletedClient.body.error).toBeTruthy();
  });

  it('should be able to update client name', async () => {
    const client = {
      name: 'Kely Teixeira',
      sex: 'female',
      birth: '1994-10-07',
      city: 'Brasília'
    }

    const createClient = await request(app)
    .post('/clients')
    .send(client)
    .expect(201);

    const newName = 'Kely Caroline';

    await request(app)
    .patch(`/clients/id/${createClient.body.id}`)
    .send({name: newName})
    .expect(200);

    const updatedClient = await request(app)
    .get(`/clients/id/${createClient.body.id}`);

    expect(updatedClient.body).toMatchObject({
      ...createClient.body,
      name: newName
    });
  });

});