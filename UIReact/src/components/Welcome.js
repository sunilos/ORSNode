// Welcome.js
import React from 'react';

const Welcome = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome Online Result System</h1>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh', // Height of the container
        backgroundColor: '', // Optional: semi-transparent background
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '2.5rem',
        color: 'red', // Changed color to red
    },
};

export default Welcome;
