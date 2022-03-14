const { faker } = require('@faker-js/faker');

class GenerateFakeCities {
  execute(){
    const city = {
      name: faker.address.cityName(),
      state: faker.address.state()
    };

    return city;
  }
}

module.exports = GenerateFakeCities;