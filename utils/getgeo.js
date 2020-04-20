const request = require('request')
const getgeo = (address , callBack) =>{
 const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibmFiaW5iIiwiYSI6ImNrOTFkZXpzNzAyeTEzbXFlY3Ayc245NjAifQ.LSqUyatlCzXpVmOCU2qjkQ&limit=1`; 
 request({ url, json: true }, (error, {body}) => {
        if(error){
            console.log('chk err')
            return callBack(error , undefined)
        }else if(body.message){
            return callBack(body.message , undefined)
        }else if(body.features.length==0){
            return callBack(` ` , undefined)
        }         
        return callBack(undefined , {
           long:   body.features[0].center[0] ,
            lat : body.features[0].center[1]
        })
    })
    
}

module.exports = getgeo;