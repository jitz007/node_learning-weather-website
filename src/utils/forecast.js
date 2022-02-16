// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request = require('postman-request');


const forecast = (longitude,latitude, callback) => {
     const url = 'http://api.weatherstack.com/current?access_key=3e848e12a7d87b86eb002a59dcce1c81&query='+longitude+','+latitude
     
    request({url,json:true},(error,{body})=>{
       
    if(error){
       callback('Unable to reach weather service !' ,undefined)
    }else if (body.error){
        callback('Unable to find requested location !',undefined)
    }else {
        callback(undefined, body.current.weather_descriptions[0]+'. It is currently :' + body.current.temperature + 'degree but it feels like  ' + body.current.feelslike + ' degree outside today. Current Humidity = '+ body.current.humidity )
    }

    
})
}

module.exports = forecast