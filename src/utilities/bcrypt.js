const bcrypt = require ('bcrypt')
const salt = 10

const encrypt = (password) => {
  return bcrypt.hash(password, salt)
}

const compare = (password, hash) => {
  return bcrypt.compare(password, hash)
}

module.exports = {
  encrypt,
  compare
}   
