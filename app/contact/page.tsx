'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import ProjectDiscoveryWizard from '../components/project-discovery-wizard';
import { textVariant } from '../utils/motion';
import {useTranslations} from 'next-intl';

const contactMethods = [
  {
    key: 'email',
    value: 'engwseem2@gmail.com',
    href: 'mailto:engwseem2@gmail.com',
    icon: '✉',
  },
  {
    key: 'phone',
    value: '+963 (994) 875398',
    href: 'tel:+963994875398',
    icon: '◉',
  },
];

const socialLinks = [
  { key: 'linkedin', href: 'https://www.linkedin.com/in/wseem-kharma-b82373265', icon: '/linkedin-white.png' },
  { key: 'github', href: 'https://github.com/wseem85', icon: '/github.svg' },
  { key: 'whatsapp', href: 'https://wa.me/963994875398', icon: '/whatsapp-white.png' },
  { key: 'telegram', href: 'https://t.me/Eng_WSEEM_KHARMA', icon: '/telegram-white.png' },
];

export default function ContactPage() {
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const t = useTranslations('pages');
  const contactT = useTranslations('contact');

  useEffect(() => {
    document.title = `${contactT('title')} | Wseem Kharma`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      contactT('description'),
    );
  }, []);

  const copy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="relative top-[100px] mx-auto my-12 max-w-7xl px-4 sm:my-16 sm:px-6 lg:my-20 lg:px-8" id="contact">
      <motion.div
        className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-groundlight">
          {t('contact')}
        </p>
        <h1 className="head-text mb-4">{contactT('title')}</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">
          {contactT('description')}
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-red-ground/30 bg-gradient-to-br from-red-ground/15 via-[#252526] to-[#1e1e1e] p-6 shadow-2xl sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-ground/10 blur-3xl" />
          <div className="relative">
            <span className="mb-6 inline-flex rounded-full border border-red-ground/40 bg-red-ground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-groundlight">
              {contactT('discovery')}
            </span>
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl">
              {contactT('discoveryTitle')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-300">
              {contactT('discoveryText')}
            </p>
            <button
              type="button"
              onClick={() => setIsWizardOpen(true)}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-lg bg-red-ground px-7 py-3 font-semibold tracking-wide text-white transition hover:scale-[1.02] hover:bg-red-groundlight active:scale-95"
            >
              {contactT('startBrief')} <span className="ms-3">{contactT('arrow')}</span>
            </button>
            <p className="mt-4 text-xs text-gray-500">{contactT('duration')}</p>
          </div>
        </motion.div>

        <motion.aside
          className="grid-container h-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <h2 className="grid-headtext">{contactT('information')}</h2>
          <p className="grid-subtext mt-2">
            {contactT('informationText')}
          </p>

          <div className="mt-7 space-y-3">
            {contactMethods.map((method) => (
              <div key={method.key} className="rounded-xl border border-white/10 bg-black/20 p-4 transition hover:border-red-ground/40">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold text-gray-400">{method.icon} {contactT(method.key)}</span>
                  <button type="button" onClick={() => copy(method.value)} className="text-xs text-red-groundlight hover:text-white">
                    {copied === method.value ? contactT('copied') : contactT('copy')}
                  </button>
                </div>
                <a href={method.href} className="mt-2 block break-all text-white transition hover:text-red-groundlight">
                  {method.value}
                </a>
              </div>
            ))}
          </div>

          <div className="my-7 h-px bg-white/10" />

          <div className="grid gap-3 text-sm text-gray-400 sm:grid-cols-2">
            <p><span className="text-white">{contactT('location')}</span><br />{contactT('worldwide')}</p>
            <p><span className="text-white">{contactT('availability')}</span><br />{contactT('weekdays')}<br />{contactT('replyTime')}</p>
          </div>

          <div className="mt-7">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">{contactT('connect')}</h3>
            <div className="grid grid-cols-4 gap-3">
              {socialLinks.map((social) => (
                <a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={contactT(`social.${social.key}`)} className="flex h-12 items-center justify-center rounded-xl border border-white/10 bg-black/20 transition hover:border-red-ground/50 hover:bg-red-ground/10">
                  <img src={social.icon} alt="" className="h-5 w-5 object-contain transition-transform hover:scale-110" />
                </a>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      {isWizardOpen && typeof document !== 'undefined' && createPortal(
        <ProjectDiscoveryWizard onClose={() => setIsWizardOpen(false)} />,
        document.body,
      )}
    </section>
  );
}
