'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../components/button';
import { textVariant } from '../utils/motion';
import BarsSeperator from '../components/animated-seperator';
import { useEffect } from 'react';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Contact | Wseem Kharma',
// };
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null,
  );
  const [hasCopiedEmail, setHasCopiedEmail] = useState(false);
  const [hasCopiedPhone, setHasCopiedPhone] = useState(false);
  useEffect(() => {
    // Update title
    document.title = 'Contact | Wseem Kharma';

    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Send Messages to developer and show contacts.',
      );
    }
  }, []);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        console.error('Error:', result.error);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Clear status after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('engwseem2@gmail.com');
    setHasCopiedEmail(true);
    setTimeout(() => setHasCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('+963994875398');
    setHasCopiedPhone(true);
    setTimeout(() => setHasCopiedPhone(false), 2000);
  };

  return (
    <section
      className="c-space my-12 sm:my-16 lg:my-20 relative top-[100px] max-w-7xl mx-auto"
      id="contact"
    >
      {/* Header Section */}
      <motion.div
        className="mb-8 sm:mb-12 lg:mb-16"
        variants={textVariant(0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 className="head-text text-center mb-2 sm:mb-4">Get In Touch</h1>
        <h3 className="head-sub_text text-center px-4">
          Let's discuss your next project
        </h3>
      </motion.div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {/* Contact Form */}
        <motion.div
          className="xl:col-span-2"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="grid-container h-full">
            <h2 className="grid-headtext mb-4">Send Me a Message</h2>
            <p className="grid-subtext mb-6">
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Fill out the form below and I'll get back to you as soon
              as possible.
            </p>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-center">
                  ✅ Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-center">
                  ❌ Failed to send message. Please try again or contact me
                  directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="field-label">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="field-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <label className="field-label">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="field-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="field-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  className="field-input"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label className="field-label">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  rows={6}
                  className="field-input resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-5 py-2.5 sm:px-6 sm:py-3
                  bg-gradient-to-r from-purple-600 to-purple-800
                  text-white font-medium
                  rounded-lg text-center
                  transition-all duration-300
                  hover:from-purple-500 hover:to-purple-700
                  hover:shadow-lg hover:shadow-purple-500/30
                  active:scale-[0.98]
                  inline-flex items-center gap-2
                  min-w-full sm:w-auto justify-center  ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
              >
                {isSubmitting && (
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-groundlight opacity-75" />
                    <span className="relative inline-flex size-3 rounded-full bg-red-ground" />
                  </span>
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="xl:col-span-1"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="grid-container h-full">
            <h2 className="grid-headtext mb-4">Contact Information</h2>
            <p className="grid-subtext mb-6">
              Prefer direct contact? Here are other ways to reach me.
            </p>

            <div className="space-y-6">
              {/* Email */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg">Email</h3>
                <div
                  className="copy-container cursor-pointer hover:bg-black-300 p-3 rounded-lg transition-colors"
                  onClick={handleCopyEmail}
                >
                  <img
                    src={hasCopiedEmail ? '/tick.svg' : '/copy.svg'}
                    alt="copy"
                    className="w-5 h-5"
                  />
                  <p className="text-white break-all">engwseem2@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg">Phone</h3>
                <div
                  className="copy-container cursor-pointer hover:bg-black-300 p-3 rounded-lg transition-colors"
                  onClick={handleCopyPhone}
                >
                  <img
                    src={hasCopiedPhone ? '/tick.svg' : '/copy.svg'}
                    alt="copy"
                    className="w-5 h-5"
                  />
                  <p className="text-white">+963 (994) 875398</p>
                </div>
              </div>

              <BarsSeperator color="bg-red-ground" />

              {/* Location & Availability */}
              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg">Location</h3>
                <p className="grid-subtext">📍 Syria</p>
                <p className="grid-subtext">
                  🌍 Available for remote work worldwide
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-white font-semibold text-lg">
                  Availability
                </h3>
                <p className="grid-subtext">
                  ⏰ Monday - Friday: 9:00 AM - 6:00 PM (Your Timezone)
                </p>
                <p className="grid-subtext">
                  📧 Email responses within 24 hours
                </p>
              </div>

              <BarsSeperator color="bg-red-ground" />

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold text-lg">
                  Connect With Me
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://www.linkedin.com/in/wseem-kharma-b82373265"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                  >
                    <img
                      src="/linkedin-white.png"
                      alt="LinkedIn"
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                    />
                  </a>
                  <a
                    href="https://github.com/wseem85"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                  >
                    <img
                      src="/github.svg"
                      alt="GitHub"
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                    />
                  </a>
                  <a
                    href="https://wa.me/963994875398"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                  >
                    <img
                      src="/whatsapp-white.png"
                      alt="whatsapp"
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                    />
                  </a>
                  <a
                    href="https://t.me/Eng_WSEEM_KHARMA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                  >
                    <img
                      src="/telegram-white.png"
                      alt="whatsapp"
                      className="w-6 h-6 group-hover:scale-110 transition-transform"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action Section */}
      {/* <motion.div
        className="mt-12 sm:mt-16 lg:mt-20"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="grid-container text-center">
          <h2 className="grid-headtext mb-4">Ready to Start Your Project?</h2>
          <p className="grid-subtext mb-6 max-w-2xl mx-auto">
            Whether you need a complete web application, a stunning landing
            page, or technical consultation, I'm here to help bring your ideas
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              name="Schedule a Call"
              isBeam={true}
              containerClass="w-full sm:w-auto"
            />
            <Button
              name="View My Work"
              isBeam={false}
              containerClass="w-full sm:w-auto"
            />
          </div>
        </div>
      </motion.div> */}
    </section>
  );
}
