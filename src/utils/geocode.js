const request = require('postman-request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlzaGFsZG9seWEiLCJhIjoiY2tiODVsNmVuMDB5NTJ5bzhnNGJ3eW13YyJ9.OrxZ-xuMScdbPqPARRbVbw&limit=1`

    request({ url, json: true}, (error, {body: response}) => {
        if (error) {
            callback('Unable to connect to GeoCoding', undefined)
        } else if (!response.features[0]) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: response.features[0].center[1],
                longitude: response.features[0].center[0],
                location: response.features[0].place_name
            })
        }
    })
}

module.exports = geocode