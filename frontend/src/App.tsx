import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import EstimateCalculator from './components/EstimateCalculator';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import InquiryForm from './components/InquiryForm';
import Admin from './pages/Admin';

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <InquiryForm />
      <EstimateCalculator />
      <Testimonials />
      <footer className="bg-[#1e3a5f] text-white/70 py-16 text-center text-sm tracking-widest">© {new Date().getFullYear()} PREMIERBUILD CONSTRUCTION — LOS ANGELES</footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

