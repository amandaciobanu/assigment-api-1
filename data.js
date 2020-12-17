const users = {};

const addUser = (firstName, lastName, email, password) => {
  users[email.trim().toLowerCase()] = {
    firstName,
    lastName,
    password
  }
}

const getUser = (email) => {
  return users[email.trim().toLowerCase()];
}

export {
  addUser,
  getUser
}