import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import CustomCursor from './components/CustomCursor';

import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';

function App() {
  return (
    <div className="relative min-h-screen">
      <CustomCursor />
      <Navbar />
      
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App;


