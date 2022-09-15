const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    review: {
        type: String,
        require: true
    },
}, {timestamps: true})

const Review = mongoose.model('Reviews', reviewSchema)
module.exports = Review;