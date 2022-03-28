const hbs = require('hbs')
const path = require('path')
const express = require('express')
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//path for express config
const pathdata = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialsPath)

app.use(express.static(pathdata))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'karan Savla'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'help page',
        name: 'karan Savla'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: "about page",
        name: "Karan"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide address'
        })
    }
    geoCode(req.query.address, (error, {lat, lon, loc} = {})=>{
            if(error){
                return res.send({error})
            }
            forecast(lat, lon,loc, (error, forecastdata)=>{
                if(error){
                    return res.send({error})
                }
                res.send({
                    forecast: forecastdata,
                    loc,
                    address: req.query.address
                })
            })
    })
})



//     res.send({
//         forecast: 'clear',
//         location: 'Kandivali',
//         address: req.query.address,
//     })


// app.get('/products',(req, res)=>{
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search'
//         })
//     }else
//     res.send({
//         products:[]
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Karan Savla'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage:'Page Not Found',
        name: 'Karan Savla'
    })
})


app.listen(port,()=>{
    console.log(`Server is up on port${port}`)
})