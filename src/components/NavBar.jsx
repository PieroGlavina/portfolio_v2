import { useState } from "react";
import { navList } from "../costants/index.js";
import { Menu, X } from "lucide-react";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import ThemeSwitch from "./ThemeSwitch.jsx";

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    useGSAP(() => {
        if(menuOpen)
            gsap.fromTo("#mobile-menu", { opacity: 0, y: -50 }, { opacity: 1, y: 0, duration: 0.5 })
        else
            gsap.fromTo("#mobile-menu", { opacity: 1, y: 0 }, { opacity: 0, y: -50, duration: 0.5 })

    }, [menuOpen])

    return (
        <section className="w-full">
            <nav className="px-6 py-4 flex items-center justify-between dark:bg-darkBg">

                <a href="/" className="cursor-pointer">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-electrolize hover:text-gray-400 dark:text-darkTxt dark:hover:text-darkHoverTxt transition-all">
                        Piero Glavina
                    </h1>
                </a>

                <div className="flex gap-10">
                    <ThemeSwitch />

                    <div className="hidden md:flex items-center space-x-10">
                        {navList.map((nav, i) => (
                            <a href={nav.href} key={i} className="navBar-text">
                                // {nav.title}
                            </a>
                        ))}
                    </div>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-lightTxt hover:text-lightHoverTxt dark:text-darkTxt dark:hover:text-darkHoverTxt transition-all"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {menuOpen && (
                <div id="mobile-menu" className="md:hidden dark:bg-darkBg">
                    <div className="flex flex-col items-center py-4 space-y-4">
                        {navList.map((nav, i) => (
                            <a
                                href={nav.href}
                                key={i}
                                className="navBar-text"
                                onClick={() => setMenuOpen(false)}
                            >
                                [ {nav.title} ]
                            </a>
                        ))}
                    </div>

                    <div className="w-3/4 mx-auto h-[1.5px] bg-lightTxt dark:bg-darkTxt"/>


                </div>
            )}
        </section>
    );
};

export default NavBar;