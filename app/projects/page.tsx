'use client';
import { useEffect, useState } from 'react';
import { myProjects } from '../lib/placeholder-data';

import { VideoScreen3D } from '../components/video-screen3d';
import LogoCubesContainer from '../components/logo-cube-container';
import { hexToRgba } from '../utils/helpers';
// import CanvasLoader from '../components/CanvasLoader';

// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Projects | Wseem Kharma',
// };
const projectsCount = myProjects.length;
const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState('');
  const selectedProject = myProjects[selectedProjectIndex];
  useEffect(() => {
    setCurrentVideo(selectedProject.texture);
  }, [selectedProjectIndex, selectedProject.texture]);
  const handleNavigation = (direction: string) => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? projectsCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectsCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };
  useEffect(() => {
    // Update title
    document.title = 'Projects | Wseem Kharma';

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Show projects made by the develope.');
    }
  }, []);
  return (
    <section className="c-space my-20 relative top-[100px]">
      <p className="head-text">My Work</p>
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div
          className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 "
          style={{
            background: `linear-gradient(to bottom,${hexToRgba(selectedProject.brandcolor, 0.4)},transparent 20%, black)`,
          }}
        >
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">
              {' '}
              {selectedProject.title}
            </p>
            <p className="animatedText">{selectedProject.desc}</p>
            <p className="animatedText">{selectedProject.subdesc}</p>
          </div>
          <div className="flex items-center justify-between flex-wrap gap-5">
            <LogoCubesContainer tags={selectedProject.tags} />
            <a
              className="flex items-center gap-2 cursor-pointer text-white-600"
              href={selectedProject.href}
              target="_blank"
              rel="noreferrer"
            >
              <p>Check Live Site</p>
              <img src="/arrow-up.png" className="w-3 h-3" alt="arrow" />
            </a>
          </div>
          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation('previous')}
            >
              <img
                src="/left-arrow.png"
                alt="left arrow "
                className="w-4 h-4"
              />
            </button>
            <button
              className="arrow-btn"
              onClick={() => handleNavigation('next')}
            >
              <img
                src="/right-arrow.png"
                alt="right arrow "
                className="w-4 h-4"
              />
            </button>
          </div>
        </div>
        <div
          className="border border-black-300  md:h-full flex items-center"
          style={{
            background: `linear-gradient(to top,${hexToRgba(selectedProject.brandcolor, 0.4)},transparent 20%, black)`,
          }}
        >
          <VideoScreen3D defaultVideo={currentVideo} />
        </div>
      </div>
    </section>
  );
};
export default Projects;
