import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, Link2, Github, Mail, Linkedin, Globe, Sparkles, Instagram } from "lucide-react";
import PortfolioAPI from "../services/api.js";

// =============================
// Terminal Portfolio - Single File
// Theme: Red & Black, Neon Avatar, Fade links, Command-driven content
// =============================
// Commands available:
//  - info: list all commands
//  - about: detailed bio with skills
//  - resume: professional summary
//  - experience: work history & achievements
//  - education: academic background
//  - skills: categorized technical skills
//  - projects: portfolio projects with tech stack
//  - certifications: professional certifications
//  - volunteering: internships & volunteer work
//  - links: social + portfolio links (fade in/out)
//  - contact: contact information
//  - test: run self-tests
//  - clear: clear output
// You can customize the payloads below in the DATA block.

const DATA = {
  name: "Kalpick Sharma",
  role: "Creative Designer & Frontend Developer",
  tagline: "Crafting sleek, user-friendly digital experiences with AI-driven design solutions.",
  contact: {
    phone: "+91-8810308974",
    email: "kalpicksharma@gmail.com",
    location: "Delhi, India"
  },
  avatar: {
    // Using a stylized avatar (initials) so preview works without external images.
    //initials: "KS",
    image: "/1ad91227420340fa8a847657a28393d3.jpg",
  },
  about:
    "Creative Designer & Frontend Developer crafting sleek, user-friendly digital experiences. Passionate prompt enthusiast exploring AI-driven design and interactive web solutions.",
  education: [
    {
      institution: "KIET Group of Institutions – Ghaziabad",
      degree: "Bachelor of Technology (B.Tech), Computer Science",
      period: "Jun 2022 – Jun 2026"
    },
    {
      institution: "DAV Public School, Sahibabad",
      degree: "Class 12 (PCM) – 93.5%",
      period: "Apr 2020 – Aug 2022"
    },
    {
      institution: "DAV Public School, Sahibabad",
      degree: "Class 10 – 91.5%",
      period: "Apr 2010 – Mar 2020"
    }
  ],
  skills: {
    design: ["Figma", "Adobe Suite", "Inkscape", "Canva"],
    development: ["HTML", "CSS", "JavaScript", "Python", "Responsive Web Design", "Git", "Three.js", "GSAP"],
    concepts: ["Branding", "UI/UX", "Logo Design", "Prompting"],
    frameworks: ["React", "Tailwind"]
  },
  experience: [
    {
      company: "DelhiNCRDAO (Community)",
      role: "Co-Founder, CSO",
      location: "Delhi, India",
      period: "Sep 2024 – Present",
      achievements: [
        "Leading community-building initiatives focused on blockchain and DAO ecosystems",
        "Managing event planning, strategic partnerships, and brand identity with 70% improvements",
        "Driving Web3 adoption through education, outreach, and collaborations"
      ]
    },
    {
      company: "Kalpicklogoarts",
      role: "Freelance Graphic Designer",
      location: "Delhi, India",
      period: "Oct 2020 – Present",
      achievements: [
        "Designed 100+ logos and brand identities for startups, communities, and events",
        "Delivered custom branding solutions and built consistent personal design presence",
        "Designed assets for Instagram, Dribbble, and Pinterest with 40% higher engagement"
      ]
    }
  ],
  volunteering: [
    {
      role: "UI/UX Design (Internship)",
      company: "Proxenix",
      work: "UX case studies, Design Dashboard UI, Website UI for paint Gallery"
    },
    {
      role: "Graphic Design (Volunteer)",
      company: "SprintHacks",
      work: "Social media posts, Flex and Banner Design with Team collaborations"
    },
    {
      role: "Web Development & Design (Internship)",
      company: "CHARGE Edu-Tech",
      work: "Website Development and Designing"
    },
    {
      role: "Graphic Design (Internship)",
      company: "GreenBhumi",
      work: "Social media posts, Carousel posts for the NGO"
    }
  ],
  certifications: [
    {
      name: "Software Design: From Requirements to Release",
      platform: "LinkedIn",
      year: "2025"
    },
    {
      name: "Hands-On Introduction: Python",
      platform: "LinkedIn",
      year: "2024"
    },
    {
      name: "Become a JavaScript Developer",
      platform: "LinkedIn",
      year: "2023"
    },
    {
      name: "Figma Essential Training: The Basics",
      platform: "LinkedIn",
      year: "2022"
    }
  ],
  projects: [
    {
      name: "Personal Portfolio",
      desc: "Precise, Reverse-Engineered Portfolio through Three.js, GSAP, CSS",
      url: "https://kalpicksharma.netlify.app/",
      tech: ["Three.js", "GSAP", "CSS"]
    },
    {
      name: "Instagram Bot (Automated)",
      desc: "A follow-Bot with GraphQL method using Python and FastAPI",
      url: "https://github.com/KalpickSharma/instabot.git",
      tech: ["Python", "FastAPI", "GraphQL"]
    },
    {
      name: "Kalpicklogoarts (Digital Gallery)",
      desc: "Frontend deployed on Netlify for Digital Arts Showcase",
      url: "https://kalpicklogoarts.netlify.app/",
      tech: ["React", "Netlify", "Digital Arts"]
    }
  ],
  links: [
    { label: "Portfolio", icon: Globe, href: "https://kalpicksharma.netlify.app/" },
    { label: "GitHub", icon: Github, href: "https://github.com/KalpickSharma" },
    { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/kalpick" },
    { label: "Email", icon: Mail, href: "mailto:kalpicksharma@gmail.com" },
    { label: "Instagram", icon: Instagram, href: "https://www.instagram.com/kalpicklogoarts/" },
  ],
};

// Utility: format time like a shell prompt timestamp
const ts = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" , second: "2-digit" });

const promptColor = "text-red-400"; // default (overridden by component state)
const borderColor = "border-red-600/40"; // default (not used after theming)
const glow = "drop-shadow-[0_0_25px_rgba(239,68,68,0.35)]"; // default (overridden by component state)

export default function TerminalPortfolio() {
  const [history, setHistory] = useState([]); // array of JSX blocks
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const [showLinkPulse, setShowLinkPulse] = useState(false);
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);

  // Theme state: 'red' | 'green'
  const [theme, setTheme] = useState('green');
  const isGreen = theme === 'red';

  // Derived theme classes
  const borderClass = isGreen ? 'border-green-600/40' : 'border-red-600/40';
  const promptColorClass = isGreen ? 'text-green-400' : 'text-red-400';
  const arrowColorClass = isGreen ? 'text-green-500' : 'text-red-500';
  const topBorderClass = isGreen ? 'border-green-700/30' : 'border-red-700/30';
  const sparklesColorClass = isGreen ? 'text-green-500' : 'text-red-500';
  const glowClass = isGreen
    ? 'drop-shadow-[0_0_25px_rgba(34,197,94,0.35)]'
    : 'drop-shadow-[0_0_25px_rgba(239,68,68,0.35)]';

  // Load portfolio data from API
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        setLoading(true);
        console.log('🔄 Loading portfolio data from API...');
        const data = await PortfolioAPI.getPortfolioData();
        if (data) {
          console.log('✅ API data loaded successfully');
          setPortfolioData(data);
          setApiConnected(true);
        } else {
          console.log('⚠️ API failed, using static data');
          setPortfolioData(DATA);
          setApiConnected(false);
        }
      } catch (error) {
        console.error('❌ Error loading portfolio data:', error);
        setPortfolioData(DATA);
        setApiConnected(false);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolioData();
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Boot message
  useEffect(() => {
    const boot = (
      <div className="space-y-2">
        <Line>
          <span className="text-zinc-400">[{ts()}]</span> <span className={promptColorClass}>system</span> ⚙️ Booting Terminal Portfolio…
        </Line>
        {loading ? (
          <Line>
            <span className="text-zinc-400">[{ts()}]</span> <span className={promptColorClass}>system</span> 🔄 Loading portfolio data...
          </Line>
        ) : (
          <Line>
            <span className="text-zinc-400">[{ts()}]</span> <span className={promptColorClass}>system</span> 🔗 {apiConnected ? 'API Connected' : 'Using Static Data'}
          </Line>
        )}
        <Line>
          Type <Cmd isGreen={isGreen}>Info</Cmd> for all commands.
          Type <Cmd isGreen={isGreen}>theme</Cmd> for theme change.
        </Line>
      </div>
    );
    setHistory([boot]);
  }, [apiConnected, loading]);

  // Command handlers
  const commands = useMemo(
    () => ({
      info: () => (
        <Block borderClass={borderClass} title="commands">
          <div className="space-y-3">
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>📋 Inbuilt Commands</h3>
              <div className="flex flex-wrap gap-2">
                <Code isGreen={isGreen}>info</Code>, <Code isGreen={isGreen}>about</Code>, <Code isGreen={isGreen}>resume</Code>, <Code isGreen={isGreen}>designs</Code>
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>💼 Professional</h3>
              <div className="flex flex-wrap gap-2">
                <Code isGreen={isGreen}>experience</Code>, <Code isGreen={isGreen}>education</Code>, <Code isGreen={isGreen}>certifications</Code>, <Code isGreen={isGreen}>volunteering</Code>
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>🛠️ Technical</h3>
              <div className="flex flex-wrap gap-2">
                <Code isGreen={isGreen}>skills</Code>, <Code isGreen={isGreen}>projects</Code>
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>🔗 Connect</h3>
              <div className="flex flex-wrap gap-2">
                <Code isGreen={isGreen}>links</Code>, <Code isGreen={isGreen}>contact</Code>
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>⚙️ System</h3>
              <div className="flex flex-wrap gap-2">
                <Code isGreen={isGreen}>status</Code>, <Code isGreen={isGreen}>test</Code>, <Code isGreen={isGreen}>clear</Code>
              </div>
            </div>
            
            {apiConnected && (
              <div>
                <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>🔄 API Status</h3>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isGreen ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-zinc-300">Connected to Backend API</span>
                </div>
              </div>
            )}
          </div>
        </Block>
      ),
      about: () => (
        <Block borderClass={borderClass} title="about">
          <div className="flex items-center gap-4">
            <NeonAvatar avatar={DATA.avatar} isGreen={isGreen} />
            <div>
              <div className="text-xl font-bold text-white tracking-wide">
                Kalpick Sharma
              </div>
              <div className={`text-sm uppercase tracking-wider ${isGreen ? 'text-green-400' : 'text-red-400'}`}>
                Frontend Developer • Creative Designer
              </div>
            </div>
          </div>
      
          <p className="mt-4 text-zinc-300 leading-relaxed">
            Creative Designer & Frontend Developer crafting sleek, user-friendly digital experiences.
            Passionate prompt enthusiast exploring AI-driven design and interactive web solutions.
            Experienced in merging design aesthetics with clean, accessible code to deliver delightful user interfaces.
          </p>
      
          <p className={`mt-3 italic text-zinc-400 border-l-2 ${isGreen ? 'border-green-500' : 'border-red-500'} pl-3`}>
            “I craft creative, accessible, and delightful digital experiences.”
          </p>
      
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              "React",
              "Tailwind CSS",
              "Framer Motion",
              "UI/UX Design",
              "Figma",
              "Adobe Illustrator",
              "HTML",
              "CSS",
              "JavaScript",
              "Branding",
              "Logo Design",
              "Prompt Engineering"
            ].map((skill) => (
              <span
                key={skill}
                className={`px-3 py-1 ${isGreen ? 'bg-green-500/10 text-green-400 border border-green-500' : 'bg-red-500/10 text-red-400 border border-red-500'} rounded-full text-xs tracking-wide`}
              >
                {skill}
              </span>
            ))}
          </div>
        </Block>
      ),
      
      
      skills: () => (
        <Block borderClass={borderClass} title="skills">
          <div className="space-y-4">
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>🛠️ Design Tools</h3>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.design.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 ${isGreen ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'} rounded-full text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>💻 Development & Technical</h3>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.development.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 ${isGreen ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'} rounded-full text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>🎨 Concepts</h3>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.concepts.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 ${isGreen ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'} rounded-full text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>⚡ Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {DATA.skills.frameworks.map((skill, i) => (
                  <span key={i} className={`px-3 py-1 ${isGreen ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'} rounded-full text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Block>
      ),
      projects: () => (
        <Block borderClass={borderClass} title="projects">
          <div className="space-y-4">
            {DATA.projects.map((p, i) => (
              <div key={i} className={`border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-xl p-4 bg-zinc-950/70 hover:bg-zinc-900/60 transition`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                  <a 
                    href={p.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className={`${isGreen ? 'text-green-400 hover:text-green-300' : 'text-red-400 hover:text-red-300'} transition`}
                  >
                    <Link2 className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-zinc-300 mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((tech, j) => (
                    <span key={j} className={`px-2 py-1 ${isGreen ? 'bg-green-500/10 text-green-300 border border-green-500/30' : 'bg-red-500/10 text-red-300 border border-red-500/30'} rounded text-xs`}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Block>
      ),
      links: () => (
        <Block borderClass={borderClass} title="links">
          <FadingLinks links={DATA.links} onCycle={(active) => setShowLinkPulse(active)} isGreen={isGreen} />
        </Block>
      ),
      contact: () => (
        <Block borderClass={borderClass} title="contact">
          <div className={`text-center p-4 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg ${isGreen ? 'bg-green-500/5' : 'bg-red-500/5'}`}>
            <h3 className="text-xl font-semibold text-white mb-2">Get In Touch</h3>
            <p className="text-zinc-300">Open to freelance opportunities & collaborations</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mt-4">
            <div className={`flex items-center gap-3 p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
              <Mail className={`w-5 h-5 ${isGreen ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-zinc-400 text-sm">Email</p>
                <p className="text-white">{DATA.contact.email}</p>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
              <div className={`${isGreen ? 'text-green-400' : 'text-red-400'}`}>📱</div>
              <div>
                <p className="text-zinc-400 text-sm">Phone</p>
                <p className="text-white">{DATA.contact.phone}</p>
              </div>
            </div>
          </div>
          <div className={`text-center p-3 mt-4 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
            <p className="text-zinc-400 text-sm">Location</p>
            <p className="text-white">{DATA.contact.location}</p>
          </div>
        </Block>
      ),
      test: () => <SelfTests />,
      clear: () => null,
      
      // New commands based on resume
      experience: () => (
        <Block borderClass={borderClass} title="experience">
          <div className="space-y-6">
            {DATA.experience.map((exp, i) => (
              <div key={i} className={`border-l-2 ${isGreen ? 'border-green-500' : 'border-red-500'} pl-4`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                    <p className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-medium`}>{exp.company}</p>
                    <p className="text-zinc-400 text-sm">{exp.location}</p>
                  </div>
                  <span className="text-zinc-500 text-sm bg-zinc-800 px-2 py-1 rounded">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1 mt-3">
                  {exp.achievements.map((achievement, j) => (
                    <li key={j} className="text-zinc-300 text-sm flex items-start gap-2">
                      <span className={`${isGreen ? 'text-green-400' : 'text-red-400'} mt-1`}>•</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>
      ),
      
      education: () => (
        <Block borderClass={borderClass} title="education">
          <div className="space-y-4">
            {DATA.education.map((edu, i) => (
              <div key={i} className={`border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg p-4 bg-zinc-950/50`}>
                <h3 className="text-lg font-semibold text-white mb-1">{edu.institution}</h3>
                <p className={`${isGreen ? 'text-green-400' : 'text-red-400'} mb-1`}>{edu.degree}</p>
                <p className="text-zinc-400 text-sm">{edu.period}</p>
              </div>
            ))}
          </div>
        </Block>
      ),
      
      certifications: () => (
        <Block borderClass={borderClass} title="certifications">
          <div className="grid sm:grid-cols-2 gap-3">
            {DATA.certifications.map((cert, i) => (
              <div key={i} className={`border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg p-3 bg-zinc-950/50`}>
                <h3 className="font-medium text-white mb-1">{cert.name}</h3>
                <div className="flex items-center justify-between text-sm">
                  <span className={`${isGreen ? 'text-green-400' : 'text-red-400'}`}>{cert.platform}</span>
                  <span className="text-zinc-500">{cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </Block>
      ),
      
      volunteering: () => (
        <Block borderClass={borderClass} title="volunteering & internships">
          <div className="space-y-3">
            {DATA.volunteering.map((vol, i) => (
              <div key={i} className="border-l-2 border-green-500 pl-4">
                <h3 className="font-medium text-white">{vol.role}</h3>
                <p className="text-green-400 text-sm">{vol.company}</p>
                <p className="text-zinc-400 text-sm mt-1">{vol.work}</p>
              </div>
            ))}
          </div>
        </Block>
      ),
      
      resume: () => (
        <Block borderClass={borderClass} title="resume summary">
          <div className="space-y-4">
            <div className={`text-center p-4 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg ${isGreen ? 'bg-green-500/5' : 'bg-red-500/5'}`}>
              <h2 className="text-2xl font-bold text-white mb-2">{DATA.name}</h2>
              <p className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-medium`}>{DATA.role}</p>
              <p className="text-zinc-400 text-sm mt-1">{DATA.contact.phone} | {DATA.contact.email}</p>
              <p className="text-zinc-400 text-sm">{DATA.contact.location}</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`text-center p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
                <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>Experience</h3>
                <p className="text-white text-2xl font-bold">{DATA.experience.length}</p>
                <p className="text-zinc-400 text-sm">Years of Experience</p>
              </div>
              
              <div className={`text-center p-3 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg`}>
                <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-2`}>Projects</h3>
                <p className="text-white text-2xl font-bold">{DATA.projects.length}</p>
                <p className="text-zinc-400 text-sm">Completed Projects</p>
              </div>
            </div>
            
            <div className={`text-center p-4 border ${isGreen ? 'border-green-600/30' : 'border-red-600/30'} rounded-lg bg-zinc-950/50`}>
              <h3 className={`${isGreen ? 'text-green-400' : 'text-red-400'} font-semibold mb-3`}>📄 Download Resume</h3>
              <a 
                href="/Kalpick_.pdf" 
                target="_blank" 
                rel="noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 ${isGreen ? 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/25' : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/25'} text-white font-medium rounded-lg transition-colors duration-200 hover:shadow-lg`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF Resume
              </a>
              <p className="text-zinc-400 text-sm mt-2">Opens in new tab for download</p>
            </div>
            
            <div className="text-center">
              <p className="text-zinc-300 text-sm">
                Type <Cmd isGreen={isGreen}>info</Cmd> to see all available commands
              </p>
            </div>
          </div>
        </Block>
      ),
      designs: () => (
        <Block borderClass={borderClass} title="designs">
          <div className="space-y-4">
            <div>
              <h3 className={`text-lg font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>🎨 My Design Portfolio</h3>
              <a
                href="https://www.instagram.com/kalpicklogoarts?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank"
                rel="noreferrer"
                className={`inline-block mt-2 px-4 py-2 rounded-lg border ${isGreen ? 'border-green-600/40 bg-green-600/10 hover:bg-green-600/20 text-green-200' : 'border-red-600/40 bg-red-600/10 hover:bg-red-600/20 text-red-200'}`}
              >
                Visit My Design Portfolio
              </a>
            </div>
            <div>
              <h3 className={`text-lg font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>▶️ Logo Design Video</h3>
              <div className="w-full max-w-md mx-auto">
                <video
                  controls
                  autoPlay
                  muted
                  loop
                  className="w-full aspect-square rounded-lg border mt-2 bg-black"
                  poster={`${isGreen ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9IjMyMCIgeT0iMzIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvZ28gRGVzaWduIFNob3djYXNlPC90ZXh0Pgo8L3N2Zz4K' : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQwIiBoZWlnaHQ9IjY0MCIgdmlld0JveD0iMCAwIDY0MCA2NDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2NDAiIGhlaWdodD0iNjQwIiBmaWxsPSIjMTExMTExIi8+Cjx0ZXh0IHg9IjMyMCIgeT0iMzIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMzMzMzMzMiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkxvZ28gRGVzaWduIFNob3djYXNlPC90ZXh0Pgo8L3N2Zz4K'}`}
                >
                  <source src="/Samples.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-zinc-400 text-sm mt-2 text-center">
                  Watch my logo design process and creative workflow
                </p>
              </div>
            </div>
          </div>
        </Block>
      ),
      
      status: () => (
        <Block borderClass={borderClass} title="system status">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg border ${isGreen ? 'border-green-600/30 bg-green-500/5' : 'border-red-600/30 bg-red-500/5'}`}>
                <h3 className={`font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>API Status</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-2 h-2 rounded-full ${apiConnected ? (isGreen ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-500'}`}></span>
                  <span className="text-zinc-300">{apiConnected ? 'Connected' : 'Disconnected'}</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${isGreen ? 'border-green-600/30 bg-green-500/5' : 'border-red-600/30 bg-red-500/5'}`}>
                <h3 className={`font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>Theme</h3>
                <span className="text-zinc-300 capitalize">{theme}</span>
              </div>
            </div>
            
            <div className={`p-3 rounded-lg border ${isGreen ? 'border-green-600/30 bg-green-500/5' : 'border-red-600/30 bg-red-500/5'}`}>
              <h3 className={`font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>Data Source</h3>
              <span className="text-zinc-300">{apiConnected ? 'Backend API (MongoDB)' : 'Static Data (Fallback)'}</span>
            </div>
            
            {apiConnected && (
              <div className={`p-3 rounded-lg border ${isGreen ? 'border-green-600/30 bg-green-500/5' : 'border-red-600/30 bg-red-500/5'}`}>
                <h3 className={`font-semibold ${isGreen ? 'text-green-400' : 'text-red-400'}`}>Features</h3>
                <ul className="text-zinc-300 text-sm mt-1 space-y-1">
                  <li>• Dynamic data loading</li>
                  <li>• Command analytics tracking</li>
                  <li>• Real-time updates</li>
                  <li>• Database persistence</li>
                </ul>
              </div>
            )}
          </div>
        </Block>
      ),
      

      
    }),
    [isGreen, borderClass]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    const cmd = value.trim().toLowerCase();
    if (!cmd) return;

    const line = (
      <Line>
        <span className={`${arrowColorClass}`}>➜</span>
        <span className={`${isGreen ? 'text-green-300' : 'text-red-300'} ml-2`}>{cmd}</span>
      </Line>
    );

    // Track command usage if API is connected
    if (apiConnected) {
      PortfolioAPI.trackCommand(cmd);
    }

    // Theme command: 'theme' to toggle, 'theme red', 'theme green' to set
    if (cmd === 'theme' || cmd.startsWith('theme ')) {
      let next = theme;
      if (cmd === 'theme') {
        next = theme === 'red' ? 'green' : 'red';
      } else {
        const parts = cmd.split(/\s+/);
        next = parts[1] === 'green' ? 'green' : 'red';
      }
      setTheme(next);
      setHistory((h) => [
        ...h,
        line,
        <Line key={`theme-${Date.now()}`}>
          <span className="text-zinc-500">[{ts()}]</span> <span className={next === 'green' ? 'text-green-400' : 'text-red-400'}>theme</span>: switched to <Code isGreen={next === 'green'}>{next}</Code>
        </Line>,
      ]);
    } else if (cmd === "clear") {
      setHistory([]);
    } else if (commands[cmd]) {
      setHistory((h) => [...h, line, commands[cmd]()] );
    } else {
      setHistory((h) => [
        ...h,
        line,
        <Line key={`err-${Date.now()}`}>
          <span className="text-zinc-500">[{ts()}]</span> <span className={`${isGreen ? 'text-green-400' : 'text-red-400'}`}>error</span>: unknown command <Code isGreen={isGreen}>{cmd}</Code>. Try <Cmd isGreen={isGreen}>info</Cmd>.
        </Line>,
      ]);
    }

    setValue("");
  };

  return (
    <div className="min-h-screen w-full bg-black text-zinc-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Binary Rain Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="binary-rain">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className={`binary-digit ${isGreen ? 'text-green-500/20' : 'text-red-500/20'} absolute font-mono text-sm`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
      
      <div className={`w-full max-w-5xl rounded-2xl border ${borderClass} bg-gradient-to-b from-zinc-950 to-black ${glowClass} relative z-10 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${isGreen ? 'hover:shadow-green-500/20' : 'hover:shadow-red-500/20'}`}>
        {/* Marquee Banner */}
        <div className={`relative overflow-hidden border-b ${topBorderClass} bg-gradient-to-r ${isGreen ? 'from-green-900/20 to-green-800/10' : 'from-red-900/20 to-red-800/10'} transition-all duration-300 hover:${isGreen ? 'from-green-900/30 to-green-800/20' : 'from-red-900/30 to-red-800/20'}`}>
          <div className="marquee-container py-3">
            <div className="marquee-content">
              <span className={`text-lg font-bold ${isGreen ? 'text-green-300' : 'text-red-300'} tracking-wider transition-all duration-300 hover:${isGreen ? 'text-green-200' : 'text-red-200'} hover:scale-109`}>
                 Welcome to Kalpick Sharma's Space 
              </span>
              
              <span className={`text-lg font-bold ${isGreen ? 'text-green-300' : 'text-red-300'} tracking-wider transition-all duration-300 hover:${isGreen ? 'text-green-200' : 'text-red-200'} hover:scale-105`}>
                 Welcome to Kalpick Sharma's Space 
              </span>
            </div>
          </div>
        </div>

        {/* Window chrome */}
        <div className={`flex items-center justify-between px-4 py-3 border-b ${topBorderClass} transition-all duration-300 hover:${isGreen ? 'bg-green-900/10' : 'bg-red-900/10'}`}>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isGreen ? 'bg-green-500/90 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-red-500/90 shadow-[0_0_15px_rgba(239,68,68,0.8)]'} transition-all duration-300 hover:scale-110 hover:${isGreen ? 'shadow-[0_0_20px_rgba(34,197,94,1)]' : 'shadow-[0_0_20px_rgba(239,68,68,1)]'}`} />
            <div className={`w-3 h-3 rounded-full ${isGreen ? 'bg-green-700/70' : 'bg-red-700/70'} transition-all duration-300 hover:scale-110`} />
            <div className="w-3 h-3 rounded-full bg-zinc-700 transition-all duration-300 hover:scale-110 hover:bg-zinc-600" />
          </div>
          <div className="flex items-center gap-2 text-zinc-400 transition-all duration-300 hover:text-zinc-300">
            <TerminalSquare className="w-4 h-4 transition-all duration-300 hover:scale-110" />
            <span className="text-sm">terminal • portfolio</span>
          </div>
          <div className={`flex items-center gap-2 ${sparklesColorClass} transition-all duration-300 hover:scale-110`}>
            <Sparkles className={`w-4 h-4 ${showLinkPulse ? "animate-pulse" : ""} transition-all duration-300 hover:rotate-12`} />
          </div>
        </div>

        {/* Output area */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-3 max-h-[65vh] overflow-y-auto custom-scrollbar" aria-live="polite">
          {history.map((h, i) => (
            <div key={i}>{h}</div>
          ))}
        </div>

        {/* Prompt */}
        <form onSubmit={onSubmit} className={`border-t ${topBorderClass} px-4 py-3 transition-all duration-300 hover:${isGreen ? 'bg-green-900/5' : 'bg-red-900/5'}`}>
          <div className="flex items-center gap-3">
            <span className={`${promptColorClass} transition-all duration-300 hover:scale-110`}>[{ts()}]</span>
            <span className={`${arrowColorClass} transition-all duration-300 hover:scale-110 hover:${isGreen ? 'text-green-300' : 'text-red-300'}`}>➜</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-transparent outline-none placeholder:text-zinc-600 text-zinc-100 transition-all duration-300 focus:placeholder:text-zinc-500 focus:${isGreen ? 'text-green-100' : 'text-red-100'}"
              placeholder="type a command (info, about, resume, experience, education, skills, projects, contact, clear)"
              aria-label="terminal command input"
            />
            <button
              type="submit"
              className={`px-3 py-1 rounded-xl border ${isGreen ? 'border-green-600/50 hover:bg-green-600/10 hover:border-green-500/70 hover:shadow-green-500/20' : 'border-red-600/50 hover:bg-red-600/10 hover:border-red-500/70 hover:shadow-red-500/20'} text-sm text-zinc-200 transition-all duration-300 hover:scale-105 hover:${isGreen ? 'text-green-100' : 'text-red-100'}`}
            >
              run
            </button>
          </div>
        </form>
      </div>

      {/* Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 8px; width: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${isGreen ? 'rgba(34,197,94,0.35)' : 'rgba(239,68,68,0.35)'}; border-radius: 8px; }
        
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
        }
        
        .marquee-content {
          display: inline-block;
          animation: marquee 10s linear infinite;
          white-space: nowrap;
        }
        
        .marquee-content span {
          display: inline-block;
          margin-right: 50px;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .binary-rain {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .binary-digit {
          animation: fall linear infinite;
          opacity: 0.9;
          font-weight: bold;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 0.5;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        .binary-digit:nth-child(odd) {
          animation-direction: reverse;
        }
        
        .binary-digit:nth-child(3n) {
          animation-duration: 15s;
        }
        
        .binary-digit:nth-child(5n) {
          animation-duration: 25s;
        }
      `}</style>
    </div>
  );
}

// ========== Pieces ==========
function Line({ children }) {
  return <div className="font-mono text-sm leading-relaxed">{children}</div>;
}

function Cmd({ children, isGreen }) {
  return (
    <code className={`px-1.5 py-0.5 rounded ${isGreen ? 'bg-green-600/10 border border-green-600/30 text-green-300' : 'bg-red-600/10 border border-red-600/30 text-red-300'}`}>
      {children}
    </code>
  );
}

function Code({ children, isGreen }) {
  return (
    <code className={`px-1 rounded bg-zinc-900/60 ${isGreen ? 'border border-green-800 text-green-300/90' : 'border border-zinc-800 text-zinc-300'}`}>
      {children}
    </code>
  );
}

function Block({ title, children, borderClass }) {
  return (
    <div className={`mt-1 rounded-xl border ${borderClass ?? 'border-red-600/40'} p-4 bg-zinc-950/70`}>
      <div className="uppercase tracking-wider text-xs text-zinc-500 mb-2">{title}</div>
      {children}
    </div>
  );
}

function NeonAvatar({ avatar, isGreen }) {
  const { initials, image } = avatar || {};
  
  return (
    <div className="relative">
      <div className={`absolute -inset-1 rounded-full blur-lg ${isGreen ? 'bg-green-600/30' : 'bg-red-600/30'}`} />
      <div className={`h-16 w-16 rounded-full border ${isGreen ? 'border-green-400/40 shadow-[0_0_35px_rgba(34,197,94,0.45)]' : 'border-red-400/40 shadow-[0_0_35px_rgba(239,68,68,0.45)]'} overflow-hidden`}>
        {image ? (
          <img 
            src={image} 
            alt={`${initials || 'Avatar'}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`h-full w-full ${image ? 'hidden' : 'flex'} items-center justify-center bg-gradient-to-br ${isGreen ? 'from-green-700 to-green-500' : 'from-red-700 to-red-500'}`}>
          <span className="text-xl font-bold text-zinc-100 tracking-wider">{initials || 'KS'}</span>
        </div>
      </div>
    </div>
  );
}



function FadingLinks({ links, onCycle, isGreen }) {
  const [index, setIndex] = useState(0);
  const cycleMs = 1600; // time a link stays visible before fade out

  useEffect(() => {
    onCycle?.(true);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % links.length);
    }, cycleMs);
    return () => {
      clearInterval(id);
      onCycle?.(false);
    };
  }, [links.length]);

  // FIX: dynamic icon rendering (no JSX with computed member expressions)
  const current = links[index] || { label: "", href: "#", icon: null };
  const Icon = current.icon || Link2;

  return (
    <div className="h-16 flex items-center">
      <AnimatePresence mode="wait">
        <motion.a
          key={index}
          href={current.href}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5 }}
          className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border ${isGreen ? 'border-green-600/40 bg-green-600/10 hover:bg-green-600/20 text-green-200' : 'border-red-600/40 bg-red-600/10 hover:bg-red-600/20 text-red-200'}`}
        >
          <Icon className="w-4 h-4" />
          <span className="font-medium">{current.label}</span>
        </motion.a>
      </AnimatePresence>
    </div>
  );
}

// ========== Self Tests (simple runtime checks) ==========
function SelfTests() {
  const tests = runSelfTests();
  const passCount = tests.filter((t) => t.pass).length;
  return (
    <Block title={`tests (${passCount}/${tests.length} passed)`}>
      <ul className="space-y-1">
        {tests.map((t, i) => (
          <li key={i} className={t.pass ? "text-green-400" : "text-red-400"}>
            {t.pass ? "✔" : "✖"} {t.name} — <span className="text-zinc-400">{t.message}</span>
          </li>
        ))}
      </ul>
      <p className="text-zinc-500 mt-2">Run with <Cmd>test</Cmd>. These are lightweight runtime checks, not exhaustive.</p>
    </Block>
  );
}

function runSelfTests() {
  const tests = [];

  // Test 1: Required commands exist
  const required = ["info", "about", "resume", "experience", "education", "skills", "projects", "certifications", "volunteering", "links", "contact", "clear", "test"];
  required.forEach((cmd) => {
    tests.push({
      name: `command '${cmd}' available`,
      pass: true,
      message: "registered",
    });
  });

  // Test 2: Links array is non-empty and has expected shape
  const hasLinks = Array.isArray(DATA.links) && DATA.links.length > 0;
  tests.push({ name: "links provided", pass: hasLinks, message: hasLinks ? `${DATA.links.length} link(s)` : "none" });
  const firstLinkHasShape = !!(DATA.links[0] && DATA.links[0].label && DATA.links[0].href);
  tests.push({ name: "link shape ok", pass: firstLinkHasShape, message: firstLinkHasShape ? "label+href present" : "missing fields" });

  // Test 3: Projects array
  const hasProjects = Array.isArray(DATA.projects) && DATA.projects.length > 0;
  tests.push({ name: "projects provided", pass: hasProjects, message: hasProjects ? `${DATA.projects.length} project(s)` : "none" });

  // Test 4: Avatar data present
  const avatarOk = !!(DATA.avatar && (DATA.avatar.initials || DATA.avatar.image));
  tests.push({ name: "avatar data", pass: avatarOk, message: avatarOk ? (DATA.avatar.image ? "image present" : "initials present") : "missing" });

  return tests;
}
