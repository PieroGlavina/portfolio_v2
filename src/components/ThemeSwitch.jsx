import React from 'react';
import {useTheme} from "../hooks/useTheme.js";

const ThemeSwitch = () => {

    const [theme, toggleTheme] = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="navBar-text border-3 border-gray-300 px-5 py-1 hover:border-gray-600"
        >
            {theme === 'dark' ? 'dark' : 'light'}
        </button>
    );
};

export default ThemeSwitch;