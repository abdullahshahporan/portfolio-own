const defaultData = {
  personal: {
    name: "Abdullah Md. ShahPoran",
    title: "Full-Stack Developer",
    subtitle: "Computer Science & Engineering Student | Tech Enthusiast",
    bio: "I'm a passionate Computer Science & Engineering student at Khulna University of Engineering & Technology (KUET), dedicated to exploring the vast landscape of technology. My interests span across software development, machine learning, and artificial intelligence, with a constant drive to learn and build innovative solutions.",
    avatar: "https://avatars.githubusercontent.com/u/140542566?v=4",
    resume: "#",
    location: "Khulna, Bangladesh",
    university: "Khulna University of Engineering & Technology (KUET)",
    department: "Computer Science & Engineering",
    email: "abdullahshahporan@gmail.com",
    phone: "",
  },
  social: {
    github: "https://github.com/abdullahshahporan",
    linkedin: "https://linkedin.com/in/abdullah-md-shahporan",
    facebook: "https://facebook.com/abdullahshahporan",
    instagram: "https://instagram.com/abdullahmd.shahporan",
    twitter: "",
    website: "https://sites.google.com/view/abdullahmdshahporan",
  },
  about: {
    description: "I'm a passionate Computer Science & Engineering student at Khulna University of Engineering & Technology (KUET), dedicated to exploring the vast landscape of technology. My interests span across software development, machine learning, and artificial intelligence, with a constant drive to learn and build innovative solutions.",
    highlights: [
      "Currently working on full-stack web and mobile applications",
      "Learning Machine Learning, AI, and advanced software architecture",
      "Open to collaborations on innovative projects",
      "Participated in BCF 2026 Hackathon"
    ],
    stats: [
      { label: "GitHub Repos", value: "36+" },
      { label: "Projects Completed", value: "15+" },
      { label: "Technologies", value: "20+" },
      { label: "Contributions", value: "197+" }
    ]
  },
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "C", level: 85 },
        { name: "C++", level: 80 },
        { name: "Java", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 75 },
        { name: "Python", level: 80 },
        { name: "Dart", level: 85 },
        { name: "PHP", level: 75 },
      ]
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "React.js", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "Node.js", level: 80 },
        { name: "Flutter", level: 85 },
        { name: "Laravel", level: 75 },
        { name: "Spring Boot", level: 70 },
        { name: "Tailwind CSS", level: 90 },
        { name: "Express.js", level: 80 },
      ]
    },
    {
      category: "Databases & Tools",
      items: [
        { name: "MongoDB", level: 80 },
        { name: "MySQL", level: 85 },
        { name: "Firebase", level: 75 },
        { name: "Git & GitHub", level: 90 },
        { name: "Figma", level: 70 },
        { name: "VS Code", level: 95 },
        { name: "Postman", level: 80 },
        { name: "Linux", level: 70 },
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "KUET CSE Automation Mobile App",
      description: "A comprehensive mobile application for automating various processes of the CSE department at KUET. Built with Flutter and Dart for cross-platform compatibility.",
      image: "",
      tags: ["Flutter", "Dart", "Firebase", "Mobile App"],
      github: "https://github.com/abdullahshahporan/KUET-CSE-Automation-Mobile--App",
      live: "",
      featured: true
    },
    {
      id: 2,
      title: "KUET CSE Automation Web Portal",
      description: "Web-based portal complementing the mobile app for KUET CSE department automation. Provides administrative interface and data management capabilities.",
      image: "",
      tags: ["Web", "Full-Stack", "React", "Node.js"],
      github: "https://github.com/abdullahshahporan/KUET-CSE-Automation-Web-Portal",
      live: "",
      featured: true
    },
    {
      id: 3,
      title: "AI-Based Income & Expense Tracker",
      description: "An intelligent expense tracking application with AI-powered insights and financial advice. Helps users manage their finances with smart categorization.",
      image: "",
      tags: ["JavaScript", "React", "AI", "Vercel"],
      github: "https://github.com/abdullahshahporan/AI-Based-Income-Expense",
      live: "https://expense-tracker-taupe-beta-86.vercel.app",
      featured: true
    },
    {
      id: 4,
      title: "MediHive - Medicine Tracking App",
      description: "A medicine tracking application built with Flutter to help users manage their medication schedules, set reminders, and track their health habits.",
      image: "",
      tags: ["Flutter", "Dart", "Healthcare", "Mobile"],
      github: "https://github.com/abdullahshahporan/MediHive",
      live: "",
      featured: true
    },
    {
      id: 5,
      title: "Blood Camp Management System",
      description: "A PHP-based web application for managing blood donation camps, donor registration, blood inventory, and camp scheduling with admin controls.",
      image: "",
      tags: ["PHP", "MySQL", "HTML/CSS", "Healthcare"],
      github: "https://github.com/abdullahshahporan/Blood-Camp-Management",
      live: "",
      featured: false
    },
    {
      id: 6,
      title: "Smart Agriculture System",
      description: "IoT-based smart agriculture monitoring system that helps farmers track soil moisture, temperature, and other environmental parameters for better crop management.",
      image: "",
      tags: ["IoT", "HTML", "Sensors", "Agriculture"],
      github: "https://github.com/abdullahshahporan/Smart-Agriculture-System",
      live: "",
      featured: true
    },
    {
      id: 7,
      title: "MRT Ticketing System",
      description: "A modern ticketing system for Mass Rapid Transit built with TypeScript. Features route planning, fare calculation, and digital ticket management.",
      image: "",
      tags: ["TypeScript", "Node.js", "Transport", "System Design"],
      github: "https://github.com/abdullahshahporan/mrt-ticketing-system",
      live: "",
      featured: false
    },
    {
      id: 8,
      title: "MediNexus",
      description: "A collaborative medical platform connecting healthcare providers and patients, built with Flutter for seamless cross-platform experience.",
      image: "",
      tags: ["Flutter", "Dart", "Healthcare", "Collaboration"],
      github: "https://github.com/abdullahshahporan/MediNexus",
      live: "",
      featured: false
    },
    {
      id: 9,
      title: "NID System Online Portal",
      description: "An online portal for National ID card management system built with Java OOP principles. Features citizen registration and ID verification.",
      image: "",
      tags: ["Java", "OOP", "Government", "Portal"],
      github: "https://github.com/abdullahshahporan/Nid_System_Online_Portal",
      live: "",
      featured: false
    },
    {
      id: 10,
      title: "Compiler Design Project",
      description: "A compiler implementation project in C, covering lexical analysis, parsing, and code generation phases of compilation.",
      image: "",
      tags: ["C", "Compiler", "Lexer", "Parser"],
      github: "https://github.com/abdullahshahporan/compiler",
      live: "",
      featured: false
    }
  ],
  education: [
    {
      id: 1,
      degree: "B.Sc. in Computer Science & Engineering",
      institution: "Khulna University of Engineering & Technology (KUET)",
      duration: "2022 - Present",
      description: "Studying core CS fundamentals including Data Structures, Algorithms, OOP, Database Systems, Software Engineering, Machine Learning, and more.",
      achievements: [
        "Active participation in hackathons and coding competitions",
        "BCF 2026 Hackathon Participant",
        "Open source contributions"
      ]
    }
  ],
  experience: [
    {
      id: 1,
      role: "Full-Stack Developer",
      company: "Freelance & Academic Projects",
      duration: "2023 - Present",
      description: "Developing full-stack web and mobile applications using modern technologies. Working on projects ranging from healthcare apps to automation systems.",
      responsibilities: [
        "Building responsive web applications with React & Next.js",
        "Developing cross-platform mobile apps with Flutter",
        "Implementing RESTful APIs with Node.js and Spring Boot",
        "Database design and management with MongoDB & MySQL"
      ]
    }
  ],
  services: [
    {
      id: 1,
      title: "Web Development",
      description: "Building responsive and modern web applications using React, Next.js, Node.js, and other cutting-edge technologies.",
      icon: "web"
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Creating cross-platform mobile applications with Flutter and Dart, delivering native-like performance on both iOS and Android.",
      icon: "mobile"
    },
    {
      id: 3,
      title: "Backend Development",
      description: "Designing and implementing robust backend systems with Node.js, Spring Boot, Laravel, and various database technologies.",
      icon: "backend"
    },
    {
      id: 4,
      title: "UI/UX Design",
      description: "Crafting intuitive and visually appealing user interfaces with Figma, ensuring excellent user experience across all platforms.",
      icon: "design"
    }
  ],
  customSections: [],
  web3formsKey: ""
};

export default defaultData;
