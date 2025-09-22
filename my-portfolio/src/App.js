import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const sections = ["Home", "About", "Education", "Skills", "Projects", "Contact"];

export default function App() {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("Home");

  // Create refs for each section
  const sectionRefs = {
    Home: useRef(null),
    About: useRef(null),
    Education: useRef(null),
    Skills: useRef(null),
    Projects: useRef(null),
    Contact: useRef(null),
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Scroll to section smoothly and update active section
  const scrollToSection = (sectionName) => {
    setActiveSection(sectionName);
    if (sectionRefs[sectionName].current) {
      sectionRefs[sectionName].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // offset for header height
      let current = "Home";

      for (const section of sections) {
        const ref = sectionRefs[section];
        if (ref.current) {
          const offsetTop = ref.current.offsetTop;
          const offsetHeight = ref.current.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="App">
      <header className="header">
        <nav className="nav">
          {sections.map((section) => (
            <button
              key={section}
              className={`nav-button ${activeSection === section ? "active" : ""}`}
              onClick={() => scrollToSection(section)}
            >
              {section}
            </button>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title="Toggle dark/light mode"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </header>

      <main className="main-content">
        {/* Home Section with split layout */}
        <section className="section home" ref={sectionRefs.Home}>
          <div className="home-content">
            <h1>Welcome to My Portfolio</h1>
            <p>
              Hi! I'm a passionate student eager to learn and build amazing projects.
              I enjoy turning complex problems into simple, beautiful designs.
            </p>
            <p>
              Currently pursuing my degree while working on exciting projects that challenge my skills and expand my knowledge in web development and software engineering.
            </p>
            {/* Download CV Button */}
            <a href="/your-cv.pdf" download="Your_Name_CV.pdf" className="download-cv-button">
              Download CV
            </a>
          </div>
          <div className="home-image">
            <img
              src="/Image.jpg"
              alt="Portrait of a young developer smiling confidently"
              className="person-image"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="section about" ref={sectionRefs.About}>
          <h2>About Me</h2>
          <div className="about-content">
            <p>
              I am a dedicated computer science student with a passion for creating meaningful digital experiences.
              My journey in technology began with curiosity and has evolved into a pursuit of excellence in software development.
            </p>
            <p>
              I believe in continuous learning and staying updated with the latest industry trends.
              My approach combines technical expertise with creative problem-solving to deliver solutions that make a difference.
            </p>
            <p>
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.
            </p>
          </div>
        </section>

        {/* Education Section */}
        <section className="section education" ref={sectionRefs.Education}>
          <h2>Education</h2>
          <ul>
            <li>
              <strong>Bachelor of Science in Computer Science</strong> - XYZ University (2020 - Present)
            </li>
            <li>
              <strong>High School Diploma</strong> - ABC High School (2016 - 2020)
            </li>
          </ul>
        </section>

        {/* Skills Section */}
        <section className="section skills" ref={sectionRefs.Skills}>
          <h2>Skills</h2>
          <ul>
            <li>JavaScript / React / Node.js</li>
            <li>HTML5 / CSS3 / Sass</li>
            <li>Python / Data Analysis</li>
            <li>Git / GitHub / Agile</li>
          </ul>
        </section>

        {/* Projects Section */}
        <section className="section projects" ref={sectionRefs.Projects}>
          <h2>Projects</h2>
          <ul>
            <li>
              <strong>Portfolio Website</strong> - A personal portfolio built with React.
            </li>
            <li>
              <strong>Chat App</strong> - Real-time chat application using Socket.io.
            </li>
            <li>
              <strong>Data Visualizer</strong> - Python app for visualizing datasets.
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="section contact" ref={sectionRefs.Contact}>
          <h2>Contact Me</h2>
          <p>Email: rajaneeshrajju44@gmail.com</p>
          <p>Phone: +91 9148473256</p>
          <p>
            LinkedIn:{" "}
            <a href="https://linkedin.com/in/student" target="_blank" rel="noreferrer">
              linkedin.com/in/student
            </a>
          </p>
        </section>
      </main>

      {/* Background effects */}
      <div className="background-effects">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="bubble"></span>
        ))}
      </div>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Rajaneesh N. All rights reserved.</p>
      </footer>
    </div>
  );
}