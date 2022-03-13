const request = require('supertest');
const app = require('../src/app');
const { validate } = require('uuid');


describe("Cities", () => {
  it('should be able to create a new city', async () => {
    city = {
      name: "Brasília",
      state: "Distrito Federal"
    }

    const cityResponse = await request(app)
    .post('/cities')
    .send(city);

    expect(cityResponse.status).toBe(201);
    expect(cityResponse.body).toMatchObject(city);
    expect(validate(cityResponse.body._id)).toBeTruthy();
    
  });

  it('should be able to consult a city by name', async () => {
    city = {
      name: "Brasília",
      state: "Distrito Federal"
    }

    const createCity = await request(app)
    .post('/cities')
    .send(city)
    .expect(201);

    const cityResponse = await request(app)
    .get(`/cities/${createCity.body.name}`);

    expect(cityResponse.status).toBe(200);
    expect(cityResponse.body).toContainEqual(createCity.body);
  });

  it('should not be able to consult a non existing city', async () => {
    city = {
      name: "Brasília",
      state: "Distrito Federal"
    }

    await request(app)
    .post('/cities')
    .send(city)
    .expect(201);

    const cityResponse = await request(app)
    .get('/cities/non-existing-city');

    expect(cityResponse.body.error).toBeTruthy();
  });

  it('should be able to consult city by state', async () => {
    city = {
      name: "Brasília",
      state: "Distrito Federal"
    }

    const createCity = await request(app)
    .post('/cities')
    .send(city)
    .expect(201);

    const stateResponse = await request(app)
    .get(`/cities/state/${createCity.body.state}`);

    expect(stateResponse.status).toBe(200);
    expect(stateResponse.body).toContainEqual(createCity.body);
  });

  it('should not be able to consult a non existing city by state', async () => {
    city = {
      name: "Brasília",
      state: "Distrito Federal"
    }

    await request(app)
    .post('/cities')
    .send(city)
    .expect(201);

    const stateResponse = await request(app)
    .get(`/cities/state/non-existing-state`);

    expect(stateResponse.body.error).toBeTruthy();
  });

});