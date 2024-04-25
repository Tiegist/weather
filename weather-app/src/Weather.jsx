import React, { useState } from 'react';

const WeatherApp = () => {
  const [country, setCountry] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const fetchWeatherData = () => {
    const apiKey = '6b3b4e84b43968028c31918c15506443';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch weather data');
        }
      })
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(error){
        setError(null);
    }
    fetchWeatherData();
  };

  const handleUnitChange = () => {
    setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const handleReset = () => {
    setCountry('');
    setWeatherData(null);
    setError(null);
  };

  return (
    <div className='weathercontainer'>
      <h1 className='h1'>Weather App</h1>
      <form className='formdiv' onSubmit={handleSubmit}>
        <label className='countryentry'>
          <input className='countryinput' type="text" aria-controls='matches' placeholder='Enter country' value={country} onChange={handleCountryChange} />
        </label>
        <button className='submitbtn' type="submit">Get Weather</button>
        {weatherData && (
          <button className='resetbtn' type="button" onClick={handleReset}>
            Reset
          </button>
        )}
      </form>
      {error && <div className='errormsg'>Error: {error}</div>}
      {weatherData && (
        <div>
          <h2 className='h2'>{weatherData.name}</h2>
          <p className='datapara'>
            Temperature: {unit === 'celsius' ? Math.round(weatherData.main.temp - 273.15) + '°C' : Math.round((weatherData.main.temp - 273.15) * 9/5 + 32) + '°F'}
          </p>
          <p className='datapara'>Humidity: {weatherData.main.humidity}%</p>
          <p className='datapara'>Description: {weatherData.weather[0].description}</p>
          <p className='datapara'>Wind Speed: {weatherData.wind.speed} m/s</p>
          {weatherData.weather[0].icon && (
            <img className='weatherimg' src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
          )}
        </div>
      )}
      <button className='unitchangebtn' onClick={handleUnitChange}>
        {unit === 'celsius' ? 'Switch to Fahrenheit' : 'Switch to Celsius'}
      </button>
    </div>
  );
};

export default WeatherApp;