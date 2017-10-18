const albumsData = require('../db/albums.js')
const moment = require('moment')
const router = require('express').Router()

router.get('/:id', (req, res) => {
  const title = req.params.title
  albumsData.getReviews(title)
    .then((reviews) => {
      res.render('album', {reviews, moment})
    })
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
