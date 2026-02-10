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
          <p className="text-xs text-gray-500 flex items-center gap-1 order-2 sm:order-1">
            © {currentYear} {personal.name.split(' ')[0]} — Built with <FaHeart className="text-accent-coral text-[10px]" />
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            {social.github && (
              <a href={social.github} target="_blank" rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-white hover:bg-white/10 transition-all duration-200">
                <FaGithub size={13} />
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-[#0077b5] hover:bg-[#0077b5]/10 transition-all duration-200">
                <FaLinkedinIn size={13} />
              </a>
            )}
            {social.facebook && (
              <a href={social.facebook} target="_blank" rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 text-gray-500 hover:text-[#1877f2] hover:bg-[#1877f2]/10 transition-all duration-200">
                <FaFacebookF size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
