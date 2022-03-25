const request = require('request')

const geoCode = ((address, callback)=>{
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoia2NiczE5OTEiLCJhIjoiY2wwa2VkczE3MGpobTNicXRnejR2YmdobCJ9.2x5Cybu42ryHzIzYSujqAg`

    request({url, json:true}, (error, {body})=>{
      
      if(error){
        callback('Error unable to find location services', "")
      } else if(body.features.length===0){
          callback('please provide proper location name', "")
      } else {  
        // callback("",`latitude is ${latitude} longitude is ${longitude} for location ${response.body.features[0].place_name}`)
        callback('',{
          lat: body.features[0].center[1],
          lon: body.features[0].center[0],
          loc: body.features[0].place_name
        })    
      }  
    })
  })

  module.exports=geoCode