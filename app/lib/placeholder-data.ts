// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
import freelancer from '@/public/assets/freelancer.png';
import shipcoIcon from '@/public/assets/shipcoIcon.png';

export const navLinks = [
  {
    id: 1,
    name: 'About',
    href: '/',
  },

  {
    id: 2,
    name: 'Selected Work',
    href: '/projects',
  },
  {
    id: 3,
    name: 'Services',
    href: '/services',
  },
];
export const myProjects = [
  {
    id: 'helioAi',
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
    id: 'artStore',
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
    id: 'tecTalk',
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
    id: 'shipco',
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
    id: 'freelanceWebDeveloper',
    icon: freelancer, // You'll need to provide/import this
    iconBg: '#ebebeb', // slate-800
  },
  {
    id: 'itAssistantManager',
    icon: shipcoIcon,
    iconBg: '#ebebeb', // sky-700
  },
  {
    id: 'itSupportEngineer',
    icon: shipcoIcon,
    iconBg: '#ebebeb',
  },
  {
    id: 'windowsNetworkAdministrator',
    icon: shipcoIcon,
    iconBg: '#ebebeb',
  },
  {
    id: 'freelanceGraphicDesigner',
    icon: freelancer,
    iconBg: '#ebebeb', // violet-600
  },
];
