const PortfolioData = require('../models/PortfolioData');

const portfolioData = {
  about: {
    name: "Kalpick Sharma",
    role: "Creative Designer & Frontend Developer",
    tagline: "Crafting sleek, user-friendly digital experiences with AI-driven design solutions.",
    contact: {
      phone: "+91-8810308974",
      email: "kalpicksharma@gmail.com",
      location: "Delhi, India"
    },
    avatar: {
      image: "/1ad91227420340fa8a847657a28393d3.jpg",
    },
    about: "Creative Designer & Frontend Developer crafting sleek, user-friendly digital experiences. Passionate prompt enthusiast exploring AI-driven design and interactive web solutions."
  },
  
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
    { label: "Portfolio", icon: "Globe", href: "https://kalpicksharma.netlify.app/" },
    { label: "GitHub", icon: "Github", href: "https://github.com/KalpickSharma" },
    { label: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/in/kalpick" },
    { label: "Email", icon: "Mail", href: "mailto:kalpicksharma@gmail.com" },
    { label: "Instagram", icon: "Instagram", href: "https://www.instagram.com/kalpicklogoarts/" }
  ],
  
  contact: {
    phone: "+91-8810308974",
    email: "kalpicksharma@gmail.com",
    location: "Delhi, India"
  }
};

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await PortfolioData.deleteMany({});
    console.log('🗑️ Cleared existing portfolio data');
    
    // Insert new data
    const dataToInsert = Object.entries(portfolioData).map(([type, content]) => ({
      type,
      content,
      lastUpdated: new Date(),
      version: 1
    }));
    
    await PortfolioData.insertMany(dataToInsert);
    console.log('✅ Successfully seeded portfolio data');
    
    // Verify data
    const count = await PortfolioData.countDocuments();
    console.log(`📊 Total portfolio sections: ${count}`);
    
    const sections = await PortfolioData.find({}, 'type');
    console.log('📋 Portfolio sections:', sections.map(s => s.type).join(', '));
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  require('dotenv').config();
  const connectDB = require('../config/database');
  
  connectDB().then(() => {
    seedDatabase().then(() => {
      console.log('🎉 Database seeding completed!');
      process.exit(0);
    });
  });
}

module.exports = { seedDatabase, portfolioData };
