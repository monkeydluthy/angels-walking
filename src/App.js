import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import SpiritualRecovery from './pages/SpiritualRecovery';
import AngelCardReading from './pages/AngelCardReading';
import AddictionRecovery from './pages/AddictionRecovery';
import LifeCoaching from './pages/LifeCoaching';
import SelfCareQuiz from './pages/SelfCareQuiz';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Blog from './pages/Blog';

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/spiritual-recovery" element={<SpiritualRecovery />} />
            <Route path="/angel-card-reading" element={<AngelCardReading />} />
            <Route path="/addiction-recovery" element={<AddictionRecovery />} />
            <Route path="/life-coaching" element={<LifeCoaching />} />
            <Route path="/self-care-quiz" element={<SelfCareQuiz />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

export default App;
