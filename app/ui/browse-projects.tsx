'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../components/button';

const BrowseProjects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 py-6 sm:py-8 lg:py-10 items-start sm:items-center justify-between px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-gray-200 shadow-sm  mx-4 sm:mx-6 lg:mx-8 relative top-[100px]"
    >
      <div className="flex-1 space-y-2 sm:space-y-3">
        <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight">
          Tired of talk? Let's show you the work.
        </p>
        <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
          Actions speak louder than words.
        </p>
      </div>

      <div className="w-full sm:w-auto">
        <Link href="/projects">
          <Button
            isBeam
            name="Browse Projects"
            containerClass="px-5 py-2.5 sm:px-6 sm:py-3
                  bg-gradient-to-r from-purple-600 to-purple-800
                  text-white font-medium
                  rounded-lg
                  transition-all duration-300
                  hover:from-purple-500 hover:to-purple-700
                  hover:shadow-lg hover:shadow-purple-500/30
                  active:scale-[0.98]
                  inline-flex items-center gap-2
                  w-full sm:w-auto justify-center sm:justify-start"
          />
        </Link>
      </div>
    </motion.div>
  );
};

export default BrowseProjects;
