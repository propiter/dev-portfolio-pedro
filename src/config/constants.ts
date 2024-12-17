// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    PROJECTS: '/api/projects',
    GUESTBOOK: '/api/guestbook',
    AUTH: '/api/auth',
  },
  HEADERS: {
    JSON: { 'Content-Type': 'application/json' },
    MULTIPART: { 'Content-Type': 'multipart/form-data' },
  },
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  PROJECTS: '/projects',
  ABOUT: '/about',
  RESUME: '/resume',
  EXPERIENCE: '/experience',
  GUESTBOOK: '/guestbook',
} as const;

// Social links
export const SOCIAL_LINKS = {
  GITHUB: 'https://github.com/propiter',
  LINKEDIN: 'https://www.linkedin.com/in/pedrorodriguezortiz/',
  EMAIL: 'mailto:pro.pedro0413@gmail.com',
} as const;