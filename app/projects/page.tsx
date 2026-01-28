'use client';
import { useEffect, useState } from 'react';
import { myProjects } from '../lib/placeholder-data';
import { VideoScreen3D } from '../components/video-screen3d';
import LogoCubesContainer from '../components/logo-cube-container';
import { hexToRgba } from '../utils/helpers';

const projectsCount = myProjects.length;

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(
    '/textures/project/project1.mp4',
  );

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
    document.title = 'Projects | Wseem Kharma';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Show projects made by the developer.');
    }
  }, []);

  return (
    <section className="c-space my-20 relative top-[100px] max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-12">
        <p className="head-text">My Projects</p>
      </div>

      {/* Enhanced Navigation Controls */}
      <div className="flex max-w-2xl mx-auto justify-between items-center mt-7">
        {/* Previous Button */}
        <button
          onClick={() => handleNavigation('previous')}
          aria-label="Previous project"
          className="
            group relative
            px-4 py-2 sm:px-6 sm:py-3
            bg-gradient-to-r from-gray-700 to-gray-800
            border border-gray-700
            rounded-xl
            transition-all duration-300
            
            hover:border-purple-500
            hover:shadow-lg hover:shadow-purple-500/20
            active:scale-95
            overflow-hidden
          "
        >
          <div className="relative flex items-center gap-2 sm:gap-3">
            <div
              className="
              w-6 h-6 sm:w-8 sm:h-8
              rounded-full
              border-2 border-gray-600
              group-hover:border-purple-400
              transition-all duration-300
              flex items-center justify-center
            "
            >
              <img
                src="/left-arrow.png"
                alt=""
                className="w-3 h-3 sm:w-4 sm:h-4 
                  group-hover:translate-x-[-2px] 
                  transition-transform duration-300"
              />
            </div>
            <span
              className="
              text-sm sm:text-base font-medium
              text-gray-300 group-hover:text-white
              transition-colors duration-300
            "
            >
              Previous
            </span>
          </div>
        </button>

        {/* Counter Indicator */}
        <div
          className="
          px-4 py-2
        
          
          rounded-lg
          text-sm font-mono
          text-gray-400
        "
        >
          <span className="text-purple-400">{selectedProjectIndex + 1}</span>
          <span className="mx-1">/</span>
          <span>{projectsCount}</span>
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleNavigation('next')}
          aria-label="Next project"
          className="
            group relative
            px-4 py-2 sm:px-6 sm:py-3
            bg-gradient-to-r from-gray-700 to-gray-800
            border border-gray-700
            rounded-xl
            transition-all duration-300
            
            hover:border-blue-500
            hover:shadow-lg hover:shadow-blue-500/20
            active:scale-95
            
            overflow-hidden
          "
        >
          <div
            className="
            absolute inset-0 
            bg-gradient-to-r from-blue-500/0 via-blue-500/20 to-blue-500/0
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
          "
          ></div>

          <div className="relative flex items-center gap-2 sm:gap-3">
            <span
              className="
              text-sm sm:text-base font-medium
              text-gray-300 group-hover:text-white
              transition-colors duration-300
            "
            >
              Next
            </span>
            <div
              className="
              w-6 h-6 sm:w-8 sm:h-8
              rounded-full
              border-2 border-gray-600
              group-hover:border-blue-400
              transition-all duration-300
              flex items-center justify-center
            "
            >
              <img
                src="/right-arrow.png"
                alt=""
                className="w-3 h-3 sm:w-4 sm:h-4 
                  group-hover:translate-x-[2px] 
                  transition-transform duration-300"
              />
            </div>
          </div>
        </button>
      </div>

      {/* Project Content Grid */}
      <div className="grid lg:grid-cols-2 grid-cols-1 mt-8 gap-6 w-full">
        {/* Project Info Card */}
        <div
          className="
            flex flex-col gap-6 
            relative 
            sm:p-10 py-10 px-5 
            shadow-2xl shadow-black-200 
            rounded-2xl
            backdrop-blur-sm
            border border-gray-800/50
          "
          style={{
            background: `linear-gradient(to bottom, ${hexToRgba(selectedProject.brandcolor, 0.4)}, transparent 20%, #0a0a0a)`,
          }}
        >
          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p
              className="
              text-white text-xl sm:text-2xl font-bold animatedText
              bg-clip-text text-transparent
              bg-gradient-to-r from-white to-gray-300
            "
            >
              {selectedProject.title}
            </p>
            <p
              className="
              animatedText 
              text-gray-300 leading-relaxed
              text-base sm:text-lg
            "
            >
              {selectedProject.desc}
            </p>
          </div>
          <div className="flex flex-col border-t border-gray-800/50 pt-4">
            <h4>Built with:</h4>
            <div
              className="
            flex items-center justify-between 
            flex-wrap gap-4 sm:gap-5 
            
          "
            >
              <LogoCubesContainer tags={selectedProject.tags} />

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <a
                  href={selectedProject.href}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  group relative
                  px-5 py-2.5 sm:px-6 sm:py-3
                  bg-gradient-to-r from-purple-600 to-purple-800
                  text-white font-medium
                  rounded-lg
                  transition-all duration-300
                  hover:from-purple-500 hover:to-purple-700
                  hover:shadow-lg hover:shadow-purple-500/30
                  active:scale-[0.98]
                  inline-flex items-center gap-2
                  w-full sm:w-auto justify-center sm:justify-start
                "
                >
                  <span>Live Site</span>
                  <svg
                    className="
                    w-4 h-4 
                    group-hover:translate-x-1 
                    transition-transform duration-300
                  "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>

                {selectedProject.hrefAdmin && (
                  <a
                    href={selectedProject.hrefAdmin}
                    target="_blank"
                    rel="noreferrer"
                    className="
                    group relative
                    px-5 py-2.5 sm:px-6 sm:py-3
                    bg-gradient-to-r from-blue-600 to-blue-800
                    text-white font-medium
                    rounded-lg
                    transition-all duration-300
                    hover:from-blue-500 hover:to-blue-700
                    hover:shadow-lg hover:shadow-blue-500/30
                    active:scale-[0.98]
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    inline-flex items-center gap-2
                    w-full sm:w-auto justify-center sm:justify-start
                  "
                  >
                    <span>Admin Panel</span>
                    <svg
                      className="
                      w-4 h-4 
                      group-hover:translate-x-1 
                      transition-transform duration-300
                    "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </a>
                )}
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  group relative
                  px-5 py-2.5 sm:px-6 sm:py-3
                  bg-gradient-to-r from-green-700 to-green-800
                  text-white font-medium
                  rounded-lg
                  transition-all duration-300
                  hover:from-green-600 hover:to-green-700
                  hover:shadow-lg hover:shadow-green
                  active:scale-[0.98]
                  inline-flex items-center gap-2
                  w-full sm:w-auto justify-center sm:justify-start
                "
                >
                  <span>Github Repo</span>
                  <svg
                    className="
                    w-4 h-4 
                    group-hover:translate-x-1 
                    transition-transform duration-300
                  "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Video Preview Card */}
        <div
          className="
            border border-gray-800/50
            md:h-full 
            flex items-center
            rounded-2xl
            overflow-hidden
            backdrop-blur-sm
            shadow-2xl shadow-black-200
          "
          style={{
            background: `linear-gradient(to top, ${hexToRgba(selectedProject.brandcolor, 0.4)}, transparent 20%, #0a0a0a)`,
          }}
        >
          <VideoScreen3D defaultVideo={currentVideo} />
        </div>
      </div>
    </section>
  );
};

export default Projects;
