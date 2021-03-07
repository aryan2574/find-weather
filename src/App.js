import React, { useState } from 'react';
const api = {
  key: "7d4ef5d23648c7c62acd3ccfa1a0a30b",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    // let months = [
    //   "January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let days = [
    //   "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    // ];

    //Get us a day out the days array
    // let day = days[d.getDay()]; 

    //returns a number between 0 and 6
    // let date = d.getDate(); 

    //return a number between 0 and 11
    // let month = months[d.getMonth()];

    //Gives full year eg. 2020
    // let year = d.getFullYear(); 

    // return `${day} ${date} ${month} ${year}` //template string

    let date = String(new window.Date());
    date = date.slice(3, 15);
    return `${date}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") ?
        ((weather.main.temp < 16)
          ? 'app cold' : 'app')
        : 'app'}>
      <main>
        <div className='search-box'>
          <input
            className='search-bar'
            type='Text'
            placeholder='Search'
            onChange={
              e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°c
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')
        }
      </main>
    </div>
  );
}
export default App;