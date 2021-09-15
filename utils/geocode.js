const request = require('request');

const geoCode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmluamExOHMiLCJhIjoiY2t0anhzazkzMWc3MTMwcGVzeWpudmkyNCJ9.xBywVvczD5vY4rPaJ78C1A&limit=1";

    request({  url, json: true}, (err, {body}) => {
        if(err) {
            callback('unable to connect to location service', undefined);

        } else{
            callback(undefined, {
                longitute : body.features[0].center[0],
                letitude : body.features[0].center[1]
            });
        }

    })

}
module.exports = geoCode;