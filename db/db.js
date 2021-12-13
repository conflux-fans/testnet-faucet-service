const { MongoClient } = require('mongodb');

// Database Name
const dbName = 'conflux-test';
const users = 'users';

const state = {
  db: null,
  client: null,
};

function getDB() {
  return state.db;
}

function getUsers() {
  return state.db.collection(users);
}

function getClient() {
  return state.client;
}

function setIndexes() {
  return Promise.resolve()
    .then(() => getUsers().createIndex({ account: 1 }));
}

function connect(url) {
  return Promise.resolve()
    .then(() => {
      if (!state.client) {
        state.client = new MongoClient(url, { useNewUrlParser: true });
      }
      if (!state.db) {
        return state.client.connect()
          .then(() => {
            state.db = state.client.db(dbName);
          });
      }
      return Promise.resolve();
    });
}

module.exports = {
  getDB,
  getClient,
  setIndexes,
  getUsers,
  connect,
};
