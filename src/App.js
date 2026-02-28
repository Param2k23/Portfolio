import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/NavBar';
import Header from './components/Hero';
import About from './components/About';
import Highlights from './components/Highlights';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PulseChatbot from './components/PulseChatbot';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const color = "brand";

  return (
    <Router>
      <div className="site-shell">
        <div className="hero-glow" />
        <div className="grain-overlay" />
        <ThemeToggle />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Nav color={color} />
                <Header color={color} />
                <About color={color} />
                <Highlights color={color} />
                <Experience color={color} />
                <Projects color={color} />
                <Contact color={color} />
                <Footer />
              </main>
            }
          />
        </Routes>
        <PulseChatbot color={color} />
      </div>
    </Router>
  );
}

export default App;

