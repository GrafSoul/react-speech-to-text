import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className={classes.footer}>
            <p>
                © {year} | DICT.OK | Created by Dmitriy Zatulovskiy |{' '}
                <a
                    href="https://github.com/GrafSoul/react-speech-to-text"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub
                </a>
            </p>
        </footer>
    );
};

export default Footer;
