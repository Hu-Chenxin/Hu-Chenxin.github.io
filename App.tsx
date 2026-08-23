import React from 'react';
import BootScreen from './components/BootScreen';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Footer from './components/Footer';
import { useReveal } from './hooks/useReveal';

const REVEAL_SELECTOR =
  '.section-title, .section-sub, .project-card, .footer-orbs, .footer-title';

const App: React.FC = () => {
  useReveal(REVEAL_SELECTOR);

  return (
    <>
      <BootScreen />
      <main>
        <Marquee />
        <Hero />
        <Projects />
        <Footer />
      </main>
    </>
  );
};

export default App;
