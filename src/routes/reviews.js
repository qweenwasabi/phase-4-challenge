const albums = require('../db/albums')
const reviews = require('../db/reviews')
const router = require('express').Router()

router.route('/:title/reviews/new')
  .get((req, res) => {
    albums.getByTitle(req.params.title)
      .then(album => res.render('new_review', {album}))
      .catch(error => res.status(500).render('error', {error}))
  })
  .post((req, res) => {
    reviews.create(req.session.user.id, req.body.album_id, req.body.content)
      .then(res.redirect(`/albums/${req.params.title}`))
      .catch(error => res.status(500).render('error', {error}))
  })

router.delete('/reviews/:id/delete', (req, res) => {
  reviews.remove(req.params.id)
    .then(() => res.json({message: 'SUCCESSULLY REMOVED!'}))
    .catch(error => res.status(500).render('error', {error}))
})

module.exports = router
