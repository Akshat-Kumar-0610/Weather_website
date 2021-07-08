const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast =require('./utils/forecast.js')

const app = express()

const viewsdir = path.join(__dirname,'../templates/views')
const partialsdir = path.join(__dirname,'../templates/partials')

app.use(express.static(path.join(__dirname,'../public')))
app.set('view engine', 'hbs')
app.set('views', viewsdir)
hbs.registerPartials(partialsdir)
app.get('',(req,res)=>{
    res.render('index',{
        title:"weather",
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title:'help',
        helptext :'lorem ipsum'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'about'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.location){
        return res.send({error:'Enter location you want to look weather for!'})
    }
    geocode.getGeocode(req.query.location, (error,{latitude,longitude,location,city}={})=>{
        if (error){
            return res.send({error})
        }

        forecast.getForecast(city, (error, forecastdata) => {
            if (error){
                return res.send({error})
            }
            return res.send({
                latitude:latitude,
                longitude: longitude,
                location: location,
                city: city,
                forecasttext: forecastdata.forecastText,
                temperature : forecastdata.temperature
            })
          })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('help404',{
        error:'Help page you are looking for not found'
    })
})
app.get('*',(req,res)=>{
    res.render('generic404',{
        title:'Error: 404',
        error:'Error 404: page does not exist!'
    })
})
app.listen(3000,()=>{
    title:'Error: 404',
    console.log('server is up.')
})