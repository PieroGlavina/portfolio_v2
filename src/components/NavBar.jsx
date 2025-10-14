import { useState } from "react";
import { navList } from "../costants/index.js";
import { Menu, X } from "lucide-react"; // usa lucide-react per icone moderne

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full fixed">
            <div className="px-6 py-4 flex items-center justify-between">

                <a href="/" className="cursor-pointer">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-electrolize">
                        Piero Glavina
                    </h1>
                </a>

                <div className="hidden md:flex items-center space-x-10 mr-16">
                    {navList.map((nav, i) => (
                        <a href={nav.href} key={i} className="navBar-text">
                            // {nav.title}
                        </a>
                    ))}
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-400 hover:text-gray-700 transition-all"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden">
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

                    <div className="w-3/4 mx-auto h-[1.5px] bg-gray-400"/>


                </div>
            )}
        </nav>
    );
};

export default NavBar;