const path = require('path')
const express = require('express')
const hbs = require('hbs');
const geoCode = require('../utils/geocode');
const forecast = require('../utils/weather');


const app = express()

const PORT = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ninja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ninja'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ninja'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: `You must provide address`
        });
    }
    const address = req.query.address;
    geoCode (address, (err, {letitude, longitute} ={})=> {
        if(err){
    
            return res.send(err);
        }
        
        forecast({letitude, longitute}, (err, data)=>{
            if(err){
    
                return res.send(err);
            }
            res.send({address, data});
        })
    
    })
    
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ninja',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ninja',
        errorMessage: 'Page not found.'
    })
})

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}.`)
})