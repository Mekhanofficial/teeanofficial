"use client";
import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { FiMusic, FiChevronDown, FiX } from "react-icons/fi";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiFirebase,
  SiVuedotjs,
  SiGithub,
  SiLinkedin,
  SiX,
  SiJavascript,
  SiGit,
  SiInstagram,
} from "react-icons/si";
import Image from "next/image";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const audioRef = useRef(null);
  const [audioReady, setAudioReady] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const musicRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  const socialLinks = [
    {
      icon: <SiGithub className="w-5 h-5" />,
      name: "GitHub",
      url: "https://github.com",
    },
    {
      icon: <SiLinkedin className="w-5 h-5" />,
      name: "LinkedIn",
      url: "https://linkedin.com",
    },
    {
      icon: <SiX className="w-5 h-5" />,
      name: "X (Twitter)",
      url: "https://twitter.com",
    },
    {
      icon: <SiInstagram className="w-5 h-5" />,
      name: "Instagram",
      url: "https://instagram.com",
    },
  ];

  const roles = [
    "CREATIVE WRITER",
    "RADIO HOST",
    "CONTENT CREATOR",
    "MEDIA SPECIALIST",
  ];

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };

  const handleMouseLeave = (e) => {
    if (
      isOpen &&
      contentRef.current &&
      !contentRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const cleanup = () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mouseleave", handleMouseLeave);
      musicRef.current?.pause();
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mouseleave", handleMouseLeave);

    return cleanup;
  }, [handleMouseLeave]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Fixed Typing Effect Logic
  useEffect(() => {
    let isCancelled = false;

    const typeRole = async () => {
      const role = roles[currentRoleIndex];
      for (let i = 0; i <= role.length; i++) {
        if (isCancelled) return;
        setTypingText(role.substring(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (!isCancelled) {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    };

    typeRole();

    return () => {
      isCancelled = true;
    };
  }, [currentRoleIndex]);

  useEffect(() => {
    const initAudio = async () => {
      try {
        const audio = new Audio("/sound/click.wav");
        audio.volume = 0.3;
        audioRef.current = audio;
        await audio.load();
        setAudioReady(true);
      } catch (error) {
        console.error("Audio initialization failed:", error);
        setAudioReady(false);
      }
    };

    initAudio();
  }, []);

  useEffect(() => {
    const initMusic = async () => {
      try {
        const music = new Audio("/sound/Melvinho-imma be.mp3");
        music.loop = true;
        music.volume = 0.5;
        musicRef.current = music;
        await music.load();
      } catch (error) {
        console.error("Music initialization failed:", error);
      }
    };

    initMusic();
  }, []);

  const toggleMusic = async () => {
    if (!musicRef.current) return;

    try {
      if (musicPlaying) {
        await musicRef.current.pause();
      } else {
        await musicRef.current.play();
      }
      setMusicPlaying(!musicPlaying);
    } catch (error) {
      console.error("Music toggle error:", error);
    }
  };

  const handleButtonClick = async () => {
    if (!audioReady) return;

    try {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        await audio.play();
        setIsOpen(true);
      }
    } catch (error) {
      console.error("Audio play error:", error);
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-900 transition-colors duration-500">
      <button
        onClick={toggleMusic}
        className={`fixed bottom-4 right-4 z-50 p-3 rounded-full transition-all duration-300 ${
          musicPlaying
            ? "text-green-500 bg-white/10 backdrop-blur-sm"
            : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        }`}
        aria-label={musicPlaying ? "Turn music off" : "Turn music on"}
      >
        <FiMusic
          className={`w-5 h-5 transition-transform ${
            musicPlaying ? "animate-pulse" : ""
          }`}
        />
      </button>

      <div className="relative w-full h-full pt-16 md:pt-20">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-zinc-200/90 dark:bg-zinc-900/90 z-20 transition-transform duration-700 ease-in-out ${
            isOpen ? "-translate-x-full" : "translate-x-0"
          }`}
        />

        <div
          className={`absolute top-0 right-0 h-full w-1/2 bg-zinc-200/90 dark:bg-zinc-900/90 flex items-center justify-start pl-6 md:pl-10 z-20 transition-transform duration-700 ease-in-out ${
            isOpen ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-zinc-900 dark:text-white tracking-wide min-h-[2.5rem]">
            {typingText}
            <span className="animate-pulse">|</span>
          </h2>
        </div>

        <div
          className={`absolute bottom-8 left-1/2 h-[calc(100%-8rem)] w-0.5 bg-gradient-to-t from-zinc-400/50 to-transparent dark:from-zinc-600/50 dark:to-transparent z-30 transition-opacity duration-500 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
          style={{ transform: "translateX(-50%)" }}
        />

        <div
          ref={contentRef}
          className={`absolute top-0 inset-x-0 h-full flex items-center justify-center z-10 transition-opacity duration-700 delay-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative w-full max-w-6xl px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/images/teebaby.jpg"
                      alt="Profile picture"
                      width={256}
                      height={256}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 md:space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      About Me
                    </h1>
                    <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400">
                      Writer | Radio Rebel | Media Creative
                    </h2>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors duration-300"
                    aria-label="Close"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300">
                    I&apos;m a passionate media professional with expertise in
                    creative writing, radio broadcasting, and digital content
                    creation. With a distinctive voice and compelling
                    storytelling ability, I craft engaging narratives across
                    multiple platforms to inform, entertain, and connect with
                    audiences.
                  </p>
                  <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300">
                    My work combines technical media production skills with
                    creative vision to deliver content that resonates with
                    diverse audiences and drives meaningful engagement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center z-40 transition-all duration-500 hover:scale-110 shadow-lg ${
            isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          aria-label="Reveal content"
        >
          <div className="relative">
            <FiChevronDown className="w-5 h-5 sm:w-6 sm:h-6 animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-ping opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>
      </div>
    </div>
  );
}
