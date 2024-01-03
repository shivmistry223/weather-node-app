const request = require('request')

const forecast = (address, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=283c433f0482863f0c052fe8a806b32f&query=' + encodeURIComponent(address)    
    request({url:url, json: true}, (error, response) => {
        if (error){
            callback('Unable to Connect Weather API!')
        }
        else if (response.body.error){
            callback('Can not find place')
        }
        else {
            callback(undefined, response.body)
        }
    });
}

module.exports = forecast