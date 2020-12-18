const MongoClient = require('mongodb').MongoClient;

require("dotenv").config();

const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_COLLECTION;
const url = process.env.MONGO_URL;

const addUser = async (firstName, lastName, email, password) => {
  const client = await MongoClient.connect(url,  { useUnifiedTopology: true });

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const user = {
      email: email.trim().toLowerCase(),
      firstName: firstName,
      lastName: lastName,
      password: password
    };

    await collection.insertOne(user);
    return user;
  } catch (e) {
    console.error(e);
    return null;
  }
  finally {
    await client.close();
  }
}

const getUser = async (email) => {
  const client = await MongoClient.connect(url,  { useUnifiedTopology: true });

  try {
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const user = await collection.findOne({email: email.trim().toLowerCase()});
    return user;

  } catch (e) {
    console.error(e);
    return null;
  }
  finally {
    await client.close();
  }
}

module.exports = {
  addUser,
  getUser
}