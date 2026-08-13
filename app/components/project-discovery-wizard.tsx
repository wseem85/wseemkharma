'use client';

import { useEffect, useMemo, useRef, useState, type ComponentProps } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type WizardValue = string | string[];
type WizardData = Record<string, WizardValue>;

const steps = [
  'Project type',
  'Project details',
  'Features',
  'Pages & content',
  'Languages',
  'Design',
  'Technical needs',
  'Timeline & budget',
  'Contact',
  'Review',
];

const projectTypes = [
  ['Business Website', 'A professional online presence for a business.'],
  ['E-commerce', 'Products, payments, orders, and customers.'],
  ['SaaS / Web Application', 'A product with users, dashboards, or subscriptions.'],
  ['Portfolio / Personal Website', 'A personal brand, freelancer, or creator site.'],
  ['Corporate Website', 'Multiple services, departments, or locations.'],
  ['Redesign / Existing Website', 'Modernize or rebuild an existing website.'],
  ['Custom Web Application', 'Something more specific or unusual.'],
  ['Not Sure', 'I know what I want, but not its category yet.'],
];

const featureGroups = {
  Basic: ['Contact form', 'Newsletter subscription', 'Blog / Articles', 'Image gallery', 'Testimonials', 'FAQ', 'Google Maps / Location'],
  Business: ['User accounts / Login', 'Admin dashboard', 'Appointment / Booking system', 'Search', 'Advanced forms', 'Customer dashboard', 'Multiple locations'],
  'E-commerce': ['Product catalog', 'Shopping cart', 'Online payments', 'Orders', 'Customer accounts', 'Discounts / Coupons', 'Inventory management', 'Shipping integration'],
  Advanced: ['SaaS subscription system', 'API integrations', 'Third-party services', 'AI features', 'Real-time functionality', 'Custom database', 'Custom admin panel', 'Automated workflows'],
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
    if (step === 0 && !value(data, 'projectType')) return { field: 'projectType', message: 'Please choose the type of project you want to build.' };
    if (step === 1 && !value(data, 'goal').trim()) return { field: 'goal', message: 'Please tell me what you want the project to achieve.' };
    if (step === 2 && !listValue(data, 'features').length && !value(data, 'otherFeatures').trim()) return { field: 'features', message: 'Please choose at least one feature or describe a custom feature.' };
    if (step === 3 && !value(data, 'pageRange')) return { field: 'pageRange', message: 'Please select an approximate page count.' };
    if (step === 4 && !value(data, 'languageCount')) return { field: 'languageCount', message: 'Please select the language plan.' };
    if (step === 4 && !listValue(data, 'languages').length) return { field: 'languages', message: 'Please select at least one language.' };
    if (step === 5 && !value(data, 'design')) return { field: 'design', message: 'Please choose the design direction that best fits your project.' };
    if (step === 6 && !value(data, 'technology').trim()) return { field: 'technology', message: 'Please tell me whether you have an existing platform or technology preference.' };
    if (step === 7 && !value(data, 'timeline')) return { field: 'timeline', message: 'Please select a timeline.' };
    if (step === 7 && !value(data, 'budget')) return { field: 'budget', message: 'Please select a budget range.' };
    if (step === 8) {
      if (!value(data, 'name').trim()) return { field: 'name', message: 'Please enter your name so I know who I am speaking with.' };
      const email = value(data, 'email').trim();
      const phone = value(data, 'phone').trim();
      if (!email && !phone) return { field: 'email', message: 'Please provide an email address or phone number.' };
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { field: 'email', message: 'Please enter a valid email address.' };
      if (phone && !/^\+[1-9]\d{7,14}$/.test(phone.replace(/[\s().-]/g, ''))) return { field: 'phone', message: 'Please enter a valid phone number with country code.' };
      if (!value(data, 'preferredContact')) return { field: 'preferredContact', message: 'Please choose how you prefer to be contacted.' };
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
      setError('I could not send your project brief. Please try again or email me directly.');
    }
  };

  const summary = useMemo(() => Object.entries(data).filter(([, item]) => item && (!Array.isArray(item) || item.length)), [data]);

  if (status === 'success') {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <div className="grid-container w-full max-w-lg text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-ground/15 text-3xl">✓</div>
          <h2 className="grid-headtext text-2xl">Project brief received 🎉</h2>
          <p className="grid-subtext mt-4">Thanks for taking the time to tell me about your project. I&apos;ll review the requirements and get back to you with tailored next steps.</p>
          <button type="button" onClick={onClose} className="mt-7 rounded-lg bg-red-ground px-6 py-3 font-semibold text-white transition hover:bg-red-groundlight">Back to portfolio</button>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    if (step === 0) return <div className="grid gap-3 sm:grid-cols-2">{projectTypes.map(([label, description]) => <Choice key={label} fieldName="projectType" invalid={invalidField === 'projectType'} label={label} description={description} selected={value(data, 'projectType') === label} onClick={() => setField('projectType', label)} />)}</div>;
    if (step === 1) return <div className="space-y-5"><TextField label="What is the main goal?" name="goal" value={value(data, 'goal')} onChange={setField} placeholder="Tell me what you want to achieve..." required invalid={invalidField === 'goal'} /><TextField label="Who is the target audience?" name="audience" value={value(data, 'audience')} onChange={setField} placeholder="Who will use or visit it?" /><TextField label="What problem should it solve?" name="problem" value={value(data, 'problem')} onChange={setField} placeholder="What should become easier or better?" /><Field label="Current website URL" name="websiteUrl" value={value(data, 'websiteUrl')} onChange={setField} placeholder="https://example.com" type="url" /></div>;
    if (step === 2) return <div className="space-y-6">{Object.entries(featureGroups).map(([group, features]) => <div key={group}><h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-red-groundlight">{group}</h3><div className="grid gap-2 sm:grid-cols-2">{features.map((feature) => <Choice key={feature} fieldName="features" invalid={invalidField === 'features'} label={feature} selected={listValue(data, 'features').includes(feature)} onClick={() => { setData(toggleValue(data, 'features', feature)); setError(''); setInvalidField(null); }} />)}</div></div>)}<TextField label="Other features" name="otherFeatures" value={value(data, 'otherFeatures')} onChange={setField} placeholder="Anything else you need?" invalid={invalidField === 'features'} /></div>;
    if (step === 3) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">Approximately how many pages? <span className="text-red-groundlight">*</span></p><div className="grid gap-2 sm:grid-cols-3">{['1–3', '4–7', '8–15', '16+', "I'm not sure"].map((item) => <Choice key={item} fieldName="pageRange" invalid={invalidField === 'pageRange'} label={item} selected={value(data, 'pageRange') === item} onClick={() => setField('pageRange', item)} />)}</div></div><TextField label="Which pages do you expect?" name="pages" value={value(data, 'pages')} onChange={setField} placeholder="Home, About, Services, Contact..." /><div><p className="mb-3 text-sm font-medium text-gray-200">Do you have written content?</p><div className="grid gap-2 sm:grid-cols-2">{['I have everything', 'I have some content', 'I need help creating content', "I don't know yet"].map((item) => <Choice key={item} label={item} selected={value(data, 'contentStatus') === item} onClick={() => setField('contentStatus', item)} />)}</div></div></div>;
    if (step === 4) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">How many languages? <span className="text-red-groundlight">*</span></p><div className="grid gap-2 sm:grid-cols-2">{['One language', 'Two languages', 'Three languages', 'More than three'].map((item) => <Choice key={item} fieldName="languageCount" invalid={invalidField === 'languageCount'} label={item} selected={value(data, 'languageCount') === item} onClick={() => setField('languageCount', item)} />)}</div></div><div><p className="mb-3 text-sm font-medium text-gray-200">Which languages? <span className="text-red-groundlight">*</span></p><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{['English', 'Arabic', 'French', 'German', 'Spanish', 'Turkish', 'Other'].map((item) => <Choice key={item} fieldName="languages" invalid={invalidField === 'languages'} label={item} selected={listValue(data, 'languages').includes(item)} onClick={() => { setData(toggleValue(data, 'languages', item)); setError(''); setInvalidField(null); }} />)}</div></div><div><p className="mb-3 text-sm font-medium text-gray-200">Translations</p><div className="grid gap-2 sm:grid-cols-3">{['I provide translations', 'I need help', 'Add translations later'].map((item) => <Choice key={item} label={item} selected={value(data, 'translations') === item} onClick={() => setField('translations', item)} />)}</div></div></div>;
    if (step === 5) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">How would you like it to look? <span className="text-red-groundlight">*</span></p><div className="grid gap-2 sm:grid-cols-2">{['I already have a design', 'I have references', 'I have an idea', 'You design it'].map((item) => <Choice key={item} fieldName="design" invalid={invalidField === 'design'} label={item} selected={value(data, 'design') === item} onClick={() => setField('design', item)} />)}</div></div><TextField label="Websites you like" name="references" value={value(data, 'references')} onChange={setField} placeholder="Add one or more URLs, separated by commas" /><div className="grid gap-2 sm:grid-cols-2">{['Complete brand identity', 'Logo only', 'Partial branding', 'No branding yet'].map((item) => <Choice key={item} label={item} selected={value(data, 'brand') === item} onClick={() => setField('brand', item)} />)}</div></div>;
    if (step === 6) return <div className="space-y-5"><div className="grid gap-2 sm:grid-cols-3">{['Yes', 'No', 'Not sure'].map((item) => <Choice key={item} label={`I have a domain: ${item}`} selected={value(data, 'domain') === item} onClick={() => setField('domain', item)} />)}</div><div className="grid gap-2 sm:grid-cols-3">{['Yes', 'No', 'Not sure'].map((item) => <Choice key={item} label={`I have hosting: ${item}`} selected={value(data, 'hosting') === item} onClick={() => setField('hosting', item)} />)}</div><Field label="Existing technology or platform" name="technology" value={value(data, 'technology')} onChange={setField} placeholder="WordPress, Shopify, React, or not sure" required invalid={invalidField === 'technology'} /><TextField label="Integrations" name="integrations" value={value(data, 'integrations')} onChange={setField} placeholder="Payments, CRM, email marketing, shipping, AI..." /></div>;
    if (step === 7) return <div className="space-y-5"><div><p className="mb-3 text-sm font-medium text-gray-200">When would you like it completed?</p><div className="grid gap-2 sm:grid-cols-3">{['As soon as possible', '2–4 weeks', '1–2 months', '2–3 months', 'Flexible', "I don't know"].map((item) => <Choice key={item} fieldName="timeline" invalid={invalidField === 'timeline'} label={item} selected={value(data, 'timeline') === item} onClick={() => setField('timeline', item)} />)}</div></div><div><p className="mb-3 text-sm font-medium text-gray-200">Approximate budget</p><div className="grid gap-2 sm:grid-cols-3">{['Under $500', '$500–$1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000–$10,000', "I don't know yet"].map((item) => <Choice key={item} fieldName="budget" invalid={invalidField === 'budget'} label={item} selected={value(data, 'budget') === item} onClick={() => setField('budget', item)} />)}</div></div></div>;
    if (step === 8) return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><Field label="Full name" name="name" value={value(data, 'name')} onChange={setField} placeholder="Your full name" required invalid={invalidField === 'name'} /><Field label="Company" name="company" value={value(data, 'company')} onChange={setField} placeholder="Optional" /></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Email" name="email" value={value(data, 'email')} onChange={setField} placeholder="you@example.com" type="email" invalid={invalidField === 'email'} /><Field label="Phone / WhatsApp" name="phone" value={value(data, 'phone')} onChange={setField} placeholder="+963994875398" invalid={invalidField === 'phone'} /></div><p className="text-xs text-gray-500">Provide a valid email address or phone number with country code. At least one is required.</p><div className="grid gap-2 sm:grid-cols-2">{['Email', 'WhatsApp', 'Phone', 'Video call'].map((item) => <Choice key={item} fieldName="preferredContact" invalid={invalidField === 'preferredContact'} label={item} selected={value(data, 'preferredContact') === item} onClick={() => setField('preferredContact', item)} />)}</div><TextField label="Anything else?" name="notes" value={value(data, 'notes')} onChange={setField} placeholder="Anything else I should know?" /><input tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px]" name="website" value={value(data, 'website')} onChange={(event) => setField('website', event.target.value)} /></div>;
    return <div className="space-y-4"><p className="text-gray-300">Please review your brief. I&apos;ll manually review the details and send a tailored estimate—no automatic price will be shown.</p><div className="grid gap-2 sm:grid-cols-2">{summary.map(([key, item]) => <div key={key} className="rounded-lg border border-white/10 bg-black/20 p-3"><p className="text-xs uppercase tracking-wider text-red-groundlight">{key.replace(/[A-Z]/g, (letter) => ` ${letter}`)}</p><p className="mt-1 break-words text-sm text-gray-200">{Array.isArray(item) ? item.join(', ') : item}</p></div>)}</div></div>;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6" role="dialog" aria-modal="true" aria-labelledby="wizard-title">
      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1e1e1e] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
          <div><p className="text-xs uppercase tracking-[0.2em] text-red-groundlight">Let&apos;s discuss your project</p><p className="mt-1 text-sm text-gray-400">Step {step + 1} of {steps.length} · {steps[step]}</p></div>
          <button type="button" onClick={onClose} aria-label="Close project wizard" className="rounded-full px-3 py-1 text-2xl text-gray-400 hover:bg-white/10 hover:text-white">×</button>
        </div>
        <div className="h-1 bg-white/5"><motion.div className="h-full bg-red-ground" animate={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
        <div ref={contentRef} className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
              <h2 id="wizard-title" className="mb-6 text-2xl font-bold text-white sm:text-3xl">{step === 9 ? 'Ready to send?' : ['What are you looking to build?', 'Tell me about your project', 'What should it be able to do?', 'How much content will it have?', 'Will it support multiple languages?', 'How would you like it to look?', 'What are the technical needs?', 'Timeline & Budget', 'Let’s talk about your project'][step]}</h2>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
          {error && <p className="mt-5 rounded-lg border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200" role="alert" aria-live="assertive">{error}</p>}
        </div>
        <div className="flex items-center justify-between border-t border-white/10 px-5 py-4 sm:px-8">
          <button type="button" onClick={() => { setError(''); setInvalidField(null); goToStep(Math.max(step - 1, 0)); }} disabled={step === 0 || status === 'submitting'} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-400 transition hover:bg-white/10 hover:text-white disabled:invisible">Back</button>
          {step < steps.length - 1 ? <button type="button" onClick={next} className="rounded-lg bg-red-ground px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight">Continue</button> : <button type="button" onClick={submit} disabled={status === 'submitting'} className="rounded-lg bg-red-ground px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-groundlight disabled:opacity-60">{status === 'submitting' ? 'Sending…' : 'Send Project Brief'}</button>}
        </div>
      </div>
    </div>
  );
};

export default ProjectDiscoveryWizard;
