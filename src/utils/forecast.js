const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=48377d0b919d1872e4e0c44538dce7f8&query=${latitude},${longitude}`
    request({ url, json: true }, (error, {body: response}) => {
        if (error) {
            callback('Unable to connect to Weather', undefined)
        } else if (response.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `${response.current.weather_descriptions[0] ? response.current.weather_descriptions[0] + '. ' : '' }It is currently ${response.current.temperature} degrees out. It feels like ${response.current.feelslike} degrees.`)
        }
    })
}

module.exports = forecast