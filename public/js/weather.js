console.log("Client side weather.js");



const weatherForm = document.querySelector('form');
const errorElem = document.querySelector('#error');
const weatherElem = document.querySelector('#weather');
const locationElem = document.querySelector('#location');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherElem.innerHTML = '';
    locationElem.innerHTML = '';
    error.innerHTML = 'Loading....';
    const lat = e.target.elements['lat'].value;
    const long = e.target.elements['long'].value;
    //http://localhost:3000/weather?lat=26.92&long=75.74'
    if (!lat || !long) {
        error.innerHTML = "Please provide valid Lat, Long.";
        return;
    }
    const url = `http://localhost:3000/weather?lat=${lat}&long=${long}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                error.innerHTML = data.error.message;
            } else {
                error.innerHTML = '';
                weatherElem.innerHTML = "Weather: "+data.weather;
                locationElem.innerHTML = "Location: "+data.location;
               
            }
        });
    })
})
