import {Canvas, } from "@react-three/fiber";
import {Physics, } from "@react-three/rapier";
import Experience from "./Experience.jsx";
import Walls from "./Walls.jsx";
import Satellite from "./Models/Satellite.jsx";


const Hero = () => {
    return (
        <section className="relative w-full h-[90vh] overflow-hidden">

            <div className="absolute inset-0 z-0 pointer-events-none">
                <Canvas orthographic={true} camera={{ position: [0, 25, 0], zoom:44}} className="w-full h-full">
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={2} />
                    <directionalLight position={[-10, 10, 5]} intensity={1} />

                    <Physics gravity={[0, 0, 0]}>
                        <Walls />
                        <Experience />
                    </Physics>
                </Canvas>

            </div>


            <div className="relative z-10 w-full h-full flex justify-center items-center pointer-events-auto">
                <div className="w-2/3 mr-60 mb-45">
                    <h1 className="text-9xl font-electrolize">Piero Glavina</h1>
                    <h3 className="text-5xl font-electrolize text-orange-500">Web Developer & 3D Artist</h3>
                    <p className="text-2xl font-electrolize mt-20 w-2/3">
                        I craft and design immersive digital experiences that seamlessly blend cutting-edge front-end development with the creative depth of 3D graphics, bringing interactive and visually engaging worlds to life on the web.
                    </p>
                </div>
            </div>



        </section>
    )
}
export default Hero
