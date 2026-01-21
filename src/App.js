import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/NavBar';
import Header from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SpecialDelivery from './components/SpecialDelivery';

function App() {
  // Available Colours:
  // blue, cyan, gray, green, orange, pink, purple, red, teal, yellow

  // edit this variable to change the color theme
  const color = "teal";

  return (
    <Router>
      <Routes>
        {/* Hidden birthday surprise route */}
        <Route path="/mauli" element={<SpecialDelivery />} />

        {/* Main portfolio route */}
        <Route path="/" element={
          <>
            <Nav color={color} />
            <Header color={color} />
            <About color={color} />
            <Experience color={color} />
            <Projects color={color} />
            <Contact color={color} />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;

