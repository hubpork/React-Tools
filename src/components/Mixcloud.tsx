import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    SimpleGrid,
    Card,
    CardBody,
    Image,
    Stack,
    Heading,
} from "@chakra-ui/react"

interface Show {
    key: string;
    name: string;
    url: string;
    pictures: {
        large: string;
    };
}

const ShowList = () => {
    const [shows, setShows] = useState<Show[]>([]);

    useEffect(() => {
        const username = 'porkhead';
        const showsUrl = `https://api.mixcloud.com/${username}/cloudcasts/?limit=6`;

        axios
            .get(showsUrl)
            .then((response) => {
            const showData = response.data.data as Show[];
            setShows(showData);
            })
            .catch((error) => {
            console.error(error);
            });
        }, []);

        return (
        <div>
            <h2>Show List of Funkologie</h2>
            <SimpleGrid columns={[2,3,6]} spacing={3} py={3}>
                {shows.map((show) => (
                    <div key={show.key}>
                        <a href={show.url} target="_blank" rel="noopener noreferrer">
                            <Card
                                width="100%"
                                height="100%"
                                direction={'column'}
                                overflow='hidden'
                                rounded='md'
                                boxShadow='sm'
                            >
                                <Image
                                    objectFit='cover'
                                    src={show.pictures.large}
                                    alt={show.name}
                                />

                                <Stack>
                                    <CardBody p={3} height="100%">
                                        <Heading as='h3' size='xs' textTransform='uppercase' textAlign='center'>
                                            {show.name}
                                        </Heading>
                                    </CardBody>
                                </Stack>
                            </Card>
                        </a>
                    </div>
                ))}
            </SimpleGrid>
        </div>
    );
};

export default ShowList;
