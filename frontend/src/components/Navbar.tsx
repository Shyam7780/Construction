import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const isActive = (href: string) => location.pathname === '/' && location.hash === href;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 border-b">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1e3a5f] rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl">PB</span>
          </div>
          <span className="font-semibold text-2xl tracking-tight text-[#1e3a5f]">PremierBuild</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map(item => (
            <a key={item.label} href={item.href} className={`nav-link text-sm font-medium ${isActive(item.href) ? 'text-[#f59e0b]' : 'text-gray-700 hover:text-[#1e3a5f]'}`}>
              {item.label}
            </a>
          ))}
          <Link to="/admin" className="px-5 py-2.5 bg-[#1e3a5f] text-white text-sm font-medium rounded-lg hover:bg-[#162c48] transition">
            Admin Portal
          </Link>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 py-6 bg-white border-t flex flex-col gap-4">
          {navItems.map(item => (
            <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="py-2 text-gray-700">{item.label}</a>
          ))}
          <Link to="/admin" onClick={() => setIsOpen(false)} className="mt-2 px-5 py-3 bg-[#1e3a5f] text-white text-center rounded-lg">Admin Portal</Link>
        </div>
      )}
    </nav>
  );
}
