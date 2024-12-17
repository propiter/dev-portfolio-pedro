import { Routes, Route } from 'react-router-dom';
import Portfolio from '../pages/Portfolio';
import Resume from '../pages/Resume';
import About from '../pages/About';
import Experience from '../pages/Experience';
import Projects from '../pages/Projects';
import Guestbook from '../pages/Guestbook';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/about" element={<About />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/guestbook" element={<Guestbook />} />
    </Routes>
  );
};

export default AppRoutes;