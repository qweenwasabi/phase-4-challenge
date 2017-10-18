const pgp = require('pg-promise')()

const dbName = 'vinyl'

const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const connect = pgp(connectionString)

module.exports = connect
