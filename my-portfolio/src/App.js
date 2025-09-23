import React, { useState, useEffect, useRef } from "react";
import { FaInstagram, FaGithub, FaLinkedin, FaJsSquare, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaPython, FaGitAlt, FaAws, FaJava } from "react-icons/fa";
import { SiSass, SiNpm, SiDevpost } from "react-icons/si";
import emailjs from "@emailjs/browser";
import "./App.css";

const sections = ["Home", "About", "Education", "Skills", "Projects", "Contact"];

export default function App() {
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("Home");
  const [formStatus, setFormStatus] = useState(""); // For contact form feedback

  // EmailJS Configuration - Replace with your actual keys
  const SERVICE_ID = "YOUR_SERVICE_ID"; // e.g., "service_abc123"
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // e.g., "template_def456"
  const USER_ID = "YOUR_USER_ID"; // e.g., "user_ghi789"

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

  // Contact form submit handler
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
      .then((result) => {
        console.log(result.text);
        setFormStatus("Message sent successfully!");
        e.target.reset();
      }, (error) => {
        console.log(error.text);
        setFormStatus("Failed to send message. Please try again.");
      });
  };

  // Projects data (expand as needed)
  const projects = [
    {
      title: "Portfolio Website",
      image: "/project1.jpg", // Replace with actual image
      description: "A personal portfolio built with React and modern CSS.",
      link: "https://github.com/yourusername/portfolio"
    },
    {
      title: "Chat App",
      image: "/project2.jpg", // Replace with actual image
      description: "Real-time chat application using Socket.io and Node.js.",
      link: "https://github.com/yourusername/chatapp"
    },
    {
      title: "Data Visualizer",
      image: "/project3.jpg", // Replace with actual image
      description: "Python app for visualizing datasets with interactive charts.",
      link: "https://github.com/yourusername/dataviz"
    }
  ];

  // Skills data with icons
  const skills = [
    { name: "JavaScript", icon: <FaJsSquare size={40} /> },
    { name: "React", icon: <FaReact size={40} /> },
    { name: "AWS", icon: <FaAws size={40} /> },
    { name: "HTML", icon: <FaHtml5 size={40} /> },
    { name: "CSS", icon: <FaCss3Alt size={40} /> },
    { name: "Java", icon: <FaJava size={40} /> },
    { name: "DevOps", icon: <SiDevpost size={40} /> },
    { name: "Python", icon: <FaPython size={40} /> },
    { name: "Git", icon: <FaGitAlt size={40} /> }
  ];

  // Education data
  const education = [
    {
      degree: "Bachelor of Engineering in Information Science",
      institution: "Yenepoya Institute of Technology",
      years: "2021 - 2025",
      percentage:"GPA: 8.0",
      description: "Graduated degree with focus on web development and AI."
    },
    {
      degree: "Pre-University College",
      institution: "Acharya PU College",
      years: "2019 - 2021",
      percentage: "79.33%",
      // description: "Graduated with honors in Mathematics and Science."
    },
    {
      degree: "High School",
      institution: "St Treasa High School",
      years: "2019",
      percentage:"81.92%",
      description: "Graduated with honors in Mathematics and Science."
    }
  ];

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
            {/* Buttons */}
            <div className="home-buttons">
              <a href="/your-cv.pdf" download="Your_Name_CV.pdf" className="download-cv-button">
                Download CV
              </a>
              <a href="https://linkedin.com/in/student" target="_blank" rel="noreferrer" className="hire-me-button">
                Hire Me
              </a>
            </div>
          </div>
          <div className="home-image">
            <img
              src="/Image.jpg"
              alt="Portrait of a young developer smiling confidently"
              className="person-image"
            />
            {/* Social Icons under image */}
            <div className="social-icons">
              <a href="https://instagram.com/yourusername" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram size={30} />
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub size={30} />
              </a>
              <a href="https://linkedin.com/in/student" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin size={30} />
              </a>
            </div>
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

        {/* Education Section - Timeline Style */}
        <section className="section education" ref={sectionRefs.Education}>
          <h2>Education</h2>
          <div className="education-timeline">
            {education.map((edu, index) => (
              <div key={index} className="education-card">
                <div className="education-icon">🎓</div>
                <div className="education-details">
                  <h3>{edu.degree}</h3>
                  <h4>{edu.institution}</h4>
                  <p className="years">{edu.years}</p>
                  <span className="education-percentage">{edu.percentage}</span>
                  <p>{edu.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section - With Icons */}
        <section className="section skills" ref={sectionRefs.Skills}>
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon">{skill.icon}</div>
                <p>{skill.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section - Side by Side Cards */}
        <section className="section projects" ref={sectionRefs.Projects}>
          <h2>Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-frame">
                  <img src={project.image} alt={project.title} className="project-image" />
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <a href={project.link} target="_blank" rel="noreferrer" className="read-more-button">
                      Read More
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - With Form */}
        <section className="section contact" ref={sectionRefs.Contact}>
          <h2>Contact Me</h2>
          <div className="contact-info">
            <p>Email: rajaneeshrajju44@gmail.com</p>
            <p>Phone: +91 9148473256</p>
            <p>
              LinkedIn:{" "}
              <a href="https://linkedin.com/in/student" target="_blank" rel="noreferrer">
                linkedin.com/in/student
              </a>
            </p>
          </div>
          <form onSubmit={sendEmail} className="contact-form">
            <input type="text" name="user_name" placeholder="Your Name" required />
            <input type="email" name="user_email" placeholder="Your Email" required />
            <input type="tel" name="user_phone" placeholder="Your Phone Number" required />
            <textarea name="message" placeholder="Your Message" rows="5" required />
            <button type="submit" className="submit-button">Send Message</button>
            {formStatus && <p className={`form-status ${formStatus.includes('success') ? 'success' : 'error'}`}>{formStatus}</p>}
          </form>
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