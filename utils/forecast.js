import request from "request";
import chalk  from "chalk";

//const url = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=26.9231&lon=75.7453&appid=b1b15e88fa797225412429c1c50c122a1&units=metric';

const foreCast = (lat,long,callback) => {
    console.log(lat,long);
    const url = 'https://pro.openweathermap.org/data/2.5/forecast/hourly?lat='+lat+'&lon='+long+'&appid=b1b15e88fa797225412429c1c50c122a1&units=metric';
    request({ url, json: true },(error,{body}) =>{
        console.log("error: " , error);
        console.log("body: " , body);
        if(error){
            callback('Unable to connect to weather service!', undefined);
        }else if(body.error){
            callback('Unable to find location', undefined);
        }else{
            if(!body.list){
                callback( body, undefined);
            }else{
                const temp  = body.list[0].main.temp;
                const rain = body.list[0].weather[0].description;
                const weather = `It is currently ${temp} degree out. The weather has ${rain}.`;
                const location = body.city.name+', '+body.city.country;
                callback( undefined, {weather,location});
            }
            
        }
    } )
}

export default foreCast;
