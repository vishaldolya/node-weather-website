const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
app.use(express.static(path.join(__dirname, '../public')))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Quantum Baba'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Creator',
        name: 'Quantum Baba'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message',
        title: 'Help',
        name: 'Quantum Baba'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'You must provide an address.'})
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast( latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })            
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return es.send({ error: 'You must provide a search term.'})
    }
    console.log(req.query)
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Quantum Baba'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Quantum Baba'
    })
})

app.listen(port, () => console.log('Server is up on port:' + port))