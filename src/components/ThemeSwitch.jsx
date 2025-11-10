import React from 'react';
import {useTheme} from "../hooks/useTheme.js";

const ThemeSwitch = () => {

    const [theme, toggleTheme] = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-2xl"
        >
            {theme === 'dark' ? '🌞' : '🌜'}
        </button>
    );
};

export default ThemeSwitch;