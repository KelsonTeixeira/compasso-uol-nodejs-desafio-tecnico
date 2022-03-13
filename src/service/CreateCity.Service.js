const { CitiesDB } = require('../database/database.config');
const { v4: uuidv4 } = require('uuid');

class CreateCityService {

  execute(name, state){
    const city = {
      name,
      state,
      _id: uuidv4()
    }

    return new Promise((resolve, reject) =>{
      CitiesDB.insert(city, (error, newCity) => {
        if(error) reject(error);
        resolve(newCity);
      });
    });
  }
}

module.exports = CreateCityService;