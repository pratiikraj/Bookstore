import React from 'react'
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='bg-zinc-900 border-t border-zinc-800/60 text-zinc-400 py-8 px-6 flex flex-col items-center justify-center text-center gap-4'>
      <h1 className='text-base font-semibold text-zinc-300'>
        Copyright &copy; 2026, Made in India - by Pratik Raj
      </h1>
      <p className='text-xs text-zinc-500 font-medium max-w-md leading-relaxed'>
        Empowering readers with high-quality literature, curated for great minds.
      </p>

      {/* Social Links Row */}
      <div className='flex items-center gap-5 mt-1'>
        <a 
          href="https://github.com/pratiikraj" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-white hover:scale-115 active:scale-95 transition-all duration-200"
          aria-label="GitHub"
          title="GitHub"
        >
          <FaGithub size={21} />
        </a>
        <a 
          href="https://www.linkedin.com/in/pratiikk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-[#0a66c2] hover:scale-115 active:scale-95 transition-all duration-200"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <FaLinkedin size={21} />
        </a>
        <a 
          href="https://www.instagram.com/pratttiiikk/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-[#e1306c] hover:scale-115 active:scale-95 transition-all duration-200"
          aria-label="Instagram"
          title="Instagram"
        >
          <FaInstagram size={21} />
        </a>
        <a 
          href="https://www.facebook.com/pratttiiikk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-[#1877f2] hover:scale-115 active:scale-95 transition-all duration-200"
          aria-label="Facebook"
          title="Facebook"
        >
          <FaFacebook size={21} />
        </a>
      </div>
    </div>
  )
}

export default Footer
