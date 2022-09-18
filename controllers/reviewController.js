const Review = require('../models/review');

const review_index = (req, res) => {
    Review.find().sort({createdAt: -1})
        .then(result => {
            res.render('reviews/index', {title: 'Reviews', reviews: result})
        })
        .catch(err => {
            console.log(err)
        })
}


const review_create_get = (req, res) => {
    res.render('reviews/create', {title: 'Create'})
}

const review_create_post = (req, res) => {
    const review = new Review(req.body)

    review.save()
        .then(result => {
            res.redirect('/reviewindex')
        })
        .catch(err => {
            console.log(err)
        })
}

const review_delete = (req, res) => {
    const id = req.params.id
    Review.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/reviews')
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    review_index,
    review_create_get,
    review_create_post,
    review_delete
}