import {useEffect, useState} from "react";

export const useTheme = () => {

    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem("theme"); //check the theme of the browser
        if(localTheme){
            return localTheme;
        }
        //returning the theme of the browser
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const root = document.documentElement; //getting <html> tag

        if(theme === "dark")
            root.classList.add("dark");
        else
            root.classList.remove("dark");


        localStorage.setItem("theme", theme); //add the user chiuse to localStorage

    }, [theme]) //run every time theme changes

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    //returning the theme and the function to toggle it
    return [theme, toggleTheme];

}