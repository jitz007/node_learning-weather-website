const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

//console.log(__dirname)


const app = express()

//Define paths for Express config
const publicDirPath = path.join(__dirname,'../public' )
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Sreejith P S'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About Me',
        name:'Sreejith P S'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help Page',
        helpText: 'Do not worry help is on the way..stay calm ..peace out',
        name:'Sreejith P S'
    })
})

app.get('/weather',(req,res) => {
    const searchLocation = req.query.address

    if (!searchLocation) {
    return res.send ({error: 'Please provide address'
        })
    }

    geocode(searchLocation,(error,{latitude,longitude,location} ={}) => {
    
        if (error){
            return res.send ({error})
        }
           forecast(latitude,longitude,  (error, forecastData) => {
           
            if (error) {
               return res.send ({error})
            }
    
            res.send({
                forecast: forecastData,
                location: location,
                name:'Sreejith P S'
            })
          })
    })
    
})

app.get('/help/*',(re,res) => {
    res.render('error',{
        title: 'Error Page',
        errorMessage: 'Help article not found',
        name:'Sreejith P S'
    })
})

app.get('*',(req,res) => {
    res.render('error',{
        title: 'Error Page',
        errorMessage: 'My custom 404 error Page',
        name:'Sreejith P S'
    })
})

    app.listen(3000,() => {
        console.log('Server is up on port 3000.')
})