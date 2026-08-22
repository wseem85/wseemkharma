'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';

const Footer = () => {
  const [whatsappIcon, setWhatsappIcon] = useState('/whatsapp-white.png');
  const [linkedinIcon, setLinkedinIcon] = useState('/linkedin-white.png');
  const t = useTranslations('footer');
  const navigation = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const itemVariants = {
    initial: { scale: 1, color: '#FFFFFF' },
    hover: {
      scale: 1.05,
      color: '#3B82F6',
      transition: { type: 'spring' as const, stiffness: 400 },
    },
    tap: { scale: 0.95 },
  };
  return (
    <section className="c-space my-20 bg-black-backtwo  text-white relative top-[100px]">
      <footer className="grid grid-cols-1 gap-10 border-b border-white/10 py-10 md:grid-cols-3 md:gap-10">
        <div className="text-center md:text-start">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="/logo.png"
              alt="Wseem Kharma logo"
              width={50}
              height={50}
            />
          </div>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-gray-400 md:mx-0">
            {t('about')}
          </p>
        </div>

        <nav aria-label={t('quickLinks')} className="text-center md:text-start">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t('quickLinks')}
          </h2>
          <div className="flex flex-col items-center gap-3 text-sm text-gray-400 md:items-start">
            <Link href="/" className="transition hover:text-white">
              {navigation('about')}
            </Link>
            <Link href="/projects" className="transition hover:text-white">
              {navigation('work')}
            </Link>
            <Link href="/services" className="transition hover:text-white">
              {navigation('services')}
            </Link>
            <Link href="/articles" className="transition hover:text-white">
              {navigation('articles')}
            </Link>
          </div>
        </nav>

        <div className="text-center md:text-start">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            {t('getInTouch')}
          </h2>
          <div className="mb-5 space-y-2 text-sm text-gray-400">
            <a
              href="mailto:engwseem2@gmail.com"
              className="block transition hover:text-white"
            >
              {t('email')}
            </a>
            <a
              href="tel:+963994875398"
              className="block transition hover:text-white"
            >
              {t('phone')}
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-5 md:justify-start">
            <a
              href="https://wa.me/963994875398"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
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
                  {t('whatsapp')}
                </motion.span>
              </motion.div>
            </a>

            {/* LinkedIn Link - Replace with your actual LinkedIn URL */}
            <a
              href="https://www.linkedin.com/in/wseemkharma/"
              target="_blank"
              rel="me noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
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
                  {t('linkedin')}
                </span>
              </motion.div>
            </a>

            <a
              href="https://github.com/wseem85"
              target="_blank"
              rel="me noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-blue-400"
            >
              <motion.div
                variants={itemVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="flex items-center gap-2"
              >
                <img src="/github.svg" alt="GitHub" width={24} height={24} />
                <span className="hover:text-blue-400 transition-colors">
                  {t('github')}
                </span>
              </motion.div>
            </a>
          </div>
        </div>
      </footer>
      <div className="flex items-center justify-center gap-4 pb-6 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} Wseem Kharma</span>
        <button
          type="button"
          onClick={() =>
            router.replace(pathname, { locale: locale === 'ar' ? 'en' : 'ar' })
          }
          className="text-red-groundlight transition hover:text-white"
        >
          {navigation('switchTo')}
        </button>
      </div>
    </section>
  );
};
export default Footer;
