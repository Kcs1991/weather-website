const request= require('request')


const forecast=((lat={}, lon={}, loc,  callback)=>{
    

    const url=`http://api.weatherstack.com/current?access_key=57fb5859d3d3f12c499e95301f50efc0&query=${lat},${lon}`

    request({url, json: true}, (error, response)=>{
    
        const{temperature} = response.body.current

       if(error){
           callback("please check system network","")
       } else if (response.body.error){
           callback("Please Provide appropriate location","")
       } else {
           callback("",`You searched for ${loc}. the temperature here is ${temperature}. The weather here is ${response.body.current.weather_descriptions}`)
       }
    })
})

module.exports = forecast