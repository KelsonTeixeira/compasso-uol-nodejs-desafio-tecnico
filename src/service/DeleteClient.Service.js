const { ClientsDB } = require('../database/database.config');

class DeleteClientService {
  execute(id){
    return new Promise((resolve, reject) => {
      ClientsDB.remove({_id: id},  (error, numRemoved) => {
        if(error) reject(error);
        resolve (numRemoved);
      });
    });
  }
}

module.exports = DeleteClientService;