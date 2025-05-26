'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '../components/button';
const BrowseProjects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className=" flex-col xs:flex-row gap-y-4 flex py-6 items-center justify-between px-8 bg-gradient-to-r from-blue-50 to-indigo-50   border border-gray-200  shadow-sm"
    >
      <div>
        <p className=" text-lg sm:text-xl font-semibold text-gray-800 ">
          Tired of talk? Let's show you the work.
        </p>
        <p className="text-gray-600  mt-1">Actions speak louder than words.</p>
      </div>
      <Link href="/projects">
        <Button
          isBeam
          name=" Browse Projects"
          containerClass="sm:w-fit w-full sm:min-w-96"
        ></Button>
      </Link>
    </motion.div>
  );
};

export default BrowseProjects;
