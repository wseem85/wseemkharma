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
    title: 'Helio AI - Comprehensive AI-Powered Web Application',
    desc: 'Helio AI is a comprehensive AI-powered web application that offers multiple intelligent tools including content generation, image processing, and career assistance in a sleek, modern interface. The platform provides a suite of AI tools including articles generation, idea simplification, AI image creation, background removal, resume reviewing, and content transformation capabilities.',
    subdesc:
      'Built with a modern full-stack architecture featuring React with React Router on the frontend and Express.js on the backend. The application uses Tanstack Query for efficient data fetching, Clerk for secure authentication, and PostgreSQL with Neon for reliable database management. Styled with Tailwind CSS and deployed on Vercel, with comprehensive AI integration through OpenAI and other AI services for advanced content generation and image processing.',
    href: 'https://helio-ai-nu.vercel.app/',
    texture: '/textures/project/project5.mp4',
    brandcolor: '#366fff',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/logos/react.svg',
      },
      {
        id: 2,
        name: 'JavaScript',
        path: '/logos/javascript.svg',
      },
      {
        id: 3,
        name: 'Express.js',
        path: '/logos/express.png',
      },
      {
        id: 4,
        name: 'PostgreSQL',
        path: '/logos/postgresql.svg',
      },
      {
        id: 5,
        name: 'OpenAI',
        path: '/logos/openai1.png',
      },
      {
        id: 6,
        name: 'TailwindCSS',
        path: '/logos/tailwindcss.svg',
      },
      {
        id: 7,
        name: 'Tanstack Query',
        path: '/logos/tanstack.png',
      },
      {
        id: 8,
        name: 'Clerk',
        path: '/logos/clerk.png',
      },
    ],
  },
  {
    title:
      'NadaArt App & Admin Dashboard - Immersive Online Gallery & Marketplace',
    desc: "NadaArt is a comprehensive, full-stack e-commerce ecosystem designed to showcase and sell artwork. It features two distinct, dedicated applications: a customer-facing storefront and an administrative control dashboard. The main application allows users to seamlessly browse the artist's portfolio with advanced filtering by availability, size, and price. Customers can create accounts to manage personalized profiles, build and save shopping carts, and contribute to the community by rating and reviewing purchased artworks.",
    subdesc:
      'This modern platform is engineered with a powerful MERN (MongoDB, Express.js, React.js, Node.js) stack architecture. The frontend, built as a dynamic Single Page Application with React.js and React Router, is enhanced with sleek animations via Framer Motion. A separate, secure admin dashboard empowers the artist with full inventory control through intuitive CRUD operations. The backend, powered by Node.js and Express, provides robust RESTful APIs, handles secure JWT authentication, and ensures efficient, real-time database interactions with MongoDB.',
    href: 'https://nadaart.onrender.com',
    hrefAdmin: 'https://nadaart-admin.onrender.com',
    texture: '/textures/project/project1.mp4',

    brandcolor: '#257180',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/logos/react.svg',
      },
      {
        id: 2,
        name: 'Javascript',
        path: '/logos/javascript.svg',
      },
      {
        id: 3,
        name: 'Express',
        path: '/logos/express.png',
      },
      {
        id: 4,
        name: 'Mongodb',
        path: '/logos/mongodb.png',
      },
      {
        id: 5,
        name: 'Tailwindcss',
        path: '/logos/tailwindcss.svg',
      },
    ],
  },
  {
    title: 'My-MDB - Movies & Series App',
    desc: 'Movie & TV Show Explorer lets you search, track, and rate films/series with multi-platform ratings (IMDb, TMDB, Rotten Tomatoes). Save to watchlists, discover trending picks, and get detailed info—all powered by TMDB & OMDB APIs. Perfect for casual viewers and film buffs alike!',
    subdesc:
      'Built with React.js and React Router for seamless navigation, this app uses Redux Toolkit for state management, Axios for API calls, and Tailwind CSS for sleek styling',
    href: 'https://my-mdb-delta.vercel.app/',
    texture: '/textures/project/project2.mp4',

    brandcolor: '#3f51b5',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/logos/react.svg',
      },
      {
        id: 2,
        name: 'TailwindCSS',
        path: '/logos/tailwindcss.svg',
      },
      {
        id: 3,
        name: 'Javascript',
        path: '/logos/javascript.svg',
      },
      {
        id: 4,
        name: 'Redux Toolkit',
        path: '/logos/redux.png',
      },
    ],
  },
  {
    title: 'TecTalk',
    desc: 'TecTalk is a full-stack social platform where users can sign up via email, Google, or GitHub to join tech discussions. Users can create topics, publish posts, and engage with others by commenting on existing discussions. ',
    subdesc:
      'TecTalk is built with Next.js, leveraging its full-stack capabilities to handle server-side auth, API routes, and seamless frontend rendering. It features secure oAuth integration (Google/GitHub) via Next-Auth and credential login with bcrypt hashing, all backed by a Postgres database for reliable data storage.',
    href: 'https://tectalk.vercel.app/',
    texture: '/textures/project/project3.mp4',
    logo: '/project-logo3.png',

    brandcolor: '#7828c8',
    tags: [
      {
        id: 1,
        name: 'Next.js',
        path: '/logos/nextjs.png',
      },
      {
        id: 2,
        name: 'PostgreSQL',
        path: '/logos/postgresql.svg',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/logos/typescript.svg',
      },
      {
        id: 4,
        name: 'Tailwindcss',
        path: '/logos/tailwindcss.svg',
      },
      {
        id: 5,
        name: 'NextAuth',
        path: '/logos/nextauth.png',
      },
    ],
  },
  {
    title: 'Shipco',
    desc: 'Dynamic web app that showcases Shipco services, branches, and real-time pricing in one seamless platform. Clients can easily find contacts, and explore company network—all optimized for fast, mobile-friendly access.',
    subdesc:
      'This web app is built with React.js and React Router for a fast, dynamic experience. The UI is crafted using Material-UI components, icons, and charts for a polished look, while React Leaflet powers interactive branch maps. Modern, scalable, and user-friendly—all in one powerful platform.',
    href: 'https://www.shipcosyria.com.sy/',
    texture: '/textures/project/project4.mp4',

    brandcolor: '#043741',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/logos/react.svg',
      },
      {
        id: 2,
        name: 'Javascript',
        path: '/logos/javascript.svg',
      },
      {
        id: 3,
        name: 'ReactRouter',
        path: '/logos/react-router.svg',
      },
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
      'Build fullstack applications using Next.js (RSCs, Route Handlers, Server Actions) with PostgreSQL backends',
      'Develop responsive SPAs with React, implementing advanced state management solutions',
      'Create fullstack apps leveraging "Backend-as-a-Service" platforms like Supabase',
      'Collaborate in team environments to build reusable components and optimize performance',
      'Key Projects: TecTalk (Next.js forum), Shipco Website, Nadaart CMS, My-MDB movie app',
    ],
  },
  {
    title: 'IT Assistant Manager',
    company_name: 'Shipco Company',
    icon: shipcoIcon,
    iconBg: '#ebebeb', // sky-700
    date: 'July 2024 - Present',
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
