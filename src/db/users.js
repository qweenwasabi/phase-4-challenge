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

const findByName = (username) => {
  return connect.one(`
    SELECT * FROM users
    WHERE username = $1`,
    [username])
    .catch((error) => {
      console.log('\nError in findByName query\n')
      throw error
    })
}

const getReviews = (username) => {
  return connect.query(`
    SELECT reviews.id, content, created_at, title, artist, username, email, joined_at
    FROM reviews
    LEFT OUTER JOIN albums ON albums.id = reviews.album
    RIGHT OUTER JOIN users ON users.id = reviews.author
    WHERE users.username = $1
    ORDER BY id DESC`,
    [username])
    .catch((error) => {
      console.log('\nError in getReviews query\n')
      throw error
    })
}

module.exports = {
  newUser,
  findByName,
  getReviews,
}
