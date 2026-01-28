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
    name: 'Projects',
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
      { id: 6, name: 'TailwindCSS', path: '/logos/tailwindcss.svg' },
      { id: 7, name: 'Tanstack Query', path: '/logos/tanstack.png' },
      { id: 8, name: 'Clerk', path: '/logos/clerk.png' },
    ],
  },
  {
    title: 'NadaArt - Immersive Online Gallery & Marketplace',
    desc: 'A full-stack e-commerce ecosystem for artists to showcase and sell artwork. Features advanced filtering by availability, size, and price, personalized user profiles, shopping carts, and community reviews. Includes a separate admin dashboard for inventory management and CRUD operations.',
    href: 'https://nadaart.onrender.com',
    hrefAdmin: 'https://nadaart-admin.onrender.com',
    github: 'https://github.com/wseem85/nadaart-website',
    texture: '/textures/project/project1.mp4',
    brandcolor: '#257180',
    tags: [
      { id: 1, name: 'React.js', path: '/logos/react.svg' },
      { id: 2, name: 'JavaScript', path: '/logos/javascript.svg' },
      { id: 3, name: 'Express', path: '/logos/express.png' },
      { id: 4, name: 'MongoDB', path: '/logos/mongodb.png' },
      { id: 5, name: 'TailwindCSS', path: '/logos/tailwindcss.svg' },
      { id: 6, name: 'Framer Motion', path: '/logos/framer.png' },
    ],
  },
  {
    title: 'My-MDB - Movies & Series Explorer',
    desc: "A movie and TV show discovery app that aggregates ratings from IMDb, TMDB, and Rotten Tomatoes. Users can search, save to watchlists, track what they've watched, and discover trending content—all powered by TMDB & OMDB APIs.",
    href: 'https://my-mdb-delta.vercel.app/',
    github: 'https://github.com/wseem85/my-mdb',
    texture: '/textures/project/project2.mp4',
    brandcolor: '#3f51b5',
    tags: [
      { id: 1, name: 'React.js', path: '/logos/react.svg' },
      { id: 2, name: 'TailwindCSS', path: '/logos/tailwindcss.svg' },
      { id: 3, name: 'JavaScript', path: '/logos/javascript.svg' },
      { id: 4, name: 'Redux Toolkit', path: '/logos/redux.png' },
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
      { id: 4, name: 'TailwindCSS', path: '/logos/tailwindcss.svg' },
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
      { id: 2, name: 'JavaScript', path: '/logos/javascript.svg' },
      { id: 3, name: 'React Router', path: '/logos/react-router.svg' },
      { id: 4, name: 'Material-UI', path: '/logos/materialui.png' },
      { id: 5, name: 'React Leaflet', path: '/logos/leaflet.png' },
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
      'Create backend apps Using Node.js, Express, MongoDB or PostgreSQL, with RESTful APIs and JWT authentication',
      'Develop responsive SPAs with React, implementing advanced state management solutions',
      'Build fullstack applications using Next.js (RSCs, Route Handlers, Server Actions) with PostgreSQL backends',
      'Collaborate in team environments to build reusable components and optimize performance',
      'Key Projects: Helio.ai, TecTalk (Next.js forum), Shipco Website, Nadaart , My-MDB movie app',
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
