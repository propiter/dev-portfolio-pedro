import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Code2, FileText, User, Briefcase, BookOpen, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { path: '/', icon: Code2, label: 'Portfolio' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/experience', icon: Briefcase, label: 'Experience' },
    { path: '/projects', icon: BookOpen, label: 'Projects' },
    { path: '/guestbook', icon: MessageSquare, label: 'Guestbook' },
  ];

  return (
    <nav className="glassmorphism sticky top-0 z-50 py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="font-orbitron text-2xl text-neon-blue">
            Pedro Rodríguez
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-2 ${
                    isActive ? 'text-neon-blue' : ''
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-neon-blue"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {navItems.map(({ path, icon: Icon, label }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `nav-link flex items-center gap-2 py-2 ${
                    isActive ? 'text-neon-blue' : ''
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;