import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import {
    Flex,
    Heading,
    Text,
    Box
} from "@chakra-ui/react"
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
        <div>
            <Flex gap={4} mt={4} maxW={{ base: '100%', xl: '75%' }} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
                <Flex 
                    textAlign={'center'}
                    width={'100%'}
                    flexDirection={'column'} 
                    boxShadow='sm' 
                    p={5}
                    rounded='md' 
                    borderRadius='md'
                    border='1px' 
                    borderColor='gray.200'
                > 
                    <Heading as='h4' size='lg'>Aare Temperature</Heading>
                    <Heading as='h2' size='2xl' my={3}>{temperature}°C</Heading>
                    <Text>{temperature_text}</Text>
                </Flex>
                <Flex 
                    textAlign={'center'}
                    width={'100%'}
                    flexDirection={'column'} 
                    boxShadow='sm' 
                    p={5}
                    rounded='md' 
                    borderRadius='md'
                    border='1px' 
                    borderColor='gray.200'
                > 
                    <Heading as='h4' size='lg'>{timestring}</Heading>
                    <Heading as='h2' size='2xl' my={3}>{location}</Heading>
                    <Text>{coordinates.lat}° / {coordinates.lon}°</Text>
                </Flex>
            </Flex>
            <Box 
                my={4}
                maxW={{ base: '100%', xl: '75%' }}                     
                boxShadow='sm' 
                rounded='md' 
                borderRadius='md'
                border='1px' 
                borderColor='gray.200'
                overflow='hidden'
            >
                <MapContainer center={[47.344610, 7.906079]} zoom={15} scrollWheelZoom={false} style={{ aspectRatio: 16/9 }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[47.344610, 7.906079]}></Marker>
                </MapContainer>
            </Box>
        </div>
    );
};

export default AareGuru;