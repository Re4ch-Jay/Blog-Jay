const express = require('express');
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const PORT = 3000 ||  3500;


// connect to mongodb

const dbURI = "mongodb+srv://mongotut:testing123@cluster0.5arertl.mongodb.net/CompanyDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => {
        console.log('Server is running on port '+PORT)
        console.log('connected to the DB')
    }))
    .catch(err => console.log(err))
//---------------------------------------

// --------view engine----------

app.set('view engine', 'ejs')


//-------------Midlleware-----------------

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use((req, res, next) => next());

// ------------------------------------------------


//--------------------Routes-----------------------
// router for home 
app.get('/', (req, res) => res.redirect('/blogs'))
// blog routes
app.use('/blogs', blogRoutes)
app.get('/reviews', (req, res) => res.redirect('reviewIndex'))
// review routes
app.use('/reviewIndex', reviewRoutes)
// Router for about
app.get('/about', (req, res) => res.render('about', {title: 'About'}))
app.get('/about-us', (req, res) => res.redirect('/about'))
// 404 page
app.use((req, res) => res.render('404', {title: '404'}))

