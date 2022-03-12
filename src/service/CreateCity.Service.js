const { CitiesDB } = require('../database/database.config');

class CreateCityService {

  execute(name, state){
    const city = {
      name,
      state
    }

    CitiesDB.insert(city, (error, newCity) => {
      if(error) throw new Error("Something got wrong!");

      return newCity;
    })
  }
}

module.exports = CreateCityService;