import React from 'react'
import NavBar from "./components/NavBar.jsx";
import Skills from "./components/Skills.jsx";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contatc.jsx";
import Hero from "./components/Hero.jsx";
import Footer from "./components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <NavBar />
            <Hero />
            <div className="h-[20vh] dark:bg-slate-900"/>
            <Skills />
            <Projects />
            <Contact />
            <Footer />
        </main>
    )
}
export default App
