const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')

router.get('/', reviewController.review_index)

router.post('/', reviewController.review_create_post)

router.get('/create', reviewController.review_create_get)

router.get('/:id', reviewController.review_delete)

router.delete('/:id', reviewController.review_delete)

module.exports = router;
