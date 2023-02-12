import React from 'react';

import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <div className={classes.headerWrap}>
                <h1>DICT.OK | Web Speech API</h1>
            </div>
        </header>
    );
};

export default Header;
