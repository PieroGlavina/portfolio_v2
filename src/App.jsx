import React from 'react'
import NavBar from "./components/NavBar.jsx";
import Skills from "./components/Skills.jsx";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contatc.jsx";
import Hero from "./components/Hero.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <Skills />
            <Projects />
            <Contact />
        </main>
    )
}
export default App
