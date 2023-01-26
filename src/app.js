import express from 'express';
import path from 'path';
import url from 'url'
import hbs from 'hbs';
import foreCast from '../utils/forecast.js';

const app = express();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirPath = path.join(__dirname,'../public');
const templatesPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

// Setup handlebar engine and view location
app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);

//setup static directory to serve static files
app.use(express.static(publicDirPath));
 
app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        content:'Get your weather forcast!',
        name:'Bulkesh Kumawat',
        footer: 'Footer Home page'
    })
});
app.get('/about', (req, res) => {
    res.render('about',{
        title:'About',
        content:'This is the about page content',
        name:'Bulkesh Kumawat',
        footer: 'Footer About page'
    })
});
app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        content:'This is the help page content',
        name:'Bulkesh Kumawat',
        footer: 'Footer Help page'
    })
});
app.get('/weather', (req, res) => { 
    if(!req.query.lat || !req.query.long){
        return res.send({
            error: 'Please provide the Lat, Long of the location',
        });
    }
    foreCast(req.query.lat, req.query.long, (error, response) =>{
        if(error){
            return res.send({error});
        }
          res.send({
            weather:response.weather, 
            location:response.location,
            lat:req.query.lat, 
            long:req.query.long,
           
        }); 

        /*  res.render('weather',{
            title:'Home page',
            content:'Below is your weather update : ',
            weather:response.weather, 
            location:response.location,
            lat:req.query.lat, 
            long:req.query.long,
            name:'Bulkesh Kumawat',
            footer: 'Footer Home page'
        })  */
    })
    
});

app.get('*', (req, res) => {
    res.send('My 404 page.');
});

app.listen(3000, (req, res) => {
    console.log('server running on 3000');
})