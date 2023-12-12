import { useState, useEffect } from 'react';

function Network() {
    // Online state
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
        setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
        window.removeEventListener('online', handleStatusChange);
        window.removeEventListener('offline', handleStatusChange);
    };
    }, [isOnline]);

    return (
        <>
            {isOnline ? (
                <span className='online'>You are online</span>
            ) : (
                <span className='offline' color="red.500">❌ Check Network: You are offline</span>
            )}
        </>
    );
}

export default Network;