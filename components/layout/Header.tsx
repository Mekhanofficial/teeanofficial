"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { SiGithub, SiLinkedin, SiX, SiInstagram } from "react-icons/si";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const socialLinks = [
    {
      icon: <SiGithub className="w-4 h-4" />,
      name: "GitHub",
      url: "https://github.com",
    },
    {
      icon: <SiLinkedin className="w-4 h-4" />,
      name: "LinkedIn",
      url: "https://linkedin.com",
    },
    {
      icon: <SiX className="w-4 h-4" />,
      name: "X (Twitter)",
      url: "https://twitter.com",
    },
    {
      icon: <SiInstagram className="w-4 h-4" />,
      name: "Instagram",
      url: "https://instagram.com",
    },
  ];

  useEffect(() => {
    setMounted(true);

    if (typeof window !== "undefined") {
      const audio = new Audio("/sound/click.wav");
      audio.volume = 0.3;
      audio.load();
      audioRef.current = audio;

      return () => {
        audioRef.current = null;
      };
    }
  }, []);

  const handleThemeToggle = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((e) => console.error("Audio error:", e));
    }
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 px-4 sm:px-6 lg:px-8 bg-gray-200 dark:bg-zinc-900/80 backdrop-blur-sm transition-colors duration-200 h-16">
      <div className="container mx-auto flex justify-between items-center h-full">
        {/* Logo on the left */}
        <Link
          href="/"
          className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 hover:opacity-80 transition-opacity"
        >
          Teean
        </Link>

        {/* Centered navigation links */}
        <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 gap-6">
          <Link
            href="/"
            className="text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-zinc-600 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right side elements (social icons and theme toggle) */}
        <div className="flex items-center gap-4">
          {/* Social Icons - hidden on mobile */}
          <div className="hidden md:flex gap-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center p-2 backdrop-blur-sm hover:bg-blue-500/80 transition-all duration-300"
                aria-label={social.name}
              >
                <span className="text-zinc-700 dark:text-zinc-300 group-hover:text-white transition-colors duration-300">
                  {social.icon}
                </span>
                <span className="absolute left-full ml-2 px-2 py-1 text-xs font-medium text-white bg-zinc-800 dark:bg-zinc-700 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {social.name}
                </span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-zinc-700 dark:text-zinc-300 p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Light Bulb Pendulum */}
          <button
            onClick={handleThemeToggle}
            className="relative w-8 h-16 flex flex-col items-center group"
            aria-label="Toggle theme"
          >
            {/* Rope */}
            <div className="absolute top-0 w-px h-16 bg-gradient-to-b from-amber-600 to-amber-500 animate-swing origin-top" />

            {/* Light Bulb */}
            <div className="absolute bottom-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-md bg-amber-50 dark:bg-zinc-800 animate-swing-child">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-all duration-300 ${
                  theme === "light"
                    ? "text-amber-500 rotate-0"
                    : "text-zinc-500 rotate-180 opacity-80"
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
