import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';
import image from '../assets/back.jpg';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);

    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    };

    const search = async (location = '') => {
        if(location.trim() === "") {
            alert("Enter a city name");
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e&units=metric`;
            const response = await fetch(url);
            const data = await response.json();
            
            if (data.cod !== 200) { 
                alert(`Error: ${data.message}`);
                setWeatherData(false);
                return;
            }

            const icon = allIcons[data.weather?.[0]?.icon] || clear_icon;
            setWeatherData({
                humidity: data.main?.humidity ?? 'N/A',
                windSpeed: data.wind?.speed ?? 'N/A',
                temperature: Math.floor(data.main?.temp) ?? 'N/A',
                location: data.name ?? 'Unknown',
                icon: icon,
            });
        } catch (error) {
            console.error("Error fetching weather data", error);
            alert("Failed to fetch weather data. Please try again later.");
        }
    };

    useEffect(() => {
        search("Kakkanad");
    }, []);

    return (
        <>
            <div className="weather">
                <div className='container'>
                    <img src={image} alt="no image" />
                </div>
                <div>
                    <div className="search-bar">
                        <input ref={inputRef} type="text" placeholder="search" />
                        <img src={search_icon} alt="search" onClick={() => search(inputRef.current.value)} />
                    </div>
                    {weatherData && (
                    <div>
                        <img src={weatherData.icon} alt="weather-icon" className="weather-icon" />
                        <p className="temperature">{weatherData.temperature}°C</p>
                        <p className="location">{weatherData.location}</p>
                        <div className="weather-data">
                            <div className="col">
                                <img src={humidity_icon} alt="humidity-icon" />
                                <div>
                                    <p>{weatherData.humidity}%</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <img src={wind_icon} alt="wind-icon" />
                                <div>
                                    <p>{weatherData.windSpeed} km/h</p>
                                    <span>Wind speed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Weather;