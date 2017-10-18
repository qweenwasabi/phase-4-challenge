const connect = require('./connect')

const getAll = () => {
  return connect.query('SELECT * FROM albums', [])
    .catch((error) => {
      console.log('\nError in getAll query \n')
      throw error
    })
}

const getById = (id) => {
  return connect.one('SELECT * FROM albums WHERE id = $1', [id])
    .catch((error) => {
      console.log('\nError in getById query\n')
      throw error
    })
}

const getReviews = (title) => {
  return connect.query(`
    SELECT reviews.id, content, created_at, title, artist, username
    FROM reviews
    RIGHT OUTER JOIN albums ON albums.id = reviews.album
    LEFT OUTER JOIN users ON users.id = reviews.author
    WHERE albums.title = $1
    ORDER BY id DESC`,
    [title])
    .catch((error) => {
      console.log('\nError in getReviews query\n')
      throw error
    })
}
module.exports = {
  getAll,
  getById,
  getReviews
}
