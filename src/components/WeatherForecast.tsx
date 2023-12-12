import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from 'react-icons/wi';


// Interface for weather data received from the API
interface WeatherData {
    name: string;
    main: {
        temp: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
}

// Interface for daily forecast data
interface DailyForecast {
    date: string;
    temperature: number;
    weather: string;
    icon: string;
}

const WeatherForecast = () => {

    // State variables
    const [forecastData, setForecastData] = useState<WeatherData | null>(null);
    const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
    // YOUR_API_CODE in .env
    const apiKey = process.env.REACT_APP_API_KEY; // API key stored in environment variable
    const [city, setCity] = useState('Olten'); // Default city
    const [searchCity, setSearchCity] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch weather data and forecast data from the API
        const fetchData = async () => {
            try {
                const [weatherResponse, forecastResponse] = await Promise.all([
                    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`),
                    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
                ]);
    
                setForecastData(weatherResponse.data);
                const dailyData = forecastResponse.data.list.filter((item: any) => {
                    const date = new Date(item.dt_txt.split(' ')[0]);
                    const today = new Date();
                    return date >= today && item.dt_txt.includes('12:00:00');
                });
                const formattedData = dailyData.map((item: any) => ({
                    date: item.dt_txt.split(' ')[0],
                    temperature: Math.round(item.main.temp - 273.15),
                    weather: item.weather[0].description,
                    icon: item.weather[0].icon,
                }));
                setDailyForecast(formattedData);
                setError(null); // clear any previous error
            } catch (error) {
                console.log(error);
                setError('There was an error fetching the weather data. Please check your API key and try again.');
            }
        };
    
        fetchData();
    }, [apiKey, city]);
    
    // Event handler for the search form submission
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCity(searchCity);
        setSearchCity('');
    };

    // Helper function to convert temperature from Kelvin to Celsius
    const convertKelvinToCelsius = (kelvin: number) => {
        return Math.round(kelvin - 273.15);
    };

     // Helper function to get the appropriate weather icon based on the icon code
    const getWeatherIcon = (iconCode: string) => {
        switch (iconCode) {
            case '01d':
                return <WiDaySunny />;
            case '01n':
                return <WiDaySunny />;
            case '02d':
                return <WiCloudy />;
            case '02n':
                return <WiCloudy />;
            case '03d':
            case '03n':
                return <WiCloudy />;
            case '04d':
            case '04n':
                return <WiCloudy />;
            case '09d':
            case '09n':
                return <WiRain />;
            case '10d':
            case '10n':
                return <WiRain />;
            case '11d':
            case '11n':
                return <WiRain />;
            case '13d':
            case '13n':
                return <WiSnow />;
            case '50d':
            case '50n':
                return <WiCloudy />;
            default:
                return null;
        }
    };

    // Helper function to format the date string to a readable format
    const getFormattedDate = (date: string) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    // Helper function to get a recommendation based on the temperature and weather description
    const getRecommendation = (temperature: number, weather: string) => {
        if (weather.includes('storm')) {
            return 'There is a storm expected. Stay indoors and take necessary precautions.';
        } else if (temperature < 0) {
            return 'It\'s going to be below freezing. Bundle up and stay warm.';
        } else if (temperature > 25) {
            return 'It\'s going to be hot! Stay hydrated and wear light clothing.';
        } else if (temperature < 10) {
            return 'It\'s going to be cold! Bundle up and wear warm layers.';
        } else {
            return 'The weather will be pleasant. Enjoy your day!';
        }
    };

    return (

        <section className="grid mt-0 stack stack--small print:hidden">
            <div className="grid">
                <h2 className="mb-2 text-4xl font-bold">Weather Forecast</h2>
                <p>Goal: Data fetch of weather forecast. Get an API Key at openweathermap.org</p>
            </div>
            {error && <p className="text-red-500 my-3">{error}</p>}
            <form onSubmit={handleSearch}>
                <div className="flex gap-4">
                    <input
                        className="block w-full p-3 text-black bg-white border border-gray-300 appearance-none rounded placeholder:text-gray-400 focus:border-slate-500 focus:outline-none focus:ring-slate-500"
                        type="text"
                        placeholder="Enter a city"
                        value={searchCity}
                        onChange={e => setSearchCity(e.target.value)}
                    />
                    <button type="submit" className="shrink hover:brightness-110 font-bold py-3 px-6 rounded bg-teal-700 shadow-lg text-white">Search</button>
                </div>
            </form>

            {forecastData ? (
                <div className="grid md:grid-cols-2 gap-4 lg:mb-4">
                    <div className="text-center px-3 pb-0 pt-5 rounded dark:bg-stone-700 flex flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                        <div className="block text-teal-700 dark:text-teal-500 mb-3 text-5xl font-bold">{convertKelvinToCelsius(forecastData.main.temp)}°C</div>
                        <div className="font-medium text-xl">{getFormattedDate(new Date().toISOString().split('T')[0])}</div>
                        <div className="text-l my-7">{getRecommendation(convertKelvinToCelsius(forecastData.main.temp), forecastData.weather[0].description)}</div>
                    </div>
                    <div className="text-center px-3 pb-0 pt-5 rounded dark:bg-stone-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                        <div className="block text-teal-700 dark:text-teal-500 mb-3 text-5xl font-bold">{forecastData.name}</div>
                        <div className="font-medium text-xl">{forecastData.weather[0].description}</div>
                        <div className="text-8xl mx-auto inline-flex">{getWeatherIcon(forecastData.weather[0].icon)}</div>
                    </div>
                </div>

            ) : (
                <div>skeleton</div>
            )}
            <div>
                <h3 className="mb-3 text-2xl font-bold">Week Forecast</h3>
                {dailyForecast.length > 0 ? (
                    <div className="grid md:grid-cols-4 gap-4 lg:mb-4">
                        {dailyForecast.map((forecast, index) => (
                            <div  key={index} className="text-center p-3 rounded dark:bg-stone-700 flex flex-col shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                                <div className="block text-neutral-500 dark:text-white font-light">{getFormattedDate(forecast.date)}</div>
                                <div className="font-bold text-3xl text-teal-700 dark:text-teal-500 my-3">{forecast.temperature}°C</div>
                                <div className="font-bold">{forecast.weather}</div>
                                <div className="text-7xl mx-auto inline-flex">{getWeatherIcon(forecast.icon)}</div>
                            </div>
                        ))}

                    </div>
                ) : (
                    <div>skeleton</div>
                )}
            </div>
        </section>
    );
};

export default WeatherForecast;
