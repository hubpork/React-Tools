import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import axios from 'axios';

const AareGuru = () => {
    // State variables
    const [temperature, setTemperature] = useState(null); // Stores the temperature
    const [location, setLocation] = useState(null); // Stores the location
    const [coordinates, setCoordinates] = useState<{ lat: number, lon: number }>({ lat: 0, lon: 0 }); // Stores the coordinates
    const [temperature_text, setTemperatureText] = useState(null); // Stores the temperature text
    const [timestring, setTimestring] = useState(null); // Stores the time string
    

    // Fetches data from the API when the component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Fetches data from the AareGuru API
    const fetchData = async () => {
        try {
        const response = await axios.get(
            'https://aareguru.existenz.ch/v2018/current?city=olten&app=aareguru&version=1.0.42'
        );
        const { aare } = response.data;

        // Updates the state variables with the fetched data
        setTemperature(aare.temperature);
        setLocation(aare.location);
        setTemperatureText(aare.temperature_text);
        setTimestring(aare.timestring);
        setCoordinates({
            lat: aare.coordinates?.lat || 0,
            lon: aare.coordinates?.lon || 0
        });

        
        } catch (error) {
            console.error('Error fetching Aare data:', error);
        }
    };

    
    return (
        
        <section className="grid mt-0 stack stack--small print:hidden">
            <div className="grid">
                <h2 className="mb-2 text-4xl font-bold">Aare Guru</h2>
                <p>Goal: Data fetch of the river Aare.</p>
            </div>
    
            <div className="grid md:grid-cols-2 gap-4 lg:mb-4">
                <div className="p-3 rounded dark:bg-stone-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                    <div className="block text-teal-700 dark:text-teal-500 mb-3 text-2xl font-bold">Aare Temperature</div>
                    <div className="font-medium text-2xl">{temperature}°C</div>
                    <div className="font-medium text-xl">{temperature_text}</div>
                </div>
                <div className="p-3 rounded dark:bg-stone-700 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                    <div className="block  text-teal-700 dark:text-teal-500 mb-3 text-2xl font-bold">{timestring}</div>
                    <div className="font-medium text-2xl">{location}</div>
                    <div className="font-medium text-xl">{coordinates.lat}° / {coordinates.lon}°</div>
                </div>
            </div>
            <MapContainer center={[47.344610, 7.906079]} zoom={15} scrollWheelZoom={false} style={{ aspectRatio: 16/9 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[47.344610, 7.906079]}></Marker>
            </MapContainer>
            
        </section>
        
    );
};

export default AareGuru;