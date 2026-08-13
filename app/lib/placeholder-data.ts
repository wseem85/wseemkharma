// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import freelancer from '@/public/assets/freelancer.png';
import shipcoIcon from '@/public/assets/shipcoIcon.png';

export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },

  {
    id: 2,
    name: 'Selected Work',
    href: '/projects',
  },
  {
    id: 3,
    name: 'Contact',
    href: '/contact',
  },
];
export const myProjects = [
  {
    title: 'Helio AI - AI-Powered, Multi-language Web Application',
    desc: 'A comprehensive AI platform offering content generation, image processing, and career assistance tools. Users can generate articles, simplify complex ideas, create AI images, remove backgrounds, review resumes, and transform content—all in one sleek interface.',
    href: 'https://helio-ai-nu.vercel.app/',
    github: 'https://github.com/wseem85/helio.ai',
    texture: '/textures/project/project5.mp4',
    brandcolor: '#366fff',
    tags: [
      { id: 1, name: 'React.js', path: '/logos/react.svg' },
      { id: 2, name: 'JavaScript', path: '/logos/javascript.svg' },
      { id: 3, name: 'Express.js', path: '/logos/express.png' },
      { id: 4, name: 'PostgreSQL', path: '/logos/postgresql.svg' },
      { id: 5, name: 'OpenAI', path: '/logos/openai1.png' },
    ],
  },
  {
    title: 'Art Store - Immersive Online Gallery & Art Store',
    desc: 'A full-stack art e-commerce platform that gives an artist a complete online presence to showcase and sell original artwork, prints, and custom commissions. Includes secure Stripe payments, personalized user accounts, automated email responses, and an admin dashboard for managing inventory and orders.',
    href: 'https://nadakharma.com',

    github: '',
    texture: '/textures/project/project1.mp4',
    brandcolor: '#257180',
    tags: [
      { id: 1, name: 'Next.js', path: '/logos/nextjs.png' },
      { id: 2, name: 'Typescript', path: '/logos/typescript.svg' },
      { id: 3, name: 'Express', path: '/logos/express.png' },
      { id: 4, name: 'PostgreSQL', path: '/logos/postgresql.svg' },
    ],
  },

  {
    title: 'TecTalk - Tech Community Platform',
    desc: 'A social platform for tech enthusiasts to discuss topics, share knowledge, and connect. Users can sign up via email, Google, or GitHub, create discussion topics, publish posts, and engage through comments—all with secure authentication and real-time interactions.',
    href: 'https://tectalk.vercel.app/',
    github: 'https://github.com/wseem85/tectalk',
    texture: '/textures/project/project3.mp4',
    brandcolor: '#7828c8',
    tags: [
      { id: 1, name: 'Next.js', path: '/logos/nextjs.png' },
      { id: 2, name: 'PostgreSQL', path: '/logos/postgresql.svg' },
      { id: 3, name: 'TypeScript', path: '/logos/typescript.svg' },
      { id: 5, name: 'NextAuth', path: '/logos/nextauth.png' },
    ],
  },
  {
    title: 'Shipco - Logistics Services Platform',
    desc: "A dynamic web application showcasing Shipco's logistics services, branch locations, and real-time pricing. Clients can explore the company network, find contact information, and access service details—all optimized for fast, mobile-friendly access with interactive maps.",
    href: 'https://www.shipcosyria.com.sy/',
    github: 'https://github.com/wseem85/shipco-webapp',
    texture: '/textures/project/project4.mp4',
    brandcolor: '#043741',
    tags: [
      { id: 1, name: 'React.js', path: '/logos/react.svg' },
      { id: 3, name: 'React Router', path: '/logos/react-router.svg' },
      { id: 4, name: 'Material-UI', path: '/logos/materialui.png' },
    ],
  },
];
export const experiences = [
  {
    title: 'Freelance Web Developer',
    company_name: 'Independent Work',
    icon: freelancer, // You'll need to provide/import this
    iconBg: '#ebebeb', // slate-800
    date: 'May 2022 - Present',
    points: [
      'Designed and deployed production-ready SaaS applications using React, Next.js, Node.js, PostgreSQL, and cloud services',
      'Implemented authentication, authorization, subscription management, and recurring payment workflows.',
      'Built scalable REST APIs and backend services supporting file processing, AI integrations, and user-generated content.',
      'Improved application performance through caching strategies, lazy loading, and database query optimization.',
      'Built CI/CD pipelines and containerized deployments using Docker and GitHub Actions.',
      'Designed secure APIs following OWASP security best practices and conducted API security testing using Burp Suite and OWASP ZAP.',
    ],
  },
  {
    title: 'IT Assistant Manager',
    company_name: 'Shipco Company',
    icon: shipcoIcon,
    iconBg: '#ebebeb', // sky-700
    date: 'July 2024 - December 2025',
    points: [
      'Lead a team of 6 IT support staff, delegating tasks and providing technical guidance',
      'Oversee maintenance of IT infrastructure including servers, networks, and workstations',
      'Developed company website from scratch to modernize online presence',
      'Implement security best practices across all company systems',
    ],
  },
  {
    title: 'IT Support Engineer',
    company_name: 'Shipco Company',
    icon: shipcoIcon,
    iconBg: '#ebebeb',
    date: 'May 2016 - July 2024',
    points: [
      'Provided technical support for 50+ users across hardware, software and network systems',
      'Configured and maintained servers, firewalls, and network devices',
      'Monitored system performance and implemented efficiency improvements',
      'Trained junior IT staff and end-users on new technologies',
    ],
  },
  {
    title: 'Windows Network Administrator',
    company_name: 'Shipco Company',
    icon: shipcoIcon,
    iconBg: '#ebebeb',
    date: 'April 2013 - May 2016',
    points: [
      'Managed Windows server environment and Active Directory infrastructure',
      'Implemented backup and disaster recovery solutions',
      'Resolved complex network connectivity issues',
      'Maintained 100+ workstations across company locations',
    ],
  },
  {
    title: 'Freelance Graphic Designer',
    company_name: 'Independent Work',
    icon: freelancer,
    iconBg: '#ebebeb', // violet-600
    date: 'June 2018 - August 2020',
    points: [
      'Designed logos and brand guidelines for 20+ clients (avg. 8.1/10 rating)',
      'Created print/digital including business cards, brochures, and social media graphics',
      'Produced large-scale advertisements like highway billboards',
      'Developed comprehensive visual identities for diverse industries',
    ],
  },
];
