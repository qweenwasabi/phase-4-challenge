const connect = require('./connect')

const newUser = (username, email, password) => {
  return connect.one(`
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [username, email, password])
    .catch((error) => {
      console.log('\nError in newUser query\n')
      throw error
    })
}

const findName = (username) => {
  return connect.one(`
    SELECT * FROM users
    WHERE username = $1`,
    [username])
    .catch((error) => {
      console.log('\nError in findName query\n')
      throw error
    })
}

module.exports = {
  newUser,
  findName
}
