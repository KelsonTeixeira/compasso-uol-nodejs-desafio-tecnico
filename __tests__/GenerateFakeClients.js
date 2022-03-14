const { faker } = require('@faker-js/faker');

class GenerateFakeClients {
  execute(){
    const client = {
      name: faker.name.findName(),
      sex: faker.name.gender(),
      birth: '1995-07-27',
      city: faker.address.cityName()
    };

    return client;
  }
}

module.exports = GenerateFakeClients;