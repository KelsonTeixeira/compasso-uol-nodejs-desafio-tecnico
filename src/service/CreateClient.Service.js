const { ClientsDB } = require('../database/database.config');
const { v4: uuidv4 } = require('uuid');
const { AgeFromDate } = require('age-calculator');

class CreateClientService {
  execute(name, sex, birth, city){
    const clientBirth = new Date(birth);

    const clientAge = new AgeFromDate(clientBirth);

    const client = {
      name, 
      sex, 
      birth: clientBirth, 
      city,
      _id: uuidv4(),
      age: clientAge._age
    }

    return new Promise((resolve, reject) => {
      ClientsDB.insert(client,  (error, newClient) => {
        if(error) reject(error);
        resolve (newClient);
      });
    });

  }
  
}

module.exports = CreateClientService;