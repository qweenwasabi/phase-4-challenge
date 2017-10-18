const crypt = require('../utilities/bcrypt')
const usersData = require('../db/users.js')
const moment = require ('moment')
const router = require ('express').Router()

router.route('/signup')
  .get ((req, res) => res.render ('signup'))
  .post ((req, res) => {
    const username = req.body.username
    crypt.encrypt(req.body.password)
    .then((password) => {
      usersData.newUser(username, req.body.email, password)
        .then(() => {
          req.session.username = username
          req.session.save(res.redirect('/'))
        })
    })
    .catch(error => res.status(500).render('error', {error}))
  })

router.route('/signin')
  .get((req, res) => res.render ('signin'))
  .post((req, res) => {
    const username = req.body.username
    usersData.findName(username)
    .then((user) => {
      crypt.compare(req.body.password, user.password)
        .then((boolean) => {
          if (boolean) {
          req.session.username = username
          req.session.save(res.redirect('/'))
        } else res.redirect('/signin')
    })
  })
    .catch(error => res.status(500).render('error', {error}))
  })

  router.get('/logout', (req, res) => {
    req.session.destroy(res.redirect('/'))
  })

  module.exports = router
