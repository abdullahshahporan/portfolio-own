import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaHeart } from 'react-icons/fa';
import { usePortfolioData } from '../context/DataContext';

export default function Footer() {
  const { data } = usePortfolioData();
  const { personal, social } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-dark-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs text-gray-500 flex items-center gap-1 order-2 sm:order-1"
          >
            © {currentYear} {personal.name.split(' ')[0]} — Built with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaHeart className="text-accent-coral text-[10px]" />
            </motion.span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 order-1 sm:order-2"
          >
            {social.github && (
              <motion.a 
                href={social.github} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <FaGithub size={13} />
              </motion.a>
            )}
            {social.linkedin && (
              <motion.a 
                href={social.linkedin} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-all duration-300"
              >
                <FaLinkedinIn size={13} />
              </motion.a>
            )}
            {social.facebook && (
              <motion.a 
                href={social.facebook} 
                target="_blank" 
                rel="noreferrer"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-[#1877f2] hover:bg-[#1877f2]/10 transition-all duration-300"
              >
                <FaFacebookF size={13} />
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
