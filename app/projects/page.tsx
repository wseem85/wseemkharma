'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { myProjects } from '../lib/placeholder-data';
import { VideoScreen3D } from '../components/video-screen3d';
import LogoCubesContainer from '../components/logo-cube-container';
import { hexToRgba } from '../utils/helpers';

const Projects = () => {
  const [notice, setNotice] = useState('');

  useEffect(() => {
    document.title = 'Selected Work | Wseem Kharma';
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      'Explore selected work by the developer.',
    );
  }, []);

  const handleGithubClick = (projectTitle: string, github: string) => {
    if (projectTitle.startsWith('Art Store')) {
      setNotice('The Art Store source code is private because the client did not approve sharing it.');
      window.setTimeout(() => setNotice(''), 5000);
      return;
    }
    if (github) window.open(github, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative top-[100px] mx-auto my-12 max-w-7xl px-4 pb-16 sm:my-16 sm:px-6 lg:my-20 lg:px-8">
      {notice && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed left-1/2 top-24 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 rounded-xl border border-red-ground/40 bg-[#252526] px-5 py-4 text-center text-sm text-gray-200 shadow-2xl shadow-black/40"
        >
          {notice}
        </motion.div>
      )}

      <motion.header
        className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-groundlight">
          Selected work
        </p>
        <h1 className="head-text">Projects that do the work.</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          A selection of products, platforms, and digital experiences built from
          idea to launch.
        </p>
      </motion.header>

      <div className="grid gap-7 lg:grid-cols-2">
        {myProjects.map((project, index) => (
          (() => {
            const adminHref =
              'hrefAdmin' in project && typeof project.hrefAdmin === 'string'
                ? project.hrefAdmin
                : undefined;

            return (
          <motion.article
            key={project.title}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-[#111214] shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-red-ground/40 hover:shadow-red-ground/10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            style={{
              background: `linear-gradient(145deg, ${hexToRgba(project.brandcolor, 0.18)}, #111214 42%, #0b0c0e)`,
            }}
          >
            <div className="relative overflow-hidden border-b border-white/10 px-3 pt-3 sm:px-5 sm:pt-5">
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background: `radial-gradient(circle at 50% 35%, ${hexToRgba(project.brandcolor, 0.3)}, transparent 58%)`,
                }}
              />
              <div className="absolute left-6 top-7 z-10 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-wider text-gray-300 backdrop-blur">
                {String(index + 1).padStart(2, '0')} / {String(myProjects.length).padStart(2, '0')}
              </div>
              <div className="relative flex min-h-[270px] items-center justify-center sm:min-h-[320px]">
                <VideoScreen3D defaultVideo={project.texture} />
              </div>
            </div>

            <div className="flex flex-col p-5 sm:p-7">
              <h2 className="text-xl font-bold leading-tight text-white sm:text-2xl">
                {project.title}
              </h2>
              <p className="mt-4 line-clamp-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                {project.desc}
              </p>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Built with
                </p>
                <LogoCubesContainer tags={project.tags} />
              </div>

              <div className="mt-7 flex flex-col gap-2 sm:flex-row">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-red-ground px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight hover:shadow-lg hover:shadow-red-ground/20 active:scale-95"
                >
                  View live site →
                </a>
                {adminHref && (
                  <a
                    href={adminHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-red-ground/60 hover:text-white active:scale-95"
                  >
                    Admin panel
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleGithubClick(project.title, project.github)}
                  disabled={!project.github && !project.title.startsWith('Art Store')}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/15 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-red-ground/60 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  GitHub repo
                </button>
              </div>
            </div>
          </motion.article>
            );
          })()
        ))}
      </div>
    </section>
  );
};

export default Projects;
