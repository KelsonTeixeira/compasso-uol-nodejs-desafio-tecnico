const { ClientsDB } = require('../database/database.config');

class UpdateClientService {
  execute(id, newName){
    return new Promise((resolve, reject) => {
      ClientsDB.update({_id: id}, {$set: {name: newName}}, (error, numUpdated) => {
        if(error) reject(error);
        resolve (numUpdated);
      });
    });
  }
}

module.exports = UpdateClientService;