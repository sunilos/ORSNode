import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer
            style={{
                background: 'linear-gradient(to bottom right, grey, black)',
                color: 'white', // Changed to 'white' for better visibility
                padding: '-5px', // Reduced padding for lower height
                textAlign: 'center',
                position: 'fixed',
                bottom: 0,
                width: '100%',
            }}
        >
            <div>
                <p>&copy; {new Date().getFullYear()} Copyrights RAYS Technologies</p>

            </div>
        </footer>
    );
};

export default Footer;
