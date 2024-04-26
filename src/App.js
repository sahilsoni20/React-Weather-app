import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [description, setDescription] = useState('None');
  const [country, setCountry] = useState('')
  const [location, setLocation] = useState('Search by city');
  const [iconUrl, setIconUrl] = useState('https://static.vecteezy.com/system/resources/previews/016/283/869/original/happy-cloud-emoji-vector.jpg');

  let api_key = "68f69ca47d6bd73c018a290fc0b2d642";

  const search = async () => {
    const element = document.getElementsByClassName('city-input');

    if (element[0].value === '') {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      setHumidity(data.main.humidity);
      setTemperature(Math.round(data.main.temp));
      setVisibility(data.visibility);
      setWindSpeed(data.wind.speed);
      setLocation(data.name);
      setCountry(data.sys.country)
      setDescription(data.weather[0].main)
      setIconUrl(`http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    } catch (error) {
      alert('No city found with this name');
    }
  }

  const getFormattedDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    return `${dayOfWeek}, ${dayOfMonth} ${month} ${year}`
  }

  return (
    <div className='weather-container'>
      <div className='box-left'>
        <span>{getFormattedDate()}</span>
        <p className='degree'>{temperature}&deg;c</p>
      </div>
      <div className='box-right'>
        <img src={iconUrl} className='img' alt='Weather icon' />
        <h1>{description}</h1>
        <div className='search'>
          <input type='text' placeholder='Search any city' className='city-input' />
          <i className="fas fa-search" onClick={() => { search() }}></i>
        </div>
        <p className='country'>{location}, {country}</p>
        <hr />
        <p className='weather-details'>Temperature: <span>{temperature}&deg;C</span></p>
        <hr />
        <p className='weather-details'>Humidity: <span>{humidity}%</span></p>
        <hr />
        <p className='weather-details'>Visibility: <span>{visibility} mi</span></p>
        <hr />
        <p className='weather-details'>Wind Speed: <span>{windSpeed} Km/h</span></p>
      </div>
    </div>
  );
}

export default WeatherApp;
