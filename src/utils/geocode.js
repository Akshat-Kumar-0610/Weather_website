const request=require('request')
const geocodeapikey = 'pk.eyJ1IjoiYWtzaGF0ODgxMCIsImEiOiJja3FzNTc5MWMxbW13MnRtaGlybWZzbDljIn0.c1NVtiAqbjg_tFp7OunjEg'

const getGeocode = (city, callback)=>{
    city = encodeURIComponent(city)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${city}.json?access_token=${geocodeapikey}`
    request({url:url,json:true},(error, response)=>{
        if(error){
            callback('There was a problem connecting to internet!',undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search.',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                city:response.body.features[0].text,
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports={
    getGeocode:getGeocode,
}