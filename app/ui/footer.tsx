'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [whatsappIcon, setWhatsappIcon] = useState('/whatsapp-white.png');
  const [linkedinIcon, setLinkedinIcon] = useState('/linkedin-white.png');
  const [telegramIcon, setTelegramIcon] = useState('/telegram-white.png');
  const itemVariants = {
    initial: { scale: 1, color: '#FFFFFF' },
    hover: {
      scale: 1.05,
      color: '#3B82F6',
      transition: { type: 'spring', stiffness: 400 },
    },
    tap: { scale: 0.95 },
  };
  return (
    <section className="c-space my-20 bg-black-backtwo  text-white relative top-[100px]">
      <footer className="grid grid-cols-3  gap-6 place-items-center py-7 ">
        <div className="col-span-3 text-center">
          {' '}
          Wseem Kharma &copy; {new Date().getFullYear()}
        </div>

        <a
          href="https://wa.me/963994875398"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors col-span-3 xs:col-span-1 "
          onMouseEnter={() => setWhatsappIcon('/whatsapp-blue.png')}
          onMouseLeave={() => setWhatsappIcon('/whatsapp-white.png')}
        >
          <motion.div
            variants={itemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2"
          >
            <img
              src={whatsappIcon}
              alt="WhatsApp"
              width={24}
              height={24}
              className=""
            />
            <motion.span className="hover:text-blue-400 transition-colors">
              whatsapp
            </motion.span>
          </motion.div>
        </a>

        {/* LinkedIn Link - Replace with your actual LinkedIn URL */}
        <a
          href="https://www.linkedin.com/in/wseem-kharma-b82373265"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors col-span-3 xs:col-span-1"
          onMouseEnter={() => setLinkedinIcon('/linkedin-blue.png')}
          onMouseLeave={() => setLinkedinIcon('/linkedin-white.png')}
        >
          <motion.div
            variants={itemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2"
          >
            <img
              src={linkedinIcon}
              alt="LinkedIn"
              width={24}
              height={24}
              className=""
            />
            <span className="hover:text-blue-400 transition-colors">
              LinkedIn
            </span>
          </motion.div>
        </a>

        {/* Telegram Link - Replace USERNAME with your Telegram username */}
        <a
          href="https://t.me/Eng_WSEEM_KHARMA"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-blue-400 transition-colors col-span-3 xs:col-span-1"
          onMouseEnter={() => setTelegramIcon('/telegram-blue.png')}
          onMouseLeave={() => setTelegramIcon('/telegram-white.png')}
        >
          <motion.div
            variants={itemVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center gap-2"
          >
            <img
              src={telegramIcon}
              alt="Telegram"
              width={24}
              height={24}
              className=""
            />
            <span className="hover:text-blue-400 transition-colors">
              Telegram
            </span>
          </motion.div>
        </a>
      </footer>
    </section>
  );
};
export default Footer;
