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

module.exports = {
  getAll,
  getById
}
