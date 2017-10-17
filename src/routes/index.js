const router = require ('express').Router()

const setLocals = (req, res, next) => {
  let loggedIn = false
  let usernamne = null
  if (req.session.username){
    loggedIn = true
    username = req.session.username
  }
  res.locals = {loggedIn, username}
  next()
}

router.use(setLocals)
router.use('/', require('./notauthorized'))

module.exports = router
