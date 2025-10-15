import React from 'react'
import NavBar from "./components/NavBar.jsx";
import Skills from "./components/Skills.jsx";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Projects from "./components/Projects.jsx";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
    return (
        <main>
            <NavBar />
            <Skills />
            <Projects />
        </main>
    )
}
export default App
