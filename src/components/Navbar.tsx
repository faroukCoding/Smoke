import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menu';
import { Flame, ShoppingBag, Menu as MenuIcon, X, Phone, Globe, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { openDirectWhatsAppContact } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { totalCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0e12]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-xl'
            : 'bg-gradient-to-b from-[#0c0c0e]/90 via-[#0c0c0e]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand / Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="brand-logo-link"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-700 p-0.5 flex items-center justify-center shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-[#121216] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-500 fill-amber-500/30 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-extrabold tracking-wider text-white uppercase group-hover:text-amber-400 transition-colors">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[11px] font-semibold tracking-widest text-amber-500/90 -mt-1 uppercase">
                  {language === 'ar' ? RESTAURANT_INFO.taglineAr : RESTAURANT_INFO.taglineFr}
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav id="desktop-nav" className="hidden md:flex items-center gap-8">
              <button
                id="nav-link-home"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {t.nav.home}
              </button>
              <button
                id="nav-link-menu"
                onClick={() => scrollToSection('menu-section')}
                className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {t.nav.menu}
              </button>
              <button
                id="nav-link-experience"
                onClick={() => scrollToSection('about-section')}
                className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {t.nav.experience}
              </button>
              <button
                id="nav-link-contact"
                onClick={() => scrollToSection('contact-section')}
                className="text-sm font-semibold text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
              >
                {t.nav.contact}
              </button>
            </nav>

            {/* Right side actions: Language, WhatsApp, Cart */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Language Switcher */}
              <button
                id="btn-language-toggle"
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700/60 text-xs font-bold text-zinc-200 hover:text-amber-400 transition-all cursor-pointer"
                title={language === 'fr' ? 'Changer vers l’arabe' : 'Passer au français'}
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'fr' ? 'العربية' : 'FR'}</span>
              </button>

              {/* Direct WhatsApp button (desktop) */}
              <button
                id="btn-nav-whatsapp"
                onClick={() => openDirectWhatsAppContact()}
                className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-600/40 text-xs font-semibold text-emerald-300 hover:text-emerald-200 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                id="btn-open-cart-navbar"
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/25 active:scale-95 transition-all cursor-pointer"
                aria-label="Ouvrir le panier"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline">{t.nav.cart}</span>
                {totalCount > 0 && (
                  <span
                    id="badge-cart-count"
                    className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-white text-orange-700 text-xs font-extrabold shadow-sm animate-pulse"
                  >
                    {totalCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-zinc-900/90 border border-zinc-800 text-zinc-300 hover:text-white"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-drawer-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/80 backdrop-blur-md md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              id="mobile-drawer-content"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mt-20 mx-4 p-5 rounded-2xl bg-[#141418] border border-zinc-800 shadow-2xl flex flex-col gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 text-start"
              >
                <span>{t.nav.home}</span>
              </button>
              <button
                onClick={() => scrollToSection('menu-section')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 text-start"
              >
                <span>{t.nav.menu}</span>
                <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full font-bold">🔥</span>
              </button>
              <button
                onClick={() => scrollToSection('about-section')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 text-start"
              >
                <span>{t.nav.experience}</span>
              </button>
              <button
                onClick={() => scrollToSection('contact-section')}
                className="flex items-center justify-between py-2.5 px-3 rounded-lg text-base font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-amber-400 text-start"
              >
                <span>{t.nav.contact}</span>
              </button>

              <div className="h-px bg-zinc-800 my-1" />

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-zinc-800/80 text-xs font-bold text-zinc-200 hover:bg-zinc-700"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.nav.callUs}</span>
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDirectWhatsAppContact();
                  }}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-600/40 text-xs font-bold text-emerald-300"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
