const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const PORT = 3500
const blogRoutes = require('./routes/blogRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
// express app
const app = express();

// connect to mongodb


const dbURI = "mongodb+srv://mongotut:testing123@cluster0.5arertl.mongodb.net/CompanyDB?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(PORT, () => {
        console.log('Server is running on port '+PORT)
        console.log('connected to the DB')
    }))
    .catch(err => console.log(err))
// register view engine

app.set('view engine', 'ejs')


// middleware static files to add styles

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))



app.use((req, res, next) => {
    console.log('in the next middleware');
    next()
  });

// router for home 
app.get('/', (req, res) => {
    res.redirect('/blogs')
})

// Router for about
app.get('/about', (req, res) => {
    const about = [
        {content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et unde provident officia asperiores aperiam, laboriosam sit id mollitia! Nulla reiciendis quos maxime nihil. Commodi eligendi iste unde velit. Similique, provident.'},
        {content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et unde provident officia asperiores aperiam, laboriosam sit id mollitia! Nulla reiciendis quos maxime nihil. Commodi eligendi iste unde velit. Similique, provident.'},
        {content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et unde provident officia asperiores aperiam, laboriosam sit id mollitia! Nulla reiciendis quos maxime nihil. Commodi eligendi iste unde velit. Similique, provident.'},
    ]
    res.render('about', {title: 'About', about});
    
})

app.get('/about-us', (req, res) => {
    res.redirect('/about')
})

app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'})
})

app.get('/contact-us', (req, res) => {
    res.redirect('contact')
})

// blog routes
app.use('/blogs', blogRoutes)


app.get('/reviews', (req, res) => {
    res.redirect('reviewIndex')
})

// review routes
app.use('/reviewIndex', reviewRoutes)


// 404 page
app.use((req, res) => {
    res.render('404', {title: '404'}); 
    
})

