const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')

const app = express()

//define path for Express config
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

const port = process.env.PORT || 3000

// to serve dynamic template we are setting view engine to hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialPath)

// to serve static template
app.use(express.static(staticPath))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Shiv Mistry',
        title: 'Weather App'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Shiv Mistry',
        title: 'About App'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error:'Provide Location!'
        })
    }

    forecast(req.query.search, (error, data) => {

        if(error){
            return res.send({
                error,
            })
        }

        res.send({
            forecast: data.current.weather_descriptions[0],
            location: data.location.name + ', '+ data.location.region + ', ' + data.location.country,
            temp: data.current.temperature,
            feelsLike: data.current.feelslike,
            time : data.location.localtime.split(" ")[1],
            date : new Date(data.location.localtime.split(" ")[0]).toDateString(),
            icon: data.current.weather_icons[0],
            windSpeed : data.current.wind_speed,
            humidity : data.current.humidity,
            precip : data.current.precip,
        })
    })

})

app.get('*', (req, res) => {
    res.render('errorPage',{
        name:'Shiv Mistry',
        title:'Error'
    })
})


app.listen(port, () => {
    console.log("Server Started on " + port)
})
