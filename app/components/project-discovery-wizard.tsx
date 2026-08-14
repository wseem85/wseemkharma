'use client';

import { useEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type WizardValue = string | string[];
type WizardData = Record<string, WizardValue>;

const steps = [
  'projectType',
  'projectDetails',
  'features',
  'pages',
  'languages',
  'design',
  'technical',
  'timeline',
  'contact',
  'review',
];

const projectTypes = [
  'business', 'ecommerce', 'saas', 'portfolio', 'corporate', 'redesign', 'custom', 'notSure',
];

const featureGroups = {
  basic: ['contactForm', 'newsletter', 'blog', 'imageGallery', 'testimonials', 'faq', 'maps'],
  business: ['userAccounts', 'adminDashboard', 'booking', 'search', 'advancedForms', 'customerDashboard', 'multipleLocations'],
  ecommerce: ['productCatalog', 'shoppingCart', 'payments', 'orders', 'customerAccounts', 'discounts', 'inventory', 'shipping'],
  advanced: ['saas', 'apiIntegrations', 'thirdParty', 'aiFeatures', 'realtime', 'customDatabase', 'customAdmin', 'automatedWorkflows'],
};

const toggleValue = (data: WizardData, key: string, value: string): WizardData => {
  const current = Array.isArray(data[key]) ? data[key] : [];
  return {
    ...data,
    [key]: current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value],
  };
};

const value = (data: WizardData, key: string) =>
  typeof data[key] === 'string' ? data[key] : '';

const listValue = (data: WizardData, key: string) =>
  Array.isArray(data[key]) ? data[key] : [];

const Choice = ({
  label,
  description,
  selected,
  fieldName,
  invalid = false,
  onClick,
}: {
  label: string;
  description?: string;
  selected: boolean;
  fieldName?: string;
  invalid?: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    data-wizard-field={fieldName}
    className={`rounded-xl border p-4 text-left transition-all ${
      selected
        ? 'border-red-ground bg-red-ground/10 text-white shadow-lg shadow-red-ground/10'
        : invalid
          ? 'border-red-400/80 bg-red-400/10 text-gray-300'
          : 'border-white/10 bg-black/20 text-gray-300 hover:border-white/30 hover:bg-white/5'
    }`}
  >
    <span className="flex items-center justify-between gap-3 font-semibold">
      {label}
      <span className={`h-3 w-3 rounded-full border ${selected ? 'border-red-ground bg-red-ground' : 'border-gray-500'}`} />
    </span>
    {description && <span className="mt-1 block text-sm leading-relaxed text-gray-400">{description}</span>}
  </button>
);

const Field = ({
  label,
  name,
  value: fieldValue,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  invalid = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  invalid?: boolean;
}) => (
  <label className="block space-y-2">
    <span className="text-sm font-medium text-gray-200">{label}{required && ' *'}</span>
    <input
      data-wizard-field={name}
      aria-invalid={invalid}
      name={name}
      type={type}
      value={fieldValue}
      onChange={(event) => onChange(name, event.target.value)}
      placeholder={placeholder}
      required={required}
      className={`field-input ${invalid ? 'border-red-400 ring-1 ring-red-400/40' : ''}`}
    />
  </label>
);

const TextField = ({
  label,
  name,
  value: fieldValue,
  onChange,
  placeholder,
  required = false,
  invalid = false,
}: Omit<ComponentProps<typeof Field>, 'type'>) => (
  <label className="block space-y-2">
    <span className="text-sm font-medium text-gray-200">{label}{required && ' *'}</span>
    <textarea
      data-wizard-field={name}
      aria-invalid={invalid}
      name={name}
      value={fieldValue}
      onChange={(event) => onChange(name, event.target.value)}
      placeholder={placeholder}
      required={required}
      rows={4}
      className={`field-input resize-none ${invalid ? 'border-red-400 ring-1 ring-red-400/40' : ''}`}
    />
  </label>
);

const ProjectDiscoveryWizard = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations('wizard');
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WizardData>({ features: [], pages: [], languages: [], references: [], integrations: [] });
  const [error, setError] = useState('');
  const [invalidField, setInvalidField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const setField = (name: string, fieldValue: WizardValue) => {
    setData((current) => ({ ...current, [name]: fieldValue }));
    setError('');
    setInvalidField(null);
  };

  const validateStep = () => {
    if (step === 0 && !value(data, 'projectType')) return { field: 'projectType', message: t('validation.projectType') };
    if (step === 1 && !value(data, 'goal').trim()) return { field: 'goal', message: t('validation.goal') };
    if (step === 2 && !listValue(data, 'features').length && !value(data, 'otherFeatures').trim()) return { field: 'features', message: t('validation.feature') };
    if (step === 3 && !value(data, 'pageRange')) return { field: 'pageRange', message: t('validation.pages') };
    if (step === 4 && !value(data, 'languageCount')) return { field: 'languageCount', message: t('validation.languagePlan') };
    if (step === 4 && !listValue(data, 'languages').length) return { field: 'languages', message: t('validation.language') };
    if (step === 5 && !value(data, 'design')) return { field: 'design', message: t('validation.design') };
    if (step === 6 && !value(data, 'technology').trim()) return { field: 'technology', message: t('validation.technology') };
    if (step === 7 && !value(data, 'timeline')) return { field: 'timeline', message: t('validation.timeline') };
    if (step === 7 && !value(data, 'budget')) return { field: 'budget', message: t('validation.budget') };
    if (step === 8) {
      if (!value(data, 'name').trim()) return { field: 'name', message: t('validation.name') };
      const email = value(data, 'email').trim();
      const phone = value(data, 'phone').trim();
      if (!email && !phone) return { field: 'email', message: t('validation.contact') };
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { field: 'email', message: t('validation.email') };
      if (phone && !/^\+[1-9]\d{7,14}$/.test(phone.replace(/[\s().-]/g, ''))) return { field: 'phone', message: t('validation.phone') };
      if (!value(data, 'preferredContact')) return { field: 'preferredContact', message: t('validation.preferredContact') };
    }
    return null;
  };

  const showValidationError = (validationError: { field: string; message: string }) => {
    setError(validationError.message);
    setInvalidField(validationError.field);
    requestAnimationFrame(() => {
      const target = contentRef.current?.querySelector<HTMLElement>(`[data-wizard-field="${validationError.field}"]`);
      target?.focus({ preventScroll: true });
      contentRef.current?.scrollTo({ top: target?.offsetTop ? target.offsetTop - 24 : contentRef.current.scrollHeight, behavior: 'smooth' });
    });
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    requestAnimationFrame(() => {
      contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const next = () => {
    const validationError = validateStep();
    if (validationError) return showValidationError(validationError);
    setError('');
    setInvalidField(null);
    goToStep(Math.min(step + 1, steps.length - 1));
  };

  const submit = async () => {
    const validationError = validateStep();
    if (validationError) return showValidationError(validationError);
    setStatus('submitting');
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'project-inquiry', data }),
      });
      if (!response.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('idle');
      setError(t('validation.sendError'));
    }
  };

  const summary = useMemo(() => Object.entries(data).filter(([, item]) => item && (!Array.isArray(item) || item.length)), [data]);

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <div className="grid-container w-full max-w-lg text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-ground/15 text-3xl">✓</div>
          <h2 className="grid-headtext text-2xl">{t('successTitle')}</h2>
          <p className="grid-subtext mt-4">{t('successText')}</p>
          <button type="button" onClick={onClose} className="mt-7 rounded-lg bg-red-ground px-6 py-3 font-semibold text-white transition hover:bg-red-groundlight">{t('backToPortfolio')}</button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    if (step === 0) return <div className="grid gap-3 sm:grid-cols-2">{projectTypes.map((key) => <Choice key={key} fieldName="projectType" invalid={invalidField === 'projectType'} label={t(`projectTypes.${key}`)} selected={value(data, 'projectType') === key} onClick={() => setField('projectType', key)} />)}</div>;
    if (step === 1) return <div className="space-y-5"><TextField label={t('fields.goal')} name="goal" value={value(data, 'goal')} onChange={setField} placeholder={t('placeholders.goal')} required invalid={invalidField === 'goal'} /><TextField label={t('fields.audience')} name="audience" value={value(data, 'audience')} onChange={setField} placeholder={t('placeholders.audience')} /><TextField label={t('fields.problem')} name="problem" value={value(data, 'problem')} onChange={setField} placeholder={t('placeholders.problem')} /><Field label={t('fields.websiteUrl')} name="websiteUrl" value={value(data, 'websiteUrl')} onChange={setField} placeholder={t('placeholders.websiteUrl')} type="url" /></div>;
    if (step === 2) return <div className="space-y-6">{Object.entries(featureGroups).map(([group, features]) => <div key={group}><h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-groundlight">{t(`featureGroups.${group}`)}</h3><div className="grid gap-2 sm:grid-cols-2">{features.map((feature) => <Choice key={feature} fieldName="features" invalid={invalidField === 'features'} label={t(`features.${feature}`)} selected={listValue(data, 'features').includes(feature)} onClick={() => { setData(toggleValue(data, 'features', feature)); setError(''); setInvalidField(null); }} />)}</div></div>)}<TextField label={t('fields.otherFeatures')} name="otherFeatures" value={value(data, 'otherFeatures')} onChange={setField} placeholder={t('placeholders.otherFeatures')} invalid={invalidField === 'features'} /></div>;
    if (step === 3) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.pageRange')} <span className="text-red-groundlight">*</span></p><div className="grid gap-2 sm:grid-cols-3">{['pages1to3', 'pages4to7', 'pages8to15', 'pages16plus', 'notSure'].map((key) => <Choice key={key} fieldName="pageRange" invalid={invalidField === 'pageRange'} label={t(`options.${key}`)} selected={value(data, 'pageRange') === key} onClick={() => setField('pageRange', key)} />)}</div></div><TextField label={t('fields.expectedPages')} name="pages" value={value(data, 'pages')} onChange={setField} placeholder={t('placeholders.pages')} /><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.contentStatus')}</p><div className="grid gap-2 sm:grid-cols-2">{['everything', 'someContent', 'needContentHelp', 'notSureYet'].map((key) => <Choice key={key} label={t(`contentOptions.${key}`)} selected={value(data, 'contentStatus') === key} onClick={() => setField('contentStatus', key)} />)}</div></div></div>;
    if (step === 4) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.languageCount')} <span className="text-red-groundlight">*</span></p><div className="grid gap-2 sm:grid-cols-2">{['oneLanguage', 'twoLanguages', 'threeLanguages', 'moreLanguages'].map((key) => <Choice key={key} fieldName="languageCount" invalid={invalidField === 'languageCount'} label={t(`options.${key}`)} selected={value(data, 'languageCount') === key} onClick={() => setField('languageCount', key)} />)}</div></div><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.languages')} <span className="text-red-groundlight">*</span></p><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{['english', 'arabic', 'french', 'german', 'spanish', 'turkish', 'other'].map((key) => <Choice key={key} fieldName="languages" invalid={invalidField === 'languages'} label={t(`languageOptions.${key}`)} selected={listValue(data, 'languages').includes(key)} onClick={() => { setData(toggleValue(data, 'languages', key)); setError(''); setInvalidField(null); }} />)}</div></div><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.translations')}</p><div className="grid gap-2 sm:grid-cols-3">{['provide', 'needHelp', 'later'].map((key) => <Choice key={key} label={t(`translationOptions.${key}`)} selected={value(data, 'translations') === key} onClick={() => setField('translations', key)} />)}</div></div></div>;
    if (step === 5) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.design')} <span className="text-red-groundlight">*</span></p><div className="grid gap-2 sm:grid-cols-2">{['existing', 'references', 'idea', 'youDesign'].map((key) => <Choice key={key} fieldName="design" invalid={invalidField === 'design'} label={t(`designOptions.${key}`)} selected={value(data, 'design') === key} onClick={() => setField('design', key)} />)}</div></div><TextField label={t('fields.references')} name="references" value={value(data, 'references')} onChange={setField} placeholder={t('placeholders.references')} /><div className="grid gap-2 sm:grid-cols-2">{['complete', 'logoOnly', 'partial', 'none'].map((key) => <Choice key={key} label={t(`brandOptions.${key}`)} selected={value(data, 'brand') === key} onClick={() => setField('brand', key)} />)}</div></div>;
    if (step === 6) return <div className="space-y-5"><div className="grid gap-2 sm:grid-cols-3">{['yes', 'no', 'notSure'].map((key) => <Choice key={key} label={`${t('fields.domain')}: ${t(`options.${key}`)}`} selected={value(data, 'domain') === key} onClick={() => setField('domain', key)} />)}</div><div className="grid gap-2 sm:grid-cols-3">{['yes', 'no', 'notSure'].map((key) => <Choice key={key} label={`${t('fields.hosting')}: ${t(`options.${key}`)}`} selected={value(data, 'hosting') === key} onClick={() => setField('hosting', key)} />)}</div><Field label={t('fields.technology')} name="technology" value={value(data, 'technology')} onChange={setField} placeholder={t('placeholders.technology')} required invalid={invalidField === 'technology'} /><TextField label={t('fields.integrations')} name="integrations" value={value(data, 'integrations')} onChange={setField} placeholder={t('placeholders.integrations')} /></div>;
    if (step === 7) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.timeline')}</p><div className="grid gap-2 sm:grid-cols-3">{['asap', 'twoToFourWeeks', 'oneToTwoMonths', 'twoToThreeMonths', 'flexible', 'unknown'].map((key) => <Choice key={key} fieldName="timeline" invalid={invalidField === 'timeline'} label={t(`options.${key}`)} selected={value(data, 'timeline') === key} onClick={() => setField('timeline', key)} />)}</div></div><div><p className="mb-3 text-sm font-medium text-gray-200">{t('fields.budget')}</p><div className="grid gap-2 sm:grid-cols-3">{['under500', '500to1000', '1000to2500', '2500to5000', '5000to10000', 'unknown'].map((key) => <Choice key={key} fieldName="budget" invalid={invalidField === 'budget'} label={t(`options.${key}`)} selected={value(data, 'budget') === key} onClick={() => setField('budget', key)} />)}</div></div></div>;
    if (step === 8) return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><Field label={t('fields.name')} name="name" value={value(data, 'name')} onChange={setField} placeholder={t('placeholders.name')} required invalid={invalidField === 'name'} /><Field label={t('fields.company')} name="company" value={value(data, 'company')} onChange={setField} placeholder={t('placeholders.company')} /></div><div className="grid gap-4 sm:grid-cols-2"><Field label={t('fields.email')} name="email" value={value(data, 'email')} onChange={setField} placeholder={t('placeholders.email')} type="email" invalid={invalidField === 'email'} /><Field label={t('fields.phone')} name="phone" value={value(data, 'phone')} onChange={setField} placeholder={t('placeholders.phone')} invalid={invalidField === 'phone'} /></div><p className="text-xs text-gray-500">{t('validation.contactHint')}</p><div className="grid gap-2 sm:grid-cols-2">{['email', 'whatsapp', 'phone', 'videoCall'].map((key) => <Choice key={key} fieldName="preferredContact" invalid={invalidField === 'preferredContact'} label={t(`options.${key}`)} selected={value(data, 'preferredContact') === key} onClick={() => setField('preferredContact', key)} />)}</div><TextField label={t('fields.notes')} name="notes" value={value(data, 'notes')} onChange={setField} placeholder={t('placeholders.notes')} /><input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" name="website" value={value(data, 'website')} onChange={(event) => setField('website', event.target.value)} /></div>;
    const summaryLabels: Record<string, string> = {
      projectType: t('projectTypeTitle'),
      goal: t('fields.goal'),
      audience: t('fields.audience'),
      problem: t('fields.problem'),
      websiteUrl: t('fields.websiteUrl'),
      features: t('featuresTitle'),
      otherFeatures: t('fields.otherFeatures'),
      pageRange: t('fields.pageRange'),
      pages: t('fields.expectedPages'),
      contentStatus: t('fields.contentStatus'),
      languageCount: t('fields.languageCount'),
      languages: t('fields.languages'),
      translations: t('fields.translations'),
      design: t('fields.design'),
      references: t('fields.references'),
      brand: t('fields.brand'),
      domain: t('fields.domain'),
      hosting: t('fields.hosting'),
      technology: t('fields.technology'),
      integrations: t('fields.integrations'),
      timeline: t('fields.timeline'),
      budget: t('fields.budget'),
      name: t('fields.name'),
      company: t('fields.company'),
      email: t('fields.email'),
      phone: t('fields.phone'),
      preferredContact: t('fields.preferredContact'),
      notes: t('fields.notes'),
    };
    const summaryValue = (key: string, item: WizardValue) => {
      const values = Array.isArray(item) ? item : [item];
      return values.map((entry) => {
        if (key === 'projectType') return t(`projectTypes.${entry}`);
        if (key === 'languages') return t(`languageOptions.${entry}`);
        if (key === 'features') return t(`features.${entry}`);
        return entry;
      }).join(', ');
    };
    return <div className="space-y-4"><p className="text-gray-300">{t('reviewText')}</p><div className="grid gap-2 sm:grid-cols-2">{summary.map(([key, item]) => <div key={key} className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-xs uppercase tracking-wider text-red-groundlight">{summaryLabels[key] ?? key}</p><p className="mt-1 break-words text-sm text-gray-200">{summaryValue(key, item)}</p></div>)}</div></div>;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="wizard-title">
      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
          <div><p className="text-xs uppercase tracking-[0.2em] text-red-groundlight">{t('label')}</p><p className="mt-1 text-sm text-gray-400">{t('step', { current: step + 1, total: steps.length })} · {t(`stepLabels.${steps[step]}`)}</p></div>
          <button type="button" onClick={onClose} aria-label={t('close')} className="rounded-full px-3 py-1 text-2xl text-gray-400 hover:bg-white/10 hover:text-white">×</button>
        </div>
        <div className="h-1 bg-white/5"><motion.div className="h-full bg-red-ground" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        <div ref={contentRef} className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <h2 id="wizard-title" className="mb-6 text-2xl font-bold text-white sm:text-3xl">{step === 9 ? t('review') : t(`stepTitles.${steps[step]}`)}</h2>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
          {error && <p className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200" role="alert" aria-live="assertive">{error}</p>}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-8">
          <button type="button" onClick={() => { setError(''); setInvalidField(null); goToStep(Math.max(step - 1, 0)); }} disabled={step === 0 || status === 'submitting'} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-400 transition hover:bg-white/10 hover:text-white disabled:invisible">{t('back')}</button>
          {step < steps.length - 1 ? <button type="button" onClick={next} className="rounded-lg bg-red-ground px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight">{t('continue')}</button> : <button type="button" onClick={submit} disabled={status === 'submitting'} className="rounded-lg bg-red-ground px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight disabled:opacity-60">{status === 'submitting' ? t('sending') : t('send')}</button>}
        </div>
      </div>
    </div>
  );
};

export default ProjectDiscoveryWizard;
