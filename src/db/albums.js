const connect = require('
./connect')

const getAll = () => {
  return connect.query('SELECT * FROM albums, []')
    .catch((error) => {
      console.log('\nError in getAll query \n')
      throw error
    })
}

module.exports = {
  getAll,
}
