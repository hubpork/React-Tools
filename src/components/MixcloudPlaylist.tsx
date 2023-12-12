import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./mixcloud.css";

interface Show {
    key: string;
    name: string;
    url: string;
    pictures: {
        large: string;
    };
}

const MixcloudPlaylist = () => {
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
        <section className="grid mt-0 stack stack--small print:hidden">
            <div className="grid">
                <h2 className="mb-2 text-4xl font-bold">Mixcloud List</h2>
                <p>Goal: Data fetch of my mixcloud channel.</p>
            </div>
            <div className="mc grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 gap-4">
                {shows.map((show) => (
                    <div key={show.key}>
                        <a href={show.url} target="_blank" rel="noopener noreferrer">
                            <div className="relative vinyl-jacket">
                                <img
                                    className="block shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
                                    src={show.pictures.large}
                                    alt={show.name}
                                />
                                <div className="vinyl-wrapper">  
                                    <div className="vinyl"><div className="vinyl-inlay" style={{ backgroundImage: `url(${show.pictures.large})` }}></div></div>
                                </div>
                            </div>
                            <h3 className="font-semibold text-base my-2">{show.name}</h3>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MixcloudPlaylist;
