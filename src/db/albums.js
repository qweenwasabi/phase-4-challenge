const connect = require('./connect')

const getAll = () => {
  return connect.query('SELECT * FROM albums', [])
    .catch((error) => {
      console.log('\nError in getAll query \n')
      throw error
    })
}

const getByTitle = (title) => {
  return connect.one('SELECT * FROM albums WHERE title = $1', [title])
    .catch((error) => {
      console.log('\nError in getByTitle query\n')
      throw error
    })
}

const getReviews = (title) => {
  return connect.query(`
    SELECT reviews.id, content, created_at, title, artist, username
    FROM reviews
    RIGHT OUTER JOIN albums ON albums.id = reviews.album_id
    LEFT OUTER JOIN users ON users.id = reviews.user_id
    WHERE albums.title = $1
    ORDER BY id DESC`,
    [title])
    .catch((error) => {
      console.log('\nError in getReviews query\n')
      throw error
    })
}

const getThreeReviews = () => {
  return connect.query(`
    SELECT reviews.id, content, created_at, title, artist, username
    FROM reviews
    LEFT OUTER JOIN albums ON albums.id = reviews.album_id
    LEFT OUTER JOIN users ON users.id = reviews.user_id
    ORDER BY id DESC
    LIMIT 3`,
    [])
    .catch((error) => {
      console.log('\nError in getThreeReviews query\n')
      throw error
    })
}

module.exports = {
  getAll,
  getByTitle,
  getReviews,
  getThreeReviews
}
