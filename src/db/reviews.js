const connect = require('./connect')

const create = (user_id, album_id, content) => {
  return connect.none(`
    INSERT INTO reviews (user_id, album_id, content)
    VALUES ($1, $2, $3)`,
    [user_id, album_id, content])
    .catch((error) => {
      console.log('\nError in createReview query\n')
      throw error
    })
}

const remove = (id) => {
  return connect.none('DELETE FROM reviews WHERE id = $1', [id])
    .catch((error) => {
      console.log('\nError in deleteReview query\n')
      throw error
    })
}

const getByUsername = (username) => {
  return connect.query(`
    SELECT reviews.id, content, created_at, title, artist, username, email, joined_at
    FROM reviews
    LEFT OUTER JOIN albums ON albums.id = reviews.album_id
    RIGHT OUTER JOIN users ON users.id = reviews.user_id
    WHERE users.username = $1
    ORDER BY id DESC`,
    [username])
    .catch((error) => {
      console.log('\nError in getByUsername query\n')
      throw error
    })
}

const getByTitle = (title) => {
  return connect.query(`
    SELECT reviews.id, content, created_at, title, artist, username
    FROM reviews
    RIGHT OUTER JOIN albums ON albums.id = reviews.album_id
    LEFT OUTER JOIN users ON users.id = reviews.user_id
    WHERE albums.title = $1
    ORDER BY id DESC`,
    [title])
    .catch((error) => {
      console.log('\nError in getByTitle query\n')
      throw error
    })
}

module.exports = {
  create,
  remove,
  getByUsername,
  getByTitle
}
