const request = require('request');


const forecast = ({letitute, longitute}, callback ) => {
    
const url ="http://api.weatherstack.com/current?access_key=612878dc386f23ff8d9d88a7d61ae915&query="+ letitute +","+encodeURIComponent(longitute)+"";
    
    request({url, json: true},(err, {body}) => {
        if(err){
            callback(`unable to connect from server`, undefined);
        }else{
            callback(undefined, `It is current ${body.current.temperature} degree out. There is a ${body.current.feelslike} % chance of rain. `  );

        };
    } );
};


module.exports =  forecast;