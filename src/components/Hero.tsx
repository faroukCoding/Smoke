import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/menu';
import { Flame, Sparkles, Utensils, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  const { t, language } = useLanguage();
  const { setIsCartOpen } = useCart();

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero-section" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Gradient & Smoked Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=85"
          alt="Viande d'agneau fumée Smoke Me"
          className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-125 scale-105"
        />
        {/* Smoked radial overlay and vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/75 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0c0c0e]/60 to-[#0c0c0e]" />
        
        {/* Subtle Ember / Glow orbs */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top Tag / Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="hero-badge"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/40 text-amber-400 text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-orange-950/40 mb-6 backdrop-blur-md"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500/40 animate-bounce" />
          <span>{t.hero.badge}</span>
        </motion.div>

        {/* Big Brand Title */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          id="hero-main-title"
          className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase text-white mb-2"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
            {RESTAURANT_INFO.name}
          </span>
        </motion.h1>

        {/* Subtitle / Arabic & French Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-5"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-amber-500 tracking-wider uppercase">
            {RESTAURANT_INFO.taglineFr}
          </span>
          <span className="hidden sm:inline text-zinc-600 font-bold">•</span>
          <span className="text-xl sm:text-2xl md:text-3xl font-extrabold text-orange-400 tracking-wide font-['Cairo']">
            {RESTAURANT_INFO.taglineAr}
          </span>
        </motion.div>

        {/* Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          id="hero-slogan"
          className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-medium leading-relaxed mb-8"
        >
          "{language === 'ar' ? RESTAURANT_INFO.sloganAr : RESTAURANT_INFO.sloganFr}"
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
        >
          <button
            id="btn-hero-menu"
            onClick={scrollToMenu}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-500 hover:via-orange-500 hover:to-red-500 text-white font-extrabold text-base shadow-xl shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>{t.hero.btnMenu}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            id="btn-hero-order"
            onClick={() => setIsCartOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 hover:border-amber-500/50 text-zinc-100 font-bold text-base shadow-lg transition-all cursor-pointer backdrop-blur-sm"
          >
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>{t.hero.btnOrder}</span>
          </button>
        </motion.div>

        {/* Feature Highlights Badges Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl pt-4 border-t border-white/10"
        >
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-start">
            <Clock className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-zinc-100">{t.hero.badgeWood}</p>
              <p className="text-[10px] text-zinc-400">Cuisson au bois naturel</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-start">
            <Sparkles className="w-5 h-5 text-orange-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-zinc-100">{t.hero.badgeFresh}</p>
              <p className="text-[10px] text-zinc-400">Viande fraîche certifiée</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-start">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-zinc-100">{t.hero.badgeSides}</p>
              <p className="text-[10px] text-zinc-400">Riz, Pdt, Légumes & Sauces</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-start">
            <Flame className="w-5 h-5 text-red-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-zinc-100">{t.hero.badgeSpeed}</p>
              <p className="text-[10px] text-zinc-400">Confirmation WhatsApp</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
