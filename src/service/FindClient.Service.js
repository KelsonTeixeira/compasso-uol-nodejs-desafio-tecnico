const { ClientsDB } = require('../database/database.config');

class FindClientService {
  findByName(clientName){
    return new Promise((resolve, reject) => {
      ClientsDB.find({name: clientName},  (error, client) => {
        if(error) reject(error);
        resolve (client);
      });
    });
  }

  findById(id){
    return new Promise((resolve, reject) => {
      ClientsDB.findOne({_id: id},  (error, client) => {
        if(error) reject(error);
        resolve (client);
      });
    });
  }
}

module.exports = FindClientService;