const Datastore = require('nedb');

const ClientsDB = new Datastore('src/database/clients.db');

const CitiesDB = new Datastore('src/database/cities.db');

ClientsDB.loadDatabase();

CitiesDB.loadDatabase();

module.exports = { 
  ClientsDB, 
  CitiesDB 
}