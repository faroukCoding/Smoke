import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Flame, Sparkles, ChefHat, Timer, CheckCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export const AboutSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about-section" className="relative py-24 bg-[#09090b] overflow-hidden text-zinc-100">
      {/* Subtle background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Collage / Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80"
                alt="Fumage au feu de bois Smoke Me"
                className="w-full h-[400px] sm:h-[480px] object-cover filter brightness-90 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Badge on image */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-amber-500/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shrink-0">
                    <Flame className="w-5 h-5 fill-white/20" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-white">
                      {language === 'ar' ? 'تدخين حطبي بطيء' : 'Fumage lent 100% au bois'}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {language === 'ar' ? 'لحم طري يذوب في الفم بنكهة الحطب الطبيعي' : 'Texture fondante & parfum fumé authentique'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative background border accent */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-3xl border-2 border-orange-500/20 -z-0 hidden sm:block" />
          </motion.div>

          {/* Right Column: Story & Process */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              {t.about.title}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-300 leading-relaxed">
              <p>{t.about.p1}</p>
              <p className="text-zinc-400">{t.about.p2}</p>
              <p className="text-zinc-400">{t.about.p3}</p>
            </div>

            {/* 3 Pillars / Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center mb-3">
                  <Timer className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{t.about.feature1Title}</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">{t.about.feature1Desc}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{t.about.feature2Title}</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">{t.about.feature2Desc}</p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
                <div className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white mb-1">{t.about.feature3Title}</h4>
                <p className="text-[11px] text-zinc-400 leading-normal">{t.about.feature3Desc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
