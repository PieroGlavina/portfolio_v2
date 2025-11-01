import React from 'react';
// Importing icons from a CDN
import { Mail, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Social links (replace with your actual URLs)
    const socialLinks = [
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:your-email@example.com'
        },
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/your-username'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/in/your-profile'
        },
    ];

    return (
        <footer className="w-full font-electrolize bg-neutral-900 text-neutral-300 py-12 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
                {/* Top section: Name and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-8">

                    {/* Left Side: Name and Bio */}
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">Piero Glavina</h3>
                        <p className="max-w-md text-neutral-400">
                            I craft and design immersive digital experiences that seamlessly blend cutting-edge front-end development with the creative depth of 3D graphics, bringing interactive and visually engaging worlds to life on the web.

                        </p>
                    </div>

                    {/* Right Side: Contact Links */}
                    <div className="flex-1 flex flex-col items-center md:items-end">
                        <h4 className="text-lg font-semibold text-white mb-3">Get in Touch</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.name}
                                    className="p-2 rounded-full text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                                >
                                    <link.icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom section: Copyright */}
                <div className="border-t border-neutral-700 mt-10 pt-6 text-center text-sm text-neutral-500">
                    <p>&copy; {currentYear} Piero Glavina. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
