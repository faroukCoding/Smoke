import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RESTAURANT_INFO } from '../data/menu';
import { openDirectWhatsAppContact, callRestaurant } from '../utils/whatsapp';
import { Flame, MessageSquare, Phone, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="main-footer" className="bg-[#070709] border-t border-zinc-800 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-850">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#101014] rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-500 fill-amber-500/20" />
                </div>
              </div>
              <div>
                <span className="font-heading text-xl font-black tracking-wider text-white uppercase block">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-xs font-bold text-amber-500 tracking-widest uppercase">
                  {isAr ? RESTAURANT_INFO.taglineAr : RESTAURANT_INFO.taglineFr}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              {t.footer.description}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
                Alger, Algérie
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-700/40 text-emerald-400">
                {isAr ? 'مفتوح 7/7 أيام' : 'Ouvert 7j/7'}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('menu-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.menu}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.experience}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact-section')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <button
                onClick={() => openDirectWhatsAppContact()}
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="font-semibold">WhatsApp: {RESTAURANT_INFO.phoneDisplay}</span>
              </button>

              <button
                onClick={() => callRestaurant()}
                className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{RESTAURANT_INFO.phoneDisplay}</span>
              </button>

              <div className="flex items-center gap-2 text-zinc-400">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{RESTAURANT_INFO.locationCity}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© 2026 {RESTAURANT_INFO.name}. {t.footer.rights}</p>
          <p className="flex items-center gap-1">
            <span>Viande d'agneau fumée & cuite au feu de bois</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
