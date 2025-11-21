export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string;
  impact: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  skills: {
    technical: string[];
    soft: string[];
  };
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
  links: {
    portfolio?: string;
    github?: string;
    linkedin?: string;
  };
}

export type TemplateType = "modern" | "professional" | "creative";
