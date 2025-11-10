import React from "react";
import { Canvas } from "@react-three/fiber";
import RadioStation from "./RadioStation.jsx";
import { useMediaQuery } from "react-responsive";

const Contact = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

    const handleClick = () => {
        alert("Download my CV!");
    };

    return (
        <section id="contact" className="w-full flex flex-col items-center px-6 sm:px-10 lg:px-20 dark:bg-slate-900">

            <div
                className=" top-10 md:top-20 left-0 right-0 z-20 w-full px-4"
            >
                <h1 className="section-title">
                    {"<Want to Contact Me? />"}
                </h1>

                <h3 className="section-subtitle">
                    {isMobile ? "[" : "<!-- "}
                    {"Let's get in touch! Send me a message!"}
                    {isMobile ? "]" : " -->"}
                </h3>
            </div>

            {/* Contenitore form + canvas */}
            <div
                className={`flex flex-1 w-full mt-12 gap-10 ${
                    isMobile ? "flex-col-reverse items-center" : "flex-row"
                }`}
            >
                {/* Form */}
                <div
                    className={`${
                        isMobile ? "w-full max-w-md mb-16" : "w-1/2 my-24"
                    }`}
                >
                    <form className="flex flex-col space-y-8 w-full font-electrolize items-center">
                        <input
                            type="text"
                            name="name"
                            required
                            className="input-field"
                            placeholder="string = {insert name}"
                        />

                        <input
                            type="email"
                            name="email"
                            required
                            className="input-field"
                            placeholder="string = {insert email}"
                        />

                        <textarea
                            name="message"
                            required
                            rows={5}
                            className="input-area"
                            placeholder="string = {insert message}"
                        />

                        <button className="input-button" onClick={handleClick}>
                            Want more info? Download my CV!
                        </button>

                        <button className="input-button" type="submit">
                            {"button = {submit}"}
                        </button>
                    </form>
                </div>

                {/* Canvas */}
                <div
                    className={`${
                        isMobile ? "w-full h-[300px]" : "w-1/2 h-[600px]"
                    } flex justify-center`}
                >
                    <Canvas camera={{ position: [3, 2, 4], fov: 45 }}>
                        <ambientLight intensity={1}/>
                        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
                        <pointLight position={[-3, 2, -3]} intensity={2} distance={15} />
                        <RadioStation
                            position={[0, -1, 0]}
                            rotation={[0, Math.PI + 1.2, 0]}
                            scale={0.48}
                        />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default Contact;