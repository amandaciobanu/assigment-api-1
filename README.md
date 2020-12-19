# Sample REST API
This project is used by the sample React App (https://github.com/amandaciobanu/assigment-react-1).

The service uses `Express` for REST and`MongoDB` to store the user details. The passwords are stored as SHA hashes for security.

# Setup
To start the service you will need to create a `.env` file with the following contents:
```env
PORT=...
MONGO_DB=...
MONGO_COLLECTION=...
MONGO_URL=...
```

Then, run the following:
```sh
npm install
npm run start
```

The API is hosted on Heroku at https://assigment-api-1.herokuapp.com.

**Enjoy!**
