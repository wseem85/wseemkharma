'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ProjectDiscoveryWizard from '../components/project-discovery-wizard';
import { textVariant } from '../utils/motion';

type ServiceKey = 'website' | 'identity' | 'writing' | 'advice';
type SimpleService = ServiceKey | 'general';

const socialLinks = [
  { key: 'linkedin', href: 'https://www.linkedin.com/in/wseemkharma/', icon: '/linkedin-white.png' },
  { key: 'github', href: 'https://github.com/wseem85', icon: '/github.svg' },
  { key: 'whatsapp', href: 'https://wa.me/963994875398', icon: '/whatsapp-white.png' },
];

function SimpleMessageForm({ service, onClose }: { service: SimpleService; onClose: () => void }) {
  const t = useTranslations('services');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return setError(t('requiredFields'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError(t('invalidEmail'));
    setError('');
    setStatus('sending');
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'service-message', data: { service, name, email, message } }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('idle');
      setError(t('sendError'));
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="service-form-title">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-[#1e1e1e] p-6 shadow-2xl sm:p-8">
        <button type="button" onClick={onClose} aria-label={t('closeForm')} className="absolute end-4 top-3 rounded-full px-3 py-1 text-2xl text-gray-400 hover:bg-white/10 hover:text-white">×</button>
        {status === 'success' ? (
          <div className="py-8 text-center"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-ground/15 text-2xl">✓</div><h2 id="service-form-title" className="text-2xl font-bold text-white">{t('successTitle')}</h2><p className="mt-4 text-gray-300">{t('successText')}</p><button type="button" onClick={onClose} className="mt-7 rounded-lg bg-red-ground px-6 py-3 font-semibold text-white hover:bg-red-groundlight">{t('done')}</button></div>
        ) : (
          <form onSubmit={submit} className="space-y-5" noValidate>
            <h2 id="service-form-title" className="text-2xl font-bold text-white sm:text-3xl">{t('formTitle')}</h2>
            <p className="text-gray-400">{t('formDescription')}</p>
            <label className="block space-y-2"><span className="text-sm font-medium text-gray-200">{t('name')} *</span><input className="field-input" value={name} onChange={(event) => setName(event.target.value)} placeholder={t('namePlaceholder')} autoComplete="name" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-gray-200">{t('email')} *</span><input className="field-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={t('emailPlaceholder')} autoComplete="email" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium text-gray-200">{t('message')} *</span><textarea className="field-input min-h-32 resize-y" value={message} onChange={(event) => setMessage(event.target.value)} placeholder={t('messagePlaceholder')} /></label>
            {error && <p className="rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200" role="alert">{error}</p>}
            <button type="submit" disabled={status === 'sending'} className="w-full rounded-lg bg-red-ground px-5 py-3 font-semibold text-white transition hover:bg-red-groundlight disabled:opacity-60">{status === 'sending' ? t('sending') : t('send')}</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const contactT = useTranslations('contact');
  const [selectedService, setSelectedService] = useState<ServiceKey | null>(null);
  const [simpleService, setSimpleService] = useState<SimpleService | null>(null);

  useEffect(() => { document.title = `${t('title')} | Wseem Kharma`; }, [t]);

  return (
    <section className="relative top-[100px] mx-auto my-12 max-w-7xl px-4 sm:my-16 sm:px-6 lg:my-20 lg:px-8" id="services">
      <motion.div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14" variants={textVariant(0.2)} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-red-groundlight">{t('eyebrow')}</p>
        <h1 className="head-text mb-4">{t('title')}</h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg">{t('description')}</p>
      </motion.div>

      <div className="grid gap-5 md:grid-cols-2">
        {(['website', 'identity', 'writing', 'advice'] as ServiceKey[]).map((service, index) => (
          <motion.article key={service} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#29292a] to-[#1b1b1c] p-6 shadow-xl sm:p-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }} viewport={{ once: true }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-ground/10 blur-3xl transition group-hover:bg-red-ground/20" />
            <div className="relative flex flex-1 flex-col">
              <span className="mb-5 inline-flex w-fit rounded-full border border-red-ground/40 bg-red-ground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-groundlight">{t(`${service}.badge`)}</span>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">{t(`${service}.title`)}</h2>
              <p className="mt-4 flex-1 text-base leading-relaxed text-gray-300">{t(`${service}.description`)}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <button type="button" onClick={() => service === 'website' ? setSelectedService(service) : setSimpleService(service)} className="inline-flex min-h-11 items-center rounded-lg bg-red-ground px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight focus:outline-none focus:ring-2 focus:ring-red-groundlight focus:ring-offset-2 focus:ring-offset-[#1b1b1c]">
                  {t('request')} <span className="ms-3" aria-hidden="true">→</span>
                </button>
                {service === 'writing' && <a href="https://www.linkedin.com/in/wseemkharma/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-gray-300 underline decoration-white/20 underline-offset-4 transition hover:text-white hover:decoration-white">{t('readArticles')}</a>}
                {service === 'website' && <span className="text-xs text-gray-500">{t('websiteDuration')}</span>}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <motion.div className="rounded-2xl border border-red-ground/30 bg-red-ground/10 p-6 sm:p-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t('information')}</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-gray-300">{t('informationText')}</p>
          <button type="button" onClick={() => setSimpleService('general')} className="mt-7 inline-flex min-h-11 items-center rounded-lg bg-red-ground px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight">{t('sendMessage')} <span className="ms-3" aria-hidden="true">→</span></button>
        </motion.div>
        <motion.aside className="grid-container" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
          <h2 className="grid-headtext">{t('contactInfo')}</h2>
          <div className="mt-4 space-y-2 text-sm text-gray-400">
            <a href="mailto:engwseem2@gmail.com" className="block break-all transition hover:text-white">engwseem2@gmail.com</a>
            <a href="tel:+963994875398" className="block transition hover:text-white">+963 (994) 875398</a>
            <p>{t('location')}</p><p>{t('availability')}</p>
          </div>
          <div className="mt-6 grid grid-cols-4 gap-3">
            {socialLinks.map((social) => <a key={social.key} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={contactT(`social.${social.key}`)} className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 transition hover:border-red-ground/50 hover:bg-red-ground/10"><img src={social.icon} alt="" className="h-5 w-5 object-contain" /></a>)}
          </div>
        </motion.aside>
      </div>

      {selectedService && typeof document !== 'undefined' && createPortal(<ProjectDiscoveryWizard initialService={selectedService} onClose={() => setSelectedService(null)} />, document.body)}
      {simpleService && typeof document !== 'undefined' && createPortal(<SimpleMessageForm service={simpleService} onClose={() => setSimpleService(null)} />, document.body)}
    </section>
  );
}
