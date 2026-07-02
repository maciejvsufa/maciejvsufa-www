/**
 * Źródło prawdy treści CV (DRY) — PL + EN.
 * Build: npm run build:cv (czyta cv/content.json).
 */
import raw from "../cv/content.json";

export type CvSkillGroup = {
  group: string;
  items: string[];
};

export type CvExperience = {
  period: string;
  role: string;
  company: string;
  context: string;
  bullets: string[];
};

export type CvProject = {
  name: string;
  desc: string;
  url?: string;
};

export type CvLocale = {
  lang: string;
  labels: {
    profile: string;
    experience: string;
    projects: string;
    education: string;
    skills: string;
    certificate: string;
    born: string;
    address?: string;
    remote: string;
    cooperation?: string;
  };
  header: {
    name: string;
    title: string;
    phone: string;
    email: string;
    website: string;
    websiteUrl: string;
    github?: string;
    githubUrl?: string;
    address: string;
    born: string;
  };
  summary: string;
  skills: CvSkillGroup[];
  experience: CvExperience[];
  projects: CvProject[];
  certificate: {
    name: string;
    issuer: string;
    year: string;
    desc: string;
  };
  education: {
    line: string;
  };
};

export type CvContent = {
  pl: CvLocale;
  en: CvLocale;
};

export const cvContent = raw as CvContent;
