import React, { useState, useEffect, useRef } from 'react';
import myPhoto from './assets/photo.jpg';
import animalPrint from './assets/animalprint.jpg'; 
import heroVideo from './assets/hero_animation.mp4';

const App = () => {
  const videoRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Track cursor coordinates relative to the viewport for the leopard-chrome effect
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // --- TYPING TRANSITION STATE EFFECT ---
  const phrases = ["HELLO!", "HI!", "HEY!", "WHAT'S THE TEA SIS?"];
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e) => {
      const xPercent = (e.clientX / window.innerWidth) * 100;
      const yPercent = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x: xPercent, y: yPercent });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Effect to manage the typewriter loop logic
  useEffect(() => {
    const fullPhrase = phrases[currentPhraseIdx];
    
    const handleType = () => {
      if (!isDeleting) {
        setDisplayedText(fullPhrase.substring(0, displayedText.length + 1));
        setTypingSpeed(100);

        if (displayedText === fullPhrase) {
          setTypingSpeed(1800); 
          setIsDeleting(true);
        }
      } else {
        setDisplayedText(fullPhrase.substring(0, displayedText.length - 1));
        setTypingSpeed(50);

        if (displayedText === "") {
          setIsDeleting(false);
          setCurrentPhraseIdx((prev) => (prev + 1) % phrases.length);
          setTypingSpeed(300);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentPhraseIdx, typingSpeed]);

  // Projects data
  const projects = [
    { 
      id: 1, 
      type: "Machine Learning/Deep Learning",
      year: "2026",
      title: "PISCES", 
      desc: "An innovative tool that combines machine learning and deep learning techniques to accurately classify fish diseases, providing a crucial resource for fish health management. It utilizes a hybrid ResNet-SVM model to identify these diseases.", 
      tags: ["ML/DL", "Python", "ResNet-SVM"], 
      link: "https://github.com/dmitresc/PISCES" 
    },
    { 
      id: 2, 
      type: "Machine Learning",
      year: "2025",
      title: "Suicide Text Detection", 
      desc: "A machine learning system that detects suicidal social media posts using Support Vector Machine (SVM) for accurate text classification and Logistic Regression as an interpretable baseline model with TF-IDF features.", 
      tags: ["NLP", "Scikit-learn", "SVM", "Logistic Regression", "TF-IDF"], 
      link: "https://github.com/Xzilleon2/Suicide-Detection" 
    },
    { 
      id: 3, 
      type: "AI/NLP",
      year: "2026",
      title: "AQUARIA", 
      desc: "An AI-driven chatbot designed to assist novice and beginner aquarists in setting up their fish tanks. It provides recommendations on tank specifications, appropriate food, and detailed information about various fish species.", 
      tags: ["Chatbot", "NLP", "AI"], 
      link: "https://github.com/dmitresc/Aquaria-AI" 
    },
    { 
      id: 4, 
      type: "WEB",
      year: "2025",
      title: "Tanked Up", 
      desc: "A fish pet shop web system that caters to all types of fish from various environments and aquatic animals.", 
      tags: ["Web Dev", "JavaScript"], 
      link: "https://github.com/dmitresc/Tanked-Up" 
    },
    { 
      id: 5, 
      type: "LUA",
      year: "2025",
      title: "Roblox Banking", 
      desc: "A banking system on Roblox, created using the LUA programming language in Roblox Studios for a programming languages project.", 
      tags: ["Lua", "Roblox", "Game Development"], 
      link: "https://github.com/dmitresc/Lua-RobloxBanking" 
    },
  ];

  const skillCategories = [
    {
      title: "LANGUAGES",
      skills: ["Python", "Java", "JavaScript", "Lua", "SQL"],
      accentColor: "text-purple-400 font-bold tracking-normal"
    },
    {
      title: "MACHINE LEARNING & AI",
      skills: [
        "Scikit-learn", "TensorFlow", "PyTorch", "Streamlit", "NumPy", 
        "Pandas", "Matplotlib", "Natural Language Processing (NLP)", 
        "Convolutional Neural Networks (CNNs)", "Model Evaluation", "Feature Engineering"
      ],
      accentColor: "text-purple-400 font-bold tracking-normal"
    },
    {
      title: "WEB FRAMEWORKS",
      skills: ["React", "Vite", "Tailwind CSS", "Bootstrap", "HTML", "CSS"],
      accentColor: "text-purple-400 font-bold tracking-normal"
    },
    {
      title: "TOOLS & DATABASES",
      skills: ["Git", "GitHub", "Figma", "MySQL", "Joblib"],
      accentColor: "text-purple-400 font-bold tracking-normal"
    }
  ];

  const certifications = [
    { title: "Information Technology Specialist in Databases", issuer: "Certiport", date: "2025" },
    { title: "Information Technology Specialist in HTML/CSS", issuer: "Certiport", date: "2026" },
  ];

  return (
    <div className="relative bg-[#0b0b0c] text-neutral-300 min-h-screen font-sans antialiased selection:bg-purple-900 selection:text-purple-200 overflow-x-hidden scroll-smooth">
      
      <style dangerouslySetInnerHTML={{__html: `
        html { scroll-behavior: smooth; }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .type-cursor {
          animation: blink 0.75s step-end infinite;
        }
      ` }} />

      {/* 50% OPACITY FIXED ANIMAL PRINT BACKGROUND IMAGE OVERLAY */}
      <div 
        className="fixed inset-0 opacity-50 pointer-events-none z-0 mix-blend-overlay bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${animalPrint})` }}
      />

      <div className="relative z-10">
        
        {/* FIXED NAVBAR */}
        <nav 
          className="fixed top-0 left-0 right-0 z-50 w-full px-6 sm:px-12 transition-all duration-300 ease-in-out border-b border-transparent"
          style={{
            backgroundColor: scrollY > 50 ? 'rgba(11, 11, 12, 0.95)' : 'rgba(11, 11, 12, 0.65)',
            backdropFilter: 'blur(16px)',
            borderColor: scrollY > 50 ? 'rgba(147, 51, 234, 0.25)' : 'rgba(38, 38, 38, 0.2)',
            paddingTop: scrollY > 50 ? '12px' : '20px',
            paddingBottom: scrollY > 50 ? '12px' : '20px',
            boxShadow: scrollY > 50 ? '0 10px 30px -10px rgba(0,0,0,0.7)' : 'none'
          }}
        >
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            
            <a href="#" className="text-white font-bold tracking-tight text-md hover:opacity-80 transition-opacity">
              Daniel Cott<span className="text-purple-500">.</span>
            </a>

            <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-medium uppercase tracking-widest text-neutral-400">
              <a href="#about" className="hover:text-white transition-colors duration-200"> ABOUT</a>
              <a href="#projects" className="hover:text-white transition-colors duration-200"> PROJECTS</a>
              <a href="#skills" className="hover:text-white transition-colors duration-200"> SKILLS</a>
              <a href="#certifications" className="hover:text-white transition-colors duration-200"> CERTIFICATIONS</a>
              <a href="#contact" className="hover:text-white transition-colors duration-200"> CONTACT</a>
            </div>

            <div>
              <a 
                href="https://github.com/dmitresc" 
                target="_blank" 
                rel="noreferrer" 
                className="text-xs font-medium tracking-wide bg-neutral-900 text-white border border-neutral-800 hover:bg-neutral-800 transition-all px-3 py-1.5 rounded"
              >
                GitHub
              </a>
            </div>

          </div>
        </nav>

        {/* LAYOUT BUFFER SPACER */}
        <div className="h-16 sm:h-20"></div>

        {/* 1. HERO SECTION */}
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-6 overflow-hidden">
          
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-45 mix-blend-screen z-0"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>

          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="absolute inset-x-0 top-12 flex justify-between px-12 text-xs tracking-[0.3em] text-neutral-600 uppercase font-mono z-10">
            <span>[ Daniel Cott // Portfolio ]</span>
            <span>[ System: Active ]</span>
          </div>

          <div className="text-center z-10 max-w-4xl relative">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-6 min-h-[110px] sm:min-h-[150px] flex items-center justify-center flex-wrap gap-x-4">
              <span className="text-white inline-block">
                {displayedText}
                <span className="type-cursor text-purple-500 font-light ml-1">|</span>
              </span> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-fuchsia-500 to-neutral-400 inline-block">
                I am Daniel Cott
              </span>
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg tracking-wide max-w-xl mx-auto font-light leading-relaxed">
              Elegance engineered. Innovation born from the digital abyss.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <a href="#projects" className="px-6 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-purple-500 hover:text-white transition-all duration-300 border border-white">
                Explore Vault
              </a>
            </div>
          </div>
        </section>

        {/* 2. ABOUT ME SECTION */}
        <section id="about" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-900/40 scroll-mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            
            <div className="md:col-span-2 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-[0.3em] text-purple-300 uppercase block mb-2">
                  01 / ABOUT ME
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-white">
                  About Me
                </h2>
              </div>
              
              <div className="text-neutral-300 font-light leading-relaxed text-md space-y-4 text-justify">
                <p>
                  I am a 3rd-year Computer Science student passionate about creating immersive digital experiences that blend creativity, technology, and user-centered design. I enjoy developing innovative software solutions, building interactive applications, and exploring emerging technologies that enhance how people interact with digital systems. While I have a particular interest in projects related to fisheries and aquatic environments, I am highly adaptable and eager to apply my skills across diverse industries and problem domains.
                </p>
                <p>
                  My primary focus is leveraging <strong className="text-white font-medium">Artificial Intelligence, Machine Learning, and Deep Learning</strong> to develop intelligent solutions for real-world challenges. Through research, experimentation, and continuous learning, I strive to transform complex data into meaningful insights and practical applications. My goal is to create scalable, impactful, and data-driven systems that not only solve problems efficiently but also contribute to technological innovation and societal progress.
                </p>
              </div>
            </div>
            
            {/* Interactive Photo Frame Container */}
            <div className="md:col-span-1 flex justify-center md:justify-end">
              <div className="relative max-w-[260px] w-full mt-2 group">
                
                <div 
                  className="absolute -inset-1.5 rounded-2xl opacity-90 blur-md transition-all duration-300 ease-out pointer-events-none mix-blend-screen"
                  style={{
                    background: `
                      radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(168,85,247,0.4) 0%, transparent 60%),
                      linear-gradient(${mousePos.x + mousePos.y}deg, #2e0854, #8b5cf6, #d946ef, #1e1b4b)
                    `
                  }}
                />

                <div 
                  className="absolute -inset-1 rounded-2xl transition-all duration-200 ease-out will-change-transform"
                  style={{
                    backgroundImage: `
                      linear-gradient(${135 + (mousePos.x - 50) * 0.4}deg, 
                        #4c1d95 0%, 
                        #a855f7 ${30 + (mousePos.y * 0.2)}%, 
                        #e9d5ff 50%, 
                        #d946ef ${70 - (mousePos.y * 0.2)}%, 
                        #2e1065 100%
                      )
                    `,
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
                  }}
                >
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-45 mix-blend-difference pointer-events-none invert font-mono text-[8px]"
                    style={{
                      backgroundImage: `
                        radial-gradient(circle at 35% 20%, transparent 4px, #000 5px, #000 8px, transparent 9px),
                        radial-gradient(circle at 75% 15%, transparent 3px, #000 4px, #000 7px, transparent 8px),
                        radial-gradient(circle at 15% 55%, transparent 4px, #000 5px, #000 9px, transparent 10px),
                        radial-gradient(circle at 85% 65%, transparent 5px, #000 6px, #000 10px, transparent 11px),
                        radial-gradient(circle at 50% 85%, transparent 3px, #000 4px, #000 8px, transparent 9px),
                        radial-gradient(circle at 45% 45%, transparent 5px, #000 6px, #000 9px, transparent 10px)
                      `,
                      backgroundSize: '45px 50px',
                      backgroundPosition: `${mousePos.x * 0.15}px ${mousePos.y * 0.15}px`,
                      filter: 'contrast(180%) brightness(120%)'
                    }}
                  />
                </div>
                
                <div className="relative rounded-xl overflow-hidden border border-neutral-900/90 bg-[#0d0d10] m-[3px]">
                  <img 
                    src={myPhoto} 
                    alt="Daniel Cott" 
                    className="object-cover w-full aspect-[4/5] shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. PROJECTS */}
        <section id="projects" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-900/40 scroll-mt-24">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-[0.3em] text-purple-300 uppercase block mb-2">
              02 / PROJECTS
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Projects from GitHub
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id} 
                className="bg-[#131316] rounded-xl p-6 border border-neutral-800/60 shadow-lg shadow-purple-950/5 flex flex-col justify-between hover:border-purple-900/60 transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                      {project.type} / {project.year}
                    </span>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-neutral-400 hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.08-.06.08-.06 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                      </svg>
                    </a>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                    <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-purple-400 transition-colors">
                      {project.title}
                    </a>
                  </h3>
                  <p className="text-neutral-400 text-sm font-light leading-relaxed mb-6 text-justify">
                    {project.desc}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-900">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono font-medium tracking-wide bg-purple-950/20 text-purple-300 border border-purple-900/30 px-2.5 py-1 rounded">
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SKILLS */}
        <section id="skills" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-900/40 scroll-mt-24">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-[0.3em] text-purple-300 uppercase block mb-2">
              03 / SKILLS
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              My toolkit.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat, index) => (
              <div 
                key={index} 
                className="bg-[#131316] border border-neutral-800/60 rounded-xl p-6 shadow-md"
              >
                <h3 className={`text-xs font-mono tracking-widest uppercase mb-4 ${cat.accentColor}`}>
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="text-xs bg-[#0b0b0c] text-neutral-300 border border-neutral-800/80 px-3 py-1.5 rounded font-mono tracking-wide shadow-inner"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICATIONS */}
        <section id="certifications" className="py-20 px-6 max-w-5xl mx-auto border-b border-neutral-900/40 scroll-mt-24">
          <div className="mb-10">
            <span className="text-xs font-mono tracking-[0.3em] text-purple-300 uppercase block mb-2">
              04 / CREDENTIALS
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-white">
              Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="absolute right-0 bottom-0 opacity-5 text-neutral-700 select-none font-mono text-7xl font-black pointer-events-none tracking-tighter">
              W I L D
            </div>
            {certifications.map((cert, index) => (
              <div key={index} className="p-5 bg-[#131316] border-l-2 border-purple-500 border-y border-r border-neutral-800/60 rounded-r-xl flex justify-between items-center shadow-md">
                <div>
                  <h4 className="text-md font-bold text-neutral-200">{cert.title}</h4>
                  <p className="text-xs text-neutral-500 font-mono mt-1">{cert.issuer} • Verified Certificate</p>
                </div>
                <div className="text-xs font-mono text-purple-400 bg-purple-950/30 px-3 py-1 border border-purple-900/40 rounded">
                  {cert.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. CONTACT */}
        <section id="contact" className="py-24 px-6 max-w-2xl mx-auto text-center scroll-mt-24">
          <span className="text-xs font-mono tracking-[0.3em] text-purple-300 uppercase block mb-2">
            05 / CONNECT
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-white uppercase mb-4">
            Let's Work Together
          </h2>
          <p className="text-neutral-400 text-sm font-light leading-relaxed max-w-md mx-auto mb-8">
           If you're looking for someone adaptable, swift, and passionate at building innovative solutions, I'd love to hear from you!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            
            <a 
              href="mailto:danielcottgerarman10@gmail.com" 
              className="group flex items-center gap-3 bg-[#131316] border border-neutral-800/80 hover:border-purple-500/50 hover:bg-[#18181c] px-5 py-3 rounded-xl font-mono text-xs sm:text-sm tracking-wider text-purple-300 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              <span className="text-neutral-200 group-hover:text-white transition-colors">danielcottgerarman10@gmail.com</span>
            </a>

            <a 
              href="https://github.com/dmitresc" 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-center gap-3 bg-[#131316] border border-neutral-800/80 hover:border-purple-500/50 hover:bg-[#18181c] px-5 py-3 rounded-xl font-mono text-xs sm:text-sm tracking-wider text-purple-300 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.08-.06.08-.06 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              <span className="text-neutral-200 group-hover:text-white transition-colors">dmitresc</span>
            </a>

          </div>

          <footer className="mt-24 text-[10px] font-mono text-neutral-600 tracking-widest uppercase">
            © 2026 Daniel Cott. All rights reserved. Built with React + Vite + Tailwind CSS.
          </footer>
        </section>
      </div>

    </div>
  );
};

export default App;