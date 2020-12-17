const users = {
  "amanda@ciobanu.org" : {
    firstName: "Amanda",
    lastName: "Ciobanu",
    password: "123"
  }
};

const addUser = () => {

}

const getUser = (email) => {
  return users[email.trim().toLowerCase()];
}

export {
  addUser,
  getUser
}