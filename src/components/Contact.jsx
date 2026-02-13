import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiMail, HiLocationMarker, HiPhone } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { usePortfolioData } from '../context/DataContext';

// Typing code animation component
function CodeTypingAnimation() {
  const codeLines = [
    { indent: 0, text: 'const developer = {', color: 'text-[#E76F51]' },
    { indent: 1, text: 'name: "Abdullah",', color: 'text-[#E9C46A]' },
    { indent: 1, text: 'passion: "Building things",', color: 'text-[#E9C46A]' },
    { indent: 1, text: 'status: "Available",', color: 'text-[#2A9D8F]' },
    { indent: 1, text: 'coffee: true,', color: 'text-[#F4A261]' },
    { indent: 0, text: '};', color: 'text-[#E76F51]' },
    { indent: 0, text: '', color: '' },
    { indent: 0, text: 'function collaborate() {', color: 'text-[#2A9D8F]' },
    { indent: 1, text: "return \"Let's build!\";", color: 'text-[#E9C46A]' },
    { indent: 0, text: '}', color: 'text-[#2A9D8F]' },
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (visibleLines >= codeLines.length) {
      const resetTimer = setTimeout(() => {
        setVisibleLines(0);
        setCurrentChar(0);
      }, 3000);
      return () => clearTimeout(resetTimer);
    }

    const currentLine = codeLines[visibleLines];
    const fullText = currentLine.text;

    if (currentChar >= fullText.length) {
      const lineTimer = setTimeout(() => {
        setVisibleLines(v => v + 1);
        setCurrentChar(0);
      }, fullText.length === 0 ? 100 : 200);
      return () => clearTimeout(lineTimer);
    }

    const charTimer = setTimeout(() => {
      setCurrentChar(c => c + 1);
    }, 30 + Math.random() * 50);
    return () => clearTimeout(charTimer);
  }, [visibleLines, currentChar]);

  return (
    <div className="font-mono text-xs sm:text-sm leading-relaxed select-none">
      <div className="flex items-center gap-2 mb-3 opacity-60">
        <span className="w-3 h-3 rounded-full bg-[#E76F51]/60" />
        <span className="w-3 h-3 rounded-full bg-[#E9C46A]/60" />
        <span className="w-3 h-3 rounded-full bg-[#2A9D8F]/60" />
        <span className="ml-2 text-[10px] text-gray-600">contact.js</span>
      </div>
      {codeLines.map((line, i) => {
        if (i > visibleLines) return null;
        const isCurrentLine = i === visibleLines;
        const displayText = isCurrentLine ? line.text.slice(0, currentChar) : line.text;
        return (
          <div key={i} className="flex">
            <span className="w-6 text-right mr-4 text-gray-700 select-none text-[10px]">{i + 1}</span>
            <span className={line.color} style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
              {displayText}
              {isCurrentLine && visibleLines < codeLines.length && (
                <span className="inline-block w-[2px] h-4 bg-primary-400 ml-0.5 animate-blink align-middle" />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function Contact() {
  const { data } = usePortfolioData();
  const { personal, social } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessKey = data.web3formsKey;

    if (!accessKey) {
      // Fallback to mailto if no Web3Forms key is configured
      const mailtoLink = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Contact')}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.open(mailtoLink, '_blank');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setFormData({ name: '', email: '', subject: '', message: '' });
      return;
    }

    setSending(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Portfolio Contact',
          message: formData.message,
          from_name: 'Portfolio Contact Form',
        }),
      });
      const result = await res.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch {
      alert('Network error. Please try again later.');
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    { icon: <HiMail size={20} />, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: <HiLocationMarker size={20} />, label: 'Location', value: personal.location, href: null },
    ...(personal.phone ? [{ icon: <HiPhone size={20} />, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` }] : []),
  ];

  const socialLinks = [
    { icon: <FaGithub size={18} />, href: social.github, label: 'GitHub', color: 'hover:text-white hover:bg-gray-800' },
    { icon: <FaLinkedinIn size={18} />, href: social.linkedin, label: 'LinkedIn', color: 'hover:text-white hover:bg-[#0077b5]' },
    { icon: <FaFacebookF size={18} />, href: social.facebook, label: 'Facebook', color: 'hover:text-white hover:bg-[#1877f2]' },
    { icon: <FaInstagram size={18} />, href: social.instagram, label: 'Instagram', color: 'hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500' },
  ].filter(link => link.href);

  return (
    <section id="contact" className="relative py-24 lg:py-32" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary-400 font-mono text-sm font-medium tracking-wider uppercase">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mt-3 mb-4">
            Contact{' '}
            <span className="bg-gradient-to-r from-primary-400 to-accent-gold bg-clip-text text-transparent">Me</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-gold mx-auto rounded-full origin-center"
          />
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Feel free to reach out for collaborations, opportunities, or just to say hello!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Column: Contact Info + Code Animation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Code Typing Animation Card */}
            <div className="p-5 bg-[#0a1520] border border-white/5 rounded-2xl overflow-hidden">
              <CodeTypingAnimation />
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-start gap-4 p-4 bg-dark-100/50 border border-white/5 rounded-xl hover:border-primary-500/20 hover:bg-dark-100/70 hover:shadow-lg hover:shadow-primary-500/5 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary-500/10 text-primary-400 flex-shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="text-sm text-gray-300 hover:text-primary-400 transition-colors">{info.value}</a>
                    ) : (
                      <p className="text-sm text-gray-300">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-gray-400 mb-3">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 ${link.color}`}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-100/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-100/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-100/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all"
                  placeholder="Project collaboration"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-100/50 border border-white/10 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/20 transition-all resize-none"
                  placeholder="Your message..."
                />
              </div>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-accent-deep to-primary-500 hover:from-primary-600 hover:to-primary-400 text-white font-medium rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? '✓ Message Sent!' : sending ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
