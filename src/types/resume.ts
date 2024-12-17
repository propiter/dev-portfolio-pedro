export interface ResumeContact {
  email: string;
  phone: string;
  location: string;
  portfolio?: string;
}

export interface ResumeSkills {
  frontend: string[];
  backend: string[];
}

export interface ResumeExperience {
  role: string;
  company: string;
  period: string;
  achievements: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  period: string;
}

export interface ResumeData {
  name: string;
  title: string;
  contact: ResumeContact;
  skills: ResumeSkills;
  experience: ResumeExperience[];
  education: ResumeEducation[];
}