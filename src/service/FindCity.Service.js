const { CitiesDB } = require('../database/database.config');

class FindCityService {
  findByName(cityName){
    return new Promise((resolve, reject) =>{
      CitiesDB.find({name: cityName}, (error, city) => {
        if(error) reject(error);
        resolve(city);
      })
    });
  }

  findBySate(stateName){
    return new Promise((resolve, reject) =>{
      CitiesDB.find({state: stateName}, (error, city) => {
        if(error) reject(error);
        resolve(city);
      })
    });
  }
}

module.exports = FindCityService;