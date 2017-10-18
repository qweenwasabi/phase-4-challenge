const albumsData = require('../db/albums.js')
const router = require('express').Router()

router.get('/:id', (req, res) => {
  albumsData.getById(req.params.id)
    .then(album => res.render('album', {album}))
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
