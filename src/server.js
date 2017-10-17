const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const simpleSess = require('connect-pg-simple')(session)

const port = process.env.PORT || 3000

const app = express()

app.set('view engine', 'ejs')
         app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))

const newSess = {
  store: new simpleSess({
    conString: 'postgres://localhost:5432/vinyl',
  }),
  name:'session',
  secret:'password',
  cookie: {maxAge: 3600000},
  resave: false,
  saveUninitialized: false,
}
app.use(session(newSess))

app.use('/', require('.routes'))

app.use((req, res) => {
  res.status(404).render('not_found')
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
